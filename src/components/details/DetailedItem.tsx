import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { isAPIError } from '../../utils/type-guards';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { gifSlice } from '../../store/reducers/GifSlice';
import { gifAPI } from '../../services/GifService';
import { skipToken } from '@reduxjs/toolkit/query';
import Constants from '../../utils/constants';
import './styles.css';

const DetailedItem: React.FC = () => {
  const { isLoadingGif, gif, gifError } = useAppSelector(
    (state) => state.gifReducer
  );
  const { setGifLoading, setDetailsMode, setGif, setGifError } =
    gifSlice.actions;
  const dispatch = useAppDispatch();

  const id: string | undefined = useParams().id;
  const page: string | undefined = useParams().page;

  const query = gifAPI.useFetchOneGifQuery(id ?? skipToken);

  useEffect(() => {
    dispatch(setGifLoading(query.isLoading || query.isFetching));
    if (id) {
      if (query.data) {
        dispatch(setGif(query.data.data));
      } else if (query.error) {
        dispatch(
          setGifError(
            isAPIError(query.error)
              ? `${query.error.data.meta.status}! ${query.error.data.meta.msg}`
              : Constants.DEFAULT_GIF_ERROR_MESSAGE
          )
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, query.isFetching, query.isLoading]);

  if (isLoadingGif) {
    return (
      <div className="detailed-item loading" data-testid="loading">
        <span className="loader bigger"></span>
      </div>
    );
  } else if (gif) {
    return (
      <div
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void =>
          event.stopPropagation()
        }
        className="detailed-item"
        data-testid="detailed-item"
      >
        <Link
          to={'../../page/' + page}
          onClick={() => dispatch(setDetailsMode(false))}
          className="close"
          data-testid="close"
        >
          +
        </Link>
        <h2>{gif.title}</h2>
        <video
          className="item-content"
          poster={gif.images.fixed_width_small_still.url}
          src={gif.images.original.mp4}
          autoPlay
          loop
          muted
        ></video>
        <div className="info">
          <h3>Author: {gif.user?.display_name || 'noname'}</h3>
          <p>{gif.user?.description}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void =>
          event.stopPropagation()
        }
        className="detailed-item"
      >
        <Link to={'../../page/' + page} className="close">
          +
        </Link>
        <p className="api-error">{gifError}</p>
      </div>
    );
  }
};

export default DetailedItem;
