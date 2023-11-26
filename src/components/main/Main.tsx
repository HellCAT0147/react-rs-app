import { FC } from 'react';
import styles from './Main.module.scss';
import Layout from '../layout/Layout';
import { Josefin_Sans } from 'next/font/google';
import { NextFont } from 'next/dist/compiled/@next/font';
import { ServerData } from '../gifs/gifs.interface';
import Gifs from '../gifs/Gifs';
import Pagination from '../pagination/Pagination';

const josefin: NextFont = Josefin_Sans({ subsets: ['latin'] });

const Main: FC<ServerData> = ({ data }) => {
  return (
    <Layout
      title="Gif Searcher"
      description="A search engine where you can find your favorite gif on demand"
    >
      <main className={`${styles.main} ${josefin.className}`}>
        <Gifs data={data.data} />
        <Pagination data={data.pagination} />
      </main>
    </Layout>
  );
};

export default Main;
