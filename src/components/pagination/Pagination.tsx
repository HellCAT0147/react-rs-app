import { FC } from 'react';
import { Pages, Pagination } from './pagination.interface';
import styles from './Pagination.module.scss';
import getPages from '@/utils/pagination-builder';
import { useAppSelector } from '@/store/hooks/typed-hooks';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface PaginationProps {
  data: Pagination;
}

const Pagination: FC<PaginationProps> = ({ data }) => {
  const { searchParams } = useAppSelector((state) => state.gifReducer);
  const { query } = useRouter();
  const { query: search, limit } = query;
  const queryWithoutPage = { query: search, limit };

  const totalNumberOfPages: number = data.total_count;
  const maxAPIOffset = 5000;
  const currentPage: number = typeof query.page === 'string' ? +query.page : 1;
  const pages: Pages = getPages(
    Math.ceil(
      (totalNumberOfPages > maxAPIOffset ? maxAPIOffset : totalNumberOfPages) /
        +searchParams.limit
    ),
    currentPage
  );

  return (
    <div className={styles.controls}>
      <div className={styles.pagination}>
        {pages.numbers.includes(1) ? '' : '...'}
        {pages.numbers.map(
          (page): JSX.Element => (
            <Link
              href={{
                pathname: `/page/${page}`,
                query: { ...queryWithoutPage },
              }}
              className={`${styles.pageNumber}${
                page === currentPage ? ` ${styles.active}` : ''
              }`}
              key={page}
              data-testid="page-number"
            >
              {page}
            </Link>
          )
        )}
        {pages.numbers.includes(pages.last) ? '' : '...'}
      </div>
      {/* <p>{tempGifsPerPage}</p>
      <div className="pages-count">
        10
        <input
          value={tempGifsPerPage}
          min={10}
          max={50}
          step={1}
          onChange={({ target }): void => {
            if (hasValueField(target)) setTempGifsPerPage(+target.value);
          }}
          onClick={(): void => {
            dispatch(setGifsPerPage(tempGifsPerPage));
          }}
          className="pages-count-handle"
          type="range"
        />
        50
      </div> */}
    </div>
  );
};

export default Pagination;
