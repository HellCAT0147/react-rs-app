import { useEffect, useState } from 'react';
import { setRequest } from '../utils/local-storage';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { searchSlice } from '../store/reducers/SearchSlice';

export default function Search(): JSX.Element {
  const { searchKeyFromStorage } = useAppSelector(
    (state) => state.searchReducer
  );
  const { setSearchKeyForStorage } = searchSlice.actions;
  const dispatch = useAppDispatch();

  const [tempSearchKey, setTempSearchKey] = useState(
    searchKeyFromStorage || ''
  );

  const catchEnter = (key: string): void => {
    if (key === 'Enter') search();
  };

  const search = async (): Promise<void> => {
    const cleanQuery: string = tempSearchKey.trim();
    setRequest(cleanQuery);
    dispatch(setSearchKeyForStorage(cleanQuery));
  };

  useEffect((): void => {
    search();
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
      <h1 className="query">{searchKeyFromStorage.toUpperCase()}</h1>
    </section>
  );
}
