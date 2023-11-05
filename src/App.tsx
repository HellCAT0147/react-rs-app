import { useState } from 'react';
import Search from './components/Search';
import { BackData, Gif, Pages } from './utils/types';
import ErrorBoundaryButton from './components/ErrorBoundaryButton';
import ErrorBoundary from './components/ErrorBoundary';
import APIError from './components/APIError';
import APIItems from './components/APIItems';
import getAll from './utils/API';
import { isError, isData } from './utils/type-guards';
import Pagination from './components/Pagination';
import { useNavigate, useParams } from 'react-router-dom';
import { LimitContext } from './utils/context';

export default function App(): JSX.Element {
  const [dataState, setDataState] = useState<Gif[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(
    Number(useParams().page)
  );
  const [limit, setLimit] = useState<number>(10);
  const [pages, setPages] = useState<Pages>({ numbers: [], last: 0 });
  const navigator = useNavigate();

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

    navigator('/page/1');

    const response: BackData | Error | false = await getAll(
      query,
      toPage || pageNumber,
      limit
    );

    if (isError(response)) {
      showError(response);
    } else if (response !== false && isData(response[0])) {
      const data: Gif[] = response[0];
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
      <ErrorBoundaryButton />
      {errorMsg ? (
        <APIError msg={errorMsg} />
      ) : (
        <LimitContext.Provider value={setLimit}>
          <APIItems isLoading={isLoading} data={dataState} />
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
