import { useState } from 'react';
import Search from './components/Search';
import API from './components/API';
import axios from 'axios';
import { APIItemProps, isSpecificData } from './types';
import ErrorBoundaryButton from './components/ErrorBoundaryButton';
import ErrorBoundary from './components/ErrorBoundary';
import APIError from './components/APIError';

export default function App(): JSX.Element {
  const [dataState, setDataState] = useState<APIItemProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ErrorMsg, setErrorMsg] = useState<string>('');

  function showError(error: Error): void {
    console.error(error.message);
    setIsLoading(false);
    setErrorMsg(error.message);
  }

  const sendQuery = async (query: string): Promise<void> => {
    setIsLoading(true);

    try {
      const response: Response = await axios({
        url: query
          ? 'https://api.giphy.com/v1/gifs/search'
          : 'https://api.giphy.com/v1/gifs/trending',
        params: {
          api_key: 'wc4t6jVyKwNgIYR7NvQq0RB70uN94Dl1',
          q: query,
          limit: 20,
        },
      });

      if (response.status === 200) {
        setErrorMsg('');
        if (
          'data' in response &&
          isSpecificData(response.data) &&
          'data' in response.data &&
          isSpecificData(response.data.data)
        ) {
          const data: APIItemProps[] = response.data.data;
          setDataState(data);
          setIsLoading(false);
        }
      } else if (
        'message' in response &&
        typeof response.message === 'string'
      ) {
        throw new Error(response.message);
      }
    } catch (error) {
      if (error instanceof Error) showError(error);
    }
  };

  return (
    <ErrorBoundary>
      <Search sendQuery={sendQuery} />
      <ErrorBoundaryButton />
      {ErrorMsg ? (
        <APIError msg={ErrorMsg} />
      ) : (
        <API isLoading={isLoading} data={dataState} />
      )}
    </ErrorBoundary>
  );
}
