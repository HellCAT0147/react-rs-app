import * as yup from 'yup';
import { FormData } from '../interfaces/validation';

export const schema: yup.ObjectSchema<FormData> = yup.object().shape({
  name: yup
    .string()
    .matches(/^[\p{Lu}\p{Lt}].*$/u, 'name must be capitalized')
    .required(),

  age: yup
    .number()
    .typeError('age must be a number')
    .min(0, 'age must not be negative')
    .required(),

  email: yup.string().email().required(),

  password: yup
    .string()
    .test('password-complexity', 'фыв', function (value: string = ''):
      | true
      | yup.ValidationError {
      const lowercaseRegex = /[a-z]/;
      const uppercaseRegex = /[A-Z]/;
      const numberRegex = /[0-9]/;
      const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]/;

      const errors = [];

      if (!lowercaseRegex.test(value))
        errors.push('one lowercase letter in latin');
      if (!uppercaseRegex.test(value))
        errors.push('one capital letter in latin');
      if (!numberRegex.test(value)) errors.push('one digit');
      if (!symbolRegex.test(value)) errors.push('one special character');

      if (errors.length > 0) {
        return this.createError({
          message: `password complexity - ${
            4 - errors.length
          }/4: password must contain at least ${errors.join(', ')}`,
        });
      }
      return true;
    })
    .required(),

  confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'passwords must match')
    .required('confirm password'),

  gender: yup.string().oneOf(['f', 'm', 'o']).required(),

  terms: yup.boolean().isTrue('you should agree our awesome terms').required(),

  pic: yup.string().required(),

  country: yup.string().required(),
});
