/* Temporary component for testing theme implementation and dark mode.  Used in the right side
nav menu currently.*/

import { useEffect, useState } from 'react';
import { useColorScheme } from '@mui/material/styles';
import styles from './modeSwitcher.module.css';

export const ModeSwitcher = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

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
