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
import styles from '../../Update.module.css';

const ProfileUpdateField = ({ label, name, type, value, onChange, ...otherProps }) => {
  let field;
  // eslint-disable-next-line default-case
  switch (type) {
    case 'text':
    case 'number':
    case 'email':
      field = (
        <TextField
          variant="filled"
          error={otherProps.error}
          className="disable_select"
          style={{ width: 300 }}
          label={label}
          name={name}
          helperText={otherProps.error ? otherProps.helperText : null}
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
        <FormControl variant="filled" className={styles.select_text} style={{ width: 300 }}>
          <InputLabel>{label}</InputLabel>
          <Select label={label} name={name} value={value} onChange={onChange}>
            {otherProps.menuItems.map((item) => (
              <MenuItem className={styles.select_text} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
      break;
  }
  return (
    <Grid item xs={9} md={4} lg={3}>
      {field}
    </Grid>
  );
};

export { ProfileUpdateField };
