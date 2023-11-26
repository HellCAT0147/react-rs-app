import { DetailedGif } from '@/components/detailed-gif/detailed-gif.interface';
import { DataField } from '@/components/gifs/gifs.interface';
import Constants from '@/utils/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { HYDRATE } from 'next-redux-wrapper';

interface APIGifsArgs {
  query: string;
  limit: string;
  offset: string;
}

interface DetailedGifContainer {
  data: DetailedGif;
}

export const giphyServer = createApi({
  reducerPath: 'giphyServer',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.giphy.com' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
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

export const { fetchAllGifs, fetchOneGif } = giphyServer.endpoints;
export const {
  useFetchAllGifsQuery,
  useFetchOneGifQuery,
  util: { getRunningQueriesThunk },
} = giphyServer;
