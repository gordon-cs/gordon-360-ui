import {
  Typography,
  Grid,
  Button,
  TextField,
  Box,
  SelectChangeEvent,
  AlertColor,
} from '@mui/material/';
import React, { useState, useMemo, useEffect } from 'react';
import { Profile as profileType } from 'services/user';
import GordonLoader from 'components/Loader';
import GordonDialogBox from 'components/GordonDialogBox';
import { ConfirmationRow } from './components/ConfirmationRow';
import { ConfirmationWindowHeader } from './components/ConfirmationHeader';
import { ContentCard } from './components/ContentCard';
import { ProfileUpdateField, ProfileUpdateFieldProps } from './components/ProfileUpdateField';
import addressService from 'services/address';
import { ArrayElement, DistributiveOmit, map } from 'services/utils';
import userService from 'services/user';

type ProfileUpdateFieldType = DistributiveOmit<ProfileUpdateFieldProps, 'onChange' | 'value'>;

const INPUT_TYPES = {
  Text: 'text',
  Checkbox: 'checkbox',
  Select: 'select',
} as const;

const shouldContactFields = [
  { label: 'Do Not Contact', name: 'doNotContact', type: INPUT_TYPES.Checkbox },
  { label: 'Do Not Mail', name: 'doNotMail', type: INPUT_TYPES.Checkbox },
];

const UPDATE_STEP = 'update';
const CONFIRM_STEP = 'confirm';

type Props = {
  profile: profileType;
  closeWithSnackbar: (status: { type: AlertColor; message: string }) => void;
  openAlumniUpdateForm: boolean;
  setOpenAlumniUpdateForm: (bool: boolean) => void;
};

/**
 * A form for alumni to request an update to their profile information.
 */

const AlumniUpdateForm = ({
  profile,
  closeWithSnackbar,
  openAlumniUpdateForm,
  setOpenAlumniUpdateForm,
}: Props) => {
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
    altEmail: false,
  });

  const personalInfoFields: ProfileUpdateFieldType[] = [
    {
      label: 'Salutation',
      name: 'salutation',
      type: INPUT_TYPES.Select,
      menuItems: ['Prefer Not to Answer', 'Mr.', 'Ms.', 'Mrs.', 'Miss', 'Dr.', 'Rev.'],
    },
    {
      label: 'First Name',
      name: 'firstName',
      type: INPUT_TYPES.Text,
      error: errorStatus.firstName,
      helperText: '*Required',
    },
    {
      label: 'Last Name',
      name: 'lastName',
      type: INPUT_TYPES.Text,
      error: errorStatus.lastName,
      helperText: '*Required',
    },
    { label: 'Middle Name', name: 'middleName', type: INPUT_TYPES.Text },
    { label: 'Preferred Name', name: 'nickName', type: INPUT_TYPES.Text },
    { label: 'Suffix', name: 'suffix', type: INPUT_TYPES.Text },
    { label: 'Married', name: 'married', type: INPUT_TYPES.Checkbox },
  ];
  const emailInfoFields = [
    {
      label: 'Personal Email',
      name: 'personalEmail',
      type: INPUT_TYPES.Text,
      error: errorStatus.personalEmail,
      helperText: '*Invalid Email',
    },
    {
      label: 'Work Email',
      name: 'workEmail',
      type: INPUT_TYPES.Text,
      error: errorStatus.workEmail,
      helperText: '*Invalid Email',
    },
    {
      label: 'Alternate Email',
      name: 'altEmail',
      type: INPUT_TYPES.Text,
      error: errorStatus.altEmail,
      helperText: '*Invalid Email',
    },
    {
      label: 'Preferred Email',
      name: 'preferredEmail',
      type: INPUT_TYPES.Select,
      menuItems: ['No Preference', 'Personal Email', 'Work Email', 'Alternate Email'],
    },
  ];
  const phoneInfoFields = [
    {
      label: 'Home Phone',
      name: 'homePhone',
      type: INPUT_TYPES.Text,
      error: errorStatus.homePhone,
      helperText: '*Invalid Number',
    },
    {
      label: 'Work Phone',
      name: 'workPhone',
      type: INPUT_TYPES.Text,
      error: errorStatus.workPhone,
      helperText: '*Invalid Number',
    },
    {
      label: 'Mobile Phone',
      name: 'mobilePhone',
      type: INPUT_TYPES.Text,
      error: errorStatus.mobilePhone,
      helperText: '*Invalid Number',
    },
    {
      label: 'Preferred Phone',
      name: 'preferredPhone',
      type: INPUT_TYPES.Select,
      menuItems: ['No Preference', 'Home Phone', 'Work Phone', 'Mobile Phone'],
    },
  ];
  const mailingInfoFields = [
    { label: 'Address', name: 'address1', type: INPUT_TYPES.Text },
    { label: 'Address Line 2 (optional)', name: 'address2', type: INPUT_TYPES.Text },
    { label: 'City', name: 'city', type: INPUT_TYPES.Text },
    { label: 'State', name: 'state', type: INPUT_TYPES.Select, menuItems: statesAndProv },
    { label: 'Zip Code', name: 'zip', type: INPUT_TYPES.Text },
    { label: 'Country', name: 'country', type: INPUT_TYPES.Select, menuItems: countries },
  ];

  const allFields = [
    personalInfoFields,
    emailInfoFields,
    phoneInfoFields,
    mailingInfoFields,
    shouldContactFields,
  ].flat();

  useEffect(() => {
    addressService
      .getStates()
      .then(map((state) => state.Name))
      .then((states) => ['Not Applicable', ...states])
      .then(setStatesAndProv);
    addressService
      .getCountries()
      .then(map((country) => country.Name))
      .then(setCountries);
  }, []);

  type Info = {
    salutation?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    nickName?: string;
    suffix?: string;
    personalEmail?: string;
    workEmail?: string;
    altEmail?: string;
    preferredEmail?: string;
    doNotContact?: boolean;
    doNotMail?: boolean;
    homePhone?: string;
    workPhone?: string;
    mobilePhone?: string;
    preferredPhone?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    married?: boolean;
  };

  const currentInfo = useMemo<Info>(() => {
    return {
      salutation: profile.Title
        ? profile.Title.charAt(0).toUpperCase() + profile.Title.slice(1).toLowerCase()
        : '',
      firstName: profile.FirstName?.Value ?? '',
      lastName: profile.LastName?.Value ?? '',
      middleName: profile.MiddleName?.Value ?? '',
      nickName: profile.NickName?.Value ?? '',
      suffix: profile.Suffix?.Value ?? '',
      personalEmail: profile.PersonalEmail ?? '',
      workEmail: profile.WorkEmail ?? '',
      altEmail: profile.altEmail ?? '',
      preferredEmail: profile.PreferredEmail ?? '',
      doNotContact: profile.doNotContact ?? false,
      doNotMail: profile.doNotMail ?? false,
      homePhone: profile.HomePhone?.Value ?? '',
      workPhone: profile.WorkPhone ?? '',
      mobilePhone: profile.MobilePhone?.Value ?? '',
      preferredPhone: profile.PreferredPhone ?? '',
      //Homestreet lines are inverted in alumni SQL
      address1: profile.HomeStreet2?.Value ?? profile.HomeStreet1?.Value ?? '',
      address2:
        profile.HomeStreet2?.Value && profile.HomeStreet1?.Value ? profile.HomeStreet2.Value : '',
      city: profile.HomeCity?.Value ?? '',
      state: profile.HomeState?.Value ?? '',
      zip: profile.HomePostalCode?.Value ?? '',
      country: profile.HomeCountry?.Value ?? '',
      married: profile.Married === 'Y' ? true : false,
    };
  }, [profile]);
  const [updatedInfo, setUpdatedInfo] = useState(currentInfo);
  const [step, setStep] = useState(UPDATE_STEP);
  const [isSaving, setSaving] = useState(false);
  const [changeReason, setChangeReason] = useState('');
  const [disableUpdateButton, setDisableUpdateButton] = useState(true);

  const isEmailValid = (email?: string) => {
    //email regex from: https://stackoverflow.com/a/72476905
    const regex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    return !email || email === '' || regex.test(email);
  };

  const isPhoneValid = (phoneNum?: string) => {
    /**
     * 2 Regex's used here:
     * /[-()\s]/g => /g is a global search for all characters in the array symbols -,(,),(space)
     * /^[+]?\d{7,15}+$/ => regex match value of (begin char)(0 or 1 instance of '+')(7-15 digits)(end char)
     */
    let value = phoneNum!.replace(/[-()\s]/g, '');
    return /^[+]?\d{7,15}$/.test(value) || phoneNum!.length === 0;
  };

  // Field Validation
  useEffect(() => {
    let hasError = false;
    let hasChanges = false;
    Object.keys(currentInfo).forEach((field) => {
      if (currentInfo[field as keyof Info] !== updatedInfo[field as keyof Info]) {
        hasChanges = true;
      }
      switch (field) {
        case 'firstName':
        case 'lastName':
          setErrorStatus((currentValue) => ({
            ...currentValue,
            [field]: updatedInfo[field] === '',
          }));
          hasError = updatedInfo[field] === '' || hasError;
          break;
        case 'homePhone':
        case 'workPhone':
        case 'mobilePhone':
          setErrorStatus((currentValue) => ({
            ...currentValue,
            [field]: !isPhoneValid(updatedInfo[field]),
          }));
          hasError = !isPhoneValid(updatedInfo[field]) || hasError;
          break;
        case 'personalEmail':
        case 'workEmail':
        case 'altEmail':
          setErrorStatus((currentValue) => ({
            ...currentValue,
            [field]: !isEmailValid(updatedInfo[field]),
          }));
          hasError = !isEmailValid(updatedInfo[field]) || hasError;
          break;
        default:
          break;
      }
    });
    setDisableUpdateButton(hasError || !hasChanges);
  }, [updatedInfo, currentInfo]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const getNewInfo = (currentValue: Info) => {
      let value: string | boolean;
      if ('type' in event.target && event.target.type === 'checkbox') {
        value = event.target.checked;
      } else {
        value = event.target.value;
      }
      return {
        ...currentValue,
        [event.target.name]: value,
      };
    };
    setUpdatedInfo(getNewInfo);
  };

  const getFieldLabel = (fieldName: string): string => {
    const matchingField = allFields.find((field) => field.name === fieldName);
    return matchingField!.label;
  };

  function getUpdatedFields(updatedInfo: Info) {
    const updatedFields: { Field: keyof Info; Value: string | boolean; Label: string }[] = [];
    Object.entries(updatedInfo).forEach(([field, value]) => {
      let updatedValue = value;
      if (field === 'homePhone' || field === 'workPhone' || field === 'mobilePhone') {
        if (typeof value === 'string') {
          updatedValue = value.replace(/[-()\s]/g, '');
        }
      }
      if (field !== value)
        updatedFields.push({
          Field: field as keyof Info,
          Value: updatedValue,
          Label: getFieldLabel(field),
        });
    });
    return updatedFields;
  }

  const handleConfirm = () => {
    setSaving(true);
    const updateRequest: Array<
      | ArrayElement<ReturnType<typeof getUpdatedFields>>
      | { Field: 'changeReason'; Value: string; Label: string }
    > = getUpdatedFields(updatedInfo);
    updateRequest.push({
      Field: 'changeReason',
      Value: changeReason,
      Label: 'Reason for change',
    });

    userService.requestInfoUpdate(updateRequest).then(() => {
      setSaving(false);
      closeWithSnackbar({
        type: 'success',
        message: 'Your update request has been sent. Please check back later.',
      });
      handleWindowClose();
    });
  };

  const handleWindowClose = () => {
    setStep(UPDATE_STEP);
    setChangeReason('');
  };

  const dialogProps =
    step === CONFIRM_STEP
      ? {
          title: 'Confirm Your Updates',
          buttonClicked: !isSaving ? handleConfirm : undefined,
          buttonName: 'Confirm',
          isButtonDisabled: changeReason === '',
          cancelButtonClicked: !isSaving ? handleWindowClose : undefined,
        }
      : {
          title: 'Update Information',
          buttonClicked: () => setStep(CONFIRM_STEP),
          isButtonDisabled: disableUpdateButton,
          buttonName: 'Update',
          cancelButtonClicked: () => {
            setUpdatedInfo(currentInfo);
            setOpenAlumniUpdateForm(false);
          },
        };

  return (
    <GordonDialogBox
      {...dialogProps}
      open={openAlumniUpdateForm}
      fullWidth
      maxWidth="lg"
      isButtonDisabled={disableUpdateButton}
      cancelButtonName="Cancel"
    >
      {step === UPDATE_STEP && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <ContentCard title="Personal Information">
            {personalInfoFields.map((field) => (
              <ProfileUpdateField
                {...field}
                value={updatedInfo[field.name as keyof Info]}
                onChange={handleChange}
              />
            ))}
          </ContentCard>
          <ContentCard title="Email Addresses">
            {emailInfoFields.map((field) => (
              <ProfileUpdateField
                {...field}
                value={updatedInfo[field.name as keyof Info]}
                onChange={handleChange}
              />
            ))}
          </ContentCard>
          <ContentCard title="Phone Numbers">
            {phoneInfoFields.map((field) => (
              <ProfileUpdateField
                {...field}
                value={updatedInfo[field.name as keyof Info]}
                onChange={handleChange}
              />
            ))}
          </ContentCard>
          <ContentCard title="Mailing Address">
            {mailingInfoFields.map((field) => (
              <ProfileUpdateField
                {...field}
                value={updatedInfo[field.name as keyof Info]}
                onChange={handleChange}
              />
            ))}
          </ContentCard>
          <ContentCard title="Contact Preferences">
            {shouldContactFields.map((field) => (
              <ProfileUpdateField
                {...field}
                value={updatedInfo[field.name as keyof Info]}
                onChange={handleChange}
              />
            ))}
          </ContentCard>
          <Typography variant="subtitle1">
            Found a bug?
            <Button href="mailto:cts@gordon.edu?Subject=Gordon 360 Bug" color="primary">
              Report to CTS
            </Button>
          </Typography>
        </Box>
      )}
      {step === CONFIRM_STEP && (
        <>
          <ConfirmationWindowHeader />
          <Grid container>
            {getUpdatedFields(updatedInfo).map((field) => (
              <ConfirmationRow
                field={field}
                prevValue={currentInfo[field.Field] as string | boolean}
              />
            ))}
          </Grid>
          <TextField
            required
            variant="filled"
            label="Please give a reason for the change..."
            multiline
            fullWidth
            minRows={4}
            name="changeReason"
            value={changeReason}
            onChange={(event) => {
              setChangeReason(event.target.value);
            }}
          />
          {isSaving && <GordonLoader size={32} />}
        </>
      )}
    </GordonDialogBox>
  );
};

export default AlumniUpdateForm;
