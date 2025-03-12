import { useState, useEffect } from 'react';
import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useUser } from 'hooks';
import { fetchRaInfo } from 'services/residentLife/ResidentStaff';
import { fetchRAStatuses } from 'services/residentLife/RA_Statuses';
import { formatPhoneNumber } from '../../../../utils/formatPhoneNumber/formatPhoneNumber';
import { staffType } from '../../../../utils/staffType/staffType';

const DEFAULT_PROFILE_URL = '/profile/';
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
  const [statusList, setStatusList] = useState([]);
  const { profile } = useUser();
  const [currentStatus, setCurrentStatus] = useState('');

  useEffect(() => {
    if (profile) {
      const hallID = profile.OnCampusBuilding;
      const roomNumber = profile.OnCampusRoom.replace(/\D/g, '');

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

    if (raInfo?.ID) {
      fetchRAStatuses(raInfo.ID)
        .then((response) => setStatusList(response))
        .catch((error) => console.error('Failed to fetch statuses', error));
    }
  }, [raInfo]);

  useEffect(() => {
    if (statusList.length > 0) {
      for (let index = 0; index < statusList.length; index++) {
        const status = statusList[index];
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const currentTime = hours * 10000 + minutes * 100 + seconds;

        const startTime = Number(status.Start_Time.replaceAll(':', ''));
        const endTime = Number(status.End_Time.replaceAll(':', ''));

        if (startTime <= currentTime && endTime >= currentTime) {
          setCurrentStatus(status.StatusName);
          break;
        }
      }
    }
  }, [statusList]);

  const avatar = (
    <Avatar
      src={raInfo.PhotoURL || COLOR_80808026_1X1}
      alt={`Profile of ${raInfo.FirstName} ${raInfo.LastName}`}
      sx={{
        width: { xs: 80, sm: 90, md: 100, lg: 130 },
        height: { xs: 80, sm: 90, md: 100, lg: 130 },
        borderRadius: '50%',
        transition: 'width 0.3s, height 0.3s',
      }}
    />
  );

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
              {`My ${staffTypeLabel || 'RA/AC'}`}
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
              <strong>{staffTypeLabel ? staffTypeLabel : 'Loading'}: </strong>
              {raInfo?.FirstName && raInfo?.LastName ? (
                <StyledLink
                  href={raProfileLink}
                  className="gc360_text_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {raInfo.FirstName} {raInfo.LastName}
                </StyledLink>
              ) : (
                <StyledLink className="gc360_text_link">
                  {`No ${staffTypeLabel || 'Staff'} Assigned`}
                </StyledLink>
              )}
            </Typography>

            <Typography variant="body1">
              <strong>Room #:</strong> {raInfo.RoomNumber ? raInfo.RoomNumber : 'N/A'}
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
              ) : raInfo.PreferredContact ? (
                <StyledLink href={`tel:${raInfo.PreferredContact}`} className="gc360_text_link">
                  {formatPhoneNumber(raInfo.PreferredContact)}
                </StyledLink>
              ) : (
                <StyledLink className="gc360_text_link">No contact available</StyledLink>
              )}
            </Typography>

            <Typography variant="body1">
              <strong>Status:</strong> {currentStatus}
            </Typography>

            <Typography variant="body1">
              <strong>
                Next available<span style={{ color: 'red' }}>*</span>:
              </strong>
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
            {raProfileLink ? (
              <StyledLink
                href={raProfileLink}
                className="gc360_text_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {avatar}
              </StyledLink>
            ) : (
              <StyledLink className="gc360_text_link">{avatar}</StyledLink>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MyRA;
