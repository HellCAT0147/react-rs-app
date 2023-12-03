import { User } from '../../utils/types/interfaces';
import styles from './CustomUser.module.sass';

interface UserProps {
  data: User;
  righty?: boolean;
}

const CustomUser: React.FC<UserProps> = ({
  data,
  righty = false,
}): JSX.Element => {
  return (
    <section className={`${styles.user}${righty ? ` ${styles.toRight}` : ''}`}>
      <img className={styles.userPicture} src={data.picture} />
      <h1 className={styles.field}>
        Name: <span className={styles.infoContent}>{data.name}</span>
      </h1>
      <h2 className={styles.field}>
        Gender: <span className={styles.infoContent}>{data.gender}</span>
      </h2>
      <h2 className={styles.field}>
        Age: <span className={styles.infoContent}>{data.age}</span>
      </h2>
      <h2 className={styles.field}>
        Country: <span className={styles.infoContent}>{data.country}</span>
      </h2>
      <h2 className={styles.field}>
        Email: <span className={styles.infoContent}>{data.email}</span>
      </h2>
      <h2 className={styles.field}>
        Password (from email ... maybe):{' '}
        <span className={styles.infoContent}>{data.password}</span>
      </h2>
      <h2 className={styles.field}>
        T&C:{' '}
        <span className={styles.infoContent}>
          {data.gender === 'Female' ? 'She' : 'He'} is
          {data.terms ? '' : "n't"} sure about that
        </span>
      </h2>
    </section>
  );
};

export default CustomUser;
