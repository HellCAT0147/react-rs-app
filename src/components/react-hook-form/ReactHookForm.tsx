import { ChangeEvent, useState } from 'react';
import { useAppSelector } from '../../store/hooks/typed-hooks';
import styles from './ReactHookForm.module.sass';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Error from '../error/Error';
import { schema } from '../../utils/logic/validation';
import { FormData } from '../../utils/interfaces/validation';

const ReactHookForm: React.FC = (): JSX.Element => {
  const { countries } = useAppSelector((state) => state.gifReducer);
  const [randomCountry] = useState<string>(
    countries[Math.floor(Math.random() * countries.length)]
  );
  const [countryMatches, setCountryMatches] = useState<string[]>([]);
  const [countryText, setCountryText] = useState<string>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
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
    setCountryMatches([]);
  };

  const onSubmitHandler = (data: FormData): void => {
    const dataWithCountry = { ...data, country: countryText };
    console.log(dataWithCountry);
    reset();
    setCountryText('');
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
            {...register('pic')}
            id="pic"
          />
        </div>
        <Error error={errors.pic} />
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
