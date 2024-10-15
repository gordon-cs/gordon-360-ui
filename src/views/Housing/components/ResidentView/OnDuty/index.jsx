import { Card, CardContent, CardHeader, Grid, Link, Typography } from '@mui/material';

const OnDuty = () => {
  return (
    <Card>
      <CardHeader
        title={
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} align="center">
              Who's On Duty?
            </Grid>
          </Grid>
        }
        className="gc360_header"
      />
      <CardContent>
        <strong>Name:</strong>
      </CardContent>

      <CardContent>
        <strong>Room #:</strong>
      </CardContent>

      <CardContent>
        <strong>Phone:</strong>
      </CardContent>
    </Card>
  );
};

export default OnDuty;
