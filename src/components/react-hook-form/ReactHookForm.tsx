import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/typed-hooks';
import styles from './ReactHookForm.module.sass';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Error from '../error/Error';
import { schema } from '../../utils/logic/validation';
import { FormData } from '../../utils/types/interfaces';
import { formSlice } from '../../store/reducers/FormSlice';

const ReactHookForm: React.FC = (): JSX.Element => {
  const { countries, tempPicture } = useAppSelector(
    (state) => state.gifReducer
  );
  const { setTempPicture } = formSlice.actions;
  const dispatch = useAppDispatch();
  const [randomCountry] = useState<string>(
    countries[Math.floor(Math.random() * countries.length)]
  );
  const [countryMatches, setCountryMatches] = useState<string[]>([]);
  const [countryText, setCountryText] = useState<string>();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const filterCountries = (e: ChangeEvent<HTMLInputElement>): void => {
    register('country').onChange(e);
    const text: string = e.target.value;
    setCountryText(text);
    if (!text.length) setCountryMatches([]);
    else {
      const matches = countries.filter((country) => {
        const regex = new RegExp(`${text}`, 'gi');
        return country.match(regex);
      });
      setCountryMatches(matches);
    }
  };

  const setCountry = (country: string): void => {
    setCountryText(country);
    setValue('country', country);
    setCountryMatches([]);
  };

  const onSubmitHandler = (data: FormData): void => {
    console.log(data);
    console.log(tempPicture);

    reset();
    setCountryText('');
  };

  const handlePicture = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    register('picture').onChange(e);

    if ('files' in e.target && e.target.files) {
      const file: File = e.target.files[0];
      const base64 = await generateBase64(file);
      if (typeof base64 !== 'string') return;
      dispatch(setTempPicture(base64));
    }
  };

  const generateBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader: FileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (): void => resolve(fileReader.result);
      fileReader.onerror = (error: ProgressEvent<FileReader>): void =>
        reject(error);
    });
  };

  return (
    <article className={styles.formContainer}>
      <h1 className={styles.heading}>React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <input
          className={styles.formElement}
          type="text"
          placeholder="Name"
          {...register('name')}
        />
        <Error error={errors.name} />
        <input
          className={`${styles.formElement} ${styles.hideArrows}`}
          type="number"
          placeholder="Age"
          {...register('age')}
        />
        <Error error={errors.age} />
        <input
          className={styles.formElement}
          type="email"
          placeholder="Email"
          {...register('email')}
        />
        <Error error={errors.email} />
        <input
          className={styles.formElement}
          type="password"
          placeholder="Password"
          {...register('password')}
        />
        <Error error={errors.password} />
        <input
          className={styles.formElement}
          type="password"
          placeholder="Confirm password"
          {...register('confirm')}
        />
        <Error error={errors.confirm} />
        <select
          className={`${styles.formElement} ${styles.selectMenu}`}
          {...register('gender')}
        >
          <option value="f">Female</option>
          <option value="m">Male</option>
          <option value="o">Other</option>
        </select>
        <Error error={errors.gender} />
        <div className={`${styles.labelledInput} ${styles.reversed}`}>
          <label htmlFor="terms">A Terms and Conditions agreement</label>
          <input
            className={styles.checkbox}
            type="checkbox"
            {...register('terms')}
            id="terms"
          />
        </div>
        <Error error={errors.terms} />
        <div className={styles.labelledInput}>
          <label htmlFor="pic">Picture</label>
          <input
            className={styles.file}
            type="file"
            {...register('picture')}
            id="pic"
            onChange={(e) => handlePicture(e)}
          />
        </div>
        <Error error={errors.picture} />
        <input
          className={styles.formElement}
          type="text"
          value={countryText ? countryText : ''}
          placeholder={`Country, e.g. ${randomCountry}`}
          {...register('country')}
          onChange={filterCountries}
        />
        <Error error={errors.country} />
        <div className={styles.countries}>
          {countryMatches &&
            countryMatches.map((country, id) => {
              return (
                <p
                  className={`${styles.formElement} ${styles.country}`}
                  key={id}
                  onClick={(e) => {
                    if (e.target instanceof HTMLElement && e.target.textContent)
                      setCountry(e.target.textContent);
                  }}
                >
                  {country}
                </p>
              );
            })}
        </div>
        <button type="submit" className={styles.submit}>
          Submit
        </button>
      </form>
    </article>
  );
};

export default ReactHookForm;
