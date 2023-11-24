import { FC } from 'react';
import commonStyles from '@/components/common.module.css';
import styles from './ErrorTrigger.module.css';

const ErrorTrigger: FC = () => {
  return (
    <button
      className={`${commonStyles.button} ${styles.errorTrigger}`}
      onClick={() => console.log('explode')}
    >
      Crash the App!
    </button>
  );
};

export default ErrorTrigger;
