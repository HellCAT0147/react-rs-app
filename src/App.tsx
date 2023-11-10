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
import { getLastRequest } from './utils/local-storage';

export default function App(): JSX.Element {
  const [gifs, setGifs] = useState<IGif[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [pageNumber, setPageNumber] = useState(Number(useParams().page));
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState<Pages>({ numbers: [], last: 0 });
  const [isDetails, setIsDetails] = useState(false);
  const [searchKey, setSearchKey] = useState(getLastRequest());

  const navigator = useNavigate();
  const params = useParams();

  function showError(error?: Error): void {
    if (error) {
      console.error(error.message);
      setErrorMsg(error.message);
    } else {
      setErrorMsg('Server error :( ... Try to visit this app next day :)');
    }
  }

  useEffect(() => {
    sendQuery(searchKey, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  const sendQuery = async (
    query: string = searchKey,
    toPage?: number
  ): Promise<void> => {
    if (toPage) setPageNumber(toPage);
    setIsLoading(true);
    setErrorMsg('');
    setIsDetails(false);

    if ('id' in params) {
      navigator('/page/' + toPage + '/details/' + params.id);
      setIsDetails(true);
    } else {
      navigator('/page/' + toPage);
    }

    const response: BackData | Error | false = await getAll(
      query,
      toPage || pageNumber,
      limit
    );

    if (isError(response)) {
      showError(response);
    } else if (response !== false && isData(response[0])) {
      const data: IGif[] = response[0];
      setPages(response[1]);
      setGifs(data);
    } else {
      showError();
    }

    setIsLoading(false);
  };

  return (
    <ErrorBoundary>
      <Context.Provider value={{ setLimit, setSearchKey, gifs, searchKey }}>
        <Search />
        <ErrorTriggerButton />
        {errorMsg ? (
          <APIError msg={errorMsg} />
        ) : (
          <>
            <div
              className="api"
              onClick={(): void => {
                navigator('../page/' + pageNumber);
                setIsDetails(false);
              }}
            >
              <Gifs
                isLoading={isLoading}
                details={{ isDetails, setIsDetails }}
              />
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
}
