import { Avatar, Card, CardContent, CardHeader, Grid, Link, Typography } from '@mui/material';

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
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <Typography variant="body1">
              <strong>Name:</strong>
            </Typography>

            <Typography variant="body1">
              <strong>Room #:</strong>
            </Typography>

            <Typography variant="body1">
              <strong>Phone:</strong>
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Avatar
              src={'defaultProfilePicture.png'}
              alt="Profile"
              sx={{ width: 90, height: 90, borderRadius: '50%' }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OnDuty;
