import { FieldError } from 'react-hook-form';
import styles from './Error.module.sass';

interface ErrorProps {
  error: FieldError | undefined;
}
const Error: React.FC<ErrorProps> = ({ error }): JSX.Element => {
  return error ? <p className={styles.message}>{error.message}</p> : <></>;
};

export default Error;
