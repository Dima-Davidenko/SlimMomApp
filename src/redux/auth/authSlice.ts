import { createSlice } from '@reduxjs/toolkit';
import { IUserInfo } from '../../types/dietApiTypes';
import { logIn, logOut, refreshUser, register } from './authOperations';

const initialState = {
  user: {
    username: '',
    email: '',
    id: '',
  },
  refreshToken: '',
  accessToken: '',
  sid: '',
  isLoggedIn: false,
  isRefreshing: false,
  error: '',
};

const handleUserLogin = (
  state: typeof initialState,
  sid: string,
  refreshToken: string,
  user: IUserInfo,
  accessToken: string
) => {
  state.error = '';
  state.isRefreshing = false;
  state.isLoggedIn = true;
  state.sid = sid;
  state.refreshToken = refreshToken;
  state.accessToken = accessToken;
  state.user.username = user.username;
  state.user.email = user.email;
  state.user.id = user.id;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        register.fulfilled,
        (state, { payload: { sid, refreshToken, user, accessToken } }) => {
          handleUserLogin(state, sid, refreshToken, user, accessToken);
        }
      )
      .addCase(logIn.fulfilled, (state, { payload: { sid, refreshToken, user, accessToken } }) => {
        handleUserLogin(state, sid, refreshToken, user, accessToken);
      })
      .addCase(
        refreshUser.fulfilled,
        (state, { payload: { sid, refreshToken, user, accessToken } }) => {
          handleUserLogin(state, sid, refreshToken, user, accessToken);
        }
      )
      .addCase(logOut.fulfilled, () => {
        return initialState;
      })
      .addCase(register.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(logIn.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(logOut.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.isRefreshing = false;
      })
      .addCase(logIn.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.isRefreshing = false;
      })
      .addCase(logOut.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.isRefreshing = false;
      });
  },
});
export const authReducer = authSlice.reducer;
