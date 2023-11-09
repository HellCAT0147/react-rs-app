import { useState } from 'react';
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
import { LimitContext } from './utils/contexts';

export default function App(): JSX.Element {
  const [dataState, setDataState] = useState<IGif[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [pageNumber, setPageNumber] = useState(Number(useParams().page));
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState<Pages>({ numbers: [], last: 0 });
  const [isDetails, setIsDetails] = useState(false);
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

  const sendQuery = async (
    query: string = localStorage.getItem('searchKeys') || '',
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

      setDataState(data);
    } else {
      showError();
    }
    setIsLoading(false);
  };

  return (
    <ErrorBoundary>
      <Search sendQuery={sendQuery} />
      <ErrorTriggerButton />
      {errorMsg ? (
        <APIError msg={errorMsg} />
      ) : (
        <LimitContext.Provider value={setLimit}>
          <div
            className="api"
            onClick={(): void => {
              navigator('../page/' + pageNumber);
              setIsDetails(false);
            }}
          >
            <Gifs
              isLoading={isLoading}
              data={dataState}
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
        </LimitContext.Provider>
      )}
    </ErrorBoundary>
  );
}
