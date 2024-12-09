import { useState, useEffect } from 'react';
import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useUser } from 'hooks';
import { fetchOnDutyRA } from 'services/residentLife/RA_OnCall';

// Default image
const COLOR_80808026_1X1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNsUAMAASwAqHb28sMAAAAASUVORK5CYII=';

// Takes phone number from api return and makes readable version
const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber || phoneNumber.length !== 10) return phoneNumber;
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
};

// Determine if the user is on a mobile device
const isMobile = () => {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
};

// Styling for links using existing 360 colors
const StyledLink = styled('a')(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.warning.main,
  },
}));

const OnDuty = () => {
  const [onDutyRaInfo, setOnDutyRaInfo] = useState({});
  const { profile } = useUser();
  const mobileDevice = isMobile();

  useEffect(() => {
    console.log(mobileDevice ? 'Mobile device detected' : 'Desktop device detected');

    if (profile) {
      const hallID = profile.OnCampusBuilding;

      fetchOnDutyRA(hallID).then((response) => {
        setOnDutyRaInfo(response);
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
              On Duty RA/AC
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
              <strong>Name: </strong>
              <StyledLink
                href={onDutyRaInfo.RA_Profile_Link}
                className="gc360_text_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {onDutyRaInfo.RA_Name}
              </StyledLink>
            </Typography>

            <Typography variant="body1">
              <strong>Room #:</strong> {onDutyRaInfo.RoomNumber}
            </Typography>

            <Typography variant="body1">
              <strong>Contact:</strong>{' '}
              {onDutyRaInfo.PreferredContact && onDutyRaInfo.PreferredContact.includes('http') ? (
                <StyledLink
                  href={onDutyRaInfo.PreferredContact}
                  underline="hover"
                  className="gc360_text_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Teams
                </StyledLink>
              ) : isMobile && onDutyRaInfo.PreferredContact ? (
                <StyledLink
                  href={`tel:${onDutyRaInfo.PreferredContact}`}
                  className="gc360_text_link"
                >
                  {formatPhoneNumber(onDutyRaInfo.PreferredContact)}
                </StyledLink>
              ) : (
                onDutyRaInfo.PreferredContact && formatPhoneNumber(onDutyRaInfo.PreferredContact)
              )}
            </Typography>
          </Grid>

          {/* Avatar Section */}
          <Grid item xs={4}>
            <StyledLink
              href={onDutyRaInfo.RA_Profile_Link}
              className="gc360_text_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar
                src={onDutyRaInfo.RA_Photo || COLOR_80808026_1X1}
                alt="Profile"
                sx={{
                  width: { xs: 80, sm: 110, md: 80, lg: 120 },
                  height: { xs: 80, sm: 110, md: 80, lg: 120 },
                  borderRadius: '50%',
                }}
              />
            </StyledLink>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OnDuty;
