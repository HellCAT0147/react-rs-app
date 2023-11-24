import { FC, PropsWithChildren } from 'react';
import Search from './search/Search';
import ErrorTrigger from './error-trigger/ErrorTrigger';
import Meta from '../seo/Meta';
import { IMeta } from '../seo/meta.interface';

const Layout: FC<PropsWithChildren<IMeta>> = ({
  children,
  title,
  description,
}) => {
  return (
    <Meta title={title} description={description}>
      <ErrorTrigger />
      <Search />
      {children}
    </Meta>
  );
};

export default Layout;
