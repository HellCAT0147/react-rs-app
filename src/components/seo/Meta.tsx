import { FC, PropsWithChildren } from 'react';
import { IMeta } from './meta.interface';
import Head from 'next/head';

const Meta: FC<PropsWithChildren<IMeta>> = ({
  title,
  description,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        {description ? (
          <>
            <meta name="description" content={description} />
            <meta name="og:title" content={title} />
            <meta name="og:description" content={description} />
          </>
        ) : (
          <>
            <meta
              data-testid="robots"
              name="robots"
              content="noindex, nofollow"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </>
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
};

export default Meta;
