import React, { useState } from 'react';
import {
  Input,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import housingService from 'services/housing';

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
    <div>
      <div>
        <label>
          Are you a night owl or a morning bird?
        </label>
        <RadioGroup
          aria-label="morning-or-night"
          name="morning-or-night"
          value={morningOrNight}
          onChange={handleMorningOrNightChange}
        >
          <FormControlLabel
            value="night-owl"
            control={<Radio />}
            label="Night Owl"
          />
          <FormControlLabel
            value="morning-bird"
            control={<Radio />}
            label="Morning Bird"
          />
        </RadioGroup>
      </div>

      <div>
        <label>
          Do you consider yourself quiet or loud in the dorm?
        </label>
        <RadioGroup
          aria-label="loud-or-quiet"
          name="loud-or-quiet"
          value={loudOrQuiet}
          onChange={handleLoudOrQuietChange}
        >
          <FormControlLabel
            value="quiet"
            control={<Radio />}
            label="Quiet"
          />
          <FormControlLabel
            value="loud"
            control={<Radio />}
            label="Loud"
          />
        </RadioGroup>
      </div>

      <Input onChange={handleChange} placeholder="Enter your message" />

      <Button variant="contained" onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
};

export default HousingLottery;
