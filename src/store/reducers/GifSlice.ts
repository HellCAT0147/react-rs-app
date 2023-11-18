import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getLastRequest } from '../../utils/local-storage';
import { DataField, IGif, Pages } from '../../utils/types';
import getPages from '../../utils/pagination';

interface GifState {
  searchKey: string;
  error: string;
  isLoadingGifs: boolean;
  isLoadingGif: boolean;
  isDetailsOpen: boolean;
  gifsPerPage: number;
  gifs: IGif[];
  pages: Pages;
  currentPage: number | undefined;
}

const initialState: GifState = {
  searchKey: getLastRequest(),
  error: '',
  isLoadingGifs: true,
  isLoadingGif: true,
  isDetailsOpen: false,
  gifsPerPage: 10,
  gifs: [],
  pages: { numbers: [], last: 0 },
  currentPage: undefined,
};

export const gifSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchKey: (state: GifState, action: PayloadAction<string>): void => {
      state.searchKey = action.payload;
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
    setGifsPerPage: (state: GifState, action: PayloadAction<number>): void => {
      state.currentPage = 1;
      state.gifsPerPage = action.payload;
    },
    setCurrentPage: (state: GifState, action: PayloadAction<number>): void => {
      console.log('ну вроде задаю: ', action.payload);

      state.currentPage = action.payload;
      console.log(state.currentPage);
    },

    usersFetching: (state: GifState): void => {
      state.isLoadingGifs = true;
    },
    usersFetchingSuccess: (
      state: GifState,
      action: PayloadAction<DataField>
    ): void => {
      state.isLoadingGifs = false;
      state.error = '';
      state.gifs = action.payload.data;

      const totalNumberOfPages: number = action.payload.pagination.total_count;
      const maxAPIOffset = 5000;
      state.pages = getPages(
        Math.ceil(
          (totalNumberOfPages > maxAPIOffset
            ? maxAPIOffset
            : totalNumberOfPages) / state.gifsPerPage
        ),
        state.currentPage || 1
      );
    },
    usersFetchingError: (
      state: GifState,
      action: PayloadAction<string>
    ): void => {
      state.isLoadingGifs = false;
      state.error = action.payload;
    },
  },
});

export default gifSlice.reducer;
