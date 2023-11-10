import Gif from './Gif';
import { QueryState } from '../utils/types';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../utils/contexts';

export default function Gifs({ isLoading, details }: QueryState): JSX.Element {
  const isDetails: boolean = !!useParams().id;
  const { gifs } = useContext(Context);

  if (isLoading)
    return (
      <section className="api-items">
        <span className="loader"></span>
      </section>
    );

  if (gifs) {
    const classes: string =
      'api-items' + (details.isDetails && isDetails ? ' half' : '');
    return (
      <section className={classes}>
        {gifs.length ? (
          gifs.map((item) => <Gif gif={item} key={item.id} details={details} />)
        ) : (
          <h2>Sorry, there is nothing to show you :(</h2>
        )}
      </section>
    );
  }

  return <section className="api-items">Unexpected error</section>;
}
