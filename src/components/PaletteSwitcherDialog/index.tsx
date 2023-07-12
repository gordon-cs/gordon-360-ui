// import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ComputerIcon from '@mui/icons-material/Computer';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import GordonDialogBox from 'components/GordonDialogBox';
import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Divider,
} from '@mui/material';
import styles from './PaletteSwitcherDialog.module.css';

/* Button to choose which color setting the user wantes
choose between the system setting, light mode, and dark mode.
*/

// export const ModeSwitcher = () => {
//   //Mode defaults to system if localstorage hasn't been set, or the value is system
//   const [mode, setMode] = useState(localStorage.getItem('colorMode') ?? 'system');

//   const setColorMode = (colorMode) => {
//     localStorage.setItem('colorMode', colorMode);

//     // The storage event listener wouldn't trigger without this line, but I wonder if there is a
//     // better way to do this...
//     dispatchEvent(new Event('storage'));

//     //Save the current mode to the use state to update button text.
//     setMode(colorMode);
//   };

//   return (
//     <>
//       <button
//         onClick={() => {
//           setColorMode(mode === 'system' ? 'light' : mode === 'light' ? 'dark' : 'system');
//         }}
//         className={styles.ModeSwitcherButton}
//       >
//         {mode === 'system'
//           ? 'Switch to Light Mode'
//           : mode === 'light'
//           ? 'Switch to Dark Mode'
//           : 'Use System Setting'}
//       </button>
//       {/* {mode === 'dark' ? <ComputerIcon /> : <LightbulbIcon />} */}
//     </>
//   );
// };

type Props = {
  handleClose: () => void;
  dialogOpen: boolean;
};

const PaletteSwitcherDialog = ({ dialogOpen, handleClose }: Props) => {
  const [mode, setMode] = useState(localStorage.getItem('colorMode') ?? 'system');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColorMode(event.target.value);
  };

  const setColorMode = (colorMode: string) => {
    localStorage.setItem('colorMode', colorMode);

    // The storage event listener wouldn't trigger without this line, but I wonder if there is a
    // better way to do this...
    dispatchEvent(new Event('storage'));

    //Save the current mode to the use state to update button text.
    setMode(colorMode);
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
          value={mode}
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
