import { createSlice } from '@reduxjs/toolkit';
import { countries } from '../data/countries';

interface FormState {
  countries: string[];
}

const initialState: FormState = {
  countries: countries,
};

export const formSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // setSearchKey: (state: FormState, action: PayloadAction<string>): void => {},
  },
});

export default formSlice.reducer;
