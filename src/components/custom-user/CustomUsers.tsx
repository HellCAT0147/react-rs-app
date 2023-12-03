import { User } from '../../utils/types/interfaces';
import styles from './CustomUsers.module.sass';

interface UserProps {
  data: User[];
  righty?: boolean;
}

const CustomUsers: React.FC<UserProps> = ({
  data,
  righty = false,
}): JSX.Element => {
  const reversedData: User[] = data.slice().reverse();
  return (
    <section className={`${styles.users}${righty ? ` ${styles.toRight}` : ''}`}>
      <h2 className={styles.formTitle}>
        {righty ? 'Uncontrolled Data' : 'React Hook Data'}
      </h2>
      {reversedData.map((user, id) => (
        <div
          className={`${styles.user}${id === 0 ? '' : ` ${styles.shadowed}`}`}
          key={id}
        >
          <img className={styles.userPicture} src={user.picture} />
          <h2 className={styles.field}>
            Name: <span className={styles.infoContent}>{user.name}</span>
          </h2>
          <h2 className={styles.field}>
            Gender: <span className={styles.infoContent}>{user.gender}</span>
          </h2>
          <h2 className={styles.field}>
            Age: <span className={styles.infoContent}>{user.age}</span>
          </h2>
          <h2 className={styles.field}>
            Country: <span className={styles.infoContent}>{user.country}</span>
          </h2>
          <h2 className={styles.field}>
            Email: <span className={styles.infoContent}>{user.email}</span>
          </h2>
          <h2 className={styles.field}>
            Password (from email ... maybe):{' '}
            <span className={styles.infoContent}>{user.password}</span>
          </h2>
          <h2 className={styles.field}>
            T&C:{' '}
            <span className={styles.infoContent}>
              {user.gender === 'Female' ? 'She' : 'He'} is
              {user.terms ? '' : "n't"} sure about that
            </span>
          </h2>
        </div>
      ))}
    </section>
  );
};

export default CustomUsers;
