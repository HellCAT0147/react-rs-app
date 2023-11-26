import { FC, PropsWithChildren } from 'react';
import styles from './Gifs.module.scss';
import Gif from '../gif/Gif';
import { IGifs } from './gifs.interface';
import { useRouter } from 'next/router';

const Gifs: FC<PropsWithChildren<IGifs>> = ({ data, children }) => {
  const { query } = useRouter();

  return (
    <>
      <section
        className={`${styles.apiItems}${
          'gif' in query ? ` ${styles.half}` : ''
        }`}
      >
        {data.length ? (
          data.map((item) => <Gif gif={item} key={item.id} />)
        ) : (
          <h2>Sorry, there is nothing to show you :(</h2>
        )}
      </section>
      {children}
    </>
  );
};

export default Gifs;
