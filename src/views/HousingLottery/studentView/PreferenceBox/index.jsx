import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  Typography,
  FormControl,
  FormControlLabel,
  Input,
  Button,
  RadioGroup,
  Card,
  CardContent,
  CardHeader,
  Radio,
  Grid,
} from '@mui/material';
import housing from '../../../../services/housing';
import styles from './preferenceBox.module.css';

const Preference = ({ onPreferenceChange }) => {
  const [preferences, setPreferences] = useState(['', '']); // Store preferences as an array
  const [morningOrNight, setMorningOrNight] = useState(''); // Store the selected morning or night
  const [loudOrQuiet, setLoudOrQuiet] = useState(''); // Store the selected loud or quiet

  const handleMorningOrNightChange = (event) => {
    const newMorningOrNight = event.target.value;
    let newList = [...preferences];
    newList[0] = newMorningOrNight;
    setMorningOrNight(newMorningOrNight);
    setPreferences(newList);
    onPreferenceChange(newList);
  };

  const handleLoudOrQuietChange = (event) => {
    const newLoudOrQuiet = event.target.value;
    let newList = [...preferences];
    newList[1] = newLoudOrQuiet;
    setLoudOrQuiet(newLoudOrQuiet);
    setPreferences(newList);
    onPreferenceChange(newList);
  };

  useEffect(() => {
    // Clear selected radio buttons when the page is refreshed
    if (!localStorage.getItem('userPreferences')) {
      setMorningOrNight('');
      setLoudOrQuiet('');
    }
  }, []);

  return (
    <Grid container justifyContent="flex-end">
      <Grid item xs={12} lg={12} style={{ marginLeft: 'auto' }}>
        <Card>
          <CardHeader title="Preferences" className={styles.preferences_card_header} />
          <CardContent>
            <div>
              <label>Are you a night owl or a morning bird?</label>
              <RadioGroup
                aria-label="morning-or-night"
                name="morning-or-night"
                value={morningOrNight}
                onChange={handleMorningOrNightChange}
              >
                <FormControlLabel value="night-owl" control={<Radio />} label="Night Owl" />
                <FormControlLabel value="morning-bird" control={<Radio />} label="Morning Bird" />
              </RadioGroup>
            </div>

            <div>
              <label>Do you consider yourself quiet or loud in the dorm?</label>
              <RadioGroup
                aria-label="loud-or-quiet"
                name="loud-or-quiet"
                value={loudOrQuiet}
                onChange={handleLoudOrQuietChange}
              >
                <FormControlLabel value="quiet" control={<Radio />} label="Quiet" />
                <FormControlLabel value="loud" control={<Radio />} label="Loud" />
              </RadioGroup>
            </div>
          </CardContent>
          <Grid container justifyContent="flex-end" style={{ padding: '0 16px 16px 0' }}></Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Preference;
