import React, { useState, useEffect } from 'react';
import { FormControl, FormControlLabel, FormLabel, InputLabel, Input } from '@material-ui/core';

const EmergencyContactUpdate = ({ values, handleChange }) => {
  return (
    <div>
      <FormControl>
        <InputLabel htmlFor="component-simple"> Firstname </InputLabel>
        <Input
          id="component-simple"
          value={values.firstname1}
          onChange={handleChange('firstname1')}
        />
      </FormControl>
    </div>
  );
};

export default EmergencyContactUpdate;
