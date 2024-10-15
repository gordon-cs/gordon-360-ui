import { Card, CardContent, CardHeader, Grid, Link, Typography } from '@mui/material';

const MyRA = () => {
  return (
    <Card>
      <CardHeader
        title={
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} align="center">
              Where's My RA/AC?
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
        <strong>Current Status:</strong>
      </CardContent>

      <CardContent>
        <strong>Future Status:</strong>
      </CardContent>
    </Card>
  );
};

export default MyRA;
