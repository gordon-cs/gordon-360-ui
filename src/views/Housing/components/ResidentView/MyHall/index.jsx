import { Card, CardContent, CardHeader, Grid, Link, Typography } from '@mui/material';
import { useUser } from 'hooks';

const MyHall = () => {
  const { profile } = useUser();
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
        <strong>Hall:</strong> {profile.BuildingDescription ?? profile.Hall}
      </CardContent>

      <CardContent>
        <strong>Room #:</strong> {profile.OnCampusRoom}
      </CardContent>

      <CardContent>
        <strong>RD:</strong>
      </CardContent>
    </Card>
  );
};

export default MyHall;
