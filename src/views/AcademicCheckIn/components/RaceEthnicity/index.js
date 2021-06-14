import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Grid,
  Typograph,
  Typography,
} from '@material-ui/core';

const RaceEthnicity = () => {
  const [checked, setChecked] = useState({
    nativeAmerican: false,
    asian: false,
    black: false,
    hawaiian: false,
    white: false,
  });
  const [radioChoice, setRadioChoice] = useState({
    yes: '',
    no: '',
  });

  const handleCheck = (e) => {
    setChecked({ ...checked, [e.target.name]: e.target.checked });
  };

  return (
    <Grid container justify="center" alignItems="center" direction="column" spacing={1}>
      <Grid item xs={7}>
        <Typography variant="h4" gutterbottom>
          Step 4: Provide Your Race and Ethnicity
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="h6" gutterbottom>
          Federal Reporting Status
        </Typography>
        <Typography variant="body1" gutterbottom>
          The federal government has created new aggregate categories for reporting race and
          ethnicity. Reporting these has been mandatory for Gordon College since fall 2010. The
          categories describe groups to which individuals belong or identify with, not scientific
          definitions of anthropological origins. In order to transition to the new data standards,
          we need students to self-identify their ethnicity and race by responding to two questions.
        </Typography>
        <Typography variant="body1" gutterbottom>
          The first question asks students to designate ethnicity as either: {'\n'}* Hispanic or
          Latino OR {'\n'} * Not Hispanic or Latino
        </Typography>
        <Typography variant="body1" gutterbottom>
          Note: The federal government considers "Hispanic/Latino" to be an ethnicity, not a race.
          It defines this ethnicity as: A person of Cuban, Mexican, Puerto Rican, South or Central
          American, or other Spanish culture of origin, regardless of race. That is why this
          question is asked separately and Hispanic/Latino is no longer listed as a race
          identification category.
        </Typography>
        <Typography variant="body1" gutterbottom>
          The second question asks individuals to indicate one or more races that apply from the
          following (you can select multiple categories): * American Indian or Alaska Native (Having
          origins in any of the original peoples of North and South America, including Central
          America) {'\n'} * Asian {'\n'} * Black or African American {'\n'} * Native Hawaiian or
          Other Pacific Islander {'\n'} * White (Having origins in any of the original peopels of
          Europe, North Africa, or the Middle East)
        </Typography>
        <Typography variant="h6" gutterbottom>
          Please provide/confirm the following information:
        </Typography>
        <FormControl>
          <FormLabel component="legend">Ethnicity:</FormLabel>
          <RadioGroup aria-label="ethnicity" name="ethnicity1">
            <FormControlLabel value="notH-L" control={<Radio />} label="Not Hispanic/Latino" />
            <FormControlLabel value="H-L" control={<Radio />} label="Hispanic/Latino" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel component="legend">Race:</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked.nativeAmerican}
                name="nativeAmerican"
                onChange={handleCheck}
              />
            }
            label="American Indian or Alaska Native"
          />
          <FormControlLabel
            control={<Checkbox checked={checked.asian} name="asian" onChange={handleCheck} />}
            label="Asian"
          />
          <FormControlLabel
            control={<Checkbox checked={checked.black} name="black" onChange={handleCheck} />}
            label="Black or African American"
          />
          <FormControlLabel
            control={<Checkbox checked={checked.hawaiian} name="hawaiian" onChange={handleCheck} />}
            label="Native Hawaiian or Other Pacific Islander"
          />
          <FormControlLabel
            control={<Checkbox checked={checked.white} name="white" onChange={handleCheck} />}
            label="White"
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default RaceEthnicity;
