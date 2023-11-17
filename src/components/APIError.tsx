import { useAppSelector } from '../hooks/redux';

const APIError: React.FC = () => {
  const { error } = useAppSelector((state) => state.gifReducer);
  console.error(error);
  return (
    <section className="api">
      <h2>{error}</h2>
    </section>
  );
};

export default APIError;
