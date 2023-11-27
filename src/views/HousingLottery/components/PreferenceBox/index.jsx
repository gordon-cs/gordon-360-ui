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
  const [message, setMessage] = useState('');
  const [morningOrNight, setMorningOrNight] = useState('');
  const [loudOrQuiet, setLoudOrQuiet] = useState('');

  
    useEffect(() => {
     const storedPreferences = localStorage.getItem('userPreferences');
      if (storedPreferences) {
        const { morningOrNight, loudOrQuiet } = storedPreferences;
        setMorningOrNight(morningOrNight || '');
        setLoudOrQuiet(loudOrQuiet || '');
      }
    }, []);

    useEffect(() => {
      // Save preferences to local storage
      const storedPreferences = JSON.stringify({ morningOrNight, loudOrQuiet });
      localStorage.setItem('userPreferences', storedPreferences);
      }, [morningOrNight, loudOrQuiet]);
    

  const handleMorningOrNightChange = (event) => {
    setMorningOrNight(event.target.value);
  };

  const handleLoudOrQuietChange = (event) => {
    setLoudOrQuiet(event.target.value);
  };

  const handleClick = async () => {
    // You can access morningOrNight, and loudOrQuiet to submit to your housing service
    console.log({ morningOrNight, loudOrQuiet});
    await housingService.addRoommate({morningOrNight, loudOrQuiet});
  };

  return (
<Grid container justifyContent="center">
      <Grid item xs={12} lg={6} style={{ maxWidth: '500px' }}>
        <Card>
          <CardHeader title="Preferences" className={styles.apartment_card_header} />
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
              <Button variant="contained" onClick={handleClick}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Preference;