import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
} from '@material-ui/core/';
import { useState, useMemo } from 'react';
import requestInfoUpdate from 'services/update';
import styles from '../Update.module.css';
import GordonLoader from 'components/Loader';
import { gordonColors } from 'theme';
import SimpleSnackbar from 'components/Snackbar';
import GordonOffline from 'components/GordonOffline';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { NotAlumni, UpdateGrid, UpdateForm, UpdateSelect, contentCard } from '../components'


/**
 * Sends an update form to the development office
 */

const UpdatePage = (props) => {
  const isOnline = useNetworkStatus();
  const profile = props.profile;
  const isUserStudent = profile.PersonType.includes('stu');

  const saveUser =
  {
    salutation: profile.Title
      ? profile.Title.charAt(0).toUpperCase() + profile.Title.slice(1).toLowerCase()
      : '',
    firstname: profile.FirstName,
    lastname: profile.LastName,
    middlename: profile.MiddleName,
    preferredname: profile.NickName,
    personalemail: "",
    workemail: "",
    alt_email: profile.Email,
    preferredemail: "",
    doNotContact: false,
    doNotMail: false,
    homephone: profile.HomePhone,
    workphone: "",
    mobilephone: profile.MobilePhone,
    preferredphone: "",
    address: profile.HomeStreet1.length === 0
      ? profile.HomeStreet2
      : profile.HomeStreet1,
    city: profile.HomeCity,
    state: profile.HomeState,
    zip: profile.HomePostalCode,
    country: profile.HomeCountry,
    maritalstatus: profile.Married === 'N'
      ? 'No'
      : profile.Married === 'Y'
        ? 'Yes'
        : ''
  };
  const [userInfo, setUserInfo] = useState(saveUser);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: '', severity: '', open: false });

  /**
   * @param userInfo user information object
   * @returns {Array<Object>} Array of updated fields in a subobject
   */
  function emailContent(userInfo) {
    var updatedFields = [];
    for (const field in userInfo) {
      if (saveUser[field] !== userInfo[field])
        updatedFields.push(
          {
            "field":field,
            "value":userInfo[field]
          }
        );
    }
    return updatedFields;
  }

  const determineChange = () => {
    for (const field in userInfo) {
      if (saveUser[field] !== userInfo[field]){
        return false;
      }
    }
    return true;
  }
  const hasNoChange = useMemo(() => determineChange(), [userInfo]);

  const handleChange = (event) => {
    var info = { ...userInfo, [event.target.name]:
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    }
    setUserInfo(info);
  }

  const createSnackbar = ( message, severity ) => {
    setSnackbar({ message: message, severity: severity, open: true });
  }

  if (props.authentication) {
    const handleSaveButtonClick = () => {
      if (userInfo.firstname === "" || userInfo.lastname === "") {
        createSnackbar('Please fill in your first and last name.','error');
      } else {
        setSaving(true);
        requestInfoUpdate(emailContent(userInfo)).then(() => {
          createSnackbar('A request to update your information has been sent. Please check back later.','info');
          setSaving(false);
        });
      }
    };

    const saveButton = saving
      ? <GordonLoader size={32} />
      : <Button
          variant="contained"
          color="secondary"
          onClick={handleSaveButtonClick}
          disabled={hasNoChange}
        >
          Update
        </Button>;

    const personalInfo = [
      {label: "Salutation", name: "salutation", value: userInfo.salutation},
      {label: "First Name", name: "firstname", value: userInfo.firstname},
      {label: "Last Name", name: "lastname", value: userInfo.lastname},
      {label: "Middle Name", name: "middlename", value: userInfo.middlename},
      {label: "Preferred Name", name: "preferredname", value: userInfo.preferredname},
      {label: "Married", name: "maritalstatus", value: userInfo.maritalstatus}
    ];
    const emailInfo = [
      {label: "Personal Email", name: "personalemail", value: userInfo.personalemail},
      {label: "Work Email", name: "workemail", value: userInfo.workemail},
      {label: "Alternate Email", name: "alt_email", value: userInfo.alt_email},
      {label: "Preferred Email", name: "preferredemail", value: userInfo.preferredemail, menuItem:
        [{value: "Personal Email"}, {value: "Work Email"}, {value: "Alternate Email"}]
      }
    ];
    const phoneInfo = [
      {label: "Home Phone", name: "homephone", value: userInfo.homephone},
      {label: "Work Phone", name: "workphone", value: userInfo.workphone},
      {label: "Mobile Phone", name: "mobilephone", value: userInfo.mobilephone},
      {label: "Preferred Phone", name: "preferredphone", value: userInfo.preferredphone, menuItem:
        [{value: "Home Phone"}, {value: "Work Phone"}, {value: "Mobile Phone"}]
      }
    ];
    const mailingInfo = [
      {label: "Street", name: "address", value: userInfo.address},
      {label: "City", name: "city", value: userInfo.city},
      {label: "State", name: "state", value: userInfo.state},
      {label: "Zip", name: "zip", value: userInfo.zip},
      {label: "Country", name: "country", value: userInfo.country}
    ];
    const shouldContactForm = [
      {label: "Do Not Contact", name: "doNotContact", checked: userInfo.doNotContact},
      {label: "Do Not Mail", name: "doNotMail", checked: userInfo.doNotMail}
    ];

    const infoMap = (data) => {
      return data.map((info) => {
        let content =
          typeof info.checked === "boolean"
          ? <UpdateForm
              info={info}
              onChange={handleChange}
            />
          : typeof info.menuItem === "object"
            ? <UpdateSelect
                info={info}
                onChange={handleChange}
              />
            : <UpdateGrid
                info={info}
                onChange={handleChange}
              />
        return content;
      })
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
                  {contentCard({
                    title: "Personal Information",
                    info: infoMap(personalInfo)
                  })}
                  {contentCard({
                    title: "Email Addresses",
                    info: infoMap(emailInfo)
                  })}
                  {contentCard({
                    title: "Phone Numbers",
                    info: infoMap(phoneInfo)
                  })}
                  {contentCard({
                    title: "Mailing Address",
                    info: infoMap(mailingInfo)
                  })}
                  {contentCard({
                    title: "Contact Preferences",
                    info: infoMap(shouldContactForm)
                  })}
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
      if (!isUserStudent) {
        return <NotAlumni />;
      }
      return <GordonOffline feature="Update" />;
    }
  }
};

export { UpdatePage };
