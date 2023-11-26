import { SearchParams } from '@/components/layout/search/search.interface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface GifState {
  searchParams: SearchParams;
  isError: boolean;
}

const initialState: GifState = {
  searchParams: { query: '', limit: '10' },
  isError: false,
};

export const gifSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchKey: (state: GifState, action: PayloadAction<string>): void => {
      state.searchParams.query = action.payload;
    },
    setGifsPerPage: (state: GifState, action: PayloadAction<string>): void => {
      state.searchParams.limit = action.payload;
    },
    setIsError: (state: GifState): void => {
      state.isError = true;
    },
    setGifId: (state: GifState, action: PayloadAction<string>): void => {
      state.searchParams.gif = action.payload;
    },
  },
});

export default gifSlice.reducer;
