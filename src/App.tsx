import { useEffect, useState } from 'react';
import Search from './components/Search';
import { BackData, IGif, Pages } from './utils/types';
import ErrorTriggerButton from './components/ErrorTriggerButton';
import ErrorBoundary from './components/ErrorBoundary';
import APIError from './components/APIError';
import Gifs from './components/Gifs';
import getAll from './utils/API';
import { isError, isData } from './utils/type-guards';
import Pagination from './components/Pagination';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Context } from './utils/contexts';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { gifSlice } from './store/reducers/GifSlice';
import Constants from './utils/constants';

const App: React.FC = () => {
  const { searchKeyFromStorage, error } = useAppSelector(
    (state) => state.gifReducer
  );
  const { setError, setGifsLoading, setDetailsMode } = gifSlice.actions;
  const dispatch = useAppDispatch();

  const [gifs, setGifs] = useState<IGif[]>([]);
  const [pageNumber, setPageNumber] = useState(Number(useParams().page));
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState<Pages>({ numbers: [], last: 0 });

  const navigator = useNavigate();
  const params = useParams();

  useEffect(() => {
    sendQuery(searchKeyFromStorage, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyFromStorage]);

  const sendQuery = async (
    query: string = searchKeyFromStorage,
    toPage?: number
  ): Promise<void> => {
    if (toPage) setPageNumber(toPage);
    dispatch(setGifsLoading(true));
    dispatch(setError(''));

    if ('id' in params) {
      navigator('/page/' + toPage + '/details/' + params.id);
      dispatch(setDetailsMode(true));
    } else {
      navigator('/page/' + toPage);
      dispatch(setDetailsMode(false));
    }

    const response: BackData | Error | false = await getAll(
      query,
      toPage || pageNumber,
      limit
    );

    if (isError(response)) dispatch(setError(response.message));
    else if (response !== false && isData(response[0])) {
      const data: IGif[] = response[0];
      setPages(response[1]);
      setGifs(data);
    } else dispatch(setError(Constants.DEFAULT_ERROR_MESSAGE));

    dispatch(setGifsLoading(false));
  };

  return (
    <ErrorBoundary>
      <Context.Provider value={{ setLimit, gifs }}>
        <Search />
        <ErrorTriggerButton />
        {error ? (
          <APIError />
        ) : (
          <>
            <div
              className="api"
              onClick={(): void => {
                navigator('../page/' + pageNumber);
                dispatch(setDetailsMode(false));
              }}
            >
              <Gifs />
              <Outlet />
            </div>
            <Pagination
              pageNumbers={pages}
              activePage={pageNumber}
              setActive={setPageNumber}
              getNewData={sendQuery}
            />
          </>
        )}
      </Context.Provider>
    </ErrorBoundary>
  );
};

export default App;
