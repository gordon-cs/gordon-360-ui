import { useState, useEffect } from 'react';
import { Avatar, Card, CardContent, CardHeader, Grid, Link, Typography } from '@mui/material';
import { useUser } from 'hooks';
import { fetchOnDutyRA } from 'services/residentLife/RA_OnCall';

// Default image
const COLOR_80808026_1X1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNsUAMAASwAqHb28sMAAAAASUVORK5CYII=';

const OnDuty = () => {
  const [onDutyRaInfo, setOnDutyRaInfo] = useState({});
  const { profile } = useUser();

  useEffect(() => {
    if (profile) {
      const hallID = profile.OnCampusBuilding;

      fetchOnDutyRA(hallID).then((response) => {
        setOnDutyRaInfo(response);
        console.log('On Duty RA Info:', response);
      });
    }
  }, [profile]);

  // Show loading state if profile is not yet loaded
  if (!profile) {
    return <Typography>Loading...</Typography>;
  }

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
              <Link
                href={onDutyRaInfo.RA_Profile_Link}
                className="gc360_text_link"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <strong>Name:</strong> {onDutyRaInfo.RA_Name}
              </Link>
            </Typography>

            <Typography variant="body1">
              <strong>Room #:</strong> {onDutyRaInfo.RoomNumber}
            </Typography>
            <Typography variant="body1">
              <strong>Contact:</strong> {onDutyRaInfo.PreferredContact}
            </Typography>
          </Grid>

          {/* Avatar Section */}
          <Grid item xs={4}>
            <Avatar
              src={onDutyRaInfo.RA_Photo || COLOR_80808026_1X1}
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
