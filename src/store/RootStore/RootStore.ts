import FavoritesStore from 'store/RootStore/FavoritesStore';
import QueryParamsStore from 'store/RootStore/QueryParamsStore';

export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly favorites = new FavoritesStore();
}
