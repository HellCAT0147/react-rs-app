import { Link, useParams } from 'react-router-dom';
import { getOne } from '../utils/API';
import { useEffect, useState } from 'react';
import { DetailedGif } from '../utils/types';
import { isGif } from '../utils/type-guards';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { gifSlice } from '../store/reducers/GifSlice';

const DetailedItem: React.FC = () => {
  const { isLoadingGif } = useAppSelector((state) => state.gifReducer);
  const { setGifLoading } = gifSlice.actions;
  const dispatch = useAppDispatch();

  const [gif, setGif] = useState<DetailedGif>();
  const [error, setError] = useState('');
  const id: string | undefined = useParams().id;
  const page: string | undefined = useParams().page;

  async function showDetails(id: string): Promise<void> {
    if (!isLoadingGif) dispatch(setGifLoading(true));
    const response: false | DetailedGif | Error = await getOne(id);
    if (response === false) {
      setError('Server error :( ... Try to change gif :)');
    } else if (isGif(response)) {
      setError('');
      setGif(response);
    } else setError(response.message);

    dispatch(setGifLoading(false));
  }

  useEffect(() => {
    if (id) showDetails(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
        <Link to={'../../page/' + page} className="close" data-testid="close">
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
        {error}
      </div>
    );
  }
};

export default DetailedItem;
