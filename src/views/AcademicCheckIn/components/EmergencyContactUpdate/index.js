// import React, { useState, useEffect } from 'react';
import { FormControl, FormControlLabel, FormLabel, InputLabel, Input } from '@material-ui/core';
import './index.css';

const EmergencyContactUpdate = ({ values, handleChange }) => {
  return (
    <FormControl className="checkIn">
      <InputLabel htmlFor="component-simple"> Firstname </InputLabel>
      <Input
        id="component-simple"
        value={values.firstname1}
        onChange={handleChange('firstname1')}
      />
    </FormControl>
  );
};

export default EmergencyContactUpdate;
