import { NextPage } from 'next';
import Main from '@/components/main/Main';
import { ServerData } from '@/components/gifs/gifs.interface';
import { wrapper } from '@/store/store';
import { fetchAllGifs, fetchOneGif } from '@/store/services/GifService';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hooks/typed-hooks';
import { gifSlice } from '@/store/reducers/GifSlice';
import { SearchParams } from '@/components/layout/search/search.interface';

const MainPage: NextPage<ServerData> = ({ gifsData, gifData }) => {
  const router = useRouter();
  const { query } = router;
  const pageNumber = query.page;

  const { searchParams } = useAppSelector((state) => state.gifReducer);
  const { setSearchKey, setGifsPerPage, setGifId } = gifSlice.actions;
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
    if ('gif' in query && typeof query.gif === 'string') {
      params.gif = query.gif;
      dispatch(setGifId(query.gif));
    }

    router.push({
      pathname: `/page/${pageNumber}`,
      query: { ...params },
    });
  }, []);

  return <Main gifsData={gifsData} gifData={gifData} />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { query = '', limit = '10', page = '1', gif } = context.query;

    let gifsData;
    if (
      typeof query === 'string' &&
      typeof limit === 'string' &&
      typeof page === 'string'
    ) {
      const offset: string = `${(+page - 1) * +limit}`;
      gifsData = await store.dispatch(
        fetchAllGifs.initiate({ query, limit, offset })
      );
    }

    let gifData;
    if (typeof gif === 'string') {
      gifData = await store.dispatch(fetchOneGif.initiate(gif));
    }

    return {
      props: { gifsData: gifsData?.data, gifData: gifData?.data || null },
    };
  }
);

export default MainPage;
