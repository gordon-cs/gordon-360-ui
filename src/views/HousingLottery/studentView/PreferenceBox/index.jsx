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
import styles from '../../HousingLottery.module.css';

const Preference = () => {
  const [preferences, setPreferences] = useState([]); // Store preferences as an array
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
    setMorningOrNight(event.target.value);
    updatePreferences('morningOrNight', event.target.value);
  };

  const handleLoudOrQuietChange = (event) => {
    setLoudOrQuiet(event.target.value);
    updatePreferences('loudOrQuiet', event.target.value);
  };

  const updatePreferences = (type, value) => {
    setPreferences((prevPreferences) => {
      // Check if the preference type is already in the list
      const existingPrefIndex = prevPreferences.findIndex((pref) => Object.keys(pref)[0] === type);

      // If it exists, update the value, otherwise add it
      if (existingPrefIndex !== -1) {
        prevPreferences[existingPrefIndex][type] = value;
        return [...prevPreferences];
      } else {
        return [...prevPreferences, { [type]: value }];
      }
    });
  };

  const handleClick = async () => {
    // You can access the list of preferences and selected values
    console.log('Preferences:', preferences);
    console.log('Morning or Night:', morningOrNight);
    console.log('Loud or Quiet:', loudOrQuiet);
    await housingService.addRoommate({ morningOrNight, loudOrQuiet });
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

  return (
    <Grid container justifyContent="flex-end">
      <Grid item xs={12} lg={6} style={{ marginLeft: 'auto' }}>
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
          <Grid container justifyContent="flex-end" style={{ padding: '0 16px 16px 0' }}>
            <Grid item>
              <Button
                className={styles.submit_preference_button}
                variant="contained"
                onClick={handleClick}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Preference;
