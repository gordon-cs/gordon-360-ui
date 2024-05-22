import { useEffect } from 'react';
import { STORAGE_COLOR_PREFERENCE_KEY } from 'theme';
import { useColorScheme } from '@mui/material/styles';
import { ColorSetting, ColorMode } from 'theme';

const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Watches for system setting changes, and updates the color accordingly
const useWatchSystemColorScheme = () => {
  const { setMode } = useColorScheme();

  useEffect(() => {
    const onSystemColorSchemeChange = (e: MediaQueryListEvent) => {
      const storedColorScheme =
        localStorage.getItem(STORAGE_COLOR_PREFERENCE_KEY) ?? ColorSetting.System;
      if (storedColorScheme === ColorSetting.System) {
        setMode(e.matches ? ColorMode.Dark : ColorMode.Light);
      }
    };

    systemPrefersDark.addEventListener('change', onSystemColorSchemeChange);

    return () => {
      systemPrefersDark.removeEventListener('change', onSystemColorSchemeChange);
    };
  }, [setMode]);
};

export default useWatchSystemColorScheme;
