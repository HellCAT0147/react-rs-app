import { FC } from 'react';
import { IGif } from './gif.interface';
import Link from 'next/link';
import styles from './Gif.module.scss';

interface GifProps {
  gif: IGif;
}

const Gif: FC<GifProps> = ({ gif }) => {
  return (
    <Link href="#" className={styles.gif} data-testid="gif">
      <h3 className={styles.gifTitle}>{gif.title}</h3>
      <video
        className={styles.gifContent}
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
