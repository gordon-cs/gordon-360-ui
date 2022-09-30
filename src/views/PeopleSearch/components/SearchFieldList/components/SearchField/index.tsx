import { Grid, MenuItem, TextField, useMediaQuery } from '@mui/material';
import { ChangeEvent } from 'react';
import { IconContext, IconType } from 'react-icons';
import { toTitleCase } from 'services/utils';
import { gordonColors } from 'theme';
import styles from './SearchField.module.scss';

interface CommonProps {
  name: string;
  value: string;
  updateValue: (event: ChangeEvent<HTMLInputElement>) => void;
  Icon?: IconType;
  disabled?: boolean;
  select?: boolean;
  options?: string[];
}

interface SelectProps extends CommonProps {
  select: true;
  options: string[];
}

interface TextProps extends CommonProps {
  select?: false;
  options?: undefined;
}

type Props = SelectProps | TextProps;

const SearchField = ({
  name,
  value,
  updateValue,
  Icon,
  disabled = false,
  select = false,
  options = undefined,
}: Props) => {
  const isLargeScreen = useMediaQuery('(min-width: 600px)');

  return (
    <Grid item container spacing={2} alignItems="center">
      {isLargeScreen && Icon && (
        <Grid item>
          <IconContext.Provider
            value={{
              color: disabled
                ? gordonColors.neutral.lightGray
                : gordonColors.neutral.grayShades[900],
            }}
          >
            <Icon className={styles.icon} />
          </IconContext.Provider>
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
          {select &&
            options && [
              <MenuItem value="" key="default">
                <em>All</em>
              </MenuItem>,
              ...options.map((option) => (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              )),
            ]}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default SearchField;
