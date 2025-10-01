import { favoritesApi } from 'api/favoritesApi';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import {
  type CollectionModel,
  type Favorites,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from 'store/models';
import { Meta } from 'utils/meta.ts';

type PrivateFields = '_list' | '_meta' | '_errorMessage';

export default class FavoritesStore {
  private _list: CollectionModel<number, Favorites> = getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _errorMessage: string | null = null;

  constructor() {
    makeObservable<FavoritesStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _errorMessage: observable,

      list: computed,
      meta: computed,

      checkAvailability: action.bound,
      getFavorites: action,
      removeFavorite: action.bound,
    });
  }

  get list(): Favorites[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  get errorMessage(): string | null {
    return this._errorMessage;
  }

  async getFavorites() {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();
    this._errorMessage = null;

    try {
      const response = await favoritesApi.getFavorites();

      runInAction(() => {
        this._list = normalizeCollection(response, (listItem) => listItem.originalRecipeId);
        this._meta = Meta.success;
      });
    } catch (err) {
      runInAction(() => {
        this._errorMessage = err instanceof Error ? err.message : String(err);
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      });
    }
  }

  async removeFavorite(id: number) {
    this._meta = Meta.loading;
    this._errorMessage = null;

    try {
      const response = await favoritesApi.removeFavorite({ recipe: id });

      runInAction(() => {
        if (response.ok) {
          this._list.order = this._list.order.filter((originalRecipeId) => originalRecipeId !== id);
          Reflect.deleteProperty(this._list.entities, id);
          this._meta = Meta.success;
        }
      });
    } catch (err) {
      runInAction(() => {
        this._errorMessage = err instanceof Error ? err.message : String(err);
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      });
    }
  }

  async addFavorite(id: number) {
    this._meta = Meta.loading;
    this._errorMessage = null;

    try {
      await favoritesApi.addFavorite({ recipe: id });
      await this.getFavorites();

      runInAction(() => {
        this._meta = Meta.success;
      });
    } catch (err) {
      runInAction(() => {
        this._errorMessage = err instanceof Error ? err.message : String(err);
        this._meta = Meta.error;
      });
    }
  }

  checkAvailability(id: number) {
    if (this.meta === Meta.success) {
      return !!this._list.entities[id];
    }
  }
}
