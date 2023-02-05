import { RootState } from '../store/store';

export const selectIsLoggedIn = (s: RootState) => s.auth.isLoggedIn;

export const selectIsRefreshing = (s: RootState) => s.auth.isRefreshing;

export const selectSid = (s: RootState) => s.auth.sid;

export const selectUser = (s: RootState) => s.auth.user;

export const selectUserId = (s: RootState) => s.auth.user.id;

export const selectAccessToken = (s: RootState) => s.auth.accessToken;
