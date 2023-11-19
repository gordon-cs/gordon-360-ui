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
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleClick = async () => {
    // You can access both the message and selectedOption to submit to your housing service
    await housingService.addRoommate({ message, selectedOption });
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
          value={selectedOption}
          onChange={handleOptionChange}
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

      <Input onChange={handleChange} placeholder="Enter your message" />

      <Button variant="contained" onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
};

export default HousingLottery;
