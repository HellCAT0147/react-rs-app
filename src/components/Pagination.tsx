import { ReactNode } from 'react';
import { PaginationProps } from '../utils/types';
import { Link } from 'react-router-dom';

export default function Pagination(props: PaginationProps): JSX.Element {
  return (
    <div className="pagination">
      {props.pageNumbers.numbers.includes(1) ? '' : '...'}
      {props.pageNumbers.numbers.map(
        (page): ReactNode => (
          <Link
            to={'../page/' + page.toString()}
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
          </Link>
        )
      )}
      {props.pageNumbers.numbers.includes(props.pageNumbers.last) ? '' : '...'}
    </div>
  );
}
