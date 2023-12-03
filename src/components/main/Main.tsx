import { useAppSelector } from '../../store/hooks/typed-hooks';
import CustomUser from '../custom-user/CustomUser';
import styles from './Main.module.sass';

const Main: React.FC = (): JSX.Element => {
  const { hookUser, refUser } = useAppSelector((state) => state.gifReducer);

  return (
    <>
      <div className={styles.users}>
        <CustomUser data={hookUser} />
        <CustomUser data={refUser} righty={true} />
      </div>
    </>
  );
};

export default Main;
