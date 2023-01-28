import { RootState } from '../store/store';

export const selectCurrentTheme = (s: RootState) => s.theme.currentTheme;
