import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
} from '@material-ui/core/';
import { useState, useMemo, useEffect } from 'react';
import { requestInfoUpdate, getAllStates, getAllCountries } from 'services/update';
import styles from './components/Update.module.css';
import GordonLoader from 'components/Loader';
import SimpleSnackbar from 'components/Snackbar';
import GordonOffline from 'components/GordonOffline';
import useNetworkStatus from 'hooks/useNetworkStatus';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonUnauthorized from 'components/GordonUnauthorized';
import { useUser } from 'hooks';
import { ConfirmationRow } from './components/ConfirmationRow';
import { ConfirmationWindowHeader } from './components/ConfirmationHeader';
import { NotAlumni } from './components/NotAlumni';
import { ContentCard } from './components/ContentCard';
import { ProfileUpdateField } from './components/ProfileUpdateField';

/**
 * A form for alumni to request an update to their profile information.
 */

const AlumniUpdateForm = (props) => {
  const { profile, loading } = useUser();
  const isOnline = useNetworkStatus();
  const isUserStudent = profile.PersonType.includes('stu');

  const personalInfoFields = [
    {
      label: 'Salutation',
      name: 'salutation',
      type: 'select',
      menuItems: ['Prefer Not to Answer', 'Mr.', 'Ms.', 'Mrs.', 'Miss', 'Dr.', 'Rev.'],
    },
    { label: 'First Name', name: 'firstName', type: 'text' },
    { label: 'Last Name', name: 'lastName', type: 'text' },
    {},
    { label: 'Middle Name', name: 'middleName', type: 'text' },
    { label: 'Preferred Name', name: 'nickName', type: 'text' },
    { label: 'Married', name: 'married', type: 'checkbox' },
  ];
  const emailInfoFields = [
    { label: 'Personal Email', name: 'personalEmail', type: 'email' },
    { label: 'Work Email', name: 'workEmail', type: 'email' },
    { label: 'Alternate Email', name: 'aEmail', type: 'email' },
    {
      label: 'Preferred Email',
      name: 'preferredEmail',
      type: 'select',
      menuItems: ['No Preference', 'Personal Email', 'Work Email', 'Alternate Email'],
    },
  ];
  const phoneInfoFields = [
    { label: 'Home Phone', name: 'homePhone', type: 'number' },
    { label: 'Work Phone', name: 'workPhone', type: 'number' },
    { label: 'Mobile Phone', name: 'mobilePhone', type: 'number' },
    {
      label: 'Preferred Phone',
      name: 'preferredPhone',
      type: 'select',
      menuItems: ['No Preference', 'Home Phone', 'Work Phone', 'Mobile Phone'],
    },
  ];
  const [statesAndProv, setStatesAndProv] = useState(['Not Applicable']);
  const [countries, setCountries] = useState(['Prefer Not to Say']);
  const mailingInfoFields = [
    { label: 'Address', name: 'address1', type: 'text' },
    { label: 'Address Line 2 (optional)', name: 'address2', type: 'text' },
    { label: 'City', name: 'city', type: 'text' },
    { label: 'State', name: 'state', type: 'select', menuItems: statesAndProv },
    { label: 'Zip Code', name: 'zip', type: 'number' },
    { label: 'Country', name: 'country', type: 'select', menuItems: countries },
  ];
  const shouldContactFields = [
    { label: 'Do Not Contact', name: 'doNotContact', type: 'checkbox' },
    { label: 'Do Not Mail', name: 'doNotMail', type: 'checkbox' },
  ];
  const allFields = [
    personalInfoFields,
    emailInfoFields,
    phoneInfoFields,
    mailingInfoFields,
    shouldContactFields,
  ].flat();

  useEffect(() => {
    getAllStates().then((s) => {
      let allStates = s.map((state) => `${state.Name}`);
      allStates.unshift('Not Applicable');
      setStatesAndProv(allStates);
    });
    getAllCountries().then((c) => {
      let allCountries = c.map((country) => country.COUNTRY.toLowerCase());
      setCountries(allCountries);
    });
  }, []);

  const currentInfo = useMemo(
    () => ({
      salutation: profile.Title
        ? profile.Title.charAt(0).toUpperCase() + profile.Title.slice(1).toLowerCase()
        : '',
      firstName: profile.FirstName ?? '',
      lastName: profile.LastName ?? '',
      middleName: profile.MiddleName ?? '',
      nickName: profile.NickName ?? '',
      personalEmail: profile.PersonalEmail ?? '',
      workEmail: profile.WorkEmail ?? '',
      aEmail: profile.aEmail ?? '',
      preferredEmail: profile.PreferredEmail ?? '',
      doNotContact: profile.doNotContact ?? false,
      doNotMail: profile.doNotMail ?? false,
      homePhone: profile.HomePhone ?? '',
      workPhone: profile.WorkPhone ?? '',
      mobilePhone: profile.MobilePhone ?? '',
      preferredPhone: profile.PreferredPhone ?? '',
      //Homestreet lines are inverted in alumni SQL
      address1: profile.HomeStreet2 ?? profile.HomeStreet1 ?? '',
      address2: profile.HomeStreet2 && profile.HomeStreet1 ? profile.HomeStreet2 : '',
      city: profile.HomeCity ?? '',
      state: profile.HomeState ?? '',
      zip: profile.HomePostalCode ?? '',
      country: profile.HomeCountry ?? '',
      married: profile.Married === 'Y' ? true : false,
    }),
    [profile],
  );
  const [updatedInfo, setUpdatedInfo] = useState(currentInfo);
  const [openConfirmWindow, setOpenConfirmWindow] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: '', severity: '', open: false });
  const [changeReason, setChangeReason] = useState('');

  const hasNoChange = useMemo(() => {
    for (const field in currentInfo) {
      if (currentInfo[field] !== updatedInfo[field]) {
        return false;
      }
    }
    return true;
  }, [updatedInfo, currentInfo]);

  // handles all field changes
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

  const getFieldLabel = (fieldName) => {
    const matchingField = allFields.find((field) => field.name === fieldName);
    return matchingField.label;
  };

  function getUpdatedFields(updatedInfo, currentInfo) {
    const updatedFields = [];
    Object.entries(currentInfo).forEach(([field, value]) => {
      if (updatedInfo[field] !== value)
        updatedFields.push({
          Field: field,
          Value: value,
          Label: getFieldLabel(field),
        });
    });
    return updatedFields;
  }

  const handleConfirm = () => {
    setSaving(true);
    let updateRequest = getUpdatedFields(currentInfo, updatedInfo);
    updateRequest.push({
      Field: 'changeReason',
      Value: changeReason,
      Label: 'Reason for change',
    });
    requestInfoUpdate(updateRequest).then(() => {
      createSnackbar(
        'A request to update your information has been sent. Please check back later.',
        'info',
      );
      setSaving(false);
      handleWindowClose();
    });
  };

  const handleWindowClose = () => {
    setOpenConfirmWindow(false);
    setChangeReason('');
  };

  const handleSaveButtonClick = () => {
    if (updatedInfo.firstName === '' || updatedInfo.lastName === '') {
      createSnackbar('Please fill in your first and last name.', 'error');
    } else {
      setOpenConfirmWindow(true);
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

  /**
   * @param {Array<{name: string, label: string, type: string, menuItems: string[]}>} fields array of objects defining the properties of the input field
   * @returns JSX correct input for each field based on type
   */
  const inputField = (fields) => {
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

  if (loading) return <GordonLoader />;

  if (!profile) return <GordonUnauthorized feature={'the Update Profile page'} />;

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
                {inputField(personalInfoFields)}
              </ContentCard>
              <ContentCard title="Email Addresses">{inputField(emailInfoFields)}</ContentCard>
              <ContentCard title="Phone Numbers">{inputField(phoneInfoFields)}</ContentCard>
              <ContentCard title="Mailing Address">{inputField(mailingInfoFields)}</ContentCard>
              <ContentCard title="Contact Preferences">
                {inputField(shouldContactFields)}
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
      {/* confirmation window */}
      <GordonDialogBox
        open={openConfirmWindow}
        title="Confirm Updates"
        buttonClicked={handleConfirm}
        buttonName={'Confirm'}
        isButtonDisabled={changeReason === ''}
        cancelButtonClicked={handleWindowClose}
        cancelButtonName="Cancel"
      >
        <Card>
          <ConfirmationWindowHeader />
          <Grid
            container
            direction="row"
            style={{
              width: '100%',
              minWidth: 504,
            }}
          >
            {getUpdatedFields(currentInfo, updatedInfo).map((field) => (
              <ConfirmationRow field={field} prevValue={currentInfo[field.Field]} />
            ))}
          </Grid>
        </Card>
        <TextField
          required
          variant="filled"
          label="Please give a reason for the change..."
          margin="normal"
          multiline
          fullWidth
          rows={4}
          name="changeReason"
          value={changeReason}
          onChange={(event) => {
            setChangeReason(event.target.value);
          }}
        />
      </GordonDialogBox>
      {/* will deprecate snackbar */}
      <SimpleSnackbar
        text={snackbar.message}
        severity={snackbar.severity}
        open={snackbar.open}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </>
  );
};

export default AlumniUpdateForm;
