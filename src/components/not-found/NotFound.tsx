import { FC } from 'react';
import styles from './NotFound.module.scss';
import Head from 'next/head';

const NotFound: FC = () => {
  return (
    <>
      <Head>
        <title>Not found</title>
      </Head>
      <section className={styles.page404}>
        <h1>OOPS!</h1>
        <h2 data-testid="message">That page cannot be found.</h2>
      </section>
    </>
  );
};

export default NotFound;
