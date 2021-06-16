import { gordonColors } from 'theme';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Grid,
  Typography,
} from '@material-ui/core';
import info from './info.json';

const RaceEthnicity = ({ values, handleChange, handleCheck }) => {
  const cyan = gordonColors.primary.cyan;
  return (
    <Grid container justify="center" alignItems="center" direction="column" spacing={1}>
      <Grid item style={{ color: cyan }}>
        <Typography variant="h5" gutterbottom>
          Step 4: Provide Your Race and Ethnicity
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" align="center" gutterbottom>
          {info.header}
        </Typography>
        <Typography variant="body1" gutterbottom>
          {info.para1}
        </Typography>
        <br />
        <Typography variant="body1" gutterbottom>
          The first question asks students to designate ethnicity as either:{' '}
          <ul>
            <li>Hispanic or Latino OR</li>
            <li>Not Hispanic or Latino</li>
          </ul>
        </Typography>
        <Typography variant="body1" gutterbottom>
          {info.para2}
        </Typography>
        <br />
        <Typography variant="body1" gutterbottom>
          The second question asks individuals to indicate one or more races that apply from the
          following (you can select multiple categories):{' '}
          <ul>
            <li>
              American Indian or Alaska Native (Having origins in any of the original peoples of
              North and South America, including Central America)
            </li>

            <li> Asian</li>
            <li>Black or African American</li>
            <li> Native Hawaiian or Other Pacific Islander </li>
            <li>
              White (Having origins in any of the original peoples of Europe, North Africa, or the
              Middle East)
            </li>
          </ul>
        </Typography>
        <Typography variant="subtitle1" gutterbottom>
          Please provide/confirm the following information:
        </Typography>
        <br />
      </Grid>
      <Grid container direction="row">
        <FormControl>
          <FormLabel component="legend">Ethnicity:</FormLabel>
          <RadioGroup
            aria-label="ethnicity"
            name="ethnicity"
            value={values.ethnicity}
            onChange={handleChange}
          >
            <FormControlLabel value="notH_L" control={<Radio />} label="Not Hispanic/Latino" />
            <FormControlLabel value="H_L" control={<Radio />} label="Hispanic/Latino" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel component="legend">Race:</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.nativeAmerican}
                name="nativeAmerican"
                onChange={handleCheck}
              />
            }
            label="American Indian or Alaska Native"
          />
          <FormControlLabel
            control={<Checkbox checked={values.asian} name="asian" onChange={handleCheck} />}
            label="Asian"
          />
          <FormControlLabel
            control={<Checkbox checked={values.black} name="black" onChange={handleCheck} />}
            label="Black or African American"
          />
          <FormControlLabel
            control={<Checkbox checked={values.hawaiian} name="hawaiian" onChange={handleCheck} />}
            label="Native Hawaiian or Other Pacific Islander"
          />
          <FormControlLabel
            control={<Checkbox checked={values.white} name="white" onChange={handleCheck} />}
            label="White"
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default RaceEthnicity;
