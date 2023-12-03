import { ValidationError } from 'yup';
import { Ref } from './interfaces';
import { Gender } from './types';

export const isRef = (obj: unknown): obj is Ref => {
  if (
    typeof obj === 'object' &&
    obj &&
    'current' in obj &&
    typeof obj.current === 'object' &&
    obj.current &&
    'value' in obj.current &&
    typeof obj.current.value === 'string'
  )
    return true;
  return false;
};

export const isGender = (string: string): string is Gender => {
  const genders: string[] = ['Female', 'Male', 'Other'];
  if (genders.includes(string)) return true;
  return false;
};

export const isValidationError = (error: unknown): error is ValidationError => {
  if (typeof error === 'object' && error && 'inner' in error) return true;
  return false;
};

export const isFile = (obj: unknown): obj is FileList => {
  if (
    typeof obj === 'object' &&
    obj &&
    '0' in obj &&
    typeof obj[0] === 'object' &&
    obj[0] &&
    'size' in obj[0] &&
    typeof obj[0].size === 'number' &&
    'type' in obj[0] &&
    typeof obj[0].type === 'string'
  )
    return true;
  return false;
};
