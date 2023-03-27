import { useState, useEffect, useMemo } from 'react';
import Form from '../Form';
import {
  createActivity,
  getActivityTypes,
  getActivityStatusTypes,
  editActivity,
} from 'services/recim/activity';
import { getAllSports } from 'services/recim/sport';

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

  const errorCases = (field, value) => {
    switch (field) {
      default:
        return false;
    }
  };

  const handleConfirm = (newInfo, handleWindowClose, setSaving) => {
    setSaving(true);

    let activityRequest = { ...currentInfo, ...newInfo };

    if (activity) {
      activityRequest.statusID = activityStatusTypes.find(
        (type) => type.Description === activityRequest.statusID,
      ).ID;
      activity.isLogoUpdate = false;
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

  return (
    <Form
      formTitles={{ name: 'Activity', formType: activity ? 'Edit' : 'Create' }}
      fields={activityFields}
      currentInfo={currentInfo}
      errorCases={errorCases}
      setErrorStatus={setErrorStatus}
      loading={loading}
      setOpenForm={setOpenActivityForm}
      openForm={openActivityForm}
      handleConfirm={handleConfirm}
    />
  );
};

export default ActivityForm;
