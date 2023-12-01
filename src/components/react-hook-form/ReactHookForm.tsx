import { useState } from 'react';
import { useAppSelector } from '../../store/hooks/typed-hooks';
import styles from './ReactHookForm.module.sass';
import { useForm } from 'react-hook-form';

const ReactHookForm: React.FC = (): JSX.Element => {
  const { countries } = useAppSelector((state) => state.gifReducer);
  const randomCountry = countries[Math.floor(Math.random() * countries.length)];
  const [countryMatches, setCountryMatches] = useState<string[]>([]);
  const [countryText, setCountryText] = useState<string>();

  const { register } = useForm();

  const filterCountries = (text: string) => {
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

  const setCountry = (country: string) => {
    setCountryText(country);
    setCountryMatches([]);
  };

  return (
    <article className={styles.formContainer}>
      <h1 className={styles.heading}>React Hook Form</h1>
      <form>
        <input
          className={styles.formElement}
          type="text"
          placeholder="Name"
          {...register('name')}
        />
        <input
          className={`${styles.formElement} ${styles.hideArrows}`}
          type="number"
          placeholder="Age"
          {...register('age')}
        />
        <input
          className={styles.formElement}
          type="email"
          placeholder="Email"
          {...register('email')}
        />
        <input
          className={styles.formElement}
          type="password"
          placeholder="Password"
          {...register('password')}
        />
        <input
          className={styles.formElement}
          type="password"
          placeholder="Confirm password"
          {...register('confirm')}
        />
        <select
          className={`${styles.formElement} ${styles.selectMenu}`}
          {...register('gender')}
        >
          <option value="f">Female</option>
          <option value="m">Male</option>
          <option value="o">Other</option>
        </select>
        <div className={`${styles.labelledInput} ${styles.reversed}`}>
          <label htmlFor="terms">A Terms and Conditions agreement</label>
          <input
            className={styles.checkbox}
            type="checkbox"
            {...register('terms')}
            id="terms"
          />
        </div>
        <div className={styles.labelledInput}>
          <label htmlFor="pic">Picture</label>
          <input
            className={styles.file}
            type="file"
            {...register('pic')}
            id="pic"
          />
        </div>
        <input
          className={styles.formElement}
          type="text"
          value={countryText ? countryText : ''}
          placeholder={`Country, e.g. ${randomCountry}`}
          {...register('country')}
          onChange={(e): void => filterCountries(e.target.value)}
        />
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
      </form>
    </article>
  );
};

export default ReactHookForm;
