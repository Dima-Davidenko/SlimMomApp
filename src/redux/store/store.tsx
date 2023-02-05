import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { authReducer } from '../auth/authSlice';
import { dateReducer } from '../date/dateSlice';
import { dietApi } from '../diet/dietApi';
import { themeReducer } from '../theme/themeSlice';
import { rtkQueryErrorLogger } from '../diet/errorLoggingMiddleware';
import { currentDayProductsReducer } from '../currentDayProducts/currentDayProductsSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['sid', 'refreshToken'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: persistedReducer,
  [dietApi.reducerPath]: dietApi.reducer,
  date: dateReducer,
  currentDayProducts: currentDayProductsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(dietApi.middleware)
      .concat(rtkQueryErrorLogger),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
