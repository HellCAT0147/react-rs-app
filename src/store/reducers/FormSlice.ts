import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { countries } from '../data/countries';
import { hookUserLogo, refUserLogo } from '../data/user-logos';
import { User } from '../../utils/types/interfaces';

interface FormState {
  countries: string[];
  tempPicture: string;
  hookUser: User;
  refUser: User;
}

const initialState: FormState = {
  countries: countries,
  tempPicture: '',
  hookUser: {
    age: 46,
    password: 'clam chowder',
    country: 'United States of America (the)',
    email: 'johncena@hotmail.com',
    gender: 'Male',
    name: 'John Cena',
    terms: true,
    picture: hookUserLogo,
  },
  refUser: {
    age: 51,
    password: 'The Rock Johnson',
    country: 'United States of America (the)',
    email: 'johnson@xfl.com',
    gender: 'Male',
    name: 'Dwayne Johnson',
    terms: false,
    picture: refUserLogo,
  },
};

export const formSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setTempPicture: (state: FormState, action: PayloadAction<string>): void => {
      state.tempPicture = action.payload;
    },
    setHookUser: (state: FormState, action: PayloadAction<User>): void => {
      state.hookUser = action.payload;
    },
    setRefUser: (state: FormState, action: PayloadAction<User>): void => {
      state.refUser = action.payload;
    },
  },
});

export default formSlice.reducer;
