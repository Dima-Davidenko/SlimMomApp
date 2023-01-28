import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { themeReducer } from '../theme/themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
