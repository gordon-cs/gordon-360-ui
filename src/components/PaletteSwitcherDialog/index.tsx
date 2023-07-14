/*
  Logic for saving and updating the site color scheme.
  Contains:
  useWatchUsersColorScheme - method for setting up event listeners to detect changes to user color 
  preferences
  PaletteSwitcherDialog - component with a dialog box to allow users to choose their color
  preferences in the site, and save their preference in localStorage
*/

import GordonDialogBox from 'components/GordonDialogBox';
import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Divider,
} from '@mui/material';
import { storageColorPreferenceKey } from 'theme';
import { useColorScheme } from '@mui/material/styles';

// Watches for system setting changes, and updates the color accordingly
export const useWatchUsersColorScheme = () => {
  const { setMode } = useColorScheme();

  useEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    const onSystemColorSchemeChange = (e: any) => {
      const storedColorScheme = localStorage.getItem(storageColorPreferenceKey) ?? 'system';

      if (storedColorScheme === 'system') {
        setMode(e.matches ? 'dark' : 'light');
      }
    };

    systemPrefersDark.addEventListener('change', onSystemColorSchemeChange);

    return () => {
      systemPrefersDark.removeEventListener('change', onSystemColorSchemeChange);
    };
  }, [setMode]);
};

type Props = {
  handleClose: () => void;
  dialogOpen: boolean;
};

const PaletteSwitcherDialog = ({ dialogOpen, handleClose }: Props) => {
  // defaults to system setting if no user setting is stored
  const [localScheme, setLocalScheme] = useState(
    localStorage.getItem(storageColorPreferenceKey) ?? 'system',
  );
  const { setMode } = useColorScheme();

  useEffect(() => {
    SetModeFromSetting(localScheme);
    /* ensures the color scheme is always correct, previously when the system setting was 
    changed while the page was closed, the page would render still on the old scheme */
  }, []);

  // sets the site color scheme based on the setting string passed to it, defaults to light
  const SetModeFromSetting = (scheme: string) => {
    setMode(
      scheme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : scheme === 'dark'
        ? 'dark'
        : 'light',
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColorMode(event.target.value);
  };

  const setColorMode = (colorMode: string) => {
    localStorage.setItem(storageColorPreferenceKey, colorMode);

    //Save the current mode to the use state to update button text.
    setLocalScheme(colorMode);
    SetModeFromSetting(colorMode);
  };

  return (
    <GordonDialogBox
      open={dialogOpen}
      title="Appearance Settings"
      buttonClicked={handleClose}
      buttonName="Close"
    >
      <FormControl>
        <FormLabel id="palette-mode-group-label">Color Mode</FormLabel>
        <RadioGroup
          name="palette-mode-group"
          aria-labelledby="palette-mode-group-label"
          row={true}
          value={localScheme}
          onChange={handleChange}
        >
          <FormControlLabel
            value="system"
            control={<Radio color="secondary" />}
            label="System Setting"
          />
          <FormControlLabel
            value="light"
            control={<Radio color="secondary" />}
            label="Light Mode"
          />
          <FormControlLabel value="dark" control={<Radio color="secondary" />} label="Dark Mode" />
        </RadioGroup>
      </FormControl>
      <Divider />
    </GordonDialogBox>
  );
};

export default PaletteSwitcherDialog;
