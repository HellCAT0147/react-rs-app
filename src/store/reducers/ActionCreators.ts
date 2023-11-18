import axios, { AxiosResponse } from 'axios';
import { AppDispatch } from '../store';
import { DataField } from '../../utils/types';
import { gifSlice } from './GifSlice';
import { isError } from '../../utils/type-guards';

export const fetchGifs =
  (query: string, page: number | undefined, limit: number) =>
  async (dispatch: AppDispatch): Promise<void> => {
    if (page === undefined) return;
    const offset: number = (page - 1) * limit;
    try {
      dispatch(gifSlice.actions.usersFetching());
      const response: AxiosResponse = await axios<DataField>({
        url: query
          ? 'https://api.giphy.com/v1/gifs/search'
          : 'https://api.giphy.com/v1/gifs/trending',
        params: {
          api_key: 'wc4t6jVyKwNgIYR7NvQq0RB70uN94Dl1',
          q: query,
          limit,
          offset,
        },
      });
      dispatch(gifSlice.actions.usersFetchingSuccess(response.data));
    } catch (error) {
      if (isError(error))
        dispatch(gifSlice.actions.usersFetchingError(error.message));
    }
  };
