import { Grid, MenuItem, TextField, useMediaQuery } from '@mui/material';
import { ChangeEvent } from 'react';
import { IconType } from 'react-icons';
import { toTitleCase } from 'services/utils';
import styles from './SearchField.module.scss';

export interface SelectOption {
  label: string;
  value: string;
}

interface CommonProps {
  name: string;
  value: string;
  updateValue: (event: ChangeEvent<HTMLInputElement>) => void;
  Icon?: IconType;
  disabled?: boolean;
  select?: boolean;
  options?: string[] | SelectOption[];
}

interface SelectProps extends CommonProps {
  select: true;
  options: string[] | SelectOption[];
}

interface TextProps extends CommonProps {
  select?: false;
  options?: undefined;
}

type SearchFieldProps = SelectProps | TextProps;

const defaultMenuItem = (
  <MenuItem value="" key="default">
    <em>All</em>
  </MenuItem>
);

const HalldefaultMenuItem = (
  <MenuItem value="" key="default">
    <em>None</em>
  </MenuItem>
);

const mapOptionsToMenuItems = (options: string[] | SelectOption[]) =>
  options.map((option) =>
    typeof option === 'string' ? (
      <MenuItem value={option} key={option}>
        {option}
      </MenuItem>
    ) : (
      <MenuItem value={option.value} key={option.value}>
        {option.label}
      </MenuItem>
    ),
  );

const SearchField = ({
  name,
  value,
  updateValue,
  Icon,
  disabled = false,
  select = false,
  options = undefined,
}: SearchFieldProps) => {
  const isLargeScreen = useMediaQuery('(min-width: 600px)');

  return (
    <Grid item container spacing={2} alignItems="center">
      {isLargeScreen && Icon && (
        <Grid item>
          <Icon className={styles.icon} />
        </Grid>
      )}
      <Grid item xs>
        <TextField
          id={name}
          name={name}
          label={toTitleCase(name, '_')}
          value={value}
          onChange={updateValue}
          fullWidth
          variant="filled"
          type={!select ? 'search' : undefined}
          select={select}
          disabled={disabled}
        >
          {select && options && [defaultMenuItem, mapOptionsToMenuItems(options)]}
        </TextField>
      </Grid>
    </Grid>
  );
};

export const HallSearchField = ({
  name,
  value,
  updateValue,
  Icon,
  disabled = false,
  select = false,
  options = undefined,
}: SearchFieldProps) => {
  const isLargeScreen = useMediaQuery('(min-width: 600px)');

  return (
    <Grid item container spacing={2} alignItems="center">
      {isLargeScreen && Icon && (
        <Grid item>
          <Icon className={styles.icon} />
        </Grid>
      )}
      <Grid item xs>
        <TextField
          id={name}
          name={name}
          label={toTitleCase(name, '_')}
          value={value}
          onChange={updateValue}
          fullWidth
          variant="filled"
          type={!select ? 'search' : undefined}
          select={select}
          disabled={disabled}
        >
          {select && options && [HalldefaultMenuItem, mapOptionsToMenuItems(options)]}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default SearchField;
