import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Grid, Link, Typography, Avatar } from '@mui/material';
import { useUser } from 'hooks';
import { fetchRdInfo } from 'services/residentLife/ResidentStaff';

const MyHall = () => {
  const [rdInfo, setRdInfo] = useState({});
  const [rdProfileLink, setRdProfileLink] = useState('');
  const { profile } = useUser();

  useEffect(() => {
    if (profile) {
      const hallID = profile.OnCampusBuilding;
      console.log('hallID', hallID);

      fetchRdInfo(hallID).then((response) => {
        setRdInfo(response);
        console.log('RD Info', response);
      });
    }
  }, [profile]);

  useEffect(() => {
    if (rdInfo) {
      const fullName = rdInfo.RD_Name || '';
      const [firstName, lastName] = fullName.split(' ');
      const userName = `${firstName}.${lastName}`;
      console.log('RD Username', userName);
      setRdProfileLink(`https://360.gordon.edu/profile/${userName}`);
    }
  }, [rdInfo]);

  // Show loading state if profile is not yet loaded
  if (!profile) {
    return <Typography>Loading...</Typography>;
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
        <Grid container spacing={2} alignItems="center">
          {/* Text Section */}
          <Grid item xs={8}>
            <Typography variant="body1">
              <strong>Hall:</strong> {profile.BuildingDescription}
            </Typography>

            <Typography variant="body1">
              <strong>Room #:</strong> {profile.OnCampusRoom}
            </Typography>

            <Typography variant="body1">
              <Link
                href={rdProfileLink}
                className="gc360_text_link"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <strong>RD:</strong> {rdInfo.RD_Name}
              </Link>
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

export default MyHall;
