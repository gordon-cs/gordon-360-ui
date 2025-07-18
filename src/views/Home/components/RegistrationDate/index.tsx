import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, Grid, Typography } from '@mui/material';
import { Launch } from '@mui/icons-material';
import registrationService from 'services/registration';
import GordonLoader from 'components/Loader';
import { Link } from 'react-router-dom';

const RegistrationStart = () => {
  const [loading, setLoading] = useState(true);
  const [regInfo, setRegInfo] = useState<{
    Term: string;
    StartTime: string;
    EndTime: string;
    IsEligible: boolean;
    HasHolds: boolean;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  useEffect(() => {
    registrationService
      .getRegistrationPeriod()
      .then((data) => {
        setRegInfo(data);
        setErrorMsg(null);
      })
      .catch((error) => {
        console.error('Error fetching registration data:', error);
        setRegInfo(null);
        setErrorMsg(error?.response?.data ?? 'Registration period is currently unavailable.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formattedStart = regInfo?.StartTime ? new Date(regInfo.StartTime).toLocaleString() : '';
  const formattedEnd = regInfo?.EndTime ? new Date(regInfo.EndTime).toLocaleString() : '';

  return (
    <Card>
      <CardHeader
        title={
          <Link
            to="https://my.gordon.edu/ICS/Academics_UG/Academics_Home.jnz?portlet=Student_Registration"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'inherit',
              textDecoration: 'none',
              width: '100%',
            }}
          >
            <Grid container direction="row" alignItems="center">
              <Grid item xs={7} sx={{ textAlign: 'left' }}>
                <Typography variant="h5" component="div">
                  Registration Info
                </Typography>
              </Grid>
              <Grid container direction="row" justifyContent="flex-end" item xs={5}>
                <Launch color="secondary" />
              </Grid>
            </Grid>
          </Link>
        }
        className="gc360_header"
      />
      <CardContent>
        {errorMsg ? (
          <Typography variant="subtitle1" align="center">
            Not Available
          </Typography>
        ) : (
          <>
            <Typography variant="h6" align="center" sx={{ mb: 2 }}>
              {regInfo?.Term}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" align="center">
                  Registration Opens:
                </Typography>
                <Typography variant="body1" align="center">
                  {formattedStart}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" align="center">
                  Registration Ends:
                </Typography>
                <Typography variant="body1" align="center">
                  {formattedEnd}
                </Typography>
              </Grid>
            </Grid>
            {regInfo && !regInfo.IsEligible && (
              <Typography variant="body1" align="center" color="error" sx={{ mt: 2 }}>
                You are currently not eligible to register.
              </Typography>
            )}
            {regInfo?.HasHolds && (
              <Typography variant="body2" align="center" color="error" sx={{ mt: 2 }}>
                <Link
                  to="https://my.gordon.edu/ICS/Academics_UG/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                >
                  You have one or more holds. Check Gordon Home to see which one.
                </Link>
              </Typography>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RegistrationStart;
