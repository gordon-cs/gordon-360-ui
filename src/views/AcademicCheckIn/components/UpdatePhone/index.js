import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Input,
  Grid,
  CardHeader,
} from '@material-ui/core';

const UpdatePhone = ({ values, handleChange }) => {
  return (
    <Grid>
      <CardHeader title="Step 2: How can we contact you?"></CardHeader>
      <FormControl>
        <InputLabel htmlFor="component-simple"> Your phone number </InputLabel>
        <Input
          id="component-simple"
          value={values.personalPhone}
          onChange={handleChange('personalPhone')}
        />
      </FormControl>
    </Grid>
  );
};

export default UpdatePhone;
