import { FC } from 'react';
import styles from './Main.module.scss';
import Layout from '../layout/Layout';
import { Josefin_Sans } from 'next/font/google';
import { NextFont } from 'next/dist/compiled/@next/font';
import { ServerData } from '../gifs/gifs.interface';
import Pagination from '../pagination/Pagination';
import LayoutGifs from '../layout/LayoutGifs';
import DetailedGif from '../detailed-gif/DetailedGif';

const josefin: NextFont = Josefin_Sans({ subsets: ['latin'] });

const Main: FC<ServerData> = ({ gifsData, gifData }) => {
  return (
    <Layout
      title="Gif Searcher"
      description="A search engine where you can find your favorite gif on demand"
    >
      <main className={`${styles.main} ${josefin.className}`}>
        <LayoutGifs data={gifsData.data}>
          {gifData ? <DetailedGif gif={gifData.data} /> : ''}
        </LayoutGifs>
      </main>
      <Pagination data={gifsData.pagination} />
    </Layout>
  );
};

export default Main;
