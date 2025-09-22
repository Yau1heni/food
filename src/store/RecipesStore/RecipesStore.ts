import { recipesApi } from 'api/recipesApi';
import type { LocalStore } from 'hooks/useLocalStore.ts';
import {
  action,
  comparer,
  computed,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from 'mobx';
import rootStore from 'store/RootStore';
import {
  type CollectionModel,
  getCategoryKeys,
  getInitialCollectionModel,
  getInitialPaginationModel,
  type GetRecipesArgs,
  linearizeCollection,
  normalizeCollection,
  type PaginationModel,
  type Recipe,
} from 'store/models';
import { Meta } from 'utils/meta.ts';

type PrivateFields =
  | '_list'
  | '_meta'
  | '_errorMessage'
  | '_pagination'
  | '_currentRecipe'
  | '_reactionDisposer';

export default class RecipesStore implements LocalStore {
  private _list: CollectionModel<number, Recipe> = getInitialCollectionModel();
  private _currentRecipe: Recipe | null = null;
  private _pagination: PaginationModel = getInitialPaginationModel();
  private _meta: Meta = Meta.initial;
  private _errorMessage: string | null = null;
  private _currentRequestId = 0;
  private _reactionDisposer: (() => void) | null = null;

  constructor() {
    makeObservable<RecipesStore, PrivateFields>(this, {
      _list: observable.ref,
      _currentRecipe: observable,
      _pagination: observable,
      _meta: observable,
      _errorMessage: observable,
      _reactionDisposer: observable,

      list: computed,
      currentRecipe: computed,
      meta: computed,
      pagination: computed,

      reset: action,
      destroy: action,
      getRecipes: action,
      getRecipe: action,
    });

    this.initReactions();
  }

  initReactions() {
    this._reactionDisposer = reaction(
      () => ({
        term: rootStore.query.searchTerm,
        page: rootStore.query.page,
        categories: rootStore.query.category,
        isVegetarian: rootStore.query.vegetarian,
      }),
      (data) => {
        this.getRecipes({
          ...data,
          categories: getCategoryKeys(data.categories),
        });
      },
      { fireImmediately: true, equals: comparer.structural }
    );
  }

  get list(): Recipe[] {
    return linearizeCollection(this._list);
  }

  get currentRecipe(): Recipe | null {
    return this._currentRecipe;
  }

  get pagination(): PaginationModel {
    return this._pagination;
  }

  get meta(): Meta {
    return this._meta;
  }

  get errorMessage(): string | null {
    return this._errorMessage;
  }

  setPage(page: number): void {
    rootStore.query.page = page;
  }

  async getRecipes(data: GetRecipesArgs) {
    const requestId = ++this._currentRequestId;

    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();
    this._errorMessage = null;

    try {
      const response = await recipesApi.getRecipes(data);

      runInAction(() => {
        if (this._currentRequestId === requestId) {
          this._list = normalizeCollection(response.data, (listItem) => listItem.id);
          this._pagination = response.meta.pagination;
          this._meta = Meta.success;
        }
      });
    } catch (err) {
      runInAction(() => {
        if (this._currentRequestId === requestId) {
          this._errorMessage = err instanceof Error ? err.message : String(err);
          this._meta = Meta.error;
          this._list = getInitialCollectionModel();
        }
      });
    }
  }

  async getRecipe(id: string) {
    this._meta = Meta.loading;
    this._currentRecipe = null;
    this._errorMessage = null;

    const response = await recipesApi.getRecipe(id);

    runInAction(() => {
      try {
        this._currentRecipe = response.data;
        this._meta = Meta.success;
      } catch (err) {
        this._errorMessage = err instanceof Error ? err.message : String(err);
        this._meta = Meta.error;
        this._currentRecipe = null;
      }
    });
  }

  dispose() {
    if (this._reactionDisposer) {
      this._reactionDisposer();
      this._reactionDisposer = null;
    }
  }

  private readonly favoriteDisposer = reaction(
    () => rootStore.favorites.list.length,
    () => {
      this.getRecipes({
        term: rootStore.query.searchTerm,
        page: rootStore.query.page,
        categories: getCategoryKeys(rootStore.query.category),
        isVegetarian: false,
      });
    }
  );

  reset(): void {
    this._list = getInitialCollectionModel();
    this._currentRecipe = null;
    this._pagination = getInitialPaginationModel();
    this._meta = Meta.initial;
    this.dispose();
    this.favoriteDisposer();
  }

  destroy(): void {
    this.reset();
  }
}
