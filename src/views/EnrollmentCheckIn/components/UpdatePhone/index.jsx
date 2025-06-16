import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import React from 'react';

const UpdatePhone = ({ phoneInfo, handleChangePhoneInfo, handleCheckPhoneInfo }) => {
  return (
    <Stack spacing={4}>
      <Typography variant="h5" color="secondary">
        Step 2: Enter your Cell Phone Number
      </Typography>
      <Typography>
        Note: This information will be used to contact you with information in the event of issues
        with registration etc, not for emergencies.
        <br />
        <br />
        To update the number we will use to contact you in case of emergency, please use{' '}
        <Link
          href="https://www.getrave.com/login/gordon"
          className="gc360_text_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rave
        </Link>
        .
        <br />
        <br />
        This number will also be visible to current students, faculty, and staff unless you choose
        to make your number private on People Search with the box below.
      </Typography>

      <FormControl>
        <InputLabel htmlFor="formatted-text-mask-input">Phone Number</InputLabel>
        <Input
          id="formatted-text-mask-input"
          name="PersonalPhone"
          value={phoneInfo.NoPhone ? '' : phoneInfo.PersonalPhone}
          onChange={handleChangePhoneInfo}
          disabled={phoneInfo.NoPhone}
          inputComponent={phoneMaskUS}
          autoFocus
        />
      </FormControl>

      <FormControl>
        <FormLabel>Do you give permission for Gordon College to text you?</FormLabel>
        <RadioGroup value={phoneInfo.SMSOptedIn} onChange={handleChangePhoneInfo} name="SMSOptedIn">
          <FormControlLabel
            disabled={phoneInfo.NoPhone}
            value={true}
            control={<Radio />}
            label="Yes"
          />
          <FormControlLabel
            disabled={phoneInfo.NoPhone}
            value={false}
            control={<Radio />}
            label="No"
          />
        </RadioGroup>
        <Typography variant="body2">
          By checking yes, you agree to receive text messages from Gordon College. Message & data
          rates may apply. Message frequency varies. Reply HELP for help or STOP to cancel. View
          Terms of Service and Privacy Policy:{' '}
          <Link
            href="https://www.gordon.edu/webprivacy.cfm"
            className="gc360_text_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.gordon.edu/webprivacy.cfm
          </Link>
          .
        </Typography>
      </FormControl>

      <FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={phoneInfo.MakePrivate}
              disabled={phoneInfo.NoPhone}
              name="MakePrivate"
              onChange={handleCheckPhoneInfo}
            />
          }
          label="Make my number private on People Search"
        />
        <FormControlLabel
          control={
            <Checkbox checked={phoneInfo.NoPhone} name="NoPhone" onChange={handleCheckPhoneInfo} />
          }
          label="I don't have a cell-phone"
        />
      </FormControl>
    </Stack>
  );
};

// From material ui website
// https://material-ui.com/components/text-fields/#integration-with-3rd-party-input-libraries
export const phoneMaskUS = forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      ref={ref}
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
      ref={ref}
      mask="+000000000000000"
      placeholderChar={'\u2000'}
      unmask={true}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export default UpdatePhone;
