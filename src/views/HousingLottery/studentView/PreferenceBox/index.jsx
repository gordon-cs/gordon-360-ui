import { useEffect, useState } from 'react';
import {
  FormControlLabel,
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
  const [morningOrNight, setMorningOrNight] = useState('');
  const [loudOrQuiet, setLoudOrQuiet] = useState('');

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedPreferences = await housing.getUserPreference();
        const loudOrQuietPreference = savedPreferences.find(
          (pref) => pref.Preference1 === 'quiet' || pref.Preference1 === 'loud',
        );
        const morningOrNightPreference = savedPreferences.find(
          (pref) => pref.Preference1 === 'night-owl' || pref.Preference1 === 'morning-bird',
        );
        if (loudOrQuietPreference) {
          setLoudOrQuiet(loudOrQuietPreference.Preference1);
        }
        if (morningOrNightPreference) {
          setMorningOrNight(morningOrNightPreference.Preference1);
        }
        onPreferenceChange([
          loudOrQuietPreference ? loudOrQuietPreference.Preference1 : '',
          morningOrNightPreference ? morningOrNightPreference.Preference1 : '',
        ]);
      } catch (error) {
        console.error('Failed to fetch user preferences:', error);
      }
    };
    loadPreferences();
  }, []);

  const handleMorningOrNightChange = (event) => {
    const newMorningOrNight = event.target.value;
    setMorningOrNight(newMorningOrNight);
    onPreferenceChange([loudOrQuiet, newMorningOrNight]);
  };

  const handleLoudOrQuietChange = (event) => {
    const newLoudOrQuiet = event.target.value;
    setLoudOrQuiet(newLoudOrQuiet);
    onPreferenceChange([newLoudOrQuiet, morningOrNight]);
  };

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
