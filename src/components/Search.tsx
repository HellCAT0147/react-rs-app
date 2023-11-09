import { useEffect, useState } from 'react';
import { FindTagProps } from '../utils/types';
import { useParams } from 'react-router-dom';

export default function Search({ sendQuery }: FindTagProps): JSX.Element {
  const localData: string | null = localStorage.getItem('searchKeys');
  const [searchResult, setSearchResult] = useState(
    localData || 'Search result'
  );
  const [searchKeys, setSearchKeys] = useState(localData || '');
  const [pageNumber, setPageNumber] = useState(Number(useParams().page));

  const catchEnter = (key: string): void => {
    if (key === 'Enter') search();
  };

  const search = async (): Promise<void> => {
    const cleanQuery: string = searchKeys.trim();
    setSearchResult(cleanQuery);
    localStorage.setItem('searchKeys', cleanQuery);

    setPageNumber(1);
    sendQuery(cleanQuery, pageNumber);
  };

  useEffect((): void => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const typing = (text: string): void => {
    setSearchKeys(text);
  };

  return (
    <section className="search">
      <input
        className="input-search"
        type="text"
        onChange={(event) => typing(event.target.value)}
        onKeyDown={(event) => catchEnter(event.key)}
        value={searchKeys}
      />
      <button className="send-button" onClick={search}>
        Search
      </button>
      <h1 className="query">{searchResult.toUpperCase()}</h1>
    </section>
  );
}
