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
//import userInfo from 'components/Profile/components/PersonalInfoList';
//import userService from 'services/user';

/**
 * Sends an update form to the development office with the following queried parameters
 *
 * @param {string} userSaluation updated with the user's new salutation
 * @param {string} userFirstName updated with the user's new first name
 * @param {string} userLastName updated with the user's new last name
 * @param {string} userMiddleName updated with the user's new middle name
 * @param {string} userPreferredName updated with the user's new preferred name
 * @param {string} userPersonalEmail updated with the user's new personal email
 * @param {string} userWorkEmail updated with the user's new work email
 * @param {string} userAlternateEmail updated with the user's new alternate email
 * @param {string} userPreferredEmail updated with the user's new preferred email
 * @param {boolean} userDoNotContact updated with the user's new do not contact preference
 * @param {boolean} userDoNotMail updated with the user's new do not mail preference
 * @param {string} userHomePhone updated with the user's new home phone
 * @param {string} userWorkPhone updated with the user's new work phone
 * @param {string} userMobilePhone updated with the user's new mobile phone
 * @param {string} userPreferredPhone updated with the user's new preferred phone
 * @param {string} userMailingStreet updated with the user's new mailing street
 * @param {string} userMailingCity updated with the user's new mailing city
 * @param {string} userMailingState updated with the user's new mailing state
 * @param {string} userMailingZip updated with the user's new mailing zip
 * @param {string} userMailingCountry updated with the user's new mailing country
 * @param {string} userMaritalStatus updated with the user's new marital status
 */

const Update = (props) => {
  const isOnline = useNetworkStatus();
  const user = useUser();

  const profileSalutation = user.profile?.Title
  ? user.profile.Title.charAt(0).toUpperCase() + user.profile.Title.slice(1).toLowerCase(): '';

  const profileMaritalStatus = user.profile.Married === 'N'
  ? 'No' : user.profile.Married === 'Y' ? 'Yes' : '';

  const address = (user.profile.HomeStreet1.length === 0)
  ? user.profile.HomeStreet2 : user.profile.HomeStreet1;

  const [userDoNotContact, setDoNotContact] = useState(false);
  const [userDoNotMail, setDoNotMail] = useState(false);

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

  const handleChange = (event) => {
      setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  }

  const [saving, setSaving] = useState(false);

  const [snackbar, setSnackbar] = useState({ message: '', severity: '', open: false});
  const createSnackbar = ( message, severity ) => {
    setSnackbar({message: message, severity: severity, open: true});
  }

  const [isUserStudent, setIsUserStudent] = useState(true);

  // // I considered using a HashMap to get the names, but I don't think it's necessary.
  // // Both arrays are constant. Many reasons why 2 arrays is better than one HashMap here.
  // const formFields = [userPersonalEmail, userWorkEmail, userPreferredEmail, userDoNotContact,
  // userDoNotMail, userWorkPhone, userPreferredPhone]

  // const formHeadings = ["Personal Email", "Work Email", "Preferred Email", "Do Not Contact",
  // "Do Not Mail", "Work Phone", "Preferred Phone"]

  // const autoFill = [user.profile.MiddleName, user.profile.NickName, user.profile.Email,
  // user.profile.HomePhone, user.profile.MobilePhone, user.profile.HomeCity, user.profile.HomeState,
  // user.profile.HomePostalCode, user.profile.HomeCountry, profileSalutation, address, profileMaritalStatus]

  // const currentFields = [userMiddleName, userPreferredName, userAlternateEmail,
  // userHomePhone, userMobilePhone, userMailingCity, userMailingState, userMailingZip, userMailingCountry,
  // userSalutation, userMailingStreet, profileMaritalStatus]

  // const currentHeadings = ["Middle Name", "Preferred Name", "Alternate Email", "Home Phone", "Mobile Phone",
  // "City", "State", "Zip", "Country", "Salutation", "Mailing Address", "Married"]

  useEffect(() => {
    if (props.authentication) {
      userService.getProfileInfo().then((profile) => setIsUserStudent(profile.PersonType.includes('stu')));
    }
  }, [props.authentication]);

  if (props.authentication) {
    /**
     *
     *
     * SAVE BUTTON HERE
     * SQL/BACKEND LINKING DONE YET
     *
     *
     */
    const handleSaveButtonClick = () => {
      if (userInfo.firstname === "" || userInfo.lastname === "") {
        createSnackbar('Please fill in your first and last name.','error');
      } else {
        setSaving(true);
        updateInfo(
          emailBody()
        ).then(() => {
          createSnackbar('A request to update your information has been sent. Please check back later.','info');
          setUserInfo(
            {
              salutation: "",
              firstname: "",
              lastname: "",
              middlename: "",
              preferredname: "",
              personalemail: "",
              workemail: "",
              alt_email: "",
              preferredemail: "",
              doNotContact: userInfo.doNotContact,
              doNotMail: userInfo.doNotMail,
              homephone: "",
              workphone: "",
              mobilephone: "",
              preferredphone: "",
              address: "",
              city: "",
              state: "",
              zip: "",
              country: "",
              maritalstatus: ""
            }
          )

          setSaving(false);
        });
      }
    };
    /**
     * TODO
     * REWORK EMAILBODY TO NOT REQUIRE USEEFFECT
     * NEW OBJECT IMPLEMENTATION IN PROGRESS
     */
    function emailBody() {
      var email_content = `<b>First name:</b> ${userInfo.firstname} <br /> <b>Last name:</b> ${userInfo.lastname} <br />`;
      // for (let i = 0; i < autoFill.length; i++) {
      //   if (autoFill[i] !== currentFields[i]) {
      //     email_content = `${email_content} <b>${currentHeadings[i]}:</b> ${currentFields[i]} <br />`;
      //   }
      // }
      // for (let i = 0; i < formFields.length; i++) {
      //     if (formFields[i] !== ''){
      //     email_content = `${email_content} <b>${formHeadings[i]}:</b> ${formFields[i]} <br />`;
      //   }
      // }
      email_content = `<p> ${email_content} </p>`

      return email_content;
    }

    const updateInfo = async (
      email_content
    ) => {
      updateAlumniInfo.requestInfoUpdate(
        email_content,
      );
    };

    const handleDoNotContact = () => {
      setDoNotContact(!userDoNotContact);
    };
    const handleDoNotMail = () => {
      setDoNotMail(!userDoNotMail);
    };

    const saveButton = saving ? (
      <GordonLoader size={32} />
    ) : (
      <Button
        variant="contained"
        className={styles.update_button}
        onClick={handleSaveButtonClick}
      >
        Update
      </Button>
    );

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
                        <Grid item xs={9} md={3} lg={3} className={styles.update_text}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Salutation"
                            name="salutation"
                            value={userInfo.salutation}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                                width: 252,
                            }}
                            label="First Name"
                            name="firstname"
                            value={userInfo.firstname}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Last Name"
                            name="lastname"
                            value={userInfo.lastname}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Middle Name"
                            name="middlename"
                            value={userInfo.middlename}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Preferred Name"
                            name="preferredname"
                            value={userInfo.preferredname}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Married"
                            name="maritalstatus"
                            value={userInfo.maritalstatus}
                            onChange={handleChange}
                          />
                        </Grid>
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
                        <Grid item xs={9} md={6} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Personal Email"
                            name="personalemail"
                            value={userInfo.personalemail}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Work Email"
                            name="workemail"
                            value={userInfo.workemail}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Alternate Email"
                            name="alt_email"
                            value={userInfo.alt_email}
                            onChange={handleChange}
                          />
                        </Grid>
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
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Home Phone"
                            name="homephone"
                            value={userInfo.homephone}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Work Phone"
                            name="workphone"
                            value={userInfo.workphone}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Mobile Phone"
                            name="mobilephone"
                            value={userInfo.mobilephone}
                            onChange={handleChange}
                          />
                        </Grid>
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
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Street"
                            name="address"
                            value={userInfo.address}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="City"
                            name="city"
                            value={userInfo.city}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="State"
                            name="state"
                            value={userInfo.state}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Zip"
                            name="zip"
                            value={userInfo.zip}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <TextField
                            className="disable_select"
                            style={{
                              width: 252,
                            }}
                            label="Country"
                            name="country"
                            value={userInfo.country}
                            onChange={handleChange}
                          />
                        </Grid>
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
                              <Checkbox checked={userDoNotContact}
                              onChange={handleDoNotContact} />
                            }
                            label="Do Not Contact"
                            name="doNotContact"
                          />
                        </Grid>
                        <Grid item xs={9} md={3} lg={3}>
                          <FormControlLabel
                            control={<Checkbox checked={userDoNotMail}
                            onChange={handleDoNotMail} />}
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
