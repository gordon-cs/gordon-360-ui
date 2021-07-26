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

const RaceEthnicity = ({ demographic, handleChangeDemographic, handleCheckDemographic }) => {
  const cyan = gordonColors.primary.cyan;
  return (
    <Grid container justifyContent="center" alignItems="center" direction="column" spacing={1}>
      <Grid item style={{ color: cyan }}>
        <Typography variant="h5" gutterBottom>
          Step 4: Provide Your Race and Ethnicity
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" align="center" gutterBottom>
          <b>Federal Reporting Status</b>
        </Typography>
        <Typography variant="body1" gutterBottom>
          The federal government has created new aggregate categories for reporting race and
          ethnicity. Reporting these has been mandatory for Gordon College since fall 2010. The
          categories describe groups to which individuals belong or identify with, not scientific
          definitions of anthropological origins. In order to transition to the new data standards,
          we need students to self-identify their ethnicity and race by responding to two questions.
        </Typography>
        <br />
        <Typography variant="body1">
          The first question asks students to designate ethnicity as either:{' '}
        </Typography>
        <ul>
          <li>Hispanic or Latino OR</li>
          <li>Not Hispanic or Latino</li>
        </ul>
        <br />
        <Typography variant="body1" gutterBottom>
          Note: The federal government considers 'Hispanic/Latino' to be an ethnicity, not a race.
          It defines this ethnicity as: A person of Cuban, Mexican, Puerto Rican, South or Central
          American, or other Spanish culture of origin, regardless of race. That is why this
          question is asked separately and Hispanic/Latino is no longer listed as a race
          identification category.
        </Typography>
        <br />
        <Typography variant="body1">
          The second question asks individuals to indicate one or more races that apply from the
          following (you can select multiple categories):
        </Typography>
        <ul>
          <li>
            Native American or Alaska Native (Having origins in any of the original peoples of North
            and South America, including Central America)
          </li>

          <li> Asian</li>
          <li>Black or African American</li>
          <li> Native Hawaiian or Other Pacific Islander </li>
          <li>
            White (Having origins in any of the original peoples of Europe, North Africa, or the
            Middle East)
          </li>
        </ul>
        <br />
        <Typography variant="subtitle1" gutterBottom>
          Please provide/confirm the following information:
        </Typography>
        <br />
      </Grid>
      <Grid container direction="row">
        <FormControl>
          <FormLabel component="legend">Ethnicity:</FormLabel>
          <RadioGroup
            aria-label="Ethnicity"
            name="Ethnicity"
            value={demographic.Ethnicity}
            onChange={handleChangeDemographic}
          >
            <FormControlLabel value="-2" control={<Radio />} label="Not Hispanic/Latino" />
            <FormControlLabel value="-1" control={<Radio />} label="Hispanic/Latino" />
            <FormControlLabel value="-3" control={<Radio />} label="Prefer not to say" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel component="legend">Race:</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={demographic.NativeAmerican}
                name="NativeAmerican"
                onChange={handleCheckDemographic}
              />
            }
            label="Native American or Alaska Native"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={demographic.Asian}
                name="Asian"
                onChange={handleCheckDemographic}
              />
            }
            label="Asian"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={demographic.Black}
                name="Black"
                onChange={handleCheckDemographic}
              />
            }
            label="Black or African American"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={demographic.Hawaiian}
                name="Hawaiian"
                onChange={handleCheckDemographic}
              />
            }
            label="Native Hawaiian or Other Pacific Islander"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={demographic.White}
                name="White"
                onChange={handleCheckDemographic}
              />
            }
            label="White"
          />
          <FormControlLabel
            control={
              <Checkbox checked={demographic.None} name="None" onChange={handleCheckDemographic} />
            }
            label="Prefer not to say"
          />
        </FormControl>
      </Grid>
      <Typography variant="subtitle1" gutterBottom>
        <b>
          For questions or more information regarding this section please contact the registrar's
          office at (978) 867-4243 or <a href="mailto:registrar@gordon.edu">registrar@gordon.edu</a>
          .
        </b>
      </Typography>
    </Grid>
  );
};

export default RaceEthnicity;
