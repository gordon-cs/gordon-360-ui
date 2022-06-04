import {
  Grid,
  // InputLabel,
  MenuItem,
  // Select,
  TextField,
  withStyles,
} from '@material-ui/core';
import { IconContext } from 'react-icons';
import Media from 'react-media';
import { toTitleCase } from 'services/utils';
import { gordonColors } from 'theme';

const styles2 = {
  FontAwesome: {
    fontSize: 20,
    margin: 2,
  },
};

const SelectSearchField = ({
  name,
  value,
  updateValue,
  options,
  classes,
  Icon = null,
  disabled = false,
}) => (
  <Grid container spacing={2} alignItems="center">
    <Media
      query="(min-width: 600px)"
      render={() => (
        <Grid item style={{ marginBottom: '-4px' }}>
          <IconContext.Provider
            value={{
              color: disabled
                ? gordonColors.neutral.lightGray
                : gordonColors.neutral.grayShades[900],
            }}
          >
            <Icon style={styles2.FontAwesome} className={classes.icon} />
          </IconContext.Provider>
        </Grid>
      )}
    />
    <Grid item xs>
      <TextField
        select
        fullWidth
        variant="filled"
        id={name}
        name={name}
        label={toTitleCase(name, '_')}
        value={value}
        onChange={updateValue}
        disabled={disabled}
        className={disabled ? 'disabled' : null}
      >
        <MenuItem label="All" value="">
          <em>All</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  </Grid>
);

export default withStyles(styles2)(SelectSearchField);
