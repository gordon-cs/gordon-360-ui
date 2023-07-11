// import LightbulbIcon from '@mui/icons-material/Lightbulb';
// import ComputerIcon from '@mui/icons-material/Computer';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import GordonDialogBox from 'components/GordonDialogBox';
import { useState } from 'react';
import { Button, Grid, Switch, Typography } from '@mui/material';
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
      <Grid container>
        <Grid xs={8}>
          <Button variant="outlined" color="secondary">
            Use System Setting
          </Button>
        </Grid>
        <Grid xs={12}>
          <Switch
            checked={mode === 'dark'}
            color="secondary"
            sx={{
              '& .MuiSwitch-thumb': {
                borderRadius: '40%',
              },
            }}
          ></Switch>
        </Grid>
      </Grid>
    </GordonDialogBox>
  );
};

export default PaletteSwitcherDialog;
