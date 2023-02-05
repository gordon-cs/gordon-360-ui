import {
  Grid,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import styles from './InformationField.module.css';

const InformationField = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  helperText,
  menuItems,
  xs,
  sm,
  md,
  lg,
}) => {
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
          onChange={(event) => onChange(event)}
          type={type}
        />
      );
      break;
    case 'number':
      field = (
        <TextField
          variant="filled"
          error={error}
          className={`disable_select ${styles.field}`}
          label={label}
          name={name}
          helperText={error ? helperText : null}
          value={value}
          onChange={(event) => onChange(event)}
          type="number"
        />
      );
      break;
    case 'checkbox':
      field = (
        <FormControlLabel
          control={<Checkbox checked={value} onChange={(event) => onChange(event)} />}
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
          <Select label={label} name={name} value={value} onChange={(event) => onChange(event)}>
            {menuItems.map((item) => (
              // @TODO key needs to be updated to item id once exists
              <MenuItem key={item} className={styles.select_text} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
      break;
    case 'multiselect':
      field = (
        <FormControl
          variant="filled"
          className={`${styles.select_text} ${styles.field}`}
          style={{ width: '100%' }}
        >
          <InputLabel>{label}</InputLabel>
          <Select
            label={label}
            name={name}
            multiple
            value={value}
            onChange={(event) => onChange(event)}
          >
            {menuItems.map((item) => (
              // @TODO key needs to be updated to item id once exists
              <MenuItem key={item} className={styles.select_text} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
      break;
    case 'datetime':
      field = (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} variant="filled" />}
            label={label}
            value={value}
            onChange={(value) => onChange(value, name)}
          />
        </LocalizationProvider>
      );
      break;
  }
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      {field}
    </Grid>
  );
};

export { InformationField };
