import {
  FormControl,
  FormControlLabel,
  Checkbox,
  Grid,
  Input,
  InputLabel,
  Typography,
} from '@material-ui/core';
import { gordonColors } from 'theme';

const UpdatePhone = ({ values, handleChange, handleCheck }) => {
  const cyan = gordonColors.primary.cyan;
  return (
    <Grid container justify="center" alignItems="center" direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h5" style={{ color: cyan }} gutterbottom>
          Step 2: Enter your Cell Phone Number
        </Typography>
      </Grid>

      <Grid item>
        <Typography gutterBottom variant="body2">
          Note: This information will be used to contact you with information in the event of issues
          with registration etc, not for emergencies. Your number to contact you in emergencies is
          handled by our 3rd-party company, RAVE.
        </Typography>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel htmlFor="component-simple"> Phone Number </InputLabel>
          <Input
            id="component-simple"
            name="personalPhone"
            placeholder="Phone Number"
            value={values.personalPhone}
            onChange={handleChange}
            disabled={values.noPhone}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
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
