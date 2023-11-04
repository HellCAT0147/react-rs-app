import { useCallback, useEffect, useState } from 'react';
import Search from './components/Search';
import { BackData, Gif } from './utils/types';
import ErrorBoundaryButton from './components/ErrorBoundaryButton';
import ErrorBoundary from './components/ErrorBoundary';
import APIError from './components/APIError';
import APIItems from './components/APIItems';
import getAll from './utils/API';
import { isError, isData } from './utils/type-guards';
import Pagination from './components/Pagination';

export default function App(): JSX.Element {
  const [dataState, setDataState] = useState<Gif[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [pages, setPages] = useState<number[]>([]);
  const [activeQuery, setActiveQuery] = useState<string>('');

  function showError(error?: Error): void {
    if (error) {
      console.error(error.message);
      setErrorMsg(error.message);
    } else {
      setErrorMsg('Server error :( ... Try to visit this app next day :)');
    }
  }

  const sendQuery = useCallback(
    async (query: string): Promise<void> => {
      setIsLoading(true);
      setErrorMsg('');
      if (activeQuery !== query) {
        setPageNumber(1);
        setActiveQuery(query);
      }

      const response: BackData | Error | false = await getAll(
        query,
        pageNumber,
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
    },
    [activeQuery, limit, pageNumber]
  );

  useEffect(() => {
    sendQuery(activeQuery);
  }, [activeQuery, pageNumber, sendQuery]);

  return (
    <ErrorBoundary>
      <Search sendQuery={sendQuery} />
      <ErrorBoundaryButton />
      {errorMsg ? (
        <APIError msg={errorMsg} />
      ) : (
        <>
          <APIItems isLoading={isLoading} data={dataState} />
          <Pagination
            pageNumbers={pages}
            activePage={pageNumber}
            setActive={setPageNumber}
          />
        </>
      )}
    </ErrorBoundary>
  );
}
