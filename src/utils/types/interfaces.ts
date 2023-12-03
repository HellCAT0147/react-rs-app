export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirm: string;
  gender: 'f' | 'm' | 'o';
  terms: boolean;
  picture: object;
  country?: string;
}
