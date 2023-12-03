import { ValidationError } from 'yup';
import { Errors } from '../types/interfaces';

export const bundleErrors = (error: ValidationError): Errors => {
  const errors: Errors = {};
  error.inner.forEach((err) => {
    if (err.path && !(err.path in errors)) {
      switch (err.path) {
        case 'age':
          errors.age = { message: err.message };
          break;
        case 'name':
          errors.name = { message: err.message };
          break;
        case 'email':
          errors.email = { message: err.message };
          break;
        case 'password':
          errors.password = { message: err.message };
          break;
        case 'confirm':
          errors.confirm = { message: err.message };
          break;
        case 'terms':
          errors.terms = { message: err.message };
          break;
        case 'picture':
          errors.picture = { message: err.message };
          break;
        case 'country':
          errors.country = { message: err.message };
          break;
        case 'gender':
          errors.gender = { message: err.message };
          break;
        default:
      }
    }
  });
  return errors;
};
