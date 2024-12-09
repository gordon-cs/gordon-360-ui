import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Grid, Tooltip, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useUser } from 'hooks';
import { fetchRdInfo } from 'services/residentLife/ResidentStaff';
import bromleyHallMascot from 'views/Housing/Bromley.png';
import chaseHallMascot from 'views/Housing/Chase.png';
import evansHallMascot from 'views/Housing/Evans.png';
import ferrinHallMascot from 'views/Housing/Ferrin.png';
import fultonHallMascot from 'views/Housing/Fulton.png';
import nylandHallMascot from 'views/Housing/Nyland.png';
import tavillaHallMascot from 'views/Housing/Tavilla.png';
import villageHallMascot from 'views/Housing/Village.png';
import wilsonHallMascot from 'views/Housing/Wilson.png';

const DEFAULT_PROFILE_URL = 'https://360.gordon.edu/profile/';
const COLOR_80808026_1X1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNsUAMAASwAqHb28sMAAAAASUVORK5CYII=';

// Styling for links using existing 360 colors
const StyledLink = styled('a')(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.warning.main,
  },
}));

const MyHall = () => {
  const [rdInfo, setRdInfo] = useState({});
  const [rdProfileLink, setRdProfileLink] = useState('');
  const [hallPhoto, setHallPhoto] = useState('');
  const [hallPhotoAlt, setHallPhotoAlt] = useState('');
  const { profile } = useUser();

  useEffect(() => {
    if (profile) {
      const hallID = profile.OnCampusBuilding;

      const defaultHallData = {
        image: COLOR_80808026_1X1,
        alt: 'Default Hall',
      };

      console.log(ferrinHallMascot);

      // Create map to store hall images and hall image alts
      const hallData = {
        BRO: { image: bromleyHallMascot, alt: 'Bromley Bulls' },
        CHA: { image: chaseHallMascot, alt: 'Chase Wolves' },
        EVN: { image: evansHallMascot, alt: 'Evans Foxes' },
        FER: { image: ferrinHallMascot, alt: 'Ferrin Falcons' },
        FUL: { image: fultonHallMascot, alt: 'Fulton Moose' },
        NYL: { image: nylandHallMascot, alt: 'Nyland Eagles' },
        TAV: { image: tavillaHallMascot, alt: 'Tavilla Bears' },
        WIL: { image: wilsonHallMascot, alt: 'Wilson Horses' },
        CON: { image: villageHallMascot, alt: 'Village Deers' },
        GRA: { image: villageHallMascot, alt: 'Village Deers' },
        MCI: { image: villageHallMascot, alt: 'Village Deers' },
        RID: { image: villageHallMascot, alt: 'Village Deers' },
      };

      // Edge case in the event that the hall data does not load
      const currentHall = hallData[hallID] || defaultHallData;
      setHallPhoto(currentHall.image);
      setHallPhotoAlt(currentHall.alt);

      fetchRdInfo(hallID)
        .then((response) => setRdInfo(response))
        .catch((error) => console.error('Failed to fetch RD info:', error));
    }
  }, [profile]);

  useEffect(() => {
    if (rdInfo?.RD_Email) {
      const [firstName, lastName] = rdInfo.RD_Email.split('@')[0].split('.');
      setRdProfileLink(DEFAULT_PROFILE_URL + `${firstName}.${lastName}`);
    }
  }, [rdInfo]);

  // Show loading state if profile is not yet loaded
  if (!profile) {
    return (
      <Typography align="center" color="textSecondary">
        Loading your hall details...
      </Typography>
    );
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
              <strong>RD: </strong>
              <StyledLink
                href={rdProfileLink}
                className="gc360_text_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {rdInfo.RD_Name}
              </StyledLink>
            </Typography>
          </Grid>

          {/* Avatar Section */}
          <Grid item xs={4}>
            <Tooltip title={hallPhotoAlt || 'Hall Mascot'}>
              <Avatar
                src={hallPhoto || COLOR_80808026_1X1}
                alt={hallPhotoAlt || 'Hall Mascot'}
                sx={{
                  width: { xs: 80, sm: 110, md: 80, lg: 120 },
                  height: { xs: 80, sm: 110, md: 80, lg: 120 },
                  borderRadius: '50%',
                }}
              />
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MyHall;
