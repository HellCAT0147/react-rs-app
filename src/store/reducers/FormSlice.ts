import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { countries } from '../data/countries';
import { hookUserLogo, refUserLogo } from '../data/user-logos';
import { User } from '../../utils/types/interfaces';

interface FormState {
  countries: string[];
  tempPicture: string;
  hookUsers: User[];
  refUsers: User[];
  selectedCountry?: string;
}

const initialState: FormState = {
  countries: countries,
  tempPicture: '',
  hookUsers: [
    {
      age: 46,
      password: 'clam chowder',
      country: 'United States of America (the)',
      email: 'johncena@hotmail.com',
      gender: 'Male',
      name: 'John Cena',
      terms: true,
      picture: hookUserLogo,
    },
  ],
  refUsers: [
    {
      age: 51,
      password: 'The Rock Johnson',
      country: 'United States of America (the)',
      email: 'johnson@xfl.com',
      gender: 'Male',
      name: 'Dwayne Johnson',
      terms: false,
      picture: refUserLogo,
    },
  ],
};

export const formSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setTempPicture: (state: FormState, action: PayloadAction<string>): void => {
      state.tempPicture = action.payload;
    },
    setHookUser: (state: FormState, action: PayloadAction<User>): void => {
      state.hookUsers.push(action.payload);
    },
    setRefUser: (state: FormState, action: PayloadAction<User>): void => {
      state.refUsers.push(action.payload);
    },
    selectCountry: (state: FormState, action: PayloadAction<string>): void => {
      state.selectedCountry = action.payload;
    },
  },
});

export default formSlice.reducer;
