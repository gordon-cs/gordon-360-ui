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
  const [loading, setLoading] = useState(true);
  const [isSaving, setSaving] = useState(false);
  const [sports, setSports] = useState([]);
  const [activityTypes, setActivityTypes] = useState([]);
  const [activityStatusTypes, setActivityStatusTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        getAllSports().then(setSports),
        getActivityTypes().then(setActivityTypes),
        getActivityStatusTypes().then(setActivityStatusTypes),
      ]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const activityFields = [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      required: true,
      helperText: '*Required',
    },
    {
      label: 'Activity Start',
      name: 'startDate',
      type: 'datetime',
      required: false,
      helperText: '*Required',
    },
    {
      label: 'Activity End',
      name: 'endDate',
      type: 'datetime',
      required: false,
      helperText: '',
    },
    {
      label: 'Registration Start',
      name: 'registrationStart',
      type: 'datetime',
      required: true,
      helperText: '*Required',
    },
    {
      label: 'Registration End',
      name: 'registrationEnd',
      type: 'datetime',
      required: false,
      helperText: '*Required',
    },
    {
      label: 'Activity Type',
      name: 'typeID',
      type: 'select',
      menuItems: activityTypes.map((type) => type.Description),
      required: true,
      helperText: '*Required',
    },
    {
      label: 'Sport',
      name: 'sportID',
      type: 'select',
      menuItems: sports.map((sport) => sport.Name),
      required: true,
      helperText: '*Required',
    },
    {
      label: 'Maximum Capacity',
      name: 'maxCapacity',
      type: 'text',
      required: false,
      helperText: '*Required',
    },
    {
      label: 'Individual Sport',
      name: 'soloRegistration',
      type: 'checkbox',
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
        menuItems: activityStatusTypes.map((type) => type.Description),
        helperText: '*Required',
      },
      {
        label: 'Completed',
        name: 'completed',
        type: 'checkbox',
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
        typeID: activity.Type,
        sportID: activity.Sport?.Name,
        statusID: activity.Status,
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
  }, [activity]);

  const handleConfirm = (newInfo, handleWindowClose) => {
    setSaving(true);

    let activityRequest = { ...currentInfo, ...newInfo };

    activityRequest.sportID = sports.find((type) => type.Name === activityRequest.sportID).ID;

    activityRequest.typeID = activityTypes.find(
      (type) => type.Description === activityRequest.typeID,
    ).ID;

    if (activity) {
      activity.isLogoUpdate = false;
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

  return (
    <Form
      formTitles={{ name: 'Activity', formType: activity ? 'Edit' : 'Create' }}
      fields={[activityFields]}
      currentInfo={currentInfo}
      loading={loading}
      isSaving={isSaving}
      setOpenForm={setOpenActivityForm}
      openForm={openActivityForm}
      handleConfirm={handleConfirm}
    />
  );
};

export default ActivityForm;
