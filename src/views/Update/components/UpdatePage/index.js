import { Typography, Grid, Card, CardContent, CardHeader, Button } from '@material-ui/core/';
import { useState, useMemo } from 'react';
import requestInfoUpdate from 'services/update';
import styles from '../Update.module.css';
import GordonLoader from 'components/Loader';
import { gordonColors } from 'theme';
import SimpleSnackbar from 'components/Snackbar';
import GordonOffline from 'components/GordonOffline';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { ProfileUpdateField, NotAlumni, ContentCard } from '..';

const personalInfoFields = [
  { label: 'Salutation', name: 'salutation', type: 'textfield' },
  { label: 'First Name', name: 'firstname', type: 'textfield' },
  { label: 'Last Name', name: 'lastname', type: 'textfield' },
  { label: 'Middle Name', name: 'middlename', type: 'textfield' },
  { label: 'Preferred Name', name: 'preferredname', type: 'textfield' },
  { label: 'Married', name: 'maritalstatus', type: 'textfield' },
];
const emailInfoFields = [
  { label: 'Personal Email', name: 'personalemail', type: 'textfield' },
  { label: 'Work Email', name: 'workemail', type: 'textfield' },
  { label: 'Alternate Email', name: 'alt_email', type: 'textfield' },
  {
    label: 'Preferred Email',
    name: 'preferredemail',
    type: 'select',
    menuItems: [{ value: 'Personal Email' }, { value: 'Work Email' }, { value: 'Alternate Email' }],
  },
];
const phoneInfoFields = [
  { label: 'Home Phone', name: 'homephone', type: 'textfield' },
  { label: 'Work Phone', name: 'workphone', type: 'textfield' },
  { label: 'Mobile Phone', name: 'mobilephone', type: 'textfield' },
  {
    label: 'Preferred Phone',
    name: 'preferredphone',
    type: 'select',
    menuItems: [{ value: 'Home Phone' }, { value: 'Work Phone' }, { value: 'Mobile Phone' }],
  },
];
const mailingInfoFields = [
  { label: 'Street', name: 'address', type: 'textfield' },
  { label: 'City', name: 'city', type: 'textfield' },
  { label: 'State', name: 'state', type: 'textfield' },
  { label: 'Zip', name: 'zip', type: 'textfield' },
  { label: 'Country', name: 'country', type: 'textfield' },
];
const shouldContactFields = [
  { label: 'Do Not Contact', name: 'doNotContact', type: 'checkbox' },
  { label: 'Do Not Mail', name: 'doNotMail', type: 'checkbox' },
];

/**
 * @param updatedInfo updated information fields object
 * @param currentInfo old/saved information fields object
 * @returns {Array<Object>} Array of updated fields in a subobject
 */
function getUpdatedFields(updatedInfo, currentInfo) {
  var updatedFields = [];
  for (const field in currentInfo) {
    if (updatedInfo[field] !== currentInfo[field])
      updatedFields.push({
        field: field,
        value: currentInfo[field],
      });
  }
  return updatedFields;
}

/**
 * Sends an update form to the development office
 */

const UpdatePage = (props) => {
  const isOnline = useNetworkStatus();
  const profile = props.profile;
  const isUserStudent = profile.PersonType.includes('stu');

  const currentInfo = useMemo(
    () => ({
      salutation: profile.Title
        ? profile.Title.charAt(0).toUpperCase() + profile.Title.slice(1).toLowerCase()
        : '',
      firstname: profile.FirstName,
      lastname: profile.LastName,
      middlename: profile.MiddleName,
      preferredname: profile.NickName,
      personalemail: '',
      workemail: '',
      alt_email: profile.Email,
      preferredemail: '',
      doNotContact: false,
      doNotMail: false,
      homephone: profile.HomePhone,
      workphone: '',
      mobilephone: profile.MobilePhone,
      preferredphone: '',
      address: profile.HomeStreet1.length === 0 ? profile.HomeStreet2 : profile.HomeStreet1,
      city: profile.HomeCity,
      state: profile.HomeState,
      zip: profile.HomePostalCode,
      country: profile.HomeCountry,
      maritalstatus: profile.Married === 'N' ? 'No' : profile.Married === 'Y' ? 'Yes' : '',
    }),
    [profile],
  );
  const [updatedInfo, setUpdatedInfo] = useState(currentInfo);
  const [isSaving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: '', severity: '', open: false });

  const hasNoChange = useMemo(() => {
    for (const field in currentInfo) {
      if (currentInfo[field] !== updatedInfo[field]) {
        return false;
      }
    }
    return true;
  }, [updatedInfo, currentInfo]);

  const handleChange = (event) => {
    const getNewInfo = (currentValue) => {
      return {
        ...currentValue,
        [event.target.name]:
          event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      };
    };
    setUpdatedInfo(getNewInfo);
  };

  const createSnackbar = (message, severity) => {
    setSnackbar({ message: message, severity: severity, open: true });
  };

  if (profile) {
    const handleSaveButtonClick = () => {
      if (updatedInfo.firstname === '' || updatedInfo.lastname === '') {
        createSnackbar('Please fill in your first and last name.', 'error');
      } else {
        setSaving(true);
        requestInfoUpdate(getUpdatedFields(currentInfo, updatedInfo)).then(() => {
          createSnackbar(
            'A request to update your information has been sent. Please check back later.',
            'info',
          );
          setSaving(false);
        });
      }
    };

    const saveButton = isSaving ? (
      <GordonLoader size={32} />
    ) : (
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSaveButtonClick}
        disabled={hasNoChange}
      >
        Update
      </Button>
    );

    const infoMap = (fields) => {
      return fields.map((field) => (
        <ProfileUpdateField
          label={field.label}
          name={field.name}
          value={updatedInfo[field.name]}
          type={field.type}
          menuItems={field.menuItems}
          onChange={handleChange}
        />
      ));
    };
    if (!isOnline) return <GordonOffline feature="Update Profile" />;

    if (!isUserStudent) return <NotAlumni />;

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
                <ContentCard title="Personal Information">
                  {infoMap(personalInfoFields)}
                </ContentCard>
                <ContentCard title="Email Addresses">{infoMap(emailInfoFields)}</ContentCard>
                <ContentCard title="Phone Numbers">{infoMap(phoneInfoFields)}</ContentCard>
                <ContentCard title="Mailing Address">{infoMap(mailingInfoFields)}</ContentCard>
                <ContentCard title="Contact Preferences">
                  {infoMap(shouldContactFields)}
                </ContentCard>
                <Grid item xs={12} justifyContent="center">
                  {saveButton}
                </Grid>
              </CardContent>
            </Card>
            <Typography variant="subtitle1">
              Found a bug?
              <Button href="mailto:cts@gordon.edu?Subject=Gordon 360 Bug" color="primary">
                Report to CTS
              </Button>
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
  }
};

export { UpdatePage };
