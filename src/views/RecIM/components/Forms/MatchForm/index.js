import { Grid } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import GordonDialogBox from 'components/GordonDialogBox';
import { InformationField } from '../components/InformationField';
import { ConfirmationWindowHeader } from '../components/ConfirmationHeader';
import { ConfirmationRow } from '../components/ConfirmationRow';
import { ContentCard } from '../components/ContentCard';
import GordonLoader from 'components/Loader';
import {
  createMatch,
  updateMatch,
  getMatchSurfaces,
  getMatchStatusTypes,
} from 'services/recim/match';

const MatchForm = ({ closeWithSnackbar, openMatchForm, setOpenMatchForm, activity, match }) => {
  const [errorStatus, setErrorStatus] = useState({
    StartTime: false,
    SeriesID: false,
    SurfaceID: false,
    TeamIDs: false,
    StatusID: false,
  });

  const [loading, setLoading] = useState(false);
  const [surfaces, setSurfaces] = useState([]);
  const [matchStatus, setMatchStatus] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setSurfaces(await getMatchSurfaces());
      setMatchStatus(await getMatchStatusTypes());
      setLoading(false);
    };
    loadData();
  }, []);

  const createMatchFields = [
    {
      label: 'Surface',
      name: 'SurfaceID',
      type: 'select',
      menuItems: surfaces.map((surface) => {
        return surface.Description;
      }),
      error: errorStatus.SurfaceID,
      helperText: '*Required',
    },
  ];
  if (activity) {
    createMatchFields.push(
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
        label: 'Teams',
        name: 'TeamIDs',
        type: 'multiselect',
        menuItems: activity.Team.map((team) => {
          return team.Name;
        }),
        error: errorStatus.TeamIDs,
        helperText: '*Required',
      },
    );
  } else if (match) {
    createMatchFields.push(
      {
        label: 'Start Time',
        name: 'Time',
        type: 'datetime',
        error: errorStatus.StartTime,
        helperText: '*Required',
      },
      {
        label: 'Teams',
        name: 'TeamIDs',
        type: 'multiselect',
        menuItems: match.Activity.Team.map((team) => {
          return team.Name;
        }),
        error: errorStatus.TeamIDs,
        helperText: '*Required',
      },
      {
        label: 'Status',
        name: 'StatusID',
        type: 'select',
        menuItems: matchStatus.map((type) => {
          return type.Description;
        }),
        error: errorStatus.TeamIDs,
        helperText: '*Required',
      },
    );
  }

  const allFields = [createMatchFields].flat();

  const currentInfo = useMemo(() => {
    if (match) {
      //I tried using inbuild javascript functions but I can't wrap my head around multiple
      //filters. You are welcome to improve on the logic below if you so desire.
      var teamIDs = [];
      match.Team.forEach((team) =>
        teamIDs.push(match.Activity.Team.find((_team) => team.ID === _team.ID).Name),
      );
      return {
        StartTime: match.Time,
        StatusID:
          matchStatus.find((type) => type.Description === match.Status) == null
            ? ''
            : matchStatus.find((type) => type.Description === match.Status).Description,
        SurfaceID:
          surfaces.find((type) => type.Description === match.Surface) == null
            ? ''
            : surfaces.find((type) => type.Description === match.Surface).Description,
        TeamIDs: teamIDs,
      };
    }
    return {
      StartTime: '',
      SeriesID: '',
      SurfaceID: '',
      TeamIDs: [],
    };
  }, [surfaces, matchStatus, match]);
  const [newInfo, setNewInfo] = useState(currentInfo);
  const [openConfirmWindow, setOpenConfirmWindow] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [disableUpdateButton, setDisableUpdateButton] = useState(true);

  //re spreads fetched data to map to drop-down's once data has been loaded
  useEffect(() => {
    setNewInfo(currentInfo);
  }, [currentInfo]);

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

    let matchRequest = { ...currentInfo, ...newInfo };
    if (activity)
      matchRequest.SeriesID = activity.Series.find(
        (series) => series.Name === matchRequest.SeriesID,
      ).ID;

    matchRequest.SurfaceID = surfaces.find(
      (surface) => surface.Description === matchRequest.SurfaceID,
    ).ID;

    let idArray = [];
    matchRequest.TeamIDs.forEach((value) => {
      if (activity) idArray.push(activity.Team.find((team) => team.Name === value).ID);
      else if (match) idArray.push(match.Activity.Team.find((team) => team.Name === value).ID);
    });
    matchRequest.TeamIDs = idArray;

    if (activity)
      createMatch(matchRequest).then((result) => {
        console.log(result);
        closeWithSnackbar({
          type: 'success',
          message: 'Match created successfully',
        });
        handleWindowClose();
      });
    else if (match) {
      matchRequest.StatusID = matchStatus.find(
        (type) => type.Description === matchRequest.StatusID,
      ).ID;
      console.log(matchRequest);
      updateMatch(match.ID, matchRequest).then((result) => {
        console.log(result);
        closeWithSnackbar({
          type: 'success',
          message: 'Match created successfully',
        });
        handleWindowClose();
      });
    }
  };

  const handleWindowClose = () => {
    setOpenMatchForm(false);
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
      </>
    );
  }

  return (
    <GordonDialogBox
      open={openMatchForm}
      title={activity ? `Create a Match` : `Edit a Match`}
      fullWidth
      maxWidth="sm"
      buttonClicked={() => setOpenConfirmWindow(true)}
      isButtonDisabled={disableUpdateButton}
      buttonName="Submit"
      cancelButtonClicked={() => {
        setNewInfo(currentInfo);
        setOpenMatchForm(false);
      }}
      cancelButtonName="cancel"
    >
      {content}
    </GordonDialogBox>
  );
};

export default MatchForm;
