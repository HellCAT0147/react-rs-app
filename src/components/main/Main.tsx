import { useAppSelector } from '../../store/hooks/typed-hooks';
import CustomUsers from '../custom-user/CustomUsers';
import styles from './Main.module.sass';

const Main: React.FC = (): JSX.Element => {
  const { hookUsers, refUsers } = useAppSelector((state) => state.gifReducer);

  return (
    <>
      <div className={styles.users}>
        <CustomUsers data={hookUsers} />
        <CustomUsers data={refUsers} righty={true} />
      </div>
    </>
  );
};

export default Main;
