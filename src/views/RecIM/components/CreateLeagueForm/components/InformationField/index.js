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
  }
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      {field}
    </Grid>
  );
};

export { InformationField };
