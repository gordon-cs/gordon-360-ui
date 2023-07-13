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
import { useColorScheme } from '@mui/material/styles';

const useWatchUsersColorScheme = () => {
  const { setMode } = useColorScheme();

  console.log('in hook');

  useEffect(() => {
    console.log('in useEffect');
    const prefersDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const onSystemColorSchemeChange = (e: any) => {
      console.log('System color scheme changed');
      const colorSchemeSource = localStorage.getItem('colorMode') ?? 'system';
      console.log('Stored color scheme ' + colorSchemeSource);

      if (colorSchemeSource === 'system') {
        console.log('Color scheme system, ');
        setMode(e.matches ? 'dark' : 'light');
      }
    };

    console.log('adding event listener');
    prefersDarkQuery.addEventListener('change', onSystemColorSchemeChange);

    return () => {
      console.log('removing event listener');
      prefersDarkQuery.removeEventListener('change', onSystemColorSchemeChange);
    };
  }, [setMode]);
};

type Props = {
  handleClose: () => void;
  dialogOpen: boolean;
};

const PaletteSwitcherDialog = ({ dialogOpen, handleClose }: Props) => {
  console.log('in palette switcher dialog');
  useWatchUsersColorScheme();
  const [scheme, setScheme] = useState(localStorage.getItem('colorMode') ?? 'system');
  const { setMode } = useColorScheme();

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

  SetModeFromSetting(scheme); // This line ensures the color scheme is always correct,
  // Previously when the system scheme was changed while the page was closed, the page would load
  // still on the old scheme

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColorMode(event.target.value);
  };

  const setColorMode = (colorMode: string) => {
    localStorage.setItem('colorMode', colorMode);

    // The storage event listener wouldn't trigger without this line, but I wonder if there is a
    // better way to do this...
    // dispatchEvent(new Event('storage'));

    //Save the current mode to the use state to update button text.
    setScheme(colorMode);
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
          value={scheme}
          onChange={handleChange}
        >
          <FormControlLabel value="system" control={<Radio />} label="System Setting" />
          <FormControlLabel value="light" control={<Radio />} label="Light Mode" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark Mode" />
        </RadioGroup>
      </FormControl>
      <Divider />
    </GordonDialogBox>
  );
};

export default PaletteSwitcherDialog;
