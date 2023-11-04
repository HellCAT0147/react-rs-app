import { ReactNode } from 'react';
import { PaginationProps } from '../utils/types';

export default function Pagination(props: PaginationProps): JSX.Element {
  return (
    <div className="pagination">
      {props.pageNumbers.numbers.includes(1) ? '' : '...'}
      {props.pageNumbers.numbers.map(
        (page): ReactNode => (
          <span
            onClick={() => {
              props.setActive(page);
              props.getNewData(undefined, page);
            }}
            className={
              page === props.activePage ? 'page-number active' : 'page-number'
            }
            key={page}
          >
            {page}
          </span>
        )
      )}
      {props.pageNumbers.numbers.includes(props.pageNumbers.last) ? '' : '...'}
    </div>
  );
}
