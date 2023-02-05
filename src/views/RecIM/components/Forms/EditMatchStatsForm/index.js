import { Grid } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import GordonDialogBox from 'components/GordonDialogBox';
import { InformationField } from '../components/InformationField';
import { ConfirmationWindowHeader } from '../components/ConfirmationHeader';
import { ConfirmationRow } from '../components/ConfirmationRow';
import { ContentCard } from '../components/ContentCard';
import GordonLoader from 'components/Loader';
import { getMatchTeamStatusTypes, updateMatchStats } from 'services/recim/match';

const EditMatchStatsForm = ({
  matchID,
  teamMatchHistory,
  closeWithSnackbar,
  openEditMatchStatsForm,
  setOpenEditMatchStatsForm,
}) => {
  const [errorStatus, setErrorStatus] = useState({
    Score: false,
    StatusID: false,
    Sportsmanship: false,
  });

  const [loading, setLoading] = useState(true);
  const [matchStatus, setMatchStatus] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setMatchStatus(await getMatchTeamStatusTypes());
      setLoading(false);
    };
    loadData();
  }, []);

  const createMatchStatsField = [
    {
      label: 'Score',
      name: 'Score',
      type: 'number',
      error: errorStatus.Score,
      helperText: '*Required',
    },
    {
      label: 'Sportsmanship',
      name: 'Sportsmanship',
      type: 'number',
      error: errorStatus.Sportsmanship,
      helperText: "*Required & Can't be more than 5",
    },
    {
      label: 'Status',
      name: 'StatusID',
      type: 'select',
      menuItems: matchStatus.map((type) => {
        return type.Description;
      }),
      error: errorStatus.StatusID,
      helperText: '*Required',
    },
  ];

  const allFields = [createMatchStatsField].flat();

  const currentInfo = useMemo(() => {
    return {
      TeamID: teamMatchHistory.TeamID,
      Score: `${teamMatchHistory.TeamScore}`,
      Sportsmanship: `${teamMatchHistory.Sportsmanship}`,
      StatusID:
        matchStatus.find((type) => type.Description === teamMatchHistory.Status) == null
          ? ''
          : matchStatus.find((type) => type.Description === teamMatchHistory.Status).Description,
    };
  }, [teamMatchHistory, matchStatus]);

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

  // refresh dropdown select once fetch is complete
  useEffect(() => {
    setNewInfo(currentInfo);
  }, [currentInfo]);

  // Field Validation
  useEffect(() => {
    let hasChanges = false;
    let hasError = false;
    for (const field in currentInfo) {
      if (currentInfo[field] !== newInfo[field]) {
        hasChanges = true;
      }
      switch (field) {
        case 'Sportsmanship':
          hasError = hasError || newInfo[field] > 5;
          //fall through
        case 'Score':
          hasError = !/^[0-9]+$/.test(newInfo[field]);
          break;
        case 'StatusID':
          hasError = newInfo[field] === '';
          break;
        default:
      }
      handleSetError(field, hasError);
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
    let matchStatsRequest = { ...currentInfo, ...newInfo };
    matchStatsRequest.StatusID = matchStatus.find(
      (status) => status.Description === matchStatsRequest.StatusID,
    )?.ID;
    updateMatchStats(matchID, matchStatsRequest).then(() => {
      setSaving(false);
      closeWithSnackbar({
        type: 'success',
        message: 'Match edited successfully',
      });
      handleWindowClose();
    });
  };

  const handleWindowClose = () => {
    setOpenEditMatchStatsForm(false);
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

  let content;
  if (loading) {
    content = <GordonLoader />;
  } else {
    content = (
      <>
        <ContentCard title="Match Stats">{mapFieldsToInputs(createMatchStatsField)}</ContentCard>
        {/* Confirmation Dialog */}
        <GordonDialogBox
          open={openConfirmWindow}
          title="Confirm your Match Stats"
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
      </>
    );
  }

  return (
    <GordonDialogBox
      open={openEditMatchStatsForm}
      title="Edit Match Stats"
      fullWidth
      maxWidth="sm"
      buttonClicked={() => setOpenConfirmWindow(true)}
      isButtonDisabled={disableUpdateButton}
      buttonName="Submit"
      cancelButtonClicked={() => {
        setNewInfo(currentInfo);
        setOpenEditMatchStatsForm(false);
      }}
      cancelButtonName="cancel"
    >
      {content}
    </GordonDialogBox>
  );
};

export default EditMatchStatsForm;
