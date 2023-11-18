import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { gifSlice } from '../store/reducers/GifSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { hasValueField } from '../utils/type-guards';

export default function Pagination(): JSX.Element {
  const { pages, currentPage, gifsPerPage } = useAppSelector(
    (state) => state.gifReducer
  );
  const { setGifsPerPage, setCurrentPage } = gifSlice.actions;
  const dispatch = useAppDispatch();
  const [tempGifsPerPage, setTempGifsPerPage] = useState(gifsPerPage);

  return (
    <div className="controls">
      <div className="pagination">
        {pages.numbers.includes(1) ? '' : '...'}
        {pages.numbers.map(
          (page): ReactNode => (
            <Link
              to={'../page/' + page.toString()}
              onClick={() => {
                dispatch(setCurrentPage(page));
              }}
              className={
                page === currentPage ? 'page-number active' : 'page-number'
              }
              key={page}
              data-testid="page-number"
            >
              {page}
            </Link>
          )
        )}
        {pages.numbers.includes(pages.last) ? '' : '...'}
      </div>
      <p>{tempGifsPerPage}</p>
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
      </div>
    </div>
  );
}
