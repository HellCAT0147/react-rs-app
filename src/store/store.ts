import { combineReducers, configureStore } from '@reduxjs/toolkit';
import gifReducer from './reducers/GifSlice';
import { gifAPI } from '../services/GifService';

const rootReducer = combineReducers({
  gifReducer,
  [gifAPI.reducerPath]: gifAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(gifAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const store = setupStore();
