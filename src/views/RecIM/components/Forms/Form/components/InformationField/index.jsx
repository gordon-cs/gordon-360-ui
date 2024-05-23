import {
  Grid,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import styles from './InformationField.module.css';
import { TeamList } from 'views/RecIM/components/List';
import { useWindowSize } from 'hooks';

const InformationField = ({
  label,
  name,
  type,
  value,
  required,
  max,
  min,
  onChange,
  error,
  helperText,
  menuItems,
  data,
}) => {
  let gridSizes = {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
  };
  const [width] = useWindowSize();

  let field;
  // eslint-disable-next-line default-case
  switch (type) {
    case 'listing':
      switch (name) {
        case 'team':
          field = <TeamList match={data} setTargetTeamID={onChange} />;
          break;
        default:
          break;
      }
      break;
    case 'text':
      field = (
        <TextField
          variant="filled"
          error={error}
          className={`disable_select ${styles.field}`}
          label={label}
          name={name}
          required={required}
          helperText={error && helperText}
          value={value}
          onChange={(event) => onChange(event)}
          type={type}
        />
      );
      break;
    case 'multiline':
      gridSizes = { md: 12, lg: 6 };
      field = (
        <TextField
          variant="filled"
          error={error}
          className={`disable_select ${styles.field}`}
          label={label}
          name={name}
          required={required}
          helperText={error && helperText}
          value={value}
          onChange={(event) => onChange(event)}
          type={type}
          multiline
          rows={4}
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
          required={required}
          inputProps={{
            max,
            min,
          }}
          helperText={error && helperText}
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
        <FormControl variant="filled" className={`${styles.select_text} ${styles.field}`}>
          <InputLabel>{label}</InputLabel>
          <Select
            label={label}
            name={name}
            value={value}
            required={required}
            onChange={(event) => onChange(event)}
            style={{ maxWidth: `${width * 0.65}px` }}
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
    case 'multiselect':
      gridSizes = { xs: 12 }; // ensure multi select takes max size
      field = (
        <Grid item s>
          <FormControl variant="filled" className={`${styles.select_text} ${styles.field}`}>
            <InputLabel>{label}</InputLabel>
            <Select
              label={label}
              name={name}
              multiple
              value={value}
              required={required}
              onChange={(event) => onChange(event)}
              style={{ maxWidth: `${width * 0.65}px` }}
            >
              {menuItems.map((item) => (
                // @TODO key needs to be updated to item id once exists
                <MenuItem key={item} className={styles.select_text} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography className={styles.multiselectText}>Selected: </Typography>
          <Typography className={styles.multiselectItemText}>{value.join(', ')}</Typography>
        </Grid>
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
            slotProps={{
              textField: {
                error,
              },
            }}
          />
        </LocalizationProvider>
      );
      break;
  }
  return (
    <Grid item {...gridSizes}>
      {field}
    </Grid>
  );
};

export { InformationField };
