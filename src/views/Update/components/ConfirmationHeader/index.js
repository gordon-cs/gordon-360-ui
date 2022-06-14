import { Typography, Grid } from '@material-ui/core/';
import { gordonColors } from 'theme';

const headerStyle = {
  color: gordonColors.primary.blue,
  paddingLeft: '10px',
  paddingRight: '10px',
};

const ConfirmationWindowHeader = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      style={headerStyle}
    >
      <Grid item>
        <Typography variant="body1" style={headerStyle}>
          FIELD
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-end">
          <Grid item>
            <Typography variant="body2" style={headerStyle}>
              CURRENT
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="caption"
              style={{
                paddingLeft: '10px',
                paddingRight: '10px',
                color: `${gordonColors.neutral.grayShades[800]}`,
              }}
            >
              PREVIOUS
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { ConfirmationWindowHeader };
