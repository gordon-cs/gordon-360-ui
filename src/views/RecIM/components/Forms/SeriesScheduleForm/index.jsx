import { useState, useEffect, useMemo } from 'react';
import Form from '../Form';
import { putSeriesSchedule, getSeriesSchedule } from 'services/recim/series';
import { getSurfaces } from 'services/recim/match';

const SeriesScheduleForm = ({
  createSnackbar,
  onClose,
  openSeriesScheduleForm,
  setOpenSeriesScheduleForm,
  seriesID,
}) => {
  // Fetch data required for form creation
  const [loading, setLoading] = useState(true);
  const [isSaving, setSaving] = useState(false);
  const [surfaces, setSurfaces] = useState([]);
  const [seriesSchedule, setSeriesSchedule] = useState();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setSurfaces(await getSurfaces());
      let fetchedSchedule = await getSeriesSchedule(seriesID);
      if (fetchedSchedule.ID !== 0) setSeriesSchedule(fetchedSchedule);

      setLoading(false);
    };
    loadData();
  }, [seriesID]);

  const availableDays = [
    {
      label: 'Monday',
      name: 'Mon',
      type: 'checkbox',
      helperText: '*Required',
      required: false,
    },
    {
      label: 'Tuesday',
      name: 'Tue',
      type: 'checkbox',
      helperText: '*Required',
      required: false,
    },
    {
      label: 'Wednesday',
      name: 'Wed',
      type: 'checkbox',
      helperText: '*Required',
      required: false,
    },
    {
      label: 'Thursday',
      name: 'Thu',
      type: 'checkbox',
      helperText: '*Required',
      required: false,
    },
    {
      label: 'Friday',
      name: 'Fri',
      type: 'checkbox',
      helperText: '*Required',
      required: false,
    },
    {
      label: 'Saturday',
      name: 'Sat',
      type: 'checkbox',
      helperText: '*Required',
      required: false,
    },
    {
      label: 'Sunday',
      name: 'Sun',
      type: 'checkbox',
      helperText: '*Required',
      required: false,
    },
  ];

  const availableSurfaces = [
    {
      label: 'Surfaces',
      name: 'AvailableSurfaceIDs',
      type: 'multiselect',
      menuItems: surfaces.map((surface) => surface.Name),
      helperText: '*Required',
      required: true,
    },
  ];

  const matchTimes = [
    {
      label: 'Daily Start Time',
      name: 'DailyStartTime',
      type: 'datetime',
      helperText: '*Required',
      required: true,
    },
    {
      label: 'Daily End Time',
      name: 'DailyEndTime',
      type: 'datetime',
      helperText: '*Required',
      required: true,
    },
    {
      label: 'Estimated Match Length (min)',
      name: 'EstMatchTime',
      type: 'text',
      helperText: '*Required',
      required: true,
    },
  ];

  const currentInfo = useMemo(() => {
    if (seriesSchedule) {
      var seriesSurfaces = [];
      seriesSchedule.SurfaceIDs?.forEach((surface) =>
        seriesSurfaces.push(surfaces.find((_surface) => _surface.ID === surface)?.Name),
      );
      return {
        SeriesID: seriesID,
        Sun: seriesSchedule.AvailableDays.Sunday,
        Mon: seriesSchedule.AvailableDays.Monday,
        Tue: seriesSchedule.AvailableDays.Tuesday,
        Wed: seriesSchedule.AvailableDays.Wednesday,
        Thu: seriesSchedule.AvailableDays.Thursday,
        Fri: seriesSchedule.AvailableDays.Friday,
        Sat: seriesSchedule.AvailableDays.Saturday,
        AvailableSurfaceIDs: seriesSurfaces,
        DailyStartTime: seriesSchedule.StartTime, //@TODO needs to be set to Time selector
        DailyEndTime: seriesSchedule.EndTime, //@TODO needs to be set to Time selector
        EstMatchTime: seriesSchedule.EstMatchTime,
      };
    }

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
  }, [seriesID, seriesSchedule]);

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

    putSeriesSchedule(seriesRequest)
      .then(() => {
        setSaving(false);
        createSnackbar(`Series schedule has been edited`, 'success');
        onClose();
        handleWindowClose();
      })
      .catch((reason) => {
        setSaving(false);
        createSnackbar(
          `There was a problem with editing the series schedule: ${reason.title}`,
          'error',
        );
      });
  };

  return (
    <Form
      formTitles={{
        name: 'Schedule',
        contentCardTitles: ['Available Days', 'Available Surfaces', 'Time Information'],
        formType: 'Edit',
      }}
      fields={[availableDays, availableSurfaces, matchTimes]}
      currentInfo={currentInfo}
      loading={loading}
      isSaving={isSaving}
      setOpenForm={setOpenSeriesScheduleForm}
      openForm={openSeriesScheduleForm}
      handleConfirm={handleConfirm}
    />
  );
};

export default SeriesScheduleForm;
