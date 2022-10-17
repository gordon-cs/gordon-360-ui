import {
  Grid,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core/';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import styles from './InformationField.module.css';

const InformationField = ({ label, name, type, value, onChange, error, helperText, menuItems }) => {
  let field;
  // eslint-disable-next-line default-case
  switch (type) {
    case 'text':
      field = (
        <TextField
          variant="filled"
          error={error}
          className={`disable_select ${styles.field}`}
          label={label}
          name={name}
          helperText={error ? helperText : null}
          value={value}
          onChange={onChange}
          type={type}
        />
      );
      break;
    case 'checkbox':
      field = (
        <FormControlLabel
          control={<Checkbox checked={value} onChange={onChange} />}
          label={label}
          name={name}
        />
      );
      break;
    case 'select':
      field = (
        <FormControl
          variant="filled"
          className={`${styles.select_text} ${styles.field}`}
          style={{ width: '100%' }}
        >
          <InputLabel>{label}</InputLabel>
          <Select label={label} name={name} value={value} onChange={onChange}>
            {menuItems.map((item) => (
              <MenuItem className={styles.select_text} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
      break;
    case 'datetime':
      field = (
        // <form className={styles.container} noValidate>
        //   <TextField
        //     variant="filled"
        //     value={value}
        //     label={label}
        //     name={name}
        //     error={error}
        //     type="datetime-local"
        //     // defaultValue="2017-05-24T10:30"
        //     helperText={error ? helperText : null}
        //     onChange={onChange}
        //     className={`disable_select ${styles.field}`}
        //     InputLabelProps={{
        //       shrink: true,
        //     }}
        //   />
        // </form>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            className={`disable_select ${styles.field}`}
            variant="filled"
            label={label}
            helperText="MM-DD-YY HH-MM AM/PM"
            format="MM/dd/yy hh:mm a"
            value={value}
            onChange={onChange}
          />
        </MuiPickersUtilsProvider>
      );
      break;
  }
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      {field}
    </Grid>
  );
};

export { InformationField };
