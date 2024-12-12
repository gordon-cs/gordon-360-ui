import { useState, useEffect } from 'react';
import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useUser } from 'hooks';
import { fetchRaInfo } from 'services/residentLife/ResidentStaff';
import { formatPhoneNumber } from '../../../../utils/formatPhoneNumber/formatPhoneNumber';
import { staffType } from '../../../../utils/staffType/staffType';
import { isMobile } from '../../../../utils/isMobile/isMobile';

const DEFAULT_PROFILE_URL = 'https://360sp.gordon.edu/profile/';
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

const MyRA = () => {
  const [raInfo, setRaInfo] = useState({});
  const [raProfileLink, setRaProfileLink] = useState('');
  const [staffTypeLabel, setStaffTypeLabel] = useState('');
  const { profile } = useUser();
  const mobileDevice = isMobile();

  useEffect(() => {
    console.log(mobileDevice ? 'Mobile device detected' : 'Desktop device detected');

    if (profile) {
      const hallID = profile.OnCampusBuilding;
      const roomNumber = profile.OnCampusRoom;

      // Display either 'RA' or 'AC' depending on the resident's building
      setStaffTypeLabel(staffType[hallID] || 'RA/AC');

      fetchRaInfo(hallID, roomNumber)
        .then((response) => setRaInfo(response))
        .catch((error) => console.error(`Failed to fetch ${staffTypeLabel} info:`, error));
    }
  }, [profile]);

  useEffect(() => {
    if (raInfo?.Email) {
      const [firstName, lastName] = raInfo.Email.split('@')[0].split('.');
      setRaProfileLink(DEFAULT_PROFILE_URL + `${firstName}.${lastName}`);
    }
  }, [raInfo]);

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
              My {staffTypeLabel}
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
              <strong>RA: </strong>
              <StyledLink
                href={raProfileLink}
                className="gc360_text_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {raInfo.FirstName} {raInfo.LastName}
              </StyledLink>
            </Typography>

            <Typography variant="body1">
              <strong>Room #:</strong> {raInfo.RoomNumber}
            </Typography>

            <Typography variant="body1">
              <strong>Contact:</strong>{' '}
              {raInfo.PreferredContact && raInfo.PreferredContact.includes('http') ? (
                <StyledLink
                  href={raInfo.PreferredContact}
                  underline="hover"
                  className="gc360_text_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Teams
                </StyledLink>
              ) : isMobile && raInfo.PreferredContact ? (
                <StyledLink href={`tel:${raInfo.PreferredContact}`} className="gc360_text_link">
                  {formatPhoneNumber(raInfo.PreferredContact)}
                </StyledLink>
              ) : (
                raInfo.PreferredContact && formatPhoneNumber(raInfo.PreferredContact)
              )}
            </Typography>
          </Grid>

          {/* Avatar Section */}
          <Grid item xs={4}>
            <StyledLink
              href={raProfileLink}
              className="gc360_text_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar
                src={raInfo.PhotoURL || COLOR_80808026_1X1}
                alt={`Profile of ${raInfo.FirstName} ${raInfo.LastName}`}
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

export default MyRA;
