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
  defaultDisabled?: boolean;
  select?: boolean;
  options?: string[] | SelectOption[];
  defaultLabel?: string;
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

const defaultMenuItem = (defaultValue: string) => (
  <MenuItem value="" key="default">
    <em>{defaultValue}</em>
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
  defaultDisabled = false,
  select = false,
  options = undefined,
  defaultLabel = 'All',
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
          {select && options
            ? defaultDisabled
              ? [mapOptionsToMenuItems(options)]
              : [defaultMenuItem(defaultLabel), mapOptionsToMenuItems(options)]
            : null}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default SearchField;
