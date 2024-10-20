import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';

const BasicSelect = () => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">Select a Hall</InputLabel>
      <Select
        labelId="select-label"
        id="demo-simple-select"
        value={value}
        label="Select an option"
        onChange={handleChange}
      >
        <MenuItem value={1}>Bromley</MenuItem>
        <MenuItem value={2}>Ferrin</MenuItem>
        <MenuItem value={3}>Evans</MenuItem>
        <MenuItem value={4}>Wilson</MenuItem>
        <MenuItem value={5}>Tavilla</MenuItem>
        <MenuItem value={6}>Fulton</MenuItem>
      </Select>

      {(value === 1 || value === 2 || value === 3 || value === 4 || value === 5 || value === 6) && (
        <>
          {/* ToDo: Fetch the following information based on the hall chosen */}
          <Typography marginTop={2}>On-Duty: </Typography>
          <Typography marginTop={1}>Contact: </Typography>
          <Typography marginTop={1}>Check-In: </Typography>
          <Typography marginTop={1}>Hall RD: </Typography>
        </>
      )}
    </FormControl>
  );
};

export default BasicSelect;
