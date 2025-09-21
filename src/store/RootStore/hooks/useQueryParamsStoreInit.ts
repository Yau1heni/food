import { reaction } from 'mobx';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import rootStore from 'store/RootStore';

export const useQueryParamsStoreInit = (): void => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  // 1. Инициализация из URL
  useEffect(() => {
    rootStore.query.setSearch(search);
  }, [search]);

  // 2. Подписка на изменения стора → пушим в URL
  useEffect(() => {
    const dispose = reaction(
      () => rootStore.query.searchString,
      (newSearch) => {
        if (search !== newSearch) {
          navigate({ pathname, search: newSearch }, { replace: true });
        }
      }
    );

    return () => dispose();
  }, [pathname, search, navigate]);
};
