import { Card, CardContent, CardHeader, Grid, Link, Typography } from '@mui/material';

const MyHall = () => {
  return (
    <Card>
      <CardHeader
        title={
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} align="center">
              My Hall
            </Grid>
          </Grid>
        }
        className="gc360_header"
      />
      <CardContent>
        <strong>Hall:</strong>
      </CardContent>

      <CardContent>
        <strong>Room #:</strong>
      </CardContent>

      <CardContent>
        <strong>RD:</strong>
      </CardContent>
    </Card>
  );
};

export default MyHall;
