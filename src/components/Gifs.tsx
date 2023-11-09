import Gif from './Gif';
import { QueryState, IGif } from '../utils/types';
import { useParams } from 'react-router-dom';

export default function Gifs({
  data,
  isLoading,
  details,
}: QueryState): JSX.Element {
  const isDetails: boolean = !!useParams().id;
  if (isLoading) {
    return (
      <section className="api-items">
        <span className="loader"></span>
      </section>
    );
  } else if (data) {
    const localData: IGif[] = data;
    const classes: string =
      'api-items' + (details.isDetails && isDetails ? ' half' : '');
    return (
      <section className={classes}>
        {localData.length ? (
          localData.map((item) => (
            <Gif gif={item} key={item.id} details={details} />
          ))
        ) : (
          <h2>Sorry, there is nothing to show you :(</h2>
        )}
      </section>
    );
  } else {
    return <section className="api-items">Unexpected error</section>;
  }
}
