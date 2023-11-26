import { FC } from 'react';
import { IGif } from '../gif/gif.interface';
import styles from './Gifs.module.scss';
import Gif from '../gif/Gif';

interface GifsProps {
  data: IGif[];
}

const Gifs: FC<GifsProps> = ({ data }) => {
  return (
    <section className={styles.apiItems}>
      {data.length ? (
        data.map((item) => <Gif gif={item} key={item.id} />)
      ) : (
        <h2>Sorry, there is nothing to show you :(</h2>
      )}
    </section>
  );
};

export default Gifs;
