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
        <br />
        <Typography variant="body1" gutterbottom>
          The first question asks students to designate ethnicity as either:{' '}
          <ul>
            <li>Hispanic or Latino OR</li>
            <li>Not Hispanic or Latino</li>
          </ul>
        </Typography>
        <Typography variant="body1" gutterbottom>
          Note: The federal government considers "Hispanic/Latino" to be an ethnicity, not a race.
          It defines this ethnicity as: A person of Cuban, Mexican, Puerto Rican, South or Central
          American, or other Spanish culture of origin, regardless of race. That is why this
          question is asked separately and Hispanic/Latino is no longer listed as a race
          identification category.
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
