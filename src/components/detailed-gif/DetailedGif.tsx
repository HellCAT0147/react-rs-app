import { FC } from 'react';
import styles from './DetailedGif.module.scss';
import { DetailedGif } from './detailed-gif.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface GifProps {
  gif: DetailedGif;
}

const DetailedGif: FC<GifProps> = ({ gif }) => {
  const router = useRouter();
  const { query } = router;
  const { query: search, limit, page } = query;
  const queryWithoutPage = { query: search, limit };

  return (
    <div
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void =>
        event.stopPropagation()
      }
      className={styles.detailedItem}
      data-testid="detailed-item"
    >
      <Link
        href={{
          pathname: `/page/${page}`,
          query: { ...queryWithoutPage },
        }}
        className={styles.close}
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
      <div className={styles.info}>
        <h3>Author: {gif.user?.display_name || 'noname'}</h3>
        <p>{gif.user?.description}</p>
      </div>
    </div>
  );
};

export default DetailedGif;
