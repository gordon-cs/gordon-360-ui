import { Input } from '@mui/material';
import { useState } from 'react';
import housingService from 'services/housing';

const HousingLottery = () => {
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const handleClick = async () => {
    await housingService.addRoommate(message);
  };

  return (
    <div>
      <Input onChange={handleChange} />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
};

export default HousingLottery;
