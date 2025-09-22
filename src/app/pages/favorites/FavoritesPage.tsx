import { Container } from 'components/Container';
import { Layout } from 'components/Layout';
import Loader from 'components/Loader';
import { PageTitle } from 'components/PageTitle';
import Pagination from 'components/Pagination';
import Text from 'components/Text';
import { useClientPagination } from 'hooks/useClientPagination.ts';
import { observer } from 'mobx-react-lite';
import rootStore from 'store/RootStore';
import { PAGINATION_LIMIT } from 'store/models';
import { Meta } from 'utils/meta.ts';

import styles from './FavoritesPage.module.scss';
import { FavoritesList } from './components/FavoritesList/FavoritesList';

export const FavoritesPage = observer(() => {
  const { paginatedData, total, setPage, page } = useClientPagination({
    data: rootStore.favorites.list,
  });

  if (rootStore.favorites.meta === Meta.loading) {
    return (
      <Layout>
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      </Layout>
    );
  }

  if (rootStore.favorites.meta === Meta.error) {
    return (
      <Layout>
        <Text>Error: {rootStore.favorites.errorMessage}</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <PageTitle title={'Favorites'} />
        <FavoritesList favorites={paginatedData} />
        {rootStore.favorites.meta === Meta.success &&
          rootStore.favorites.list.length > PAGINATION_LIMIT && (
            <Pagination page={page} onChange={setPage} total={total} />
          )}
      </Container>
    </Layout>
  );
});
