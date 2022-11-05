import { Grid } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import styles from './CreateActivityForm.module.css';
import GordonLoader from 'components/Loader';
import GordonDialogBox from 'components/GordonDialogBox';
import { ConfirmationRow } from './components/ConfirmationRow';
import { ConfirmationWindowHeader } from './components/ConfirmationHeader';
import { ContentCard } from './components/ContentCard';
import { InformationField } from './components/InformationField';
import { postSmashActivity } from 'services/recim';

const CreateActivityForm = ({
  closeWithSnackbar,
  openCreateActivityForm,
  setOpenCreateActivityForm,
}) => {
  const [errorStatus, setErrorStatus] = useState({
    name: false,
    regStart: false,
    regEnd: false,
    type: false,
    sport: false,
    cap: false,
    individual: false,
  });

  const createActivityFields = [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      error: errorStatus.name,
      helperText: '*Required',
    },
    {
      label: 'Registration Start',
      name: 'regStart',
      type: 'datetime',
      error: errorStatus.regStart,
      helperText: '*Required',
    },
    {
      label: 'Registration End',
      name: 'regEnd',
      type: 'datetime',
      error: errorStatus.regEnd,
      helperText: '*Required',
    },
    {
      label: 'Competition Type',
      name: 'type',
      type: 'select',
      menuItems: ['Round Robin', 'Bracket', 'One Off'],
      error: errorStatus.type,
      helperText: '*Required',
    },
    {
      label: 'Sport',
      name: 'sport',
      type: 'select',
      menuItems: ['Existing Sport 0', 'Existing Sprot 1', 'Existing Sport 2'],
      error: errorStatus.sport,
      helperText: '*Required',
    },
    {
      label: 'Maximum Capacity',
      name: 'cap',
      type: 'text',
      error: errorStatus.cap,
      helperText: '*Required',
    },
    {
      label: 'Individual Sport',
      name: 'individual',
      type: 'checkbox',
      error: errorStatus.individual,
      helperText: '*Required',
    },
  ];

  const allFields = [
    createActivityFields,
    // if you need more fields put them here, or if you make a "second paage"
  ].flat();

  const currentInfo = useMemo(() => {
    return {
      name: '',
      regStart: '',
      regEnd: '',
      type: '',
      sport: '',
      cap: '',
      individual: false,
    };
  }, []);
  const [newInfo, setNewInfo] = useState(currentInfo);
  const [openConfirmWindow, setOpenConfirmWindow] = useState(false);
  const [isSaving, setSaving] = useState(false);
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

  // Field Validation
  useEffect(() => {
    let hasError = false;
    let hasChanges = false;
    for (const field in currentInfo) {
      if (currentInfo[field] !== newInfo[field]) {
        hasChanges = true;
      }
      switch (field) {
        case 'name':
        case 'regStart':
        case 'regEnd':
        case 'type':
        case 'sport':
        case 'cap':
        case 'individual':
          handleSetError(field, newInfo[field] === '');
          hasError = newInfo[field] === '' || hasError;
          break;

        default:
          break;
      }
    }
    setDisableUpdateButton(hasError || !hasChanges);
  }, [newInfo, currentInfo]);

  const handleChange = (event, src) => {
    const getNewInfo = (currentValue) => {
      // datetime pickers return value rather than event,
      // so we can also manually specify target source and value
      if (src) {
        let newValue = event;
        return {
          ...currentValue,
          [src]: newValue,
        };
      }
      return {
        ...currentValue,
        [event.target.name]:
          event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      };
    };
    setNewInfo(getNewInfo);
  };

  const getFieldLabel = (fieldName) => {
    const matchingField = allFields.find((field) => field.name === fieldName);
    return matchingField.label;
  };

  function getNewFields(newInfo, currentInfo) {
    const updatedFields = [];
    Object.entries(currentInfo).forEach(([field, value]) => {
      if (newInfo[field] !== value)
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
    //hard coded for activity, sportId & typeID are hard coded to 0
    //until we pull API data
    postSmashActivity().then(() => {
      setSaving(false);
      closeWithSnackbar({
        type: 'success',
        message: 'Your new activity has been created or whatever message you want here',
      });
      handleWindowClose();
    });
    // createNewActivity(requestData).then(() => {
    //   setSaving(false);
    //   closeWithSnackbar({
    //     type: 'success',
    //     message: 'Your new activity has been created or whatever message you want here',
    //   });
    //   handleWindowClose();
    // });
  };

  const handleWindowClose = () => {
    setOpenConfirmWindow(false);
    setNewInfo(currentInfo);
  };

  /**
   * @param {Array<{name: string, label: string, type: string, menuItems: string[]}>} fields array of objects defining the properties of the input field
   * @returns JSX correct input for each field based on type
   */
  const mapFieldsToInputs = (fields) => {
    return fields.map((field) => (
      <InformationField
        key={field.name}
        error={field.error}
        label={field.label}
        name={field.name}
        helperText={field.helperText}
        value={newInfo[field.name]}
        type={field.type}
        menuItems={field.menuItems}
        onChange={handleChange}
      />
    ));
  };

  return (
    <GordonDialogBox
      open={openCreateActivityForm}
      title="Create Activity"
      fullWidth
      maxWidth="lg"
      buttonClicked={() => setOpenConfirmWindow(true)}
      isButtonDisabled={disableUpdateButton}
      buttonName="Submit"
      cancelButtonClicked={() => {
        setNewInfo(currentInfo);
        setOpenCreateActivityForm(false);
      }}
      cancelButtonName="cancel"
      titleClass={styles.formTitle}
    >
      <ContentCard title="Activity Information">
        {mapFieldsToInputs(createActivityFields)}
      </ContentCard>

      <GordonDialogBox
        open={openConfirmWindow}
        title="Confirm Your Activity"
        buttonClicked={!isSaving ? handleConfirm : null}
        buttonName="Confirm"
        // in case you want to authenticate something change isButtonDisabled
        isButtonDisabled={false}
        cancelButtonClicked={!isSaving ? handleWindowClose : null}
        cancelButtonName="Cancel"
      >
        <ConfirmationWindowHeader />
        <Grid container>
          {getNewFields(currentInfo, newInfo).map((field) => (
            <ConfirmationRow key={field} field={field} prevValue={currentInfo[field.Field]} />
          ))}
        </Grid>
        {isSaving ? <GordonLoader size={32} /> : null}
      </GordonDialogBox>
    </GordonDialogBox>
  );
};

export default CreateActivityForm;
