import { useAppSelector } from '../../store/hooks/typed-hooks';
import styles from './Main.module.sass';

const Main: React.FC = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.gifReducer);

  return (
    <>
      <h1 className={styles.heading}>Name: {user.name}</h1>
      <h2 className={styles.heading}>Gender: {user.gender}</h2>
      <h2 className={styles.heading}>Age: {user.age}</h2>
      <h2 className={styles.heading}>Country: {user.country}</h2>
      <h2 className={styles.heading}>Email: {user.email}</h2>
      <h2 className={styles.heading}>
        Password (from email ... maybe): {user.password}
      </h2>
      <h2 className={styles.heading}>
        T&C: {user.gender === 'Female' ? 'She' : 'He'} is
        {user.terms ? '' : "n't"} sure about that
      </h2>
      <img className={styles.heading} src={user.picture} />
    </>
  );
};

export default Main;
