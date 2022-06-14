import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
} from '@material-ui/core/';
import React, { useState, useMemo, useEffect } from 'react';
import { requestInfoUpdate, getAllStates } from 'services/update';
import styles from '../Update.module.css';
import GordonLoader from 'components/Loader';
import SimpleSnackbar from 'components/Snackbar';
import GordonOffline from 'components/GordonOffline';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { ProfileUpdateField, NotAlumni, ContentCard } from '..';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonUnauthorized from 'components/GordonUnauthorized';
import { ConfirmationRow } from '../ConfirmationRow';
import { ConfirmationWindowHeader } from '../ConfirmationHeader';

/**
 * Sends an update form to the development office
 */

const UpdatePage = (props) => {
  const isOnline = useNetworkStatus();
  const profile = props.profile;
  const isUserStudent = profile.PersonType.includes('stu');
  // SQL DATABASE HOLDS NAME CHAR ARRAYS WITH MAX SIZE OF 20
  // VALUES ARE CHAR ARRAYS WITH MAX SIZE OF 128
  // [possible limitation if adding more fields]
  const personalInfoFields = [
    { label: 'Salutation', name: 'salutation', type: 'textfield' },
    { label: 'First Name', name: 'firstName', type: 'textfield' },
    { label: 'Last Name', name: 'lastName', type: 'textfield' },
    {},
    { label: 'Middle Name', name: 'middleName', type: 'textfield' },
    { label: 'Preferred Name', name: 'nickName', type: 'textfield' },
    { label: 'Married', name: 'married', type: 'checkbox' },
  ];
  const emailInfoFields = [
    { label: 'Personal Email', name: 'personalEmail', type: 'textfield' },
    { label: 'Work Email', name: 'workEmail', type: 'textfield' },
    { label: 'Alternate Email', name: 'aEmail', type: 'textfield' },
    {
      label: 'Preferred Email',
      name: 'preferredEmail',
      type: 'select',
      menuItems: [
        { value: 'Personal Email' },
        { value: 'Work Email' },
        { value: 'Alternate Email' },
      ],
    },
  ];
  const phoneInfoFields = [
    { label: 'Home Phone', name: 'homePhone', type: 'textfield' },
    { label: 'Work Phone', name: 'workPhone', type: 'textfield' },
    { label: 'Mobile Phone', name: 'mobilePhone', type: 'textfield' },
    {
      label: 'Preferred Phone',
      name: 'preferredPhone',
      type: 'select',
      menuItems: [{ value: 'Home Phone' }, { value: 'Work Phone' }, { value: 'Mobile Phone' }],
    },
  ];
  const [statesAndProv, setStatesAndProv] = useState(['Not Applicable']);
  const mailingInfoFields = [
    { label: 'Address', name: 'address1', type: 'textfield' },
    { label: 'Address Line 2 (optional)', name: 'address2', type: 'textfield' },
    { label: 'City', name: 'city', type: 'textfield' },
    { label: 'State', name: 'state', type: 'select', menuItems: statesAndProv },
    { label: 'Zip Code', name: 'zip', type: 'textfield' },
    { label: 'Country', name: 'country', type: 'textfield' },
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

  // returns label given name of field
  const getAssociatedLabel = (fieldName) => {
    let label = '';
    allFields.forEach((field) => {
      if (fieldName === field.name) label = field.label;
    });
    return label;
  };

  /**
   * @param updatedInfo updated information fields object
   * @param currentInfo old/saved information fields object
   * @returns {Array<Object>} Array of updated fields in a subobject
   */
  function getUpdatedFields(updatedInfo, currentInfo) {
    var updatedFields = [];
    for (const field in currentInfo) {
      if (updatedInfo[field] !== currentInfo[field]) {
        updatedFields.push({
          field: field,
          value: currentInfo[field],
          label: getAssociatedLabel(field),
        });
      }
    }
    return updatedFields;
  }

  const handleConfirm = () => {
    setSaving(true);
    let updateRequest = getUpdatedFields(currentInfo, updatedInfo);
    updateRequest.push({
      field: 'changeReason',
      value: changeReason,
      label: 'Reason for change',
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
    setConfirmRows('');
  };

  const handleSaveButtonClick = () => {
    if (updatedInfo.firstName === '' || updatedInfo.lastName === '') {
      createSnackbar('Please fill in your first and last name.', 'error');
    } else {
      getCurrentChanges(currentInfo, updatedInfo);
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
   * @param {Array<Object>} fields static fields that define label, name, value, type
   * @returns JSX elements of all elements in array with correct type
   */
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

  // following 3 consts determine confirmation window and its contents
  const [confirmRows, setConfirmRows] = useState('');
  const [changeReason, setChangeReason] = useState('');
  const getCurrentChanges = (currentInfo, updatedInfo) => {
    setConfirmRows(
      <Grid
        container
        direction="row"
        style={{
          width: '100%',
          minWidth: 504,
        }}
      >
        {getUpdatedFields(currentInfo, updatedInfo).map((field) => (
          <ConfirmationRow field={field} prevValue={currentInfo[field.field]} />
        ))}
      </Grid>,
    );
  };

  if (profile) {
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
            {confirmRows}
          </Card>
          {/* reason for change prompt */}
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
  }
  return <GordonUnauthorized feature={'the Update Profile page'} />;
};

export { UpdatePage };
