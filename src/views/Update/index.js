import { useState, useEffect } from 'react';
import GordonUnauthorized from 'components/GordonUnauthorized';
import { Grid, Card, CardContent, CardHeader, Button, TextField } from '@material-ui/core/';
import updateAlumniInfo from 'services/update';
import styles from './Update.module.css';
import GordonLoader from 'components/Loader';
import SimpleSnackbar from 'components/Snackbar';
import user from 'services/user';
import useNetworkStatus from 'hooks/useNetworkStatus';
import GordonOffline from 'components/GordonOffline';
import userInfo from 'components/Profile/components/PersonalInfoList';
import userService from 'services/user';

const Update = (props) => {
  const [userEmail, setEmail] = useState('');
  const [userHomePhone, setHomePhone] = useState('');
  const [userMobilePhone, setMobilePhone] = useState('');
  const [userAddress1, setAddress1] = useState('');
  const [userAddress2, setAddress2] = useState('');
  const [userCity, setCity] = useState('');
  const [userState, setState] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [isUserStudent, setIsUserStudent] = useState(true);
  const isOnline = useNetworkStatus();

  useEffect(() => {
    setEmail('Test123');
    if (props.authentication) {
      user.getProfileInfo().then((profile) => setIsUserStudent(profile.PersonType.includes('stu')));
    }
  }, [props.authentication]);

  if (props.authentication) {
    const handleSaveButtonClick = () => {
      if (
        userEmail === '' &&
        userHomePhone === '' &&
        userMobilePhone === '' &&
        userAddress1 === '' &&
        userAddress2 === '' &&
        userCity === '' &&
        userState === ''
      ) {
        setSnackbarSeverity('error');
        setSnackbarText('Please fill in at least one field.');
        setSnackbarOpen(true);
      } else {
        setSaving(true);
        updateInfo(
          userEmail,
          userHomePhone,
          userMobilePhone,
          userAddress1,
          userAddress2,
          userCity,
          userState,
        ).then(() => {
          setSnackbarSeverity('info');
          setSnackbarText('Your information has been updated!');
          setSnackbarOpen(true);
          setEmail('');
          setHomePhone('');
          setMobilePhone('');
          setAddress1('');
          setAddress2('');
          setCity('');
          setState('');
          setSaving(false);
        });
      }
    };

    const updateInfo = async (
      userEmail,
      userHomePhone,
      userMobilePhone,
      userAddress1,
      userAddress2,
      userCity,
      userState,
    ) => {
      await updateAlumniInfo.requestInfoUpdate(
        userEmail,
        userHomePhone,
        userMobilePhone,
        userAddress1,
        userAddress2,
        userCity,
        userState,
      );
    };

    const handleCloseSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackbarOpen(false);
    };

    const handleEmail = (event) => {
      setEmail(event.target.value);
    };

    const handleHomePhone = (event) => {
      setHomePhone(event.target.value);
    };

    const handleMobilePhone = (event) => {
      setMobilePhone(event.target.value);
    };

    const handleAddress1 = (event) => {
      setAddress1(event.target.value);
    };
    const handleAddress2 = (event) => {
      setAddress2(event.target.value);
    };

    const handleCity = (event) => {
      setCity(event.target.value);
    };

    const handleState = (event) => {
      setState(event.target.value);
    };

    const saveButton = saving ? (
      <GordonLoader size={32} />
    ) : (
      <Button
        variant="contained"
        className={styles.update_info_button}
        onClick={handleSaveButtonClick}
      >
        Update
      </Button>
    );

    if (isOnline && isUserStudent) {
      return (
        <>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} md={8}>
              <Card className={styles.timesheets}>
                <CardHeader title="Update Your Information" />
                <CardContent>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField
                      className="disable_select"
                      style={{
                        width: 252,
                      }}
                      label="Email Address"
                      value={userEmail}
                      onChange={handleEmail}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField
                      className="disable_select"
                      style={{
                        width: 252,
                      }}
                      label="Home Phone Number"
                      value={userHomePhone}
                      onChange={handleHomePhone}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField
                      className="disable_select"
                      style={{
                        width: 252,
                      }}
                      label="Mobile Phone Number"
                      multiline
                      rowsMax="3"
                      value={userMobilePhone}
                      onChange={handleMobilePhone}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField
                      className="disable_select"
                      style={{
                        width: 252,
                      }}
                      label="Street Address 1"
                      value={userAddress1}
                      onChange={handleAddress1}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField
                      className="disable_select"
                      style={{
                        width: 252,
                      }}
                      label="Street Address 2"
                      value={userAddress2}
                      onChange={handleAddress2}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField
                      className="disable_select"
                      style={{
                        width: 252,
                      }}
                      label="City"
                      value={userCity}
                      onChange={handleCity}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField
                      className="disable_select"
                      style={{
                        width: 252,
                      }}
                      label="State"
                      value={userState}
                      onChange={handleState}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {saveButton}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <SimpleSnackbar
            text={snackbarText}
            severity={snackbarSeverity}
            open={snackbarOpen}
            onClose={handleCloseSnackbar}
          />
        </>
      );
    } else {
      if (!isOnline) {
        return <GordonOffline feature="Update" />;
      } else if (!isUserStudent) {
        return (
          <Grid container justifyContent="center" spacing="16">
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent
                  style={{
                    margin: 'auto',
                    textAlign: 'center',
                  }}
                >
                  <br />
                  <h1>{'Update Information Unavailable'}</h1>
                  <h4>{'Updating alumni info is currently available for alumni only'}</h4>
                  <br />
                  <br />
                  <Button
                    color="primary"
                    backgroundColor="white"
                    variant="outlined"
                    onClick={() => {
                      window.location.pathname = '';
                    }}
                  >
                    Back To Home
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );
      }
    }
  } else {
    return <GordonUnauthorized feature={'update'} />;
  }
};

export default Update;
