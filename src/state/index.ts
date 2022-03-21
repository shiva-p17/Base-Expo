import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import { persistReducer, persistStore } from 'redux-persist';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';
import logger from 'redux-logger';

const SHOW_LOGS = false;

const persistConfig = {
  key: 'gt-customer',
  storage: ExpoFileSystemStorage,
  blacklist: ['products'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
];

if (process.env.NODE_ENV !== 'production' && SHOW_LOGS) {
  middleware.push(logger);
}

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

const storeState = persistStore(store);

export { store, storeState };

export async function loadState() {
  // Do something after state loads
}
