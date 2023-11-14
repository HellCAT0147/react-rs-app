import { useContext, useEffect, useState } from 'react';
import { Context } from '../utils/contexts';
import { IContext } from '../utils/types';
import { setRequest } from '../utils/local-storage';

export default function Search(): JSX.Element {
  const { searchKey, setSearchKey } = useContext<IContext>(Context);
  const [tempSearchKey, setTempSearchKey] = useState(searchKey || '');

  const catchEnter = (key: string): void => {
    if (key === 'Enter') search();
  };

  const search = async (): Promise<void> => {
    const cleanQuery: string = tempSearchKey.trim();
    setRequest(cleanQuery);
    if (setSearchKey) setSearchKey(cleanQuery);
  };

  useEffect((): void => {
    search();
    if (searchKey && setSearchKey) setSearchKey(searchKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const typing = (text: string): void => {
    setTempSearchKey(text);
  };

  return (
    <section className="search">
      <input
        className="input-search"
        type="text"
        onChange={(event) => typing(event.target.value)}
        onKeyDown={(event) => catchEnter(event.key)}
        value={tempSearchKey}
        data-testid="search-input"
      />
      <button
        className="send-button"
        onClick={search}
        data-testid="search-button"
      >
        Search
      </button>
      <h1 className="query">
        {searchKey ? searchKey.toUpperCase() : 'Trending'}
      </h1>
    </section>
  );
}
