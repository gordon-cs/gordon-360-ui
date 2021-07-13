import {
  FormControl,
  FormControlLabel,
  Checkbox,
  Grid,
  Input,
  InputLabel,
  Typography,
} from '@material-ui/core';
import MaskedInput from 'react-text-mask';
import { gordonColors } from 'theme';

const UpdatePhone = ({ personalPhone, handleChangePersonalPhone, handleCheckPersonalPhone }) => {
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
          <InputLabel htmlFor="formatted-text-mask-input"> Phone Number </InputLabel>
          <Input
            id="formatted-text-mask-input"
            name="personalPhone"
            value={personalPhone.personalPhone}
            onChange={handleChangePersonalPhone}
            disabled={personalPhone.noPhone}
            inputComponent={phoneMaskUS}
            autoFocus
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={personalPhone.makePublic}
                name="makePublic"
                onChange={handleCheckPersonalPhone}
              />
            }
            label="Make my number private on People Search"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={personalPhone.noPhone}
                name="noPhone"
                onChange={handleCheckPersonalPhone}
              />
            }
            label="I don't have a cell-phone"
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

// From material ui website
// https://material-ui.com/components/text-fields/#integration-with-3rd-party-input-libraries
export function phoneMaskUS(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
    />
  );
}

export function phoneMaskINTL(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '+',
        /[0-9]/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={'\u2000'}
    />
  );
}

export default UpdatePhone;
