import { FC, useEffect } from 'react';
import commonStyles from '@/components/common.module.scss';
import styles from './ErrorTrigger.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks/typed-hooks';
import { gifSlice } from '@/store/reducers/GifSlice';

const ErrorTrigger: FC = () => {
  const { isError } = useAppSelector((state) => state.gifReducer);
  const { setIsError } = gifSlice.actions;
  const dispatch = useAppDispatch();

  const explode = (): void => {
    console.log('explode?');

    dispatch(setIsError());
  };

  useEffect(() => {
    if (isError) throw new Error('BOOM! A controlled error has occurred.');
  }, [isError]);

  return (
    <button
      className={`${commonStyles.button} ${styles.errorTrigger}`}
      onClick={explode}
    >
      Crash the App!
    </button>
  );
};

export default ErrorTrigger;
