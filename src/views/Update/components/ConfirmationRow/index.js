import { Typography, Grid } from '@material-ui/core/';
import { gordonColors } from 'theme';

const contentStyle = {
  color: `${gordonColors.neutral.darkGray}`,
  padding: '10px',
};

const ConfirmationRow = ({ field, prevValue }) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      style={{
        paddingTop: '10px',
        borderTop: `1px solid ${gordonColors.neutral.grayShades[800]}`,
      }}
    >
      <Grid item>
        <Typography variant="body2" style={contentStyle}>
          {field.label}
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-end">
          <Grid item>
            <Typography
              variant="subtitle2"
              style={{
                paddingLeft: '10px',
                paddingRight: '10px',
                color: `${gordonColors.neutral.darkGray}`,
              }}
            >
              {field.value}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="caption"
              style={{
                paddingLeft: '10px',
                paddingRight: '10px',
                color: `${gordonColors.neutral.grayShades[900]}`,
              }}
            >
              {prevValue === '' ? 'No previous value' : prevValue}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { ConfirmationRow };
