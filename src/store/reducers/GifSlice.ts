import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getLastRequest } from '../../utils/local-storage';

interface GifState {
  searchKeyFromStorage: string;
  error: string;
  isLoadingGifs: boolean;
  isLoadingGif: boolean;
  isDetailsOpen: boolean;
}

const initialState: GifState = {
  searchKeyFromStorage: getLastRequest(),
  error: '',
  isLoadingGifs: true,
  isLoadingGif: true,
  isDetailsOpen: false,
};

export const gifSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchKeyForStorage: (
      state: GifState,
      action: PayloadAction<string>
    ): void => {
      state.searchKeyFromStorage = action.payload;
    },
    setError: (state: GifState, action: PayloadAction<string>): void => {
      state.error = action.payload;
    },
    setGifsLoading: (state: GifState, action: PayloadAction<boolean>): void => {
      state.isLoadingGifs = action.payload;
    },
    setGifLoading: (state: GifState, action: PayloadAction<boolean>): void => {
      state.isLoadingGif = action.payload;
    },
    setDetailsMode: (state: GifState, action: PayloadAction<boolean>): void => {
      state.isDetailsOpen = action.payload;
    },
  },
});

export default gifSlice.reducer;
