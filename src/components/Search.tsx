import { useEffect, useState } from 'react';
import { setRequest } from '../utils/local-storage';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { gifSlice } from '../store/reducers/GifSlice';

export default function Search(): JSX.Element {
  const { searchKey } = useAppSelector((state) => state.gifReducer);
  const { setSearchKey } = gifSlice.actions;
  const dispatch = useAppDispatch();

  const [tempSearchKey, setTempSearchKey] = useState(searchKey || '');

  const catchEnter = (key: string): void => {
    if (key === 'Enter') search();
  };

  const search = async (): Promise<void> => {
    const cleanQuery: string = tempSearchKey.trim();
    setRequest(cleanQuery);
    dispatch(setSearchKey(cleanQuery));
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
      <h1 className="query">{searchKey.toUpperCase()}</h1>
    </section>
  );
}
