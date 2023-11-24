import { FC, PropsWithChildren } from 'react';
import Search from './search/Search';
import ErrorTrigger from './error-trigger/ErrorTrigger';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <ErrorTrigger />
      <Search />
      {children}
    </div>
  );
};

export default Layout;
