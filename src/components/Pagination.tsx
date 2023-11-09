import { ReactNode, useContext, useState } from 'react';
import { PaginationProps } from '../utils/types';
import { Link } from 'react-router-dom';
import { LimitContext } from '../utils/contexts';

export default function Pagination({
  pageNumbers,
  activePage,
  setActive,
  getNewData,
}: PaginationProps): JSX.Element {
  const [itemsOnPage, setItemsOnPage] = useState(10);
  const setLimit: (value: number) => void = useContext(LimitContext);

  return (
    <div className="controls">
      <div className="pagination">
        {pageNumbers.numbers.includes(1) ? '' : '...'}
        {pageNumbers.numbers.map(
          (page): ReactNode => (
            <Link
              to={'../page/' + page.toString()}
              onClick={() => {
                setActive(page);
                getNewData(undefined, page);
              }}
              className={
                page === activePage ? 'page-number active' : 'page-number'
              }
              key={page}
            >
              {page}
            </Link>
          )
        )}
        {pageNumbers.numbers.includes(pageNumbers.last) ? '' : '...'}
      </div>
      <p>{itemsOnPage}</p>
      <div className="pages-count">
        10
        <input
          value={itemsOnPage}
          min={10}
          max={50}
          step={1}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setItemsOnPage(+event.target.value);
            setLimit(+event.target.value);
          }}
          onClick={(): void => {
            getNewData(undefined, 1);
          }}
          className="pages-count-handle"
          type="range"
        />
        50
      </div>
    </div>
  );
}
