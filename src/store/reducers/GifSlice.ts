import { SearchParams } from '@/components/layout/search/search.interface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// TODO: refactor this file - delete comments

interface GifState {
  searchParams: SearchParams;
  // gifError: string;
  // gifsError: string;
  // isLoadingGifs: boolean;
  // isLoadingGif: boolean;
  // isDetailsOpen: boolean;
  // gifsPerPage: number;
  // gif: DetailedGif | null;
  // gifs: IGif[];
  // pages: Pages;
  // currentPage: number | undefined;
}

const initialState: GifState = {
  searchParams: { query: '', limit: '10' },
  // gifError: '',
  // gifsError: '',
  // isLoadingGifs: true,
  // isLoadingGif: true,
  // isDetailsOpen: false,
  // gifsPerPage: Constants.DEFAULT_LIMIT,
  // gif: null,
  // gifs: [],
  // pages: { numbers: [], last: 0 },
  // currentPage: undefined,
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
    // setGifError: (state: GifState, action: PayloadAction<string>): void => {
    //   state.gifError = action.payload;
    // },
    // setGifsError: (state: GifState, action: PayloadAction<string>): void => {
    //   state.gifsError = action.payload;
    // },
    // setGifsLoading: (state: GifState, action: PayloadAction<boolean>): void => {
    //   state.isLoadingGifs = action.payload;
    // },
    // setGifLoading: (state: GifState, action: PayloadAction<boolean>): void => {
    //   state.isLoadingGif = action.payload;
    // },
    // setDetailsMode: (state: GifState, action: PayloadAction<boolean>): void => {
    //   state.isDetailsOpen = action.payload;
    // },
    // setCurrentPage: (state: GifState, action: PayloadAction<number>): void => {
    //   state.currentPage = action.payload;
    // },
    // setGif: (state: GifState, action: PayloadAction<DetailedGif>): void => {
    //   state.gif = action.payload;
    // },
    // setGifs: (state: GifState, action: PayloadAction<IGif[]>): void => {
    //   state.gifs = action.payload;
    // },
    // setPages: (state: GifState, action: PayloadAction<Pages>): void => {
    //   state.pages = action.payload;
    // },
  },
});

export default gifSlice.reducer;
