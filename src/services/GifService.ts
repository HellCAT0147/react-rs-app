import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { DataField, DetailedGif } from '../utils/types';
import Constants from '../utils/constants';

interface APIGifsArgs {
  query: string;
  limit: number;
  offset: number;
}

interface DetailedGifContainer {
  data: DetailedGif;
}

export const gifAPI = createApi({
  reducerPath: 'gifAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.giphy.com' }),
  endpoints: (build) => ({
    fetchAllGifs: build.query<DataField, APIGifsArgs>({
      query: ({ query, limit, offset }) => ({
        url: query ? '/v1/gifs/search' : '/v1/gifs/trending',
        params: {
          q: query,
          api_key: Constants.GIPHY_API_KEY,
          limit,
          offset,
        },
      }),
    }),
    fetchOneGif: build.query<DetailedGifContainer, string>({
      query: (gif_id) => ({
        url: `/v1/gifs/${gif_id}`,
        params: {
          api_key: Constants.GIPHY_API_KEY,
          gif_id,
        },
      }),
    }),
  }),
});
