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
import housingService from 'services/housing';
import housing from 'services/housing';
import styles from './preferenceBox.module.css';

const Preference = ({ onPreferenceChange }) => {
  const [preferences, setPreferences] = useState(['', '']); // Store preferences as an array
  const [morningOrNight, setMorningOrNight] = useState(''); // Store the selected morning or night
  const [loudOrQuiet, setLoudOrQuiet] = useState(''); // Store the selected loud or quiet

  useEffect(() => {
    // Check for stored preferences in localStorage
    const storedPreferences = localStorage.getItem('userPreferences');
    if (storedPreferences) {
      const { morningOrNight, loudOrQuiet } = JSON.parse(storedPreferences);
      setMorningOrNight(morningOrNight || '');
      setLoudOrQuiet(loudOrQuiet || '');
    }
  }, []);

  const handleMorningOrNightChange = (event) => {
    const newMorningOrNight = event.target.value;
    let newList = [...preferences];
    newList[0] = newMorningOrNight;
    setMorningOrNight(newMorningOrNight);
    setPreferences(newList);
    onPreferenceChange(newList, newMorningOrNight && loudOrQuiet);
  };

  const handleLoudOrQuietChange = (event) => {
    const newLoudOrQuiet = event.target.value;
    let newList = [...preferences];
    newList[1] = newLoudOrQuiet;
    setLoudOrQuiet(newLoudOrQuiet);
    setPreferences(newList);
    onPreferenceChange(newList, morningOrNight && newLoudOrQuiet);
  };

  useEffect(() => {
    // Save preferences to local storage
    const storedPreferences = JSON.stringify({ morningOrNight, loudOrQuiet });
    localStorage.setItem('userPreferences', storedPreferences);
  }, [morningOrNight, loudOrQuiet]);

  useEffect(() => {
    // Check if both morningOrNight and loudOrQuiet are empty, clear localStorage
    if (!morningOrNight && !loudOrQuiet) {
      localStorage.removeItem('userPreferences');
    }
  }, [morningOrNight, loudOrQuiet]);

  useEffect(() => {
    // Clear selected radio buttons when the page is refreshed
    if (!localStorage.getItem('userPreferences')) {
      setMorningOrNight('');
      setLoudOrQuiet('');
    }
  }, []);

  useEffect(() => {
    const isValid = morningOrNight && loudOrQuiet;
    onPreferenceChange(preferences, isValid);
  }, [preferences, morningOrNight, loudOrQuiet, onPreferenceChange]);

  return (
    <Grid container justifyContent="flex-end">
      <Grid item xs={12} lg={12} style={{ marginLeft: 'auto' }}>
        <Card>
          <CardHeader title="Preferences" className={styles.preferences_card_header} />
          <CardContent>
            <div>
              <label>Are you a night owl or a morning bird?</label>
              <span className={styles.rankAsterisk}>*</span>
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
              <span className={styles.rankAsterisk}>*</span>
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
