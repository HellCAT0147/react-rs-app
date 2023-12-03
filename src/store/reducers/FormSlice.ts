import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { countries } from '../data/countries';
import { userLogo } from '../data/user-logo';
import { User } from '../../utils/types/interfaces';

interface FormState {
  countries: string[];
  tempPicture: string;
  user: User;
}

const initialState: FormState = {
  countries: countries,
  tempPicture: '',
  user: {
    age: 46,
    password: 'clam chowder',
    country: 'United States of America (the)',
    email: 'johncena@hotmail.com',
    gender: 'Male',
    name: 'John Cena',
    terms: true,
    picture: userLogo,
  },
};

export const formSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setTempPicture: (state: FormState, action: PayloadAction<string>): void => {
      state.tempPicture = action.payload;
    },
    setUser: (state: FormState, action: PayloadAction<User>): void => {
      state.user = action.payload;
    },
  },
});

export default formSlice.reducer;
