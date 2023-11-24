import { FC } from 'react';
import styles from './Search.module.scss';
import commonStyles from '@/components/common.module.scss';

const Search: FC = () => {
  return (
    <section className={styles.search}>
      <input
        className={styles.searchInput}
        type="text"
        onChange={(event) => console.log('typing', event.target.value)}
        onKeyDown={(event) => console.log('catchEnter', event.key)}
        data-testid="search-input"
      />
      <button
        className={commonStyles.button}
        data-testid="search-button"
        onClick={() => console.log('search')}
      >
        Search
      </button>
    </section>
  );
};

export default Search;
