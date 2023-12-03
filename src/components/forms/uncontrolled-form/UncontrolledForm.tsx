import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../store/hooks/typed-hooks';
import styles from '../Form.module.sass';
import { schema } from '../../../utils/logic/validation';
import { Errors, FormData } from '../../../utils/types/interfaces';
import { formSlice } from '../../../store/reducers/FormSlice';
import { genders } from '../../../utils/types/types';
import { useNavigate } from 'react-router-dom';
import {
  isGender,
  isRef,
  isValidationError,
} from '../../../utils/types/type-guards';
import { bundleErrors } from '../../../utils/logic/errors';
import Error from '../../error/Error';

const UncontrolledForm: React.FC = (): JSX.Element => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { countries, tempPicture } = useAppSelector(
    (state) => state.gifReducer
  );
  const { setTempPicture, setUser } = formSlice.actions;
  const dispatch = useAppDispatch();
  const [randomCountry] = useState<string>(
    countries[Math.floor(Math.random() * countries.length)]
  ); // TODO: move to useMemo
  const [countryMatches, setCountryMatches] = useState<string[]>([]);
  const [countryText, setCountryText] = useState<string>();
  const [errors, setErrors] = useState<Errors>({});

  const filterCountries = (e: ChangeEvent<HTMLInputElement>): void => {
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
    dispatch(
      setUser({
        age: data.age,
        password: data.password,
        country: data.country || '',
        email: data.email,
        gender: data.gender,
        name: data.name,
        terms: data.terms,
        picture: tempPicture,
      })
    );
    navigate('/');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const data: FormData = {
      name: isRef(nameRef) ? nameRef.current.value : '',
      age: isRef(ageRef) && ageRef.current.value ? +ageRef.current.value : -1,
      email: isRef(emailRef) ? emailRef.current.value : '',
      password: isRef(passwordRef) ? passwordRef.current.value : '',
      confirm: isRef(confirmRef) ? confirmRef.current.value : '',
      gender:
        isRef(genderRef) && isGender(genderRef.current.value)
          ? genderRef.current.value
          : '',
      terms: isRef(termsRef) ? termsRef.current.checked : false,
      picture:
        isRef(pictureRef) && pictureRef.current.files
          ? pictureRef.current.files
          : {},
      country: isRef(countryRef) ? countryRef.current.value : '',
    };
    try {
      await schema.validate(data, { abortEarly: false });
      onSubmitHandler(data);
    } catch (error) {
      if (isValidationError(error)) setErrors(bundleErrors(error));
    }
  };

  const handlePicture = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
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
      <h1 className={styles.heading}>Uncontrolled Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.formElement}
          type="text"
          placeholder="Name"
          name="name"
          ref={nameRef}
        />
        <Error error={errors.name} />
        <input
          className={`${styles.formElement} ${styles.hideArrows}`}
          type="number"
          placeholder="Age"
          name="age"
          ref={ageRef}
        />
        <Error error={errors.age} />
        <input
          className={styles.formElement}
          type="text"
          placeholder="Email"
          name="email"
          ref={emailRef}
        />
        <Error error={errors.email} />
        <input
          className={styles.formElement}
          type="password"
          placeholder="Password"
          name="password"
          ref={passwordRef}
        />
        <Error error={errors.password} />
        <input
          className={styles.formElement}
          type="password"
          placeholder="Confirm password"
          name="confirm"
          ref={confirmRef}
        />
        <Error error={errors.confirm} />
        <select
          className={`${styles.formElement} ${styles.selectMenu}`}
          name="gender"
          ref={genderRef}
        >
          {genders.map((gender, id) => {
            return (
              <option value={gender} key={id}>
                {gender}
              </option>
            );
          })}
        </select>
        <Error error={errors.gender} />
        <div className={`${styles.labelledInput} ${styles.reversed}`}>
          <label htmlFor="terms">A Terms and Conditions agreement</label>
          <input
            className={styles.checkbox}
            type="checkbox"
            name="terms"
            ref={termsRef}
            id="terms"
          />
        </div>
        <Error error={errors.terms} />
        <div className={styles.labelledInput}>
          <label htmlFor="pic">Picture</label>
          <input
            className={styles.file}
            type="file"
            name="picture"
            ref={pictureRef}
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
          name="country"
          ref={countryRef}
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

export default UncontrolledForm;
