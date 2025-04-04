import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Link,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomizedTable from '../RDView/components/OnDutyTable';
import OnDutyMobile from '../RDView/components/OnDutyMobileView';
import OnDutyRD from '../RAView/components/RD-OnCall';
import HousingBanner from '../ResidentView/components/HousingWelcome/Banner';
import { getPhoneNumberByName } from 'services/residentLife/RD_OnCall';
import { useEffect, useState } from 'react';
import { formatPhoneNumber } from 'views/ResLife/utils/formatPhoneNumber/formatPhoneNumber';

// Styling for links using existing 360 colors
const StyledLink = styled('a')(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.warning.main,
  },
}));

const StaffView = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [STU_LIFE_PHONE_NUMBER, setStuLifePhoneNumber] = useState('');

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const result = await getPhoneNumberByName('stulife');
        setStuLifePhoneNumber(result);
      } catch (err) {
        console.error('Failed to fetch Student Life phone number:', err);
        setStuLifePhoneNumber('Unavailable');
      }
    };

    fetchPhoneNumber();
  }, []);

  return (
    <Grid container justifyContent="center">
      <HousingBanner />
      <Box mt={5} />

      {!isMobile && (
        <Grid item xs={12} md={20} padding={1}>
          <Card>
            <CardHeader
              title={
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={12} align="center">
                    RA on Duty by Hall
                  </Grid>
                </Grid>
              }
              className="gc360_header"
            />
            <CardContent>
              <CustomizedTable />
            </CardContent>
          </Card>

          <Box mt={5} />

          <Grid container spacing={5} padding={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <OnDutyRD />
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader
                  title={
                    <Grid container direction="row" alignItems="center">
                      <Grid item xs={12} align="center">
                        Student Life Contact Info
                      </Grid>
                    </Grid>
                  }
                  className="gc360_header"
                />
                <CardContent>
                  <Typography>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography variant="body1">
                              <strong>Student Life Phone: </strong>
                              <StyledLink
                                href={`tel:${STU_LIFE_PHONE_NUMBER}`}
                                className="gc360_text_link"
                              >
                                {formatPhoneNumber(STU_LIFE_PHONE_NUMBER)}
                              </StyledLink>
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <>
                              <strong>Email:</strong>{' '}
                              <Link
                                href="mailto:studentlife@gordon.edu"
                                underline="hover"
                                className="gc360_text_link"
                              >
                                StudentLife@gordon.edu
                              </Link>
                            </>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <>
                              <strong>Gordon Police Non-Emergency:</strong> (978) 867-4444
                            </>
                          }
                        />
                      </ListItem>
                    </List>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      )}

      {isMobile && (
        <>
          <Box mt={5} />
          <Grid item xs={12} md={20} padding={1}>
            <Card>
              <CardHeader
                title={
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={12} align="center">
                      RA on Duty by Hall
                    </Grid>
                  </Grid>
                }
                className="gc360_header"
              />
              <CardContent>
                <OnDutyMobile />
              </CardContent>
            </Card>

            <Box mt={5} />

            <Card>
              <OnDutyRD />
            </Card>

            <Box mt={5} />

            <Card>
              <CardHeader
                title={
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={12} align="center">
                      Student Life Contact Info
                    </Grid>
                  </Grid>
                }
                className="gc360_header"
              />
              <CardContent>
                <Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={
                          <>
                            <strong>Phone:</strong> {STU_LIFE_PHONE_NUMBER}
                          </>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={
                          <>
                            <strong>Email:</strong>{' '}
                            <Link
                              href="mailto:studentlife@gordon.edu"
                              underline="hover"
                              className="gc360_text_link"
                            >
                              StudentLife@gordon.edu
                            </Link>
                          </>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={
                          <>
                            <strong>Emergency:</strong> Gordon Police (978) 867-4444
                          </>
                        }
                      />
                    </ListItem>
                  </List>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </>
      )}
      <Box mt={5} />
    </Grid>
  );
};

export default StaffView;
