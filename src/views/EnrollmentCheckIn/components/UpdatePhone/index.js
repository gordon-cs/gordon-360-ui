import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  Typography,
} from '@mui/material';
import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import { gordonColors } from 'theme';

const UpdatePhone = ({ phoneInfo, handleChangePhoneInfo, handleCheckPhoneInfo }) => {
  const cyan = gordonColors.primary.cyan;
  return (
    <Grid container justifyContent="center" alignItems="center" direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h5" style={{ color: cyan }} gutterBottom>
          Step 2: Enter your Cell Phone Number
        </Typography>
      </Grid>
      <Grid item>
        <Typography gutterBottom variant="body2">
          Note: This information will be used to contact you with information in the event of issues
          with registration etc, not for emergencies. Your number to contact you in emergencies is
          handled by our 3rd-party company, RAVE. This number will also be visible to current
          students, faculty, and staff unless you choose to make your number private on People
          Search with the box below.
        </Typography>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel htmlFor="formatted-text-mask-input"> Phone Number </InputLabel>
          <Input
            id="formatted-text-mask-input"
            name="PersonalPhone"
            value={phoneInfo.PersonalPhone}
            onChange={handleChangePhoneInfo}
            disabled={phoneInfo.NoPhone}
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
                checked={phoneInfo.MakePrivate}
                disabled={phoneInfo.NoPhone}
                name={'MakePrivate'}
                onChange={handleCheckPhoneInfo}
              />
            }
            label="Make my number private on People Search"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={phoneInfo.NoPhone}
                name={'NoPhone'}
                onChange={handleCheckPhoneInfo}
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
export const phoneMaskUS = forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      inputRef={ref}
      mask="(000) 000-0000"
      placeholderChar={'\u2000'}
      unmask={true}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export const phoneMaskINTL = forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      inputRef={ref}
      mask="+000000000000000"
      placeholderChar={'\u2000'}
      unmask={true}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export default UpdatePhone;
