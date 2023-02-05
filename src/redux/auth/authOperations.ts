import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import {
  IFullCredentials,
  ILoginRes,
  IRefreshRes,
  IRegistrationRes,
  IShortCredentials,
  IUserInfoRes,
} from '../../types/dietApiTypes';
import { dietApi } from '../diet/dietApi';
import { RootState } from '../store/store';
import { t } from 'i18next';
axios.defaults.baseURL = 'https://slimmom-backend.goit.global';

const setAuthHeader = (token: string) => {
  if (!token) return;
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: IFullCredentials, thunkAPI) => {
    const { email, password } = credentials;
    try {
      await axios.post<IRegistrationRes>('/auth/register', credentials);
      const shortCredentials: IShortCredentials = { email, password };
      const { data } = await axios.post<ILoginRes>('/auth/login', shortCredentials);
      setAuthHeader(data.accessToken);
      return data;
    } catch (error) {
      const e = error as AxiosError;
      toast.error(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials: IShortCredentials, thunkAPI) => {
    try {
      const { data } = await axios.post<ILoginRes>('/auth/login', credentials);
      setAuthHeader(data.accessToken);
      toast.success(`${t('notify.auth.greet') ?? 'Nice to see you again'}, ${data.user.username}!`);
      return data;
    } catch (error) {
      const e = error as AxiosError;
      toast.error(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/auth/logout');
    clearAuthHeader();
    const dispatch = thunkAPI.dispatch;
    dispatch(dietApi.util.resetApiState());
  } catch (error) {
    const e = error as AxiosError;
    toast.error(
      `${t('notify.auth.wentWrong') ?? 'Something went wrong'}. ${e.message}. ${
        t('notify.auth.tryAgain') ?? 'Please try again'
      }.`
    );
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const refreshUser = createAsyncThunk('auth/refresh', async (oldSid: string, thunkAPI) => {
  const toastId = toast.loading(t('notify.auth.check') ?? `Check user's data`);
  const state = thunkAPI.getState() as RootState;
  const refreshToken = state.auth.refreshToken;
  setAuthHeader(refreshToken);
  try {
    const {
      data: { newAccessToken, newRefreshToken: refreshToken, sid },
    } = await axios.post<IRefreshRes>('/auth/refresh', { sid: oldSid });
    setAuthHeader(newAccessToken);
    const { data } = await axios.get<IUserInfoRes>('/user');

    toast.update(toastId, {
      render: `${t('notify.auth.welcome') ?? 'Welcome'} ${data.username}!`,
      type: 'success',
      isLoading: false,
      autoClose: 3000,
    });

    return { user: data, sid, refreshToken, accessToken: newAccessToken };
  } catch (error) {
    const e = error as AxiosError;
    toast.update(toastId, {
      render: `${t('notify.auth.error') ?? 'An error occurred'} ${e.message}!`,
      type: 'error',
      isLoading: false,
      autoClose: 3000,
    });
    toast.error(
      `${t('notify.auth.wentWrong') ?? 'Something went wrong'}. ${e.message}. ${
        t('notify.auth.tryAgain') ?? 'Please try again'
      }.`
    );
    return thunkAPI.rejectWithValue(e.message);
  }
});
