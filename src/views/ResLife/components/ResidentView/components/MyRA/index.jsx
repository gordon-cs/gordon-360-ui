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
  const [currentStatus, setCurrentStatus] = useState('No current status');
  const [isAvailable, setIsAvailable] = useState(true);
  const [nextEventTime, setNextEventTime] = useState('N/A');
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (profile) {
      const Hall_ID = profile.OnCampusBuilding;
      const Room_Number = profile.OnCampusRoom.replace(/\D/g, '');

      // Display either 'RA' or 'AC' depending on the resident's building
      setStaffTypeLabel(staffType[Hall_ID] || 'RA/AC');

      fetchRaInfo(Hall_ID, Room_Number)
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
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const currentTime = hours * 10000 + minutes * 100 + seconds;

      for (let index = 0; index < statusList.length; index++) {
        const status = statusList[index];

        const startTime = Number(status.Start_Time.replaceAll(':', ''));
        const endTime = Number(status.End_Time.replaceAll(':', ''));

        if (startTime <= currentTime && endTime >= currentTime) {
          setCurrentStatus(status.Status_Name);
          setIsAvailable(status.Available);
          findNextStatus(index);
          break;
        } else {
          // if there is no status currently going on, find when next status occurs (if any)
          if (index == statusList.length - 1) {
            findNextTime(currentTime);
            setCurrentStatus('No current status');
          }
        }
      }
    }
  }, [statusList]);

  // find the next status
  const findNextStatus = (statusIndex) => {
    const nextIndex = statusIndex + 1;
    if (nextIndex >= statusList.length) {
      setNextEventTime('N/A');
    } else {
      if (statusList[nextIndex].Available != statusList[statusIndex].Available) {
        setNextEventTime(convertTo12HourFormat(statusList[nextIndex].Start_Time.slice(0, 5)));
      } else {
        findNextStatus(nextIndex);
      }
    }
  };

  // find the next time where they are available or busy
  const findNextTime = (currTime) => {
    for (let index = 0; index < statusList.length; index++) {
      const status = statusList[index];
      const startTime = Number(status.Start_Time.replaceAll(':', ''));
      if (startTime >= currTime) {
        setNextEventTime(convertTo12HourFormat(status.Start_Time.slice(0, 5)));
        setIsAvailable(!status.Available);
        break;
      }
    }
  };

  // formats time to match 12 hour clock
  const convertTo12HourFormat = (time24) => {
    let [hours, minutes] = time24.split(':');
    let period = 'AM';

    hours = parseInt(hours, 10);
    if (hours >= 12) {
      period = 'PM';
      if (hours > 12) hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }

    return `${hours}:${minutes} ${period}`;
  };

  const avatar = (
    <Avatar
      src={raInfo.Photo_URL || COLOR_80808026_1X1}
      alt={`Profile of ${raInfo.First_Name} ${raInfo.Last_Name}`}
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
              {raInfo?.First_Name && raInfo?.Last_Name ? (
                <StyledLink
                  href={raProfileLink}
                  className="gc360_text_link"
                  target={isMobile ? '_self' : '_blank'}
                  rel={isMobile ? '' : 'noopener noreferrer'}
                >
                  {raInfo.First_Name} {raInfo.Last_Name}
                </StyledLink>
              ) : (
                <StyledLink className="gc360_text_link">
                  {`No ${staffTypeLabel || 'Staff'} Assigned`}
                </StyledLink>
              )}
            </Typography>

            <Typography variant="body1">
              <strong>Room #:</strong> {raInfo.Room_Number ? raInfo.Room_Number : 'N/A'}
            </Typography>

            <Typography variant="body1">
              <strong>Contact:</strong>{' '}
              {raInfo.Preferred_Contact && raInfo.Preferred_Contact.includes('http') ? (
                <StyledLink
                  href={raInfo.Preferred_Contact}
                  underline="hover"
                  className="gc360_text_link"
                  target={isMobile ? '_self' : '_blank'}
                  rel={isMobile ? '' : 'noopener noreferrer'}
                >
                  Teams
                </StyledLink>
              ) : raInfo.Preferred_Contact ? (
                <StyledLink href={`tel:${raInfo.Preferred_Contact}`} className="gc360_text_link">
                  {formatPhoneNumber(raInfo.Preferred_Contact)}
                </StyledLink>
              ) : (
                <StyledLink className="gc360_text_link">No contact available</StyledLink>
              )}
            </Typography>

            <Typography variant="body1">
              <strong>Status:</strong> {currentStatus}
            </Typography>

            <Typography variant="body1">
              {isAvailable ? (
                <strong>
                  Available until<span style={{ color: 'red' }}>*</span>:{' '}
                </strong>
              ) : (
                <strong>
                  Next available<span style={{ color: 'red' }}>*</span>:{' '}
                </strong>
              )}
              {nextEventTime}
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
                target={isMobile ? '_self' : '_blank'}
                rel={isMobile ? '' : 'noopener noreferrer'}
              >
                {avatar}
              </StyledLink>
            ) : (
              <StyledLink className="gc360_text_link">{avatar}</StyledLink>
            )}
          </Grid>

          <Typography variant="caption">
            <span style={{ color: 'red' }}>*</span>Times are approximate
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MyRA;
