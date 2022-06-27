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

const ProfileUpdateField = ({
  label,
  name,
  type,
  value,
  menuItems,
  onChange,
  error,
  helperText,
}) => {
  let field;
  // eslint-disable-next-line default-case
  switch (type) {
    case 'text':
    case 'number':
    case 'email':
      console.log(error);
      field = error ? (
        <TextField
          error={error}
          className="disable_select"
          style={{ width: 252 }}
          label={label}
          name={name}
          helperText={helperText}
          value={value}
          onChange={onChange}
          type={type}
        />
      ) : (
        <TextField
          className="disable_select"
          style={{ width: 252 }}
          label={label}
          name={name}
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
        <FormControl className={styles.select_text} style={{ width: 252 }}>
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
    <Grid item xs={9} md={3} lg={3}>
      {field}
    </Grid>
  );
};

export { ProfileUpdateField };
