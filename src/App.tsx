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
import { fetchGifs } from './store/reducers/ActionCreators';

const App: React.FC = () => {
  const { searchKey, error, gifsPerPage, currentPage } = useAppSelector(
    (state) => state.gifReducer
  );
  const { setDetailsMode, setCurrentPage } = gifSlice.actions;
  const dispatch = useAppDispatch();

  const navigator = useNavigate();
  const params = useParams();

  useEffect(() => {
    dispatch(setCurrentPage(params.page ? +params.page : 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.page]);

  useEffect(() => {
    sendQuery(searchKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, gifsPerPage]);

  const sendQuery = async (
    query: string = searchKey,
    toPage?: number
  ): Promise<void> => {
    if (toPage) dispatch(setCurrentPage(toPage));
    navigator('/page/' + currentPage);

    // if ('id' in params) {
    //   navigator('/page/' + toPage + '/details/' + params.id);
    //   dispatch(setDetailsMode(true));
    // } else {
    //   navigator('/page/' + toPage);
    //   dispatch(setDetailsMode(false));
    // }

    dispatch(fetchGifs(query, toPage || currentPage, gifsPerPage));
  };

  return (
    <ErrorBoundary>
      <Search />
      <ErrorTriggerButton />
      {error ? (
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
