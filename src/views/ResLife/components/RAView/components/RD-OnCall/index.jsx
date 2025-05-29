import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ScottieMascot from 'views/ResLife/ScottieMascot.png';
import { getRDOnCall, getPhoneNumberByName } from 'services/residentLife/RD_OnCall';
import { formatPhoneNumber } from 'views/ResLife/utils/formatPhoneNumber/formatPhoneNumber';

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

function getUsernameFromEmail(email) {
  if (!email) return '';
  return email.split('@')[0];
}

const OnDutyRD = () => {
  const [onDutyRdInfo, setOnDutyRdInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [RD_phonenumber, setRDPhoneNumber] = useState('');

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const result = await getPhoneNumberByName('rd');
        setRDPhoneNumber(result);
      } catch (err) {
        console.error('Failed to fetch RD phone number:', err);
        setRDPhoneNumber('Unavailable');
      }
    };

    fetchPhoneNumber();
  }, []);

  useEffect(() => {
    async function fetchRD() {
      try {
        const rdInfo = await getRDOnCall();
        setOnDutyRdInfo(rdInfo);
      } catch (error) {
        console.error('Failed to fetch On Duty RD info:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRD();
  }, []);

  if (loading) {
    return (
      <Typography align="center" color="textSecondary">
        Loading on-duty RD...
      </Typography>
    );
  }

  if (!onDutyRdInfo || !onDutyRdInfo.RD_Name) {
    return (
      <Card>
        <CardHeader
          title={
            <Grid container direction="row" alignItems="center">
              <Grid item xs={12} align="center">
                On Duty RD
              </Grid>
            </Grid>
          }
          className="gc360_header"
        />
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            {/* Text Section */}
            <Grid item xs={8}>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" color="warning.main">
                        No RD is on duty right now! 🐾
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Scottie’s keeping an eye on things." />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        <strong>RD On-Call Phone: </strong>
                        <StyledLink href={`tel:${RD_phonenumber}`} className="gc360_text_link">
                          {formatPhoneNumber(RD_phonenumber)}
                        </StyledLink>
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Grid>

            {/* Avatar Section */}
            <Grid item xs={4} container justifyContent="center">
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

  const rdUsername = getUsernameFromEmail(onDutyRdInfo.RD_Email);
  const profileLink = `/profile/${rdUsername}`;

  return (
    <Card>
      <CardHeader
        title={
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} align="center">
              On Duty RD
            </Grid>
          </Grid>
        }
        className="gc360_header"
      />
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Text Section */}
          <Grid item xs={8}>
            <List>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="body1">
                      <strong>Name: </strong>
                      {onDutyRdInfo.RD_Email ? (
                        <StyledLink
                          href={profileLink}
                          className="gc360_text_link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {onDutyRdInfo.RD_Name}
                        </StyledLink>
                      ) : (
                        onDutyRdInfo.RD_Name
                      )}
                    </Typography>
                  }
                />
              </ListItem>
              {onDutyRdInfo.RD_Email && (
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        <strong>Email: </strong>
                        <StyledLink
                          href={`mailto:${onDutyRdInfo.RD_Email}`}
                          className="gc360_text_link"
                        >
                          {onDutyRdInfo.RD_Email}
                        </StyledLink>
                      </Typography>
                    }
                  />
                </ListItem>
              )}
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="body1">
                      <strong>RD On-Call Phone: </strong>
                      <StyledLink href={`tel:${RD_phonenumber}`} className="gc360_text_link">
                        {formatPhoneNumber(RD_phonenumber)}
                      </StyledLink>
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Grid>

          {/* Avatar Section */}
          <Grid item xs={4} container justifyContent="center">
            <StyledLink
              href={profileLink}
              className="gc360_text_link"
              target={isMobile ? '_self' : '_blank'}
              rel={isMobile ? '' : 'noopener noreferrer'}
            >
              <Avatar
                src={onDutyRdInfo.RD_Photo || COLOR_80808026_1X1}
                alt={`Profile of ${onDutyRdInfo.RD_Name}`}
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

export default OnDutyRD;
