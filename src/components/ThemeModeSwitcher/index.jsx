import { useEffect, useState } from 'react';
import {
  //   Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from '@mui/material/styles';

import { newTheme } from '../../theme';

export const ModeSwitcher = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  console.log('Called mode switcher');
  console.log(newTheme.vars.palette.neutral.main);
  console.log(newTheme.vars);

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
    >
      {mode === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};
