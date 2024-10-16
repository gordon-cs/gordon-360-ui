import { Card, CardContent, CardHeader, Grid, Typography, Avatar } from '@mui/material';
import { useUser } from 'hooks';

const MyHall = () => {
  const { profile, images } = useUser();
  const profileImage = images?.pref || images?.def;

  if (!profile) {
    return <div>Loading...</div>;
  }

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
        <Grid container>
          <Grid item xs={8}>
            <Typography variant="h6">
              <strong>Hall:</strong> {profile.BuildingDescription ?? profile.Hall}
            </Typography>

            <Typography variant="h6">
              <strong>Room #:</strong> {profile.OnCampusRoom}
            </Typography>

            <Typography variant="h6">
              <strong>RD:</strong> {profile.fullName}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            {profileImage ? (
              <Avatar
                src={`data:image/jpg;base64,${profileImage}`}
                alt={profile.fullName}
                sx={{ width: 100, height: 100 }}
              />
            ) : (
              <Avatar sx={{ width: 100, height: 100 }}>
                {profile.FirstName?.[0]}
                {profile.LastName?.[0]}
              </Avatar>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MyHall;
