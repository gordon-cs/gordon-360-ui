import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';

const OnDuty = () => {
  return (
    <Card>
      <CardHeader
        title={
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} align="center">
              <Typography variant="h6" component="div">
                Who's On Duty?
              </Typography>
            </Grid>
          </Grid>
        }
        className="gc360_header"
      />
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Text Section */}
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

          {/* Avatar Section */}
          <Grid item xs={4}>
            <Avatar
              src={'defaultProfilePicture.png'}
              alt="Profile"
              sx={{
                width: { xs: 80, sm: 110, md: 80, lg: 120 },
                height: { xs: 80, sm: 110, md: 80, lg: 120 },
                borderRadius: '50%',
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OnDuty;
