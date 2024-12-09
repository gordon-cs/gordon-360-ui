import { useState, useEffect } from 'react';
import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useUser } from 'hooks';
import { fetchOnDutyRA } from 'services/residentLife/RA_OnCall';
import { formatPhoneNumber } from '../../../../utils/formatPhoneNumber/formatPhoneNumber';
import { staffType } from '../../../../utils/staffType/staffType';
import { isMobile } from '../../../../utils/isMobile/isMobile';

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

const OnDuty = () => {
  const [onDutyRaInfo, setOnDutyRaInfo] = useState({});
  const [staffTypeLabel, setStaffTypeLabel] = useState('');
  const { profile } = useUser();
  const mobileDevice = isMobile();

  useEffect(() => {
    console.log(mobileDevice ? 'Mobile device detected' : 'Desktop device detected');

    if (profile) {
      const hallID = profile.OnCampusBuilding;

      // Display either 'RA' or 'AC' depending on the resident's building
      setStaffTypeLabel(staffType[hallID] || 'N/A');

      fetchOnDutyRA(hallID)
        .then((response) => setOnDutyRaInfo(response))
        .catch((error) => console.error(`Failed to fetch On Duty ${staffTypeLabel} info:`, error));
    }
  }, [profile]);

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
                alt={`Profile of ${onDutyRaInfo.RA_Name}`}
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
