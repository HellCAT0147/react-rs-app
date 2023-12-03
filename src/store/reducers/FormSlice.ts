import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { countries } from '../data/countries';
import { userLogo } from '../data/user-logo';

interface FormState {
  countries: string[];
  picture: string;
  tempPicture: string;
}

const initialState: FormState = {
  countries: countries,
  picture: userLogo,
  tempPicture: '',
};

export const formSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setTempPicture: (state: FormState, action: PayloadAction<string>): void => {
      state.tempPicture = action.payload;
    },
  },
});

export default formSlice.reducer;
