import { useState, useEffect } from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useUser } from 'hooks';
import { fetchOnDutyRA } from 'services/residentLife/RA_OnCall';
import { formatPhoneNumber } from '../../../../utils/formatPhoneNumber/formatPhoneNumber';
import { staffType } from '../../../../utils/staffType/staffType';
import ScottieMascot from 'views/ResLife/ScottieMascot.png';

const COLOR_80808026_1X1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNsUAMAASwAqHb28sMAAAAASUVORK5CYII=';
const DEFAULT_PROFILE_URL = '/profile/';

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
  const [staffTypeLabel, setStaffTypeLabel] = useState('');
  const { profile } = useUser();
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (profile) {
      const hallID = profile.OnCampusBuilding;
      setStaffTypeLabel(staffType[hallID] || 'RA/AC');

      fetchOnDutyRA(hallID)
        .then((response) => setOnDutyRaInfo(response))
        .catch((error) => console.error(`Failed to fetch On Duty ${staffTypeLabel} info:`, error));
    }
  }, [profile]);

  if (!profile) {
    return (
      <Typography align="center" color="textSecondary">
        Loading your hall details...
      </Typography>
    );
  }

  if (!onDutyRaInfo.RA_Name) {
    return (
      <Card>
        <CardHeader
          title={
            <Grid container justifyContent="center" alignItems="center">
              <Grid item xs={12} align="center">
                On Duty {staffTypeLabel}
              </Grid>
            </Grid>
          }
          className="gc360_header"
        />
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            {/* Text Section */}
            <Grid item xs={8}>
              <Typography variant="subtitle1" color="warning.main">
                No {staffTypeLabel ? staffTypeLabel : 'one'} is on duty right now! 🐾
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Scottie’s keeping an eye on things.
              </Typography>
            </Grid>

            {/* Avatar Section */}
            <Grid
              item
              xs={4}
              container
              justifyContent="center"
              sx={{ marginTop: { xs: 1, sm: 2, md: 2 } }}
            >
              <Avatar
                src={ScottieMascot}
                alt="Scottie"
                sx={{
                  width: { xs: 80, sm: 90, md: 100, lg: 130 },
                  height: { xs: 80, sm: 90, md: 100, lg: 130 },
                  borderRadius: '50%',
                  transition: 'width 0.3s, height 0.3s',
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader
        title={
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} align="center">
              On Duty {staffTypeLabel}
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
                href={DEFAULT_PROFILE_URL + onDutyRaInfo.RA_UserName}
                className="gc360_text_link"
                target={isMobile ? '_self' : '_blank'}
                rel={isMobile ? '' : 'noopener noreferrer'}
              >
                {onDutyRaInfo.RA_Name}
              </StyledLink>
            </Typography>

            <Typography variant="body1">
              <strong>Room #:</strong> {onDutyRaInfo.Room_Number}
            </Typography>

            <Typography variant="body1">
              <strong>Contact:</strong>{' '}
              {onDutyRaInfo.Preferred_Contact && onDutyRaInfo.Preferred_Contact.includes('http') ? (
                <StyledLink
                  href={onDutyRaInfo.Preferred_Contact}
                  underline="hover"
                  className="gc360_text_link"
                  target={isMobile ? '_self' : '_blank'}
                  rel={isMobile ? '' : 'noopener noreferrer'}
                >
                  Teams
                </StyledLink>
              ) : onDutyRaInfo.Preferred_Contact ? (
                <StyledLink
                  href={`tel:${onDutyRaInfo.Preferred_Contact}`}
                  className="gc360_text_link"
                >
                  {formatPhoneNumber(onDutyRaInfo.Preferred_Contact)}
                </StyledLink>
              ) : (
                'No contact available'
              )}
            </Typography>
          </Grid>

          {/* Avatar Section */}
          <Grid
            item
            xs={4}
            container
            justifyContent="center"
            sx={{ marginTop: { xs: 1, sm: 2, md: 2 } }}
          >
            <StyledLink
              href={DEFAULT_PROFILE_URL + onDutyRaInfo.RA_UserName}
              className="gc360_text_link"
              target={isMobile ? '_self' : '_blank'}
              rel={isMobile ? '' : 'noopener noreferrer'}
            >
              <Avatar
                src={onDutyRaInfo.RA_Photo || COLOR_80808026_1X1}
                alt={`Profile of ${onDutyRaInfo.RA_Name}`}
                sx={{
                  width: { xs: 80, sm: 90, md: 100, lg: 130 },
                  height: { xs: 80, sm: 90, md: 100, lg: 130 },
                  borderRadius: '50%',
                  transition: 'width 0.3s, height 0.3s',
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
