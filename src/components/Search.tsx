import { useEffect, useState } from 'react';
import { FindTagProps } from '../types';

export default function Search(props: FindTagProps): JSX.Element {
  const localData: string | null = localStorage.getItem('searchKeys');
  const [searchResult, setSearchResult] = useState<string>(
    localData || 'Search result'
  );
  const [searchKeys, setSearchKeys] = useState<string>(localData || '');

  const catchEnter = (key: string): void => {
    if (key === 'Enter') search();
  };

  const search = async (): Promise<void> => {
    const cleanQuery: string = searchKeys.trim();
    setSearchResult(cleanQuery);
    localStorage.setItem('searchKeys', cleanQuery);
    props.sendQuery(cleanQuery);
  };

  useEffect((): void => {
    search();
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
