import { FC } from 'react';
import styles from './NotFound.module.scss';

const NotFound: FC = () => {
  return (
    <section className={styles.page404}>
      <h1>OOPS!</h1>
      <h2 data-testid="message">That page cannot be found.</h2>
    </section>
  );
};

export default NotFound;
