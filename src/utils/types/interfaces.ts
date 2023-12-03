export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirm: string;
  gender: string;
  terms: boolean;
  picture: object;
  country: string;
}

export interface User {
  age: number;
  password: string;
  country: string;
  email: string;
  gender: string;
  name: string;
  terms: boolean;
  picture: string;
}

export interface Errors {
  name?: { message: string };
  age?: { message: string };
  email?: { message: string };
  password?: { message: string };
  confirm?: { message: string };
  terms?: { message: string };
  picture?: { message: string };
  country?: { message: string };
  gender?: { message: string };
}

export interface Ref {
  current: { value: string };
}
