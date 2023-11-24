import { FC } from 'react';
import Head from 'next/head';
import styles from './Main.module.css';
import { Inter } from 'next/font/google';
import Layout from '../layout/Layout';

const inter = Inter({ subsets: ['latin'] });

const Main: FC = () => {
  return (
    <Layout>
      <Head>
        <title>Gif Searcher</title>
        <meta
          name="description"
          content="A search engine where you can find your favorite gif on demand"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          dignissimos cum, unde quisquam hic, dolorem nam iste molestiae
          reiciendis laboriosam blanditiis aspernatur, aliquam alias cupiditate.
          Odit quo eveniet dolor minus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          dignissimos cum, unde quisquam hic, dolorem nam iste molestiae
          reiciendis laboriosam blanditiis aspernatur, aliquam alias cupiditate.
          Odit quo eveniet dolor minus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          dignissimos cum, unde quisquam hic, dolorem nam iste molestiae
          reiciendis laboriosam blanditiis aspernatur, aliquam alias cupiditate.
          Odit quo eveniet dolor minus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          dignissimos cum, unde quisquam hic, dolorem nam iste molestiae
          reiciendis laboriosam blanditiis aspernatur, aliquam alias cupiditate.
          Odit quo eveniet dolor minus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          dignissimos cum, unde quisquam hic, dolorem nam iste molestiae
          reiciendis laboriosam blanditiis aspernatur, aliquam alias cupiditate.
          Odit quo eveniet dolor minus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          dignissimos cum, unde quisquam hic, dolorem nam iste molestiae
          reiciendis laboriosam blanditiis aspernatur, aliquam alias cupiditate.
          Odit quo eveniet dolor minus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          dignissimos cum, unde quisquam hic, dolorem nam iste molestiae
          reiciendis laboriosam blanditiis aspernatur, aliquam alias cupiditate.
          Odit quo eveniet dolor minus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          dignissimos cum, unde quisquam hic, dolorem nam iste molestiae
          reiciendis laboriosam blanditiis aspernatur, aliquam alias cupiditate.
          Odit quo eveniet dolor minus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          dignissimos cum, unde quisquam hic, dolorem nam iste molestiae
          reiciendis laboriosam blanditiis aspernatur, aliquam alias cupiditate.
          Odit quo eveniet dolor minus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          dignissimos cum, unde quisquam hic, dolorem nam iste molestiae
          reiciendis laboriosam blanditiis aspernatur, aliquam alias cupiditate.
          Odit quo eveniet dolor minus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          dignissimos cum, unde quisquam hic, dolorem nam iste molestiae
          reiciendis laboriosam blanditiis aspernatur, aliquam alias cupiditate.
          Odit quo eveniet dolor minus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          dignissimos cum, unde quisquam hic, dolorem nam iste molestiae
          reiciendis laboriosam blanditiis aspernatur, aliquam alias cupiditate.
          Odit quo eveniet dolor minus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          dignissimos cum, unde quisquam hic, dolorem nam iste molestiae
          reiciendis laboriosam blanditiis aspernatur, aliquam alias cupiditate.
          Odit quo eveniet dolor minus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          dignissimos cum, unde quisquam hic, dolorem nam iste molestiae
          reiciendis laboriosam blanditiis aspernatur, aliquam alias cupiditate.
          Odit quo eveniet dolor minus!
        </p>
      </main>
    </Layout>
  );
};

export default Main;
