import { Gender } from './types';

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirm: string;
  gender: Gender;
  terms: boolean;
  picture: object;
  country?: string;
}

export interface User {
  age: number;
  password: string;
  country: string;
  email: string;
  gender: Gender;
  name: string;
  terms: boolean;
  picture: string;
}
