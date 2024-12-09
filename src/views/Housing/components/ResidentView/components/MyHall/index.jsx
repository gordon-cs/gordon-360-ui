import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Grid, Tooltip, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useUser } from 'hooks';
import { fetchRdInfo } from 'services/residentLife/ResidentStaff';

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

      // Create map to store hall images
      const hallImages = {
        BRO: 'src/views/Housing/Bromley.png',
        CHA: 'src/views/Housing/Chase.png',
        EVN: 'src/views/Housing/Evans.png',
        FER: 'src/views/Housing/Ferrin.png',
        FUL: 'src/views/Housing/Fulton.png',
        NYL: 'src/views/Housing/Nyland.png',
        TAV: 'src/views/Housing/Tavilla.png',
        WIL: 'src/views/Housing/Wilson.png',
        CON: 'src/views/Housing/Village.png', // Starting point of The Village
        GRA: 'src/views/Housing/Village.png',
        MCI: 'src/views/Housing/Village.png',
        RID: 'src/views/Housing/Village.png',
      };
      setHallPhoto(hallImages[hallID]);

      // Create map to store hall image alts
      const hallImageAlts = {
        BRO: 'Bromley Bulls',
        CHA: 'Chase Wolves',
        EVN: 'Evans Foxes',
        FER: 'Ferrin Falcons',
        FUL: 'Fulton Moose',
        NYL: 'Nyland Eagles',
        TAV: 'Tavilla Bears',
        WIL: 'Wilson Horses',
        CON: 'Village Deers', // Starting point of The Village
        GRA: 'Village Deers',
        MCI: 'Village Deers',
        RID: 'Village Deers',
      };
      setHallPhotoAlt(hallImageAlts[hallID]);

      fetchRdInfo(hallID).then((response) => {
        setRdInfo(response);
      });
    }
  }, [profile]);

  useEffect(() => {
    if (rdInfo) {
      const email = rdInfo.RD_Email;
      if (email) {
        const [firstName, lastName] = email.split('@')[0].split('.');
        setRdProfileLink(`https://360.gordon.edu/profile/${firstName}.${lastName}`);
      }
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
            <Tooltip title={hallPhotoAlt}>
              <Avatar
                src={hallPhoto || 'defaultProfilePicture.png'}
                alt="Hall Mascot"
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
