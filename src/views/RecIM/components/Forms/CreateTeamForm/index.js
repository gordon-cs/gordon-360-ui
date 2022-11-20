import { Grid } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import GordonDialogBox from 'components/GordonDialogBox';
import { createNewTeam } from 'services/recim';
import { InformationField } from '../components/InformationField';
import { ConfirmationWindowHeader } from '../components/ConfirmationHeader';
import { ConfirmationRow } from '../components/ConfirmationRow';
import { ContentCard } from '../components/ContentCard';
import GordonLoader from 'components/Loader';

const CreateTeamForm = ({
  closeWithSnackbar,
  openCreateTeamForm,
  setOpenCreateTeamForm,
  activityID,
}) => {
  const [errorStatus, setErrorStatus] = useState({
    Name: false,
    StatusID: false,
    ActivityID: false,
    Private: false,
    Logo: false,
  });

  const createTeamFields = [
    {
      label: 'Name',
      name: 'Name',
      type: 'text',
      error: errorStatus.Name,
      helperText: '*Required',
    },
  ];

  const allFields = [createTeamFields].flat();

  const currentInfo = useMemo(() => {
    return {
      Name: '',
      StatusID: 1,
      ActivityID: Number(activityID),
      Private: false,
      Logo: 'EMPTY FOR NOW', // Placeholder (for error checking0)
    };
  }, [activityID]);

  const [newInfo, setNewInfo] = useState(currentInfo);
  const [isSaving, setSaving] = useState(false);
  const [openConfirmWindow, setOpenConfirmWindow] = useState(false);
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
      // switch (field) {
      //   case 'name':
      //     break;

      //   default:
      //     break;
      // }
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

    let teamCreationRequest = { ...currentInfo, ...newInfo };

    console.log(teamCreationRequest)

    createNewTeam(teamCreationRequest).then(() => {
      closeWithSnackbar({
        type: 'success',
        message: 'Team created successfully',
      });

      handleWindowClose();
    });
  };

  const handleWindowClose = () => {
    setOpenCreateTeamForm(false);
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
        xs={12}
        sm={12}
        md={12}
        lg={12}
      />
    ));
  };

  return (
    <GordonDialogBox
      open={openCreateTeamForm}
      title="Create a Team"
      fullWidth
      maxWidth="sm"
      buttonClicked={() => setOpenConfirmWindow(true)}
      isButtonDisabled={disableUpdateButton}
      buttonName="Submit"
      cancelButtonClicked={() => {
        setNewInfo(currentInfo);
        setOpenCreateTeamForm(false);
      }}
      cancelButtonName="cancel"
    >
      <ContentCard title="Team Information">{mapFieldsToInputs(createTeamFields)}</ContentCard>

      {/* Confirmation Dialog */}
      <GordonDialogBox
        open={openConfirmWindow}
        title="Confirm Your Team"
        buttonClicked={!isSaving ? handleConfirm : null}
        buttonName="Confirm"
        // in case you want to authenticate something change isButtonDisabled
        isButtonDisabled={disableUpdateButton}
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

export default CreateTeamForm;
