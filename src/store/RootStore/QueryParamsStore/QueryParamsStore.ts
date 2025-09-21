import { action, computed, makeObservable, observable } from 'mobx';
import qs from 'qs';
import type { ParsedQs } from 'qs';
import { type CategoryModel } from 'store/models';

type PrivateFields = '_params' | '_search';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search = '';

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      _search: observable.ref,

      setSearch: action,
      setParam: action,

      page: computed,
      searchTerm: computed,
      category: computed,
      searchString: computed,
    });
  }

  setParam(key: string, value?: string | number | null) {
    if (value === undefined || value === null || value === '') {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this._params[key];
    } else {
      this._params = { ...this._params, [key]: String(value) };
    }
    this._search = qs.stringify(this._params, { addQueryPrefix: true });
  }

  get searchString() {
    return this._search;
  }

  getParam(key: string): string | ParsedQs | (string | ParsedQs)[] | undefined {
    return this._params[key];
  }

  setSearch(search: string) {
    search = search.startsWith('?') ? search.slice(1) : search;

    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }

  get page(): number {
    const value = this._params.page;
    return value ? Number(value) : 1;
  }
  set page(p: number) {
    this.setParam('page', p > 1 ? p : null); // не храним page=1
  }

  get searchTerm(): string {
    return (this._params.searchTerm as string) || '';
  }
  set searchTerm(term: string) {
    this.page = 1;
    this.setParam('searchTerm', term);
  }

  get category(): CategoryModel[] {
    const categoryParam = this.getParam('category');
    if (!categoryParam) return [];

    try {
      return JSON.parse(categoryParam as string);
    } catch {
      return [];
    }
  }
  set category(value: CategoryModel[]) {
    this.setParam('category', JSON.stringify(value));
    this.page = 1;
  }
}
