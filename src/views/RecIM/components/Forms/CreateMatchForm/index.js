import { Grid } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import GordonDialogBox from 'components/GordonDialogBox';
import { InformationField } from '../components/InformationField';
import { ConfirmationWindowHeader } from '../components/ConfirmationHeader';
import { ConfirmationRow } from '../components/ConfirmationRow';
import { ContentCard } from '../components/ContentCard';
import GordonLoader from 'components/Loader';
import { createMatch, getMatchSurfaces } from 'services/recim/match';

const CreateMatchForm = ({
  closeWithSnackbar,
  openCreateMatchForm,
  setOpenCreateMatchForm,
  activity,
}) => {
  const [errorStatus, setErrorStatus] = useState({
    StartTime: false,
    SeriesID: false,
    SurfaceID: false,
    TeamIDs: false,
  });

  const [loading, setLoading] = useState(false);
  const [surfaces, setSurfaces] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setSurfaces(await getMatchSurfaces());
      setLoading(false);
    };
    loadData();
  }, []);


  const createMatchFields = [
    {
      label: 'Start Time',
      name: 'StartTime',
      type: 'datetime',
      error: errorStatus.StartTime,
      helperText: '*Required',
    },
    {
      label: 'Series',
      name: 'SeriesID',
      type: 'select',
      menuItems: activity.Series.map((series) => {
        return series.Name;
      }),
      error: errorStatus.SeriesID,
      helperText: '*Required',
    },
    {
      label: 'Surface ID',
      name: 'SurfaceID',
      type: 'select',
      menuItems: surfaces.map((surface) => {
        return surface.Description;
      }),
      error: errorStatus.SurfaceID,
      helperText: '*Required',
    },
    {
      label: 'Teams',
      name: 'TeamIDs',
      type: 'multiselect',
      menuItems: activity.Team.map((team) => {
        return team.Name;
      }),
      error: errorStatus.StartTime,
      helperText: '*Required',
    },
  ];

  const allFields = [createMatchFields].flat();

  const currentInfo = useMemo(() => {
    return {
      StartTime: '',
      SeriesID: '',
      SurfaceID: '',
      TeamIDs: [],
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

    let matchCreationRequest = { ...currentInfo, ...newInfo };

    matchCreationRequest.SeriesID = activity.Series.find(
      (series) => series.Name === matchCreationRequest.SeriesID,
    ).ID;

    matchCreationRequest.SurfaceID = surfaces.find(
      (surface) => surface.Description === matchCreationRequest.SurfaceID,
    ).ID;

    let idArray = [];
    matchCreationRequest.TeamIDs.forEach((value) => {
      idArray.push(activity.Team.find((team) => team.Name === value).ID);
    });
    matchCreationRequest.TeamIDs = idArray;


    createMatch(matchCreationRequest).then((result) => {
      console.log(result)
      closeWithSnackbar({
        type: 'success',
        message: 'Match created successfully',
      });

      handleWindowClose();
    });
  };

  const handleWindowClose = () => {
    setOpenCreateMatchForm(false);
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
        <ContentCard title="Match Information">{mapFieldsToInputs(createMatchFields)}</ContentCard>

        {/* Confirmation Dialog */}
        <GordonDialogBox
          open={openConfirmWindow}
          title="Confirm Your Match"
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
      open={openCreateMatchForm}
      title="Create a Team"
      fullWidth
      maxWidth="sm"
      buttonClicked={() => setOpenConfirmWindow(true)}
      isButtonDisabled={disableUpdateButton}
      buttonName="Submit"
      cancelButtonClicked={() => {
        setNewInfo(currentInfo);
        setOpenCreateMatchForm(false);
      }}
      cancelButtonName="cancel"
    >
      {content}
    </GordonDialogBox>
  );
};

export default CreateMatchForm;
