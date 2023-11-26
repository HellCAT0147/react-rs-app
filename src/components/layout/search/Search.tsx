import { FC } from 'react';
import styles from './Search.module.scss';
import commonStyles from '@/components/common.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks/typed-hooks';
import { gifSlice } from '@/store/reducers/GifSlice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Search: FC = () => {
  const dispatch = useAppDispatch();
  const { setSearchKey } = gifSlice.actions;
  const { searchParams } = useAppSelector((state) => state.gifReducer);
  const router = useRouter();
  const { query } = router;
  useEffect((): void => {
    if ('query' in query && typeof query.query === 'string')
      dispatch(setSearchKey(query.query));
  }, []);

  const search = (): void => {
    router.push({
      pathname: '/page/1',
      query: { ...searchParams },
    });
  };

  const catchEnter = (key: string): void => {
    if (key === 'Enter') search();
  };

  return (
    <section className={styles.search}>
      <input
        className={styles.searchInput}
        type="text"
        onChange={(event) => dispatch(setSearchKey(event.target.value))}
        onKeyDown={(event): void => catchEnter(event.key)}
        data-testid="search-input"
        value={searchParams.query}
      />
      <button
        className={commonStyles.button}
        data-testid="search-button"
        onClick={search}
      >
        Search
      </button>
    </section>
  );
};

export default Search;
