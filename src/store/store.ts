import { combineReducers, configureStore } from '@reduxjs/toolkit';
import gifReducer from './reducers/GifSlice';
import { giphyServer } from './services/GifService';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  gifReducer,
  [giphyServer.reducerPath]: giphyServer.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(giphyServer.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const store = setupStore();
export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });
