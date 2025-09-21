import { categoriesApi } from 'api/categoriesApi';
import type { LocalStore } from 'hooks/useLocalStore.ts';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { type CategoryModel, normalizeCategory } from 'store/models/categories/category.ts';
import { Meta } from 'utils/meta.ts';

type PrivateFields = '_list' | '_meta' | '_errorMessage';

export default class CategoriesStore implements LocalStore {
  private _meta: Meta = Meta.initial;
  private _list: CategoryModel[] = [];
  private _errorMessage: string | null = null;

  constructor() {
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _errorMessage: observable,
      list: computed,
      meta: computed,
      reset: action,
      destroy: action,
      getCategories: action,
    });
  }

  get list(): CategoryModel[] {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  get errorMessage(): string | null {
    return this._errorMessage;
  }

  reset(): void {
    this._list = [];
    this._meta = Meta.initial;
  }

  destroy(): void {
    this.reset();
  }

  async getCategories() {
    this._meta = Meta.loading;
    this._list = [];
    this._errorMessage = null;

    const response = await categoriesApi.getCategories();

    runInAction(() => {
      try {
        const list = [];

        for (const item of response.data) {
          list.push(normalizeCategory(item));
        }

        this._list = list;
        this._meta = Meta.success;
      } catch (err) {
        this._errorMessage = err instanceof Error ? err.message : String(err);
        this._meta = Meta.error;
        this._list = [];
      }
    });
  }
}
