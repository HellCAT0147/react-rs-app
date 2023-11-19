import { useEffect } from 'react';
import Search from './components/Search';
import ErrorTriggerButton from './components/ErrorTriggerButton';
import ErrorBoundary from './components/ErrorBoundary';
import APIError from './components/APIError';
import Gifs from './components/Gifs';
import Pagination from './components/Pagination';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { gifSlice } from './store/reducers/GifSlice';
import { gifAPI } from './services/GifService';
import { isAPIError } from './utils/type-guards';
import Constants from './utils/constants';
import getPages from './utils/pagination';
import { Pages } from './utils/types';
import { skipToken } from '@reduxjs/toolkit/query';

const App: React.FC = () => {
  const { searchKey, gifsError, gifsPerPage, currentPage } = useAppSelector(
    (state) => state.gifReducer
  );
  const {
    setDetailsMode,
    setCurrentPage,
    setGifs,
    setGifsLoading,
    setGifsError,
    setPages,
  } = gifSlice.actions;
  const dispatch = useAppDispatch();

  const navigator = useNavigate();
  const params = useParams();

  const query = gifAPI.useFetchAllGifsQuery(
    currentPage
      ? {
          query: searchKey,
          limit: gifsPerPage,
          offset: currentPage ? (currentPage - 1) * gifsPerPage : 0,
        }
      : skipToken
  );

  useEffect(() => {
    dispatch(setGifsLoading(query.isLoading || query.isFetching));
    if (query.data) {
      dispatch(setGifs(query.data.data));
      const totalNumberOfPages: number = query.data.pagination.total_count;
      const maxAPIOffset = 5000;
      const pages: Pages = getPages(
        Math.ceil(
          (totalNumberOfPages > maxAPIOffset
            ? maxAPIOffset
            : totalNumberOfPages) / gifsPerPage
        ),
        currentPage || 1
      );
      dispatch(setPages(pages));
    } else if (query.error)
      dispatch(
        setGifsError(
          isAPIError(query.error)
            ? query.error.error
            : Constants.DEFAULT_ERROR_MESSAGE
        )
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.isFetching, query.isLoading, query.data]);

  useEffect(() => {
    dispatch(setCurrentPage(params.page ? +params.page : 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.page]);

  useEffect(() => {
    if ('id' in params) {
      navigator('/page/' + currentPage + '/details/' + params.id);
      dispatch(setDetailsMode(true));
    } else {
      navigator('/page/' + currentPage);
      dispatch(setDetailsMode(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, gifsPerPage]);

  return (
    <ErrorBoundary>
      <Search />
      <ErrorTriggerButton />
      {gifsError ? (
        <APIError />
      ) : (
        <>
          <div
            className="api"
            onClick={(): void => {
              navigator('../page/' + currentPage);
              dispatch(setDetailsMode(false));
            }}
          >
            <Gifs />
            <Outlet />
          </div>
          <Pagination />
        </>
      )}
    </ErrorBoundary>
  );
};

export default App;
