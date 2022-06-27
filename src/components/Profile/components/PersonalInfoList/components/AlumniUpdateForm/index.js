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
import { requestInfoUpdate, getAllStates, getAllCountries } from 'services/profileInfoUpdate';
import styles from './Update.module.css';
import GordonLimitedAvailability from 'components/GordonLimitedAvailability';
import GordonLoader from 'components/Loader';
import GordonOffline from 'components/GordonOffline';
import useNetworkStatus from 'hooks/useNetworkStatus';
import GordonDialogBox from 'components/GordonDialogBox';
import { ConfirmationRow } from './components/ConfirmationRow';
import { ConfirmationWindowHeader } from './components/ConfirmationHeader';
import { ContentCard } from './components/ContentCard';
import { ProfileUpdateField } from './components/ProfileUpdateField';

const shouldContactFields = [
  { label: 'Do Not Contact', name: 'doNotContact', type: 'checkbox' },
  { label: 'Do Not Mail', name: 'doNotMail', type: 'checkbox' },
];

/**
 * A form for alumni to request an update to their profile information.
 */

const AlumniUpdateForm = ({ profile, closeWithSnackbar }) => {
  const isOnline = useNetworkStatus();
  const isUserAlumni = profile.PersonType === 'alu';
  const [statesAndProv, setStatesAndProv] = useState(['Not Applicable']);
  const [countries, setCountries] = useState(['Prefer Not to Say']);
  const [errorStatus, setErrorStatus] = useState({
    firstName: { hasError: false, helperText: '*Required' },
    lastName: { hasError: false, helperText: '*Required' },

    homePhone: { hasError: true, helperText: '*Invalid Number' },
    workPhone: { hasError: true, helperText: '*Invalid Number' },
    mobilePhone: { hasError: true, helperText: '*Invalid Number' },

    personalEmail: { hasError: false, helperText: '*Invalid Email' },
    workEmail: { hasError: false, helperText: '*Invalid Email' },
    aEmail: { hasError: false, helperText: '*Invalid Email' },
  });

  const personalInfoFields = [
    {
      label: 'Salutation',
      name: 'salutation',
      type: 'select',
      menuItems: ['Prefer Not to Answer', 'Mr.', 'Ms.', 'Mrs.', 'Miss', 'Dr.', 'Rev.'],
    },
    {
      label: 'First Name',
      name: 'firstName',
      type: 'text',
      error: errorStatus.firstName.hasError,
      helperText: errorStatus.firstName.helperText,
    },
    {
      label: 'Last Name',
      name: 'lastName',
      type: 'text',
      error: errorStatus.lastName.hasError,
      helperText: errorStatus.lastName.helperText,
    },
    { label: 'Middle Name', name: 'middleName', type: 'text' },
    { label: 'Preferred Name', name: 'nickName', type: 'text' },
    { label: 'Suffix', name: 'suffix', type: 'text' },
    { label: 'Married', name: 'married', type: 'checkbox' },
  ];
  const emailInfoFields = [
    {
      label: 'Personal Email',
      name: 'personalEmail',
      type: 'email',
      error: errorStatus.personalEmail.hasError,
      helperText: errorStatus.personalEmail.helperText,
    },
    {
      label: 'Work Email',
      name: 'workEmail',
      type: 'email',
      error: errorStatus.workEmail.hasError,
      helperText: errorStatus.workEmail.helperText,
    },
    {
      label: 'Alternate Email',
      name: 'aEmail',
      type: 'email',
      error: errorStatus.aEmail.hasError,
      helperText: errorStatus.aEmail.helperText,
    },
    {
      label: 'Preferred Email',
      name: 'preferredEmail',
      type: 'select',
      menuItems: ['No Preference', 'Personal Email', 'Work Email', 'Alternate Email'],
    },
  ];
  const phoneInfoFields = [
    {
      label: 'Home Phone',
      name: 'homePhone',
      type: 'number',
      error: errorStatus.homePhone.hasError,
      helperText: errorStatus.homePhone.helperText,
    },
    {
      label: 'Work Phone',
      name: 'workPhone',
      type: 'number',
      error: errorStatus.workPhone.hasError,
      helperText: errorStatus.workPhone.helperText,
    },
    {
      label: 'Mobile Phone',
      name: 'mobilePhone',
      type: 'number',
      error: errorStatus.mobilePhone.hasError,
      helperText: errorStatus.mobilePhone.helperText,
    },
    {
      label: 'Preferred Phone',
      name: 'preferredPhone',
      type: 'select',
      menuItems: ['No Preference', 'Home Phone', 'Work Phone', 'Mobile Phone'],
    },
  ];
  const mailingInfoFields = [
    { label: 'Address', name: 'address1', type: 'text' },
    { label: 'Address Line 2 (optional)', name: 'address2', type: 'text' },
    { label: 'City', name: 'city', type: 'text' },
    { label: 'State', name: 'state', type: 'select', menuItems: statesAndProv },
    { label: 'Zip Code', name: 'zip', type: 'number' },
    { label: 'Country', name: 'country', type: 'select', menuItems: countries },
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

  const currentInfo = useMemo(() => {
    return {
      salutation: profile.Title
        ? profile.Title.charAt(0).toUpperCase() + profile.Title.slice(1).toLowerCase()
        : '',
      firstName: profile.FirstName ?? '',
      lastName: profile.LastName ?? '',
      middleName: profile.MiddleName ?? '',
      nickName: profile.NickName ?? '',
      suffix: profile.Suffix ?? '',
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
    };
  }, [profile]);
  const [updatedInfo, setUpdatedInfo] = useState(currentInfo);
  const [openConfirmWindow, setOpenConfirmWindow] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [changeReason, setChangeReason] = useState('');

  const handleSetError = (field, condition) => {
    const getCurrentErrorStatus = (currentValue) => {
      return {
        ...currentValue,
        [field]: { ...currentValue[field], hasError: condition },
      };
    };
    setErrorStatus(getCurrentErrorStatus);
  };

  const isEmailValid = (email) => {
    const regex = /\S+@\S+\.\S+/;
    console.log(regex.test(email));
    return !email || email === '' || regex.test(email);
  };

  const shouldDisable = useMemo(() => {
    for (const field in currentInfo) {
      //require first & last name
      if (field === 'firstName' || field === 'lastName') {
        handleSetError(field, updatedInfo[field] === '');
        if (updatedInfo[field] === '') return true;
      }
      //check if phone number is a number
      //check if email is valid email
      if (field === 'personalEmail' || field === 'workEmail' || field === 'aEmail') {
        handleSetError(field, isEmailValid(updatedInfo[field]));
        if (isEmailValid(updatedInfo[field])) return true;
      }

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
      setSaving(false);
      closeWithSnackbar({
        type: 'success',
        message: 'Your update request has been sent. Please check back later.',
      });
      handleWindowClose();
    });
  };

  const handleWindowClose = () => {
    setOpenConfirmWindow(false);
    setChangeReason('');
  };

  const handleSaveButtonClick = () => {
    if (updatedInfo.firstName === '' || updatedInfo.lastName === '') {
      closeWithSnackbar({ type: 'error', message: 'Please fill in your first and last name' });
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
      disabled={shouldDisable}
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
        error={field.error}
        label={field.label}
        name={field.name}
        helperText={field.helperText}
        value={updatedInfo[field.name]}
        type={field.type}
        menuItems={field.menuItems}
        onChange={handleChange}
      />
    ));
  };

  if (!isOnline) return <GordonOffline feature="Update Profile" />;

  if (isUserAlumni)
    return (
      <GordonLimitedAvailability
        pageName="Alumni Update Form"
        backToLocation="Profile"
        backtoLink="/myprofile"
        availableTo="Gordon Alumni"
      />
    );

  return (
    <>
      <Card className={styles.update}>
        <CardHeader
          className={styles.update_title}
          title="Update Information"
          titleTypographyProps={{ variant: 'h4' }}
        />
        <CardContent>
          <ContentCard title="Personal Information">{inputField(personalInfoFields)}</ContentCard>
          <ContentCard title="Email Addresses">{inputField(emailInfoFields)}</ContentCard>
          <ContentCard title="Phone Numbers">{inputField(phoneInfoFields)}</ContentCard>
          <ContentCard title="Mailing Address">{inputField(mailingInfoFields)}</ContentCard>
          <ContentCard title="Contact Preferences">{inputField(shouldContactFields)}</ContentCard>
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
      {/* confirmation window */}
      <GordonDialogBox
        open={openConfirmWindow}
        title="Confirm Your Updates"
        buttonClicked={!isSaving ? handleConfirm : null}
        buttonName="Confirm"
        isButtonDisabled={changeReason === ''}
        cancelButtonClicked={!isSaving ? handleWindowClose : null}
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
        {isSaving ? <GordonLoader size={32} /> : null}
      </GordonDialogBox>
    </>
  );
};

export default AlumniUpdateForm;
