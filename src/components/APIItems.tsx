import APIItem from './APIItem';
import { QueryState, Gif } from '../utils/types';

export default function APIItems(props: QueryState): JSX.Element {
  if (props.isLoading) {
    return (
      <section className="api">
        <span className="loader"></span>
      </section>
    );
  } else if (props.data) {
    const data: Gif[] = props.data;

    return (
      <section className="api">
        {data.length ? (
          data.map((item) => (
            <APIItem title={item.title} images={item.images} key={item.id} />
          ))
        ) : (
          <h2>Sorry, there is nothing to show you :(</h2>
        )}
      </section>
    );
  } else {
    return <section className="api">Unexpected error</section>;
  }
}
