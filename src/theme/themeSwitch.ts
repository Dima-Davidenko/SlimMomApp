import { ThemeNames } from '../types/themeNames';

export const storageThemeKeyName = 'theme';

export const setHtmlTagClassname = (themeName: ThemeNames) => {
  document.documentElement.className = themeName;
};

export const setTheme = (themeName: ThemeNames) => {
  localStorage.setItem(storageThemeKeyName, themeName);
  setHtmlTagClassname(themeName);
};
