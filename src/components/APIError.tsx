import { useAppSelector } from '../hooks/redux';

const APIError: React.FC = () => {
  const { gifsError } = useAppSelector((state) => state.gifReducer);
  console.error(gifsError);
  return (
    <section className="api">
      <h2>{gifsError}</h2>
    </section>
  );
};

export default APIError;
