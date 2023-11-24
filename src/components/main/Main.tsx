import { FC } from 'react';
import Head from 'next/head';
import styles from './Main.module.scss';
import Layout from '../layout/Layout';
import { Josefin_Sans } from 'next/font/google';
import { NextFont } from 'next/dist/compiled/@next/font';

const josefin: NextFont = Josefin_Sans({ subsets: ['latin'] });

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
      <main className={`${styles.main} ${josefin.className}`}>
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
