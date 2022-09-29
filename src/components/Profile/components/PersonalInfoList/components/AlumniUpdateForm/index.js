import { Typography, Grid, Button, TextField } from '@mui/material/';
import { useState, useMemo, useEffect } from 'react';
import { requestInfoUpdate, getAllStates, getAllCountries } from 'services/profileInfoUpdate';
import styles from './AlumniUpdateForm.module.css';
import GordonLoader from 'components/Loader';
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

const AlumniUpdateForm = ({
  profile,
  closeWithSnackbar,
  openAlumniUpdateForm,
  setOpenAlumniUpdateForm,
}) => {
  const [statesAndProv, setStatesAndProv] = useState(['Not Applicable']);
  const [countries, setCountries] = useState(['Prefer Not to Say']);
  const [errorStatus, setErrorStatus] = useState({
    firstName: false,
    lastName: false,

    homePhone: false,
    workPhone: false,
    mobilePhone: false,

    personalEmail: false,
    workEmail: false,
    aEmail: false,
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
      error: errorStatus.firstName,
      helperText: '*Required',
    },
    {
      label: 'Last Name',
      name: 'lastName',
      type: 'text',
      error: errorStatus.lastName,
      helperText: '*Required',
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
      type: 'text',
      error: errorStatus.personalEmail,
      helperText: '*Invalid Email',
    },
    {
      label: 'Work Email',
      name: 'workEmail',
      type: 'text',
      error: errorStatus.workEmail,
      helperText: '*Invalid Email',
    },
    {
      label: 'Alternate Email',
      name: 'aEmail',
      type: 'text',
      error: errorStatus.aEmail,
      helperText: '*Invalid Email',
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
      type: 'text',
      error: errorStatus.homePhone,
      helperText: '*Invalid Number',
    },
    {
      label: 'Work Phone',
      name: 'workPhone',
      type: 'text',
      error: errorStatus.workPhone,
      helperText: '*Invalid Number',
    },
    {
      label: 'Mobile Phone',
      name: 'mobilePhone',
      type: 'text',
      error: errorStatus.mobilePhone,
      helperText: '*Invalid Number',
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
    { label: 'Zip Code', name: 'zip', type: 'text' },
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
  const [disableUpdateButton, setDisableUpdateButton] = useState(true);

  const handleSetError = (field, condition) => {
    const getCurrentErrorStatus = (currentValue) => {
      return {
        ...currentValue,
        [field]: condition,
      };
    };
    setErrorStatus(getCurrentErrorStatus);
  };

  //Regular Expression documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
  const isEmailValid = (email) => {
    //email regex from: https://stackoverflow.com/a/72476905
    const regex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    return !email || email === '' || regex.test(email);
  };

  const isPhoneValid = (phoneNum) => {
    /**
     * 2 Regex's used here:
     * /[-()\s]/g => /g is a global search for all characters in the array symbols -,(,),(space)
     * /^[+]?\d{7,15}+$/ => regex match value of (begin char)(0 or 1 instance of '+')(7-15 digits)(end char)
     */
    let value = phoneNum.replace(/[-()\s]/g, '');
    return /^[+]?\d{7,15}$/.test(value) || phoneNum.length === 0;
  };

  // Field Validation
  useEffect(() => {
    let hasError = false;
    let hasChanges = false;
    for (const field in currentInfo) {
      if (currentInfo[field] !== updatedInfo[field]) {
        hasChanges = true;
      }
      switch (field) {
        case 'firstName':
        case 'lastName':
          handleSetError(field, updatedInfo[field] === '');
          hasError = updatedInfo[field] === '' || hasError;
          break;
        case 'homePhone':
        case 'workPhone':
        case 'mobilePhone':
          handleSetError(field, !isPhoneValid(updatedInfo[field]));
          hasError = !isPhoneValid(updatedInfo[field]) || hasError;
          break;
        case 'personalEmail':
        case 'workEmail':
        case 'aEmail':
          handleSetError(field, !isEmailValid(updatedInfo[field]));
          hasError = !isEmailValid(updatedInfo[field]) || hasError;
          break;
        default:
          break;
      }
    }
    setDisableUpdateButton(hasError || !hasChanges);
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
      let updatedValue = value;
      if (field === 'homePhone' || field === 'workPhone' || field === 'mobilePhone') {
        updatedValue = value.replace(/[-()\s]/g, '');
      }
      if (updatedInfo[field] !== value)
        updatedFields.push({
          Field: field,
          Value: updatedValue,
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

  /**
   * @param {Array<{name: string, label: string, type: string, menuItems: string[]}>} fields array of objects defining the properties of the input field
   * @returns JSX correct input for each field based on type
   */
  const mapFieldsToInputs = (fields) => {
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

  return (
    <GordonDialogBox
      open={openAlumniUpdateForm}
      title="Update Information"
      fullWidth
      maxWidth="lg"
      buttonClicked={() => setOpenConfirmWindow(true)}
      isButtonDisabled={disableUpdateButton}
      buttonName="Update"
      cancelButtonClicked={() => {
        setUpdatedInfo(currentInfo);
        setOpenAlumniUpdateForm(false);
      }}
      cancelButtonName="cancel"
      titleClass={styles.alumni_update_form_title}
    >
      <ContentCard title="Personal Information">
        {mapFieldsToInputs(personalInfoFields)}
      </ContentCard>
      <ContentCard title="Email Addresses">{mapFieldsToInputs(emailInfoFields)}</ContentCard>
      <ContentCard title="Phone Numbers">{mapFieldsToInputs(phoneInfoFields)}</ContentCard>
      <ContentCard title="Mailing Address">{mapFieldsToInputs(mailingInfoFields)}</ContentCard>
      <ContentCard title="Contact Preferences">
        {mapFieldsToInputs(shouldContactFields)}
      </ContentCard>
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
        <ConfirmationWindowHeader />
        <Grid container>
          {getUpdatedFields(currentInfo, updatedInfo).map((field) => (
            <ConfirmationRow field={field} prevValue={currentInfo[field.Field]} />
          ))}
        </Grid>
        <TextField
          required
          variant="filled"
          label="Please give a reason for the change..."
          margin="normal"
          multiline
          fullWidth
          minRows={4}
          name="changeReason"
          value={changeReason}
          onChange={(event) => {
            setChangeReason(event.target.value);
          }}
        />
        {isSaving ? <GordonLoader size={32} /> : null}
      </GordonDialogBox>
    </GordonDialogBox>
  );
};

export default AlumniUpdateForm;
