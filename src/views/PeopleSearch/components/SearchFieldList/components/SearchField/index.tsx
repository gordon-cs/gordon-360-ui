import { InputAdornment, MenuItem, TextField, TextFieldProps, useMediaQuery } from '@mui/material';
import { ChangeEvent } from 'react';
import { IconType } from 'react-icons';
import { toTitleCase } from 'services/utils';
import styles from './SearchField.module.scss';

export interface SelectOption {
  label: string;
  value: string;
}

type BaseProps = TextFieldProps & {
  name: string;
  updateValue: (event: ChangeEvent<HTMLInputElement>) => void;
  Icon?: IconType;
};

type SelectProps = BaseProps & {
  select: true;
  options: readonly string[] | readonly SelectOption[];
};

type TextInputProps = BaseProps & {
  select?: false;
  options?: undefined;
};

type Props = SelectProps | TextInputProps;

const SearchField = ({
  name,
  updateValue,
  Icon,
  select = false,
  options = undefined,
  ...otherProps
}: Props) => {
  const isLargeScreen = useMediaQuery('(min-width: 600px)');

  return (
    <TextField
      id={name}
      name={name}
      label={toTitleCase(name, '_')}
      onChange={updateValue}
      fullWidth
      variant="filled"
      type={!select ? 'search' : undefined}
      select={select}
      InputProps={{
        startAdornment:
          isLargeScreen && Icon ? (
            <InputAdornment position="start">
              <Icon className={styles.icon} />
            </InputAdornment>
          ) : undefined,
      }}
      {...otherProps}
    >
      {select &&
        options && [
          <MenuItem value="" key="default">
            <em>All</em>
          </MenuItem>,
          ...options.map((option) => {
            const { label, value } =
              typeof option === 'string' ? { label: option, value: option } : option;
            return (
              <MenuItem value={value} key={value}>
                {label}
              </MenuItem>
            );
          }),
        ]}
    </TextField>
  );
};

export default SearchField;
