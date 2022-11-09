import { Grid } from '@material-ui/core/';
import { useState, useEffect, useMemo } from 'react';
import styles from './CreateActivityForm.module.css';
import GordonLoader from 'components/Loader';
import GordonDialogBox from 'components/GordonDialogBox';
import { ConfirmationRow } from './components/ConfirmationRow';
import { ConfirmationWindowHeader } from './components/ConfirmationHeader';
import { ContentCard } from './components/ContentCard';
import { InformationField } from './components/InformationField';
import { createNewActivity, getAllSports } from 'services/recim';

const CreateActivityForm = ({
  closeWithSnackbar,
  openCreateActivityForm,
  setOpenCreateActivityForm,
}) => {
  const [errorStatus, setErrorStatus] = useState({
    name: false,
    registrationStart: false,
    registrationEnd: false,
    type: false,
    sportID: false,
    maxCapacity: false,
    soloRegistration: false,
  });

  // Fetch data required for form creation
  const [loading, setLoading] = useState(true);
  const [sports, setSports] = useState([]);
  useEffect(() => {
    const loadSports = async () => {
      setLoading(true);

      // Get all active activities where registration has not closed
      let tempSports = await getAllSports();
      setSports(tempSports);
      setLoading(false);
    };
    loadSports();
  }, []);

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
      name: 'registrationStart',
      type: 'text',
      error: errorStatus.registrationStart,
      helperText: '*Required',
    },
    {
      label: 'Registration End',
      name: 'registrationEnd',
      type: 'text',
      error: errorStatus.registrationEnd,
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
      name: 'sportID',
      type: 'select',
      menuItems: sports.map((sport) => {
        return sport.Name;
      }),
      error: errorStatus.sportID,
      helperText: '*Required',
    },
    {
      label: 'Maximum Capacity',
      name: 'maxCapacity',
      type: 'text',
      error: errorStatus.maxCapactity,
      helperText: '*Required',
    },
    {
      label: 'Individual Sport',
      name: 'soloRegistration',
      type: 'checkbox',
      error: errorStatus.soloRegistration,
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
      registrationStart: '',
      registrationEnd: '',
      type: '',
      sportID: '',
      maxCapacity: '',
      soloRegistration: false,
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
      handleSetError(field, newInfo[field] === '');
      hasError = newInfo[field] === '' || hasError;
    }
    setDisableUpdateButton(hasError || !hasChanges);
  }, [newInfo, currentInfo]);

  const handleChange = (event) => {
    const getNewInfo = (currentValue) => {
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

  function getNewFields(currentInfo, newInfo) {
    const updatedFields = [];
    Object.entries(newInfo).forEach(([key, value]) => {
      if (currentInfo[key] !== value)
        updatedFields.push({
          Field: key,
          Value: value,
          Label: getFieldLabel(key),
        });
    });
    return updatedFields;
  }

  const handleConfirm = () => {
    setSaving(true);

    let activityCreationRequest = { ...currentInfo, ...newInfo };
    console.log(activityCreationRequest);

    activityCreationRequest.sportID = sports.filter(
      (sport) => sport.Name === activityCreationRequest.sportID,
    )[0].ID;

    createNewActivity(activityCreationRequest).then(() => {
      setSaving(false);
      closeWithSnackbar({
        type: 'success',
        message: 'Your new activity has been created or whatever message you want here',
      });
      handleWindowClose();
    });
  };

  const handleWindowClose = () => {
    setOpenConfirmWindow(false);
    setNewInfo(currentInfo);
  };

  /**
   * @param {Array<{name: string, label: string, type: string, menuItems: String[]}>} fields array of objects defining the properties of the input field
   * @returns JSX correct input for each field based on type
   */
  const mapFieldsToInputs = (fields) => {
    return fields.map((field) => (
      <InformationField
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

  let content;
  if (loading) {
    content = <GordonLoader />;
  } else {
    content = (
      <>
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
              <ConfirmationRow field={field} />
            ))}
          </Grid>
          {isSaving ? <GordonLoader size={32} /> : null}
        </GordonDialogBox>
      </>
    );
  }
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
      {content}
    </GordonDialogBox>
  );
};

export default CreateActivityForm;
