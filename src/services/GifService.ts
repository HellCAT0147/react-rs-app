import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { DataField } from '../utils/types';
import Constants from '../utils/constants';

interface ArgTypes {
  query: string;
  limit: number;
  offset: number;
}

export const gifAPI = createApi({
  reducerPath: 'gifAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.giphy.com' }),
  endpoints: (build) => ({
    fetchAllGifs: build.query<DataField, ArgTypes>({
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
  }),
});
