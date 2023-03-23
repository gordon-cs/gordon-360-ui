import {
  Button,
  Grid,
  DialogActions,
  DialogContent,
  DialogContentText,
  Tooltip,
} from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import GordonDialogBox from 'components/GordonDialogBox';
import { createTeam, editTeam, getTeamStatusTypes } from 'services/recim/team';
import { InformationField } from '../components/InformationField';
import { ConfirmationWindowHeader } from '../components/ConfirmationHeader';
import { ConfirmationRow } from '../components/ConfirmationRow';
import { ContentCard } from '../components/ContentCard';
import GordonLoader from 'components/Loader';
import { useUser } from 'hooks';

const CROP_DIM = 200; // Width of cropped image canvas

const TeamForm = ({
  isAdmin,
  team,
  closeWithSnackbar,
  openTeamForm,
  setOpenTeamForm,
  activityID,
}) => {
  const [errorStatus, setErrorStatus] = useState({
    Name: false,
    ActivityID: false,
    statusID: false,
  });

  const { profile } = useUser();
  const [teamStatus, setTeamStatus] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setTeamStatus(await getTeamStatusTypes());
      setLoading(false);
    };
    loadData();
  }, [profile]);

  const createTeamFields = [
    {
      label: 'Name',
      name: 'Name',
      type: 'text',
      error: errorStatus.Name,
      helperText: '*Required',
    },
  ];
  if (team && isAdmin) {
    createTeamFields.push({
      label: 'Team Status',
      name: 'StatusID',
      type: 'select',
      menuItems: teamStatus.map((type) => {
        return type.Description;
      }),
      error: errorStatus.statusID,
      helperText: '*Required',
    });
  }

  const allFields = [createTeamFields].flat();

  const currentInfo = useMemo(() => {
    if (team) {
      return {
        Name: team.Name,
        ActivityID: Number(activityID),
        StatusID:
          teamStatus.find((type) => type.Description === team.Status) == null
            ? ''
            : teamStatus.find((type) => type.Description === team.Status).Description,
      };
    }
    return {
      Name: '',
      ActivityID: Number(activityID),
    };
  }, [activityID, team, teamStatus]);

  const [newInfo, setNewInfo] = useState(currentInfo);
  const [isSaving, setSaving] = useState(false);
  const [openConfirmWindow, setOpenConfirmWindow] = useState(false);
  const [disableUpdateButton, setDisableUpdateButton] = useState(true);
  const [teamRequest, setTeamRequest] = useState({ ...currentInfo, ...newInfo });

  const handleSetError = (field, condition) => {
    const getCurrentErrorStatus = (currentValue) => {
      return {
        ...currentValue,
        [field]: condition,
      };
    };
    setErrorStatus(getCurrentErrorStatus);
  };

  // refresh dropdown select once fetch is complete
  useEffect(() => {
    setNewInfo(currentInfo);
  }, [currentInfo]);

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

  const handleSubmit = async () => {
    let newTeamRequest = { ...currentInfo, ...newInfo };

    setTeamRequest(newTeamRequest);
  };

  const handleConfirm = () => {
    setSaving(true);

    if (team) {
      teamRequest.StatusID = teamStatus.find(
        (type) => type.Description === teamRequest.StatusID,
      ).ID;
      teamRequest.IsLogoUpdate = false;

      editTeam(team.ID, teamRequest).then(() => {
        setSaving(false);
        closeWithSnackbar({
          type: 'success',
          message: 'Team edited successfully',
        });

        handleWindowClose();
      });
    } else {
      createTeam(profile.AD_Username, teamRequest).then((createdTeam) => {
        setSaving(false);
        closeWithSnackbar(createdTeam.ID, {
          type: 'success',
          message: 'Team created successfully',
        });

        handleWindowClose();
      });
    }
  };

  const handleWindowClose = () => {
    setOpenTeamForm(false);
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
  if (loading) return <GordonLoader />;
  return (
    <GordonDialogBox
      open={openTeamForm}
      title={team ? 'Edit your team' : 'Create a Team'}
      fullWidth
      maxWidth="sm"
      buttonClicked={() => {
        handleSubmit();
        setOpenConfirmWindow(true);
      }}
      isButtonDisabled={disableUpdateButton}
      buttonName="Submit"
      cancelButtonClicked={() => {
        setNewInfo(currentInfo);
        setOpenTeamForm(false);
      }}
      cancelButtonName="cancel"
    >
      <ContentCard title="Team Information">{mapFieldsToInputs(createTeamFields)}</ContentCard>

      {/* Confirmation Dialog */}
      <GordonDialogBox
        open={openConfirmWindow}
        title="Confirm Your Team"
        buttonClicked={!isSaving && handleConfirm}
        buttonName="Confirm"
        // in case you want to authenticate something change isButtonDisabled
        isButtonDisabled={disableUpdateButton}
        cancelButtonClicked={!isSaving && handleWindowClose}
        cancelButtonName="Cancel"
      >
        <ConfirmationWindowHeader />
        <Grid container>
          {getNewFields(currentInfo, newInfo).map((field) => (
            <ConfirmationRow key={field} field={field} prevValue={currentInfo[field.Field]} />
          ))}
        </Grid>
        {isSaving && <GordonLoader size={32} />}
      </GordonDialogBox>
    </GordonDialogBox>
  );
};

export default TeamForm;
