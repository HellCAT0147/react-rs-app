import * as yup from 'yup';
import { FormData } from '../types/interfaces';
import { genders } from '../types/types';
import { isFile } from '../types/type-guards';

export const schema: yup.ObjectSchema<FormData> = yup.object().shape({
  name: yup
    .string()
    .required()
    .matches(/^[\p{Lu}\p{Lt}].*$/u, 'name must be capitalized'),

  age: yup
    .number()
    .required()
    .typeError('age must be a number')
    .min(0, 'age must not be negative'),

  email: yup.string().email().required(),

  password: yup
    .string()
    .required()
    .test('password-complexity', function (value: string = ''):
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
    }),

  confirm: yup
    .string()
    .required('confirm password')
    .oneOf([yup.ref('password')], 'passwords must match'),

  gender: yup.string().oneOf(genders).required(),

  terms: yup.boolean().isTrue('you should agree our awesome terms').required(),

  picture: yup
    .mixed()
    .required()
    .test(
      'file-size',
      'attach an image with a size smaller than 1MB',
      (value) => {
        if (isFile(value)) return value && value[0].size <= 1000000;
      }
    )
    .test('file-type', 'png, jpeg or jpg are allowed', (value) => {
      if (isFile(value))
        return value[0].type === 'image/jpeg' || value[0].type === 'image/png';
    }),

  country: yup.string().required(),
});
