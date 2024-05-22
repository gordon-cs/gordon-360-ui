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
import { ColorMode, ColorSetting, STORAGE_COLOR_PREFERENCE_KEY } from 'theme';
import { useColorScheme } from '@mui/material/styles';

const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

type Props = {
  handleClose: () => void;
  dialogOpen: boolean;
};

// sets the site color scheme based on the setting string passed to it, defaults to light
const getModeFromSetting = (scheme: ColorSetting) => {
  if (scheme === ColorSetting.System) {
    return systemPrefersDark.matches ? ColorMode.Dark : ColorMode.Light;
  } else {
    return scheme;
  }
};

const PaletteSwitcherDialog = ({ dialogOpen, handleClose }: Props) => {
  // defaults to system setting if no user setting is stored
  const [localScheme, setLocalScheme] = useState<ColorSetting>(
    (localStorage.getItem(STORAGE_COLOR_PREFERENCE_KEY) as ColorSetting) ?? ColorSetting.System,
  );
  const { setMode } = useColorScheme();

  useEffect(() => {
    setMode(getModeFromSetting(localScheme));
    /* ensures the color scheme is correct when the component first mounts.
    without this when the system setting was changed while the page was closed, the page would 
    render still on the old scheme */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMode]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const colorMode = event.target.value as ColorSetting;

    localStorage.setItem(STORAGE_COLOR_PREFERENCE_KEY, colorMode);

    //Save the current mode to the use state to update button text.
    setLocalScheme(colorMode);
    setMode(getModeFromSetting(colorMode));
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
          row
          name="palette-mode-group"
          aria-labelledby="palette-mode-group-label"
          value={localScheme}
          onChange={handleChange}
        >
          <FormControlLabel
            value={ColorSetting.System}
            control={<Radio color="secondary" />}
            label="System Setting"
          />
          <FormControlLabel
            value={ColorSetting.Light}
            control={<Radio color="secondary" />}
            label="Light Mode"
          />
          <FormControlLabel
            value={ColorSetting.Dark}
            control={<Radio color="secondary" />}
            label="Dark Mode"
          />
          {/* <FormControlLabel
            value={ColorSetting.Custom}
            control={<Radio color="primary" />}
            label="Custom Mode"
          /> */}
        </RadioGroup>
      </FormControl>
      <Divider />
    </GordonDialogBox>
  );
};

export default PaletteSwitcherDialog;
