/* Temporary component for testing theme implementation and dark mode.  Used in the right side
nav menu currently.

@TODO convert to some final implementation
*/
import { useEffect, useState } from 'react';
import {
  //   Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from '@mui/material/styles';
import styles from './modeSwitcher.module.css';

export const ModeSwitcher = () => {
  const { mode, setMode } = useColorScheme();

  return (
    <button
      variant="outlined"
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      className={styles.ModeSwitcherButton}
    >
      {mode === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};
