/**
 * Preferences
 *
 * @description todo
 *
 * @module todo
 */

import React, { createContext } from 'react';
import theme, { darkTheme } from './../theme';

export const themeContext = createContext();

export const themes = {
  light: theme,
  dark: darkTheme,
};

export let preferredTheme = themes.dark;

export const setPreferredTheme = (themeSelection) => {
  localStorage.setItem('preferredTheme', themeSelection);
  console.log('Theme changed to ', themeSelection);
  // preferredTheme = themeSelection;
};
