import {
  Button,
  Grid,
  DialogActions,
  DialogContent,
  DialogContentText,
  Tooltip,
} from '@mui/material';
import { useState, useEffect, useMemo, useRef } from 'react';
import GordonLoader from 'components/Loader';
import GordonDialogBox from 'components/GordonDialogBox';
import { ConfirmationRow } from '../components/ConfirmationRow';
import { ConfirmationWindowHeader } from '../components/ConfirmationHeader';
import { ContentCard } from '../components/ContentCard';
import { InformationField } from '../components/InformationField';
import {
  createActivity,
  getActivityTypes,
  getActivityStatusTypes,
  editActivity,
} from 'services/recim/activity';
import { getAllSports } from 'services/recim/sport';

const CROP_DIM = 200; // Width of cropped image canvas

const ActivityForm = ({ activity, closeWithSnackbar, openActivityForm, setOpenActivityForm }) => {
  const [errorStatus, setErrorStatus] = useState({
    name: false,
    startDate: false,
    endDate: false,
    registrationStart: false,
    registrationEnd: false,
    typeID: false,
    sportID: false,
    maxCapacity: false,
    soloRegistration: false,
    statusID: false,
    completed: false,
  });

  // Fetch data required for form creation
  const [loading, setLoading] = useState(true);
  const [sports, setSports] = useState([]);
  const [activityTypes, setActivityTypes] = useState([]);
  const [activityStatusTypes, setActivityStatusTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setSports(await getAllSports());
      setActivityTypes(await getActivityTypes());
      setActivityStatusTypes(await getActivityStatusTypes());
      setLoading(false);
    };
    fetchData();
  }, []);

  const activityFields = [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      error: errorStatus.name,
      required: true,
      helperText: '*Required',
    },
    {
      label: 'Activity Start',
      name: 'startDate',
      type: 'datetime',
      error: errorStatus.startDate,
      required: false,
      helperText: '*Required',
    },
    {
      label: 'Activity End',
      name: 'endDate',
      type: 'datetime',
      error: errorStatus.endDate,
      required: false,
      helperText: '',
    },
    {
      label: 'Registration Start',
      name: 'registrationStart',
      type: 'datetime',
      error: errorStatus.registrationStart,
      required: true,
      helperText: '*Required',
    },
    {
      label: 'Registration End',
      name: 'registrationEnd',
      type: 'datetime',
      error: errorStatus.registrationEnd,
      required: false,
      helperText: '*Required',
    },
    {
      label: 'Activity Type',
      name: 'typeID',
      type: 'select',
      menuItems: activityTypes.map((type) => {
        return type.Description;
      }),
      error: errorStatus.typeID,
      required: true,
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
      required: true,
      helperText: '*Required',
    },
    {
      label: 'Maximum Capacity',
      name: 'maxCapacity',
      type: 'text',
      error: errorStatus.maxCapacity,
      required: false,
      helperText: '*Required',
    },
    {
      label: 'Individual Sport',
      name: 'soloRegistration',
      type: 'checkbox',
      error: errorStatus.soloRegistration,
      required: false,
      helperText: '*Required',
    },
  ];
  if (activity) {
    activityFields.push(
      {
        label: 'Activity Status',
        name: 'statusID',
        type: 'select',
        menuItems: activityStatusTypes.map((type) => {
          return type.Description;
        }),
        error: errorStatus.statusID,
        helperText: '*Required',
      },
      {
        label: 'Completed',
        name: 'completed',
        type: 'checkbox',
        error: errorStatus.completed,
        helperText: '*Required',
      },
    );
  }

  const allFields = [
    activityFields,
    // if you need more fields put them here, or if you make a "second page"
  ].flat();

  const currentInfo = useMemo(() => {
    if (activity) {
      return {
        name: activity.Name,
        startDate: activity.StartDate,
        endDate: activity.EndDate,
        registrationStart: activity.RegistrationStart,
        registrationEnd: activity.RegistrationEnd,
        typeID:
          activityTypes.find((type) => type.Description === activity.Type) == null
            ? ''
            : activityTypes.find((type) => type.Description === activity.Type).Description,
        sportID:
          sports.find((type) => type.ID === activity.Sport.ID) == null
            ? ''
            : sports.find((type) => type.ID === activity.Sport.ID).Name,
        statusID:
          activityStatusTypes.find((type) => type.Description === activity.Status) == null
            ? ''
            : activityStatusTypes.find((type) => type.Description === activity.Status).Description,
        maxCapacity: activity.MaxCapacity,
        soloRegistration: activity.SoloRegistration,
        completed: activity.Completed,
      };
    }
    return {
      name: '',
      startDate: null,
      endDate: null,
      registrationStart: null,
      registrationEnd: null,
      typeID: '',
      sportID: '',
      maxCapacity: '',
      soloRegistration: false,
    };
  }, [activity, activityTypes, activityStatusTypes, sports]);

  const [newInfo, setNewInfo] = useState(currentInfo);
  const [openConfirmWindow, setOpenConfirmWindow] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [disableUpdateButton, setDisableUpdateButton] = useState(true);
  const [activityRequest, setActivityRequest] = useState({ ...currentInfo, ...newInfo });

  const handleSetError = (field, condition) => {
    const getCurrentErrorStatus = (currentValue) => {
      return {
        ...currentValue,
        [field]: condition,
      };
    };
    setErrorStatus(getCurrentErrorStatus);
  };

  //re spreads fetched data to map to drop-down's once data has been loaded
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
      let isFieldRequired = activityFields.find((n) => n.name === field).required;
      handleSetError(field, !newInfo[field] && isFieldRequired);
      if (!newInfo[field] && isFieldRequired) hasError = true;
    }
    setDisableUpdateButton(hasError || !hasChanges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    let newActivityRequest = { ...currentInfo, ...newInfo };
    newActivityRequest.sportID = sports.find(
      (sport) => sport.Name === newActivityRequest.sportID,
    ).ID;
    newActivityRequest.typeID = activityTypes.find(
      (type) => type.Description === newActivityRequest.typeID,
    ).ID;

    setActivityRequest(newActivityRequest);
  };

  const handleConfirm = () => {
    setSaving(true);

    if (activity) {
      activityRequest.statusID = activityStatusTypes.find(
        (type) => type.Description === activityRequest.statusID,
      ).ID;
      editActivity(activity.ID, activityRequest).then((res) => {
        setSaving(false);
        closeWithSnackbar({
          type: 'success',
          message: 'Your new activity has been created or whatever message you want here',
        });
        handleWindowClose();
      });
    } else {
      createActivity(activityRequest).then((res) => {
        setSaving(false);
        closeWithSnackbar({
          type: 'success',
          message: 'Your new activity has been created or whatever message you want here',
        });
        handleWindowClose();
      });
    }
  };

  const handleWindowClose = () => {
    setOpenConfirmWindow(false);
    setOpenActivityForm(false);
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
        sm={6}
        md={4}
        lg={3}
      />
    ));
  };

  let content;
  if (loading) {
    content = <GordonLoader />;
  } else {
    content = (
      <>
        <ContentCard title="Activity Information">{mapFieldsToInputs(activityFields)}</ContentCard>

        <GordonDialogBox
          open={openConfirmWindow}
          title="Confirm Your Activity"
          buttonClicked={!isSaving && handleConfirm}
          buttonName="Confirm"
          // in case you want to authenticate something change isButtonDisabled
          isButtonDisabled={false}
          cancelButtonClicked={() => {
            if (!isSaving) setOpenConfirmWindow(false);
          }}
          cancelButtonName="Cancel"
        >
          <ConfirmationWindowHeader />
          <Grid container>
            {getNewFields(currentInfo, newInfo).map((field) => (
              <ConfirmationRow key={field} field={field} />
            ))}
          </Grid>
          {isSaving && <GordonLoader size={32} />}
        </GordonDialogBox>
      </>
    );
  }

  const dialogTitle = activity ? 'Edit Activity' : 'Create Activity';
  return (
    <GordonDialogBox
      open={openActivityForm}
      title={dialogTitle}
      fullWidth
      maxWidth="lg"
      buttonClicked={() => {
        handleSubmit();
        setOpenConfirmWindow(true);
      }}
      isButtonDisabled={disableUpdateButton}
      buttonName="Submit"
      cancelButtonClicked={() => {
        setNewInfo(currentInfo);
        setOpenActivityForm(false);
      }}
      cancelButtonName="cancel"
    >
      {content}
    </GordonDialogBox>
  );
};

export default ActivityForm;
