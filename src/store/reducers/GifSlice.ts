import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getLastRequest } from '../../utils/local-storage';
import { DetailedGif, IGif, Pages } from '../../utils/types';

interface GifState {
  searchKey: string;
  gifError: string;
  gifsError: string;
  isLoadingGifs: boolean;
  isLoadingGif: boolean;
  isDetailsOpen: boolean;
  gifsPerPage: number;
  gif: DetailedGif | null;
  gifs: IGif[];
  pages: Pages;
  currentPage: number | undefined;
}

const initialState: GifState = {
  searchKey: getLastRequest(),
  gifError: '',
  gifsError: '',
  isLoadingGifs: true,
  isLoadingGif: true,
  isDetailsOpen: false,
  gifsPerPage: 10,
  gif: null,
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
    setGifError: (state: GifState, action: PayloadAction<string>): void => {
      state.gifError = action.payload;
    },
    setGifsError: (state: GifState, action: PayloadAction<string>): void => {
      state.gifsError = action.payload;
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
      state.currentPage = action.payload;
    },
    setGif: (state: GifState, action: PayloadAction<DetailedGif>): void => {
      state.gif = action.payload;
    },
    setGifs: (state: GifState, action: PayloadAction<IGif[]>): void => {
      state.gifs = action.payload;
    },
    setPages: (state: GifState, action: PayloadAction<Pages>): void => {
      state.pages = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   // [fetchGifs.pending.type]: (state: GifState): void => {
  //   //   state.isLoadingGifs = true;
  //   // },
  //   // [fetchGifs.fulfilled.type]: (
  //   //   state: GifState,
  //   //   action: PayloadAction<DataField>
  //   // ): void => {
  //   //   state.isLoadingGifs = false;
  //   //   state.error = '';
  //   //   state.gifs = action.payload.data;
  //   //   const totalNumberOfPages: number = action.payload.pagination.total_count;
  //   //   const maxAPIOffset = 5000;
  //   //   state.pages = getPages(
  //   //     Math.ceil(
  //   //       (totalNumberOfPages > maxAPIOffset
  //   //         ? maxAPIOffset
  //   //         : totalNumberOfPages) / state.gifsPerPage
  //   //     ),
  //   //     state.currentPage || 1
  //   //   );
  //   // },
  //   // [fetchGifs.rejected.type]: (
  //   //   state: GifState,
  //   //   action: PayloadAction<string>
  //   // ): void => {
  //   //   state.isLoadingGifs = false;
  //   //   state.error = action.payload;
  //   // },
  //   // builder
  //   //   .addCase(fetchGifs.pending.type, (state: GifState) => {
  //   //     state.isLoadingGifs = true;
  //   //   })
  //   //   .addCase(
  //   //     fetchGifs.fulfilled.type,
  //   //     (state: GifState, action: PayloadAction<DataField>) => {
  //   //       state.isLoadingGifs = false;
  //   //       state.error = '';
  //   //       state.gifs = action.payload.data;
  //   //       const totalNumberOfPages: number =
  //   //         action.payload.pagination.total_count;
  //   //       const maxAPIOffset = 5000;
  //   //       state.pages = getPages(
  //   //         Math.ceil(
  //   //           (totalNumberOfPages > maxAPIOffset
  //   //             ? maxAPIOffset
  //   //             : totalNumberOfPages) / state.gifsPerPage
  //   //         ),
  //   //         state.currentPage || 1
  //   //       );
  //   //     }
  //   //   )
  //   //   .addCase(
  //   //     fetchGifs.rejected.type,
  //   //     (state: GifState, action: PayloadAction<string>) => {
  //   //       state.isLoadingGifs = false;
  //   //       state.error = action.payload;
  //   //     }
  //   //   );
  // },
});

export default gifSlice.reducer;
