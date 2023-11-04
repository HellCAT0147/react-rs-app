import { ReactNode } from 'react';
import { PaginationProps } from '../utils/types';

export default function Pagination(props: PaginationProps): JSX.Element {
  return (
    <div className="pagination">
      {props.pageNumbers.map(
        (page): ReactNode => (
          <span
            onClick={() => props.setActive(page)}
            className={
              page === props.activePage ? 'page-number active' : 'page-number'
            }
            key={page}
          >
            {page}
          </span>
        )
      )}
    </div>
  );
}
