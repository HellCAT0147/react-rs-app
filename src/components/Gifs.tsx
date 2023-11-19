import Gif from './Gif';
import { useAppSelector } from '../hooks/redux';

const Gifs: React.FC = () => {
  const { isLoadingGifs, isDetailsOpen, gifs } = useAppSelector(
    (state) => state.gifReducer
  );

  if (isLoadingGifs)
    return (
      <section className="api-items">
        <span className="loader"></span>
      </section>
    );

  if (gifs) {
    const classes: string = 'api-items' + (isDetailsOpen ? ' half' : '');
    return (
      <section className={classes}>
        {gifs.length ? (
          gifs.map((item) => <Gif gif={item} key={item.id} />)
        ) : (
          <h2>Sorry, there is nothing to show you :(</h2>
        )}
      </section>
    );
  }

  return <section className="api-items">Unexpected error</section>;
};
export default Gifs;
