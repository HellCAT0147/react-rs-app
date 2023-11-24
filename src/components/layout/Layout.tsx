import { FC, PropsWithChildren } from 'react';
import Search from './search/Search';
import ErrorTrigger from './error-trigger/ErrorTrigger';
import { Josefin_Sans } from 'next/font/google';
import { NextFont } from 'next/dist/compiled/@next/font';

const josefin: NextFont = Josefin_Sans({ subsets: ['latin'] });

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={josefin.className}>
      <ErrorTrigger />
      <Search />
      {children}
    </div>
  );
};

export default Layout;
