import {
  FormControl,
  FormControlLabel,
  Checkbox,
  Grid,
  Input,
  InputLabel,
  CardHeader,
  Typography,
  TextField,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';

const UpdatePhone = ({ values, handleChange, handleCheck }) => {
  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <Typography variant="h5" gutterbottom>
        Step 2: Enter your Cell Phone Number
      </Typography>
      <Grid item xs={7}>
        <Typography align="center" gutterBottom variant="body2">
          Note: This information will be used to contact you with information in the event of issues
          with registration etc, not for emergencies. Your number to contact you in emergencies is
          handled by our 3rd-party company, RAVE.
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <FormControl>
          <InputLabel htmlFor="component-simple"> Phone Number </InputLabel>
          <Input
            id="component-simple"
            name="personalPhone"
            value={values.personalPhone}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox checked={values.makePublic} name="makePublic" onChange={handleCheck} />
            }
            label="Make my number public on People Search"
          />
          <FormControlLabel
            control={<Checkbox checked={values.noPhone} name="noPhone" onChange={handleCheck} />}
            label="I don't have a cell-phone"
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default UpdatePhone;
