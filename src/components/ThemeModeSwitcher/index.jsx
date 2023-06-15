/* Temporary component for testing theme implementation and dark mode.  Used in the right side
nav menu currently.

@TODO convert to 
*/
import { useEffect, useState } from 'react';
import {
  //   Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from '@mui/material/styles';
import styles from './modeSwitcher.module.css';

export const ModeSwitcher = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  //Need to figure out how to properly reference the theme provided by the CssVarsProvider context.
  console.log('Called mode switcher');

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      className={styles.ModeSwitcherButton}
    >
      {mode === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};
