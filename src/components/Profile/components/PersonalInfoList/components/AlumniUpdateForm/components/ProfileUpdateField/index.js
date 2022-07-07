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
import styles from './ProfileUpdateField.module.css';

const ProfileUpdateField = ({ error, helperText, menuItems, ...otherProps }) => {
  let field;
  // eslint-disable-next-line default-case
  switch (otherProps.type) {
    case 'text':
    case 'number':
    case 'email':
      field = (
        <TextField
          variant="filled"
          error={error}
          className={`disable_select ${styles.field}`}
          helperText={error ? helperText : null}
          {...otherProps}
        />
      );
      break;
    case 'checkbox':
      field = <FormControlLabel control={<Checkbox {...otherProps} />} {...otherProps} />;
      break;
    case 'select':
      field = (
        <FormControl
          variant="filled"
          className={`${styles.select_text} ${styles.field}`}
          style={{ width: '100%' }}
        >
          <InputLabel>{otherProps.label}</InputLabel>
          <Select {...otherProps}>
            {menuItems.map((item) => (
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
    <Grid item xs={12} sm={6} md={4} lg={3}>
      {field}
    </Grid>
  );
};

export { ProfileUpdateField };
