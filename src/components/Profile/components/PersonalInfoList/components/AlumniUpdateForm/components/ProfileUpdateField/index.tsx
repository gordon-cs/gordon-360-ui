import {
  Grid,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material/';
import { ChangeEvent, ReactNode } from 'react';
import styles from './ProfileUpdateField.module.css';

type defaultProps = {
  label: ReactNode;
  name: string;
  value: any;
  helperText?: ReactNode;
  menuItems?: string[];
  error?: boolean;
};

type Props = defaultProps &
  (
    | {
        type: 'text' | 'checkbox';
        onChange: (
          event: SelectChangeEvent<string> & ChangeEvent<HTMLInputElement>,
          child?: ReactNode,
        ) => void;
      }
    | {
        type: 'select';
        onChange: (event: SelectChangeEvent<string>, child?: ReactNode) => void;
      }
  );

const ProfileUpdateField = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  helperText,
  menuItems,
}: Props) => {
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
        <FormControl variant="filled" className={`${styles.select_text} ${styles.field}`}>
          <InputLabel>{label}</InputLabel>
          <Select label={label} name={name} value={value} onChange={onChange}>
            {menuItems!.map((item: string) => (
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
