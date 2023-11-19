import { Link } from 'react-router-dom';
import { IGif } from '../utils/types';
import { useAppDispatch } from '../hooks/redux';
import { gifSlice } from '../store/reducers/GifSlice';

interface GifProps {
  gif: IGif;
}

export default function Gif({ gif }: GifProps): JSX.Element {
  const { setDetailsMode } = gifSlice.actions;
  const dispatch = useAppDispatch();
  return (
    <Link
      to={`details/${gif.id}`}
      className="api-item"
      data-testid="gif"
      onClick={(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
      ): void => {
        event.stopPropagation();
        dispatch(setDetailsMode(true));
      }}
    >
      <h3 className="item-title">{gif.title}</h3>
      <video
        className="item-content"
        poster={gif.images.fixed_width_small_still.url}
        src={gif.images.original.mp4}
        autoPlay
        loop
        muted
      ></video>
    </Link>
  );
}
