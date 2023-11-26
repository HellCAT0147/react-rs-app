import { NextPage } from 'next';
import Main from '@/components/main/Main';
import { ServerData } from '@/components/gifs/gifs.interface';
import { wrapper } from '@/store/store';
import { fetchAllGifs } from '@/store/services/GifService';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hooks/typed-hooks';
import { gifSlice } from '@/store/reducers/GifSlice';
import { SearchParams } from '@/components/layout/search/search.interface';

const MainPage: NextPage<ServerData> = (data) => {
  const router = useRouter();
  const { query } = router;
  const { searchParams } = useAppSelector((state) => state.gifReducer);
  const { setSearchKey, setGifsPerPage, setOffset } = gifSlice.actions;
  const dispatch = useAppDispatch();

  useEffect((): void => {
    const params: SearchParams = { ...searchParams };
    if ('query' in query && typeof query.query === 'string') {
      params.query = query.query;
      dispatch(setSearchKey(query.query));
    }
    if ('limit' in query && typeof query.limit === 'string') {
      params.limit = query.limit;
      dispatch(setGifsPerPage(query.limit));
    }
    if ('offset' in query && typeof query.offset === 'string') {
      params.offset = query.offset;
      dispatch(setOffset(query.offset));
    }
    router.push({
      pathname: '/page/1',
      query: { ...params },
    });
  }, []);

  return <Main data={data.data} />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { query = '', limit = '10', offset = '0' } = context.query;
    let data;
    if (
      typeof query === 'string' &&
      typeof limit === 'string' &&
      typeof offset === 'string'
    )
      data = await store.dispatch(
        fetchAllGifs.initiate({ query, limit, offset })
      );

    return {
      props: { data: data?.data },
    };
  }
);

export default MainPage;
