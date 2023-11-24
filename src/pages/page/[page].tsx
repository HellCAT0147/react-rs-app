import { NextPage } from 'next';
import { useRouter } from 'next/router';

const NumberPage: NextPage = () => {
  const { query } = useRouter();
  console.log(query);

  return <div>NumberPage</div>;
};

export default NumberPage;
