import { FC } from 'react';
import { IGif } from './gif.interface';
import Link from 'next/link';

interface GifProps {
  gif: IGif;
}

const Gif: FC<GifProps> = ({ gif }) => {
  return (
    <Link href="#" className="api-item" data-testid="gif">
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
};

export default Gif;
