import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core/';
import { useUser } from 'hooks';
import { useState, useEffect } from 'react';
import GordonUnauthorized from 'components/GordonUnauthorized';
import updateAlumniInfo from 'services/update';
import styles from './Update.module.css';
import GordonLoader from 'components/Loader';
import { gordonColors } from 'theme';
import SimpleSnackbar from 'components/Snackbar';
import userService from 'services/user';
import useNetworkStatus from 'hooks/useNetworkStatus';
import GordonOffline from 'components/GordonOffline';


function UpdateGrid(props) {
  return (
    <Grid item xs={9} md={3} lg={3}>
      <TextField
        className="disable_select"
        style={{ width: 252, }}
        label={props.label}
        name={props.name}
        value={props.value}
        onChange={props.change}
      />
    </Grid>
  )
}

/**
 * Sends an update form to the development office
 */

const Update = (props) => {
  const isOnline = useNetworkStatus();
  const user = useUser();

  const profileSalutation = user.profile?.Title
    ? user.profile.Title.charAt(0).toUpperCase() + user.profile.Title.slice(1).toLowerCase()
    : '';

  const profileMaritalStatus = user.profile.Married === 'N'
    ? 'No'
    : user.profile.Married === 'Y'
      ? 'Yes'
      : '';

  const address = (user.profile.HomeStreet1.length === 0)
    ? user.profile.HomeStreet2
    : user.profile.HomeStreet1;


  const [userInfo, setUserInfo] =
    useState(
      {
        salutation: profileSalutation,
        firstname: user.profile.FirstName,
        lastname: user.profile.LastName,
        middlename: user.profile.MiddleName,
        preferredname: user.profile.NickName,
        personalemail: "",
        workemail: "",
        alt_email: user.profile.Email,
        preferredemail: "",
        doNotContact: false,
        doNotMail: false,
        homephone: user.profile.HomePhone,
        workphone: "",
        mobilephone: user.profile.MobilePhone,
        preferredphone: "",
        address: address,
        city: user.profile.HomeCity,
        state: user.profile.HomeState,
        zip: user.profile.HomePostalCode,
        country: user.profile.HomeCountry,
        maritalstatus: profileMaritalStatus
      }
    );
  // done as a user autofill backup
  const saveUser = userInfo;

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value
      ? event.target.value
      : !userInfo[event.target.name]
    });
  }

  const [saving, setSaving] = useState(false);

  const [snackbar, setSnackbar] = useState({ message: '', severity: '', open: false});
  const createSnackbar = ( message, severity ) => {
    setSnackbar({message: message, severity: severity, open: true});
  }

  const [isUserStudent, setIsUserStudent] = useState(true);

  useEffect(() => {
    if (props.authentication) {
      userService.getProfileInfo().then((profile) => setIsUserStudent(profile.PersonType.includes('stu')));
    }
  }, [props.authentication]);

  if (props.authentication) {
    const handleSaveButtonClick = () => {
      if (userInfo.firstname === "" || userInfo.lastname === "") {
        createSnackbar('Please fill in your first and last name.','error');
      } else {
        setSaving(true);
        updateInfo(
          emailBody()
        ).then(() => {
          createSnackbar('A request to update your information has been sent. Please check back later.','info');
          setSaving(false);
        });
      }
    };
    /**
     * Database stringify'd object
     *
     * @returns {string} JSON object
     */
    function emailBody() {
      for (const key in userInfo) {
        saveUser[key] = userInfo[key] !== saveUser[key] ? userInfo[key] : saveUser[key];
      }
      console.log(saveUser);
      return JSON.stringify(saveUser);
    }

    const updateInfo = async (
      email_content
    ) => {
      updateAlumniInfo.requestInfoUpdate(
        email_content,
      );
    };

    const saveButton = saving
      ? <GordonLoader size={32} />
      : <Button
          variant="contained"
          className={styles.update_button}
          onClick={handleSaveButtonClick}
        >
          Update
        </Button>;

    const PersonalInfo = [
      {label: "Salutation", name: "salutation", value: userInfo.salutation},
      {label: "First Name", name: "firstname", value: userInfo.firstname},
      {label: "Last Name", name: "lastname", value: userInfo.lastname},
      {label: "Middle Name", name: "middlename", value: userInfo.middlename},
      {label: "Preferred Name", name: "preferredname", value: userInfo.preferredname},
      {label: "Married", name: "maritalstatus", value: userInfo.maritalstatus}
    ];
    const EmailInfo = [
      {label: "Personal Email", name: "personalemail", value: userInfo.personalemail},
      {label: "Work Email", name: "workemail", value: userInfo.workemail},
      {label: "Alternate Email", name: "alt_email", value: userInfo.alt_email}
    ];
    const PhoneInfo = [
      {label: "Home Phone", name: "homephone", value: userInfo.homephone},
      {label: "Work Phone", name: "workphone", value: userInfo.workphone},
      {label: "Mobile Phone", name: "mobilephone", value: userInfo.mobilephone}
    ];
    const MailingInfo = [
      {label: "Street", name: "address", value: userInfo.address},
      {label: "City", name: "city", value: userInfo.city},
      {label: "State", name: "state", value: userInfo.state},
      {label: "Zip", name: "zip", value: userInfo.zip},
      {label: "Country", name: "country", value: userInfo.country}
    ];

    const infoMap = (data) => {
      return(
        data.map((info) => (
          <UpdateGrid
            label={info.label}
            name={info.name}
            value={info.value}
            change={handleChange}
          />
        ))
      )
    }

    if (isOnline && isUserStudent) {
      return (
        <>
          <Grid container justifyContent="center">
            <Grid item xs={12} lg={8}>
              <Card className={styles.update}>
                <CardHeader
                  className={styles.update_title}
                  title="Update Information"
                  titleTypographyProps={{ variant: 'h4' }}
                />
                <CardContent>
                  <Card>
                    <CardHeader
                      className={styles.update_header}
                      title="Personal Information"
                    />
                    <CardContent>
                      <Grid container>
                        {infoMap(PersonalInfo)}
                      </Grid>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader
                      className={styles.update_header}
                      title="Email Addresses"
                    />
                    <CardContent>
                      <Grid container>
                        {infoMap(EmailInfo)}
                        <Grid item xs={9} md={3} lg={3}>
                          <FormControl style={{ width: 252 }}>
                            <InputLabel>Preferred Email</InputLabel>
                            <Select
                              label="Preferred Email"
                              name="preferredemail"
                              value={userInfo.preferredemail}
                              onChange={handleChange}
                            >
                              <MenuItem value="Personal Email">Personal Email</MenuItem>
                              <MenuItem value="Work Email">Work Email</MenuItem>
                              <MenuItem value="Alternate Email">Alternate Email</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader
                      className={styles.update_header}
                      title="Phone Numbers"
                    />
                    <CardContent>
                      <Grid container>
                        {infoMap(PhoneInfo)}
                        <Grid item xs={9} md={3} lg={3}>
                          <FormControl style={{ width: 252 }}>
                            <InputLabel>Preferred Phone</InputLabel>
                            <Select
                              label="Preferred Phone"
                              name="preferredphone"
                              value={userInfo.preferredphone}
                              onChange={handleChange}
                            >
                              <MenuItem value="Home Phone">Home Phone</MenuItem>
                              <MenuItem value="Work Phone">Work Phone</MenuItem>
                              <MenuItem value="Mobile Phone">Mobile Phone</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader
                      className={styles.update_header}
                      title="Mailing Address"
                    />
                    <CardContent>
                      <Grid container>
                        {infoMap(MailingInfo)}
                      </Grid>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader
                      className={styles.update_header}
                      title="Contact Preferences"
                    />
                    <CardContent>
                      <Grid container>
                        <Grid item xs={9} md={3} lg={3}>
                          <FormControlLabel
                            control={
                              <Checkbox checked={userInfo.doNotContact}
                              onChange={handleChange} />
                            }
                            label="Do Not Contact"
                            name="doNotContact"
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <FormControlLabel
                            control={<Checkbox checked={userInfo.doNotMail}
                            onChange={handleChange} />}
                            label="Do Not Mail"
                            name="doNotMail"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  <Grid item xs={12} justifyContent="center">
                    {saveButton}
                  </Grid>
                </CardContent>
              </Card>
              <Typography variant="subtitle1">
                Found a bug?
                <a href="mailto:cts@gordon.edu?Subject=Gordon 360 Bug">
                  <Button
                    style={{ color: gordonColors.primary.cyan }}>Report to CTS</Button>
                </a>
              </Typography>
            </Grid>
          </Grid>
          <SimpleSnackbar
            text={snackbar.message}
            severity={snackbar.severity}
            open={snackbar.open}
            onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
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
                </CardContent>
                <Button
                  className={styles.update_info_button}
                  justifyContent="center"
                  onClick={() => {
                    window.location.pathname = '';
                  }}
                >
                  Back To Home
                </Button>
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
