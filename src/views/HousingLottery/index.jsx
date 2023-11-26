
import React, { useState } from 'react';
import {
  Input,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  CardHeader,
  CardContent,
  Grid,
} from '@mui/material';
import housingService from 'services/housing';
import styles from './HousingLottery.module.css';
import PreferredHall from './studentView/PreferredHall';

const HousingLottery = () => {
  const [message, setMessage] = useState('');
  const [morningOrNight, setMorningOrNight] = useState('');
  const [loudOrQuiet, setLoudOrQuiet] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleMorningOrNightChange = (event) => {
    setMorningOrNight(event.target.value);
  };

  const handleLoudOrQuietChange = (event) => {
    setLoudOrQuiet(event.target.value);
  };

  const handleClick = async () => {
    // You can access message, morningOrNight, and loudOrQuiet to submit to your housing service
    await housingService.addRoommate({ message, morningOrNight, loudOrQuiet });
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
};
export default HousingLottery;
