import { Grid, TextField, withStyles } from '@material-ui/core';
import Media from 'react-media';
import { toTitleCase } from 'services/utils';
import { gordonColors } from 'theme';

const styles2 = {
  icon: {
    color: gordonColors.neutral.grayShades[900],
  },
};

const TextSearchField = ({ name, value, updateValue, classes, Icon }) => (
  <Grid container spacing={2} alignItems="center">
    {Icon && (
      <Media
        query="(min-width: 600px)"
        render={() => (
          <Grid item align="center" style={{ marginBottom: '-4px' }}>
            <Icon className={classes.icon} />
          </Grid>
        )}
        fullWidth
      />
    )}
    <Grid item xs>
      <TextField
        id={name}
        name={name}
        label={toTitleCase(name, '_')}
        type="search"
        fullWidth
        value={value}
        onChange={updateValue}
        variant="filled"
      />
    </Grid>
  </Grid>
);

export default withStyles(styles2)(TextSearchField);
