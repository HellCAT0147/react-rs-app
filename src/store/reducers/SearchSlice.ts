import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getLastRequest } from '../../utils/local-storage';

interface SearchState {
  searchKeyFromStorage: string;
}

const initialState: SearchState = {
  searchKeyFromStorage: getLastRequest(),
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchKeyForStorage: (state, action: PayloadAction<string>) => {
      state.searchKeyFromStorage = action.payload;
    },
  },
});

export default searchSlice.reducer;
