import { useState, useEffect, useMemo } from 'react';
import Form from '../Form';
import { putSeriesSchedule } from 'services/recim/series';
import { getSurfaces } from 'services/recim/match';

const SeriesScheduleForm = ({
  closeWithSnackbar,
  openSeriesScheduleForm,
  setOpenSeriesScheduleForm,
  seriesID,
}) => {
  const [errorStatus, setErrorStatus] = useState({
    AvailableDays: false,
    AvailableSurfaceIDs: false,
    DailyStartTime: false,
    DailyEndTime: false,
    EstMatchTime: false,
  });

  // Fetch data required for form creation
  const [loading, setLoading] = useState(true);
  const [isSaving, setSaving] = useState(false);
  const [surfaces, setSurfaces] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setSurfaces(await getSurfaces());
      setLoading(false);
    };
    loadData();
  }, []);

  const seriesScheduleFields = [
    {
      label: 'Monday',
      name: 'Mon',
      type: 'checkbox',
      error: errorStatus.AvailableDays,
      helperText: '*Required',
      required: true,
    },
    {
      label: 'Tuesday',
      name: 'Tue',
      type: 'checkbox',
      error: errorStatus.AvailableDays,
      helperText: '*Required',
      required: true,
    },
    {
      label: 'Wednesday',
      name: 'Wed',
      type: 'checkbox',
      error: errorStatus.AvailableDays,
      helperText: '*Required',
      required: true,
    },
    {
      label: 'Thursday',
      name: 'Thu',
      type: 'checkbox',
      error: errorStatus.AvailableDays,
      helperText: '*Required',
      required: true,
    },
    {
      label: 'Friday',
      name: 'Fri',
      type: 'checkbox',
      error: errorStatus.AvailableDays,
      helperText: '*Required',
      required: true,
    },
    {
      label: 'Saturday',
      name: 'Sat',
      type: 'checkbox',
      error: errorStatus.AvailableDays,
      helperText: '*Required',
      required: true,
    },
    {
      label: 'Sunday',
      name: 'Sun',
      type: 'checkbox',
      error: errorStatus.AvailableDays,
      helperText: '*Required',
      required: true,
    },
    {
      label: 'Surfaces',
      name: 'AvailableSurfaceIDs',
      type: 'multiselect',
      menuItems: surfaces.map((surface) => surface.Name),
      error: errorStatus.AvailableSurfaceIDs,
      helperText: '*Required',
      required: true,
    },
    {
      label: 'Daily Start Time',
      name: 'DailyStartTime',
      type: 'datetime',
      error: errorStatus.DailyStartTime,
      helperText: '*Required',
      required: true,
    },
    {
      label: 'Daily End Time',
      name: 'DailyEndTime',
      type: 'datetime',
      error: errorStatus.DailyEndTime,
      helperText: '*Required',
      required: true,
    },
    {
      label: 'Estimated Match Length',
      name: 'EstMatchTime',
      type: 'text',
      error: errorStatus.EstMatchTime,
      helperText: '*Required',
      required: true,
    },
  ];

  const currentInfo = useMemo(() => {
    return {
      SeriesID: seriesID,
      Sun: false,
      Mon: false,
      Tue: false,
      Wed: false,
      Thu: false,
      Fri: false,
      Sat: false,
      AvailableSurfaceIDs: [],
      DailyStartTime: '',
      DailyEndTime: '',
      EstMatchTime: '',
    };
  }, [seriesID]);

  const errorCases = (field, value) => {
    switch (field) {
      default:
        return false;
    }
  };

  const handleConfirm = (newInfo, handleWindowClose) => {
    setSaving(true);

    let dayOfTheWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    let seriesRequest = { ...currentInfo, ...newInfo };
    seriesRequest.AvailableDays = {};

    // To get days of the week into array form for pass to API
    dayOfTheWeek.forEach((day) => {
      seriesRequest.AvailableDays[day] = seriesRequest[day];
      delete seriesRequest[day];
    });

    seriesRequest.AvailableSurfaceIDs = seriesRequest.AvailableSurfaceIDs.map(
      (surfaceDescription) => {
        return surfaces.find((surface) => surfaceDescription === surface.Name).ID;
      },
    );

    putSeriesSchedule(seriesRequest).then(() => {
      setSaving(false);
      closeWithSnackbar({
        type: 'success',
        message: `The series schedule has been edited`,
      });
      handleWindowClose();
    });
  };

  return (
    <Form
      formTitles={{ name: 'Team', formType: 'Edit' }}
      fields={seriesScheduleFields}
      currentInfo={currentInfo}
      errorCases={errorCases}
      setErrorStatus={setErrorStatus}
      loading={loading}
      isSaving={isSaving}
      setOpenForm={setOpenSeriesScheduleForm}
      openForm={openSeriesScheduleForm}
      handleConfirm={handleConfirm}
    />
  );
};

export default SeriesScheduleForm;
