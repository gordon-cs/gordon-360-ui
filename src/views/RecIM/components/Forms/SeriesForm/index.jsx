import { useState, useEffect, useMemo } from 'react';
import Form from '../Form';
import {
  createSeries,
  editSeries,
  getSeriesStatusTypes,
  getSeriesTypes,
} from 'services/recim/series';

const SeriesForm = ({
  closeWithSnackbar,
  openSeriesForm,
  setOpenSeriesForm,
  activityID,
  existingActivitySeries,
  scheduleID,
  series, // If series passed, allows edit
}) => {
  const [errorStatus, setErrorStatus] = useState({
    name: false,
    startDate: false,
    endDate: false,
    typeID: false,
    numberOfTeamsAdmitted: false,
    statusID: false,
  });

  // Fetch data required for form creation
  const [loading, setLoading] = useState(true);
  const [isSaving, setSaving] = useState(false);
  const [seriesType, setSeriesType] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Get all active activities where registration has not closed
      setSeriesType(await getSeriesTypes());
      setStatuses(await getSeriesStatusTypes());
      setLoading(false);
    };
    loadData();
  }, []);

  const createSeriesFields = [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      error: errorStatus.name,
      helperText: '*Required',
      required: true,
    },
    {
      label: 'Series Start Date',
      name: 'startDate',
      type: 'datetime',
      error: errorStatus.startDate,
      helperText: '*Required',
      required: true,
    },
    {
      label: 'Series End Date',
      name: 'endDate',
      type: 'datetime',
      error: errorStatus.endDate,
      helperText: '*Required',
      required: true,
    },
  ];

  if (series) {
    createSeriesFields.push({
      label: 'Series Status',
      name: 'statusID',
      type: 'select',
      menuItems: statuses.map((status) => {
        return status.Description;
      }),
      error: errorStatus.statusID,
      helperText: '*Required',
      required: true,
    });
  } else {
    createSeriesFields.push(
      {
        label: 'Series Type',
        name: 'typeID',
        type: 'select',
        menuItems: seriesType.map((seriesType) => {
          return seriesType.Description;
        }),
        error: errorStatus.type,
        helperText: '*Required',
        required: true,
      },
      {
        label: 'Reference Series',
        name: 'referenceSeriesID',
        type: 'select',
        menuItems: existingActivitySeries.map((series) => {
          return series.Name;
        }),
        helperText: '*Optional',
        required: false,
      },
      {
        label: 'Number of Teams',
        name: 'numberOfTeamsAdmitted',
        type: 'text',
        error: errorStatus.numberOfTeamsAdmitted,
        helperText: '*Invalid Number',
        required: true,
      },
    );
  }

  const currentInfo = useMemo(() => {
    if (series) {
      return {
        name: series.Name,
        startDate: series.StartDate,
        endDate: series.EndDate,
        statusID: series.Status,
        scheduleID: scheduleID,
      };
    } else {
      return {
        name: '',
        startDate: '',
        endDate: '',
        typeID: '',
        activityID: activityID,
        numberOfTeamsAdmitted: '',
        referenceSeriesID: '',
        scheduleID: scheduleID, //nullable, if scheduleID is passed, it will be assigned to the series
      };
    }
  }, [activityID, scheduleID, series]);

  const isNumeric = (value) => {
    return /^-?\d+$/.test(value) || value.length === 0;
  };

  const errorCases = (field, value) => {
    switch (field) {
      case 'numberOfTeamsAdmitted':
        return !isNumeric(value);
      default:
        return false;
    }
  };

  const handleConfirm = (newInfo, handleWindowClose) => {
    setSaving(true);

    let seriesRequest = { ...currentInfo, ...newInfo };

    if (series) {
      seriesRequest.statusID = statuses.find(
        (status) => status.Description === seriesRequest.statusID,
      ).ID;
      editSeries(series.ID, seriesRequest).then(() => {
        setSaving(false);
        closeWithSnackbar({
          type: 'success',
          message: `Series ${series.Name}, has been successfully edited`,
        });
        handleWindowClose();
      });
    } else {
      seriesRequest.typeID = seriesType.filter(
        (type) => type.Description === seriesRequest.typeID,
      )[0].ID;

      let referenceSeriesID =
        seriesRequest.referenceSeriesID === currentInfo.referenceSeriesID
          ? null
          : existingActivitySeries.filter((ref) => ref.Name === seriesRequest.referenceSeriesID)[0]
              .ID;
      createSeries(referenceSeriesID, seriesRequest).then(() => {
        setSaving(false);
        closeWithSnackbar({
          type: 'success',
          message: 'Your new series has been created or whatever message you want here',
        });
        handleWindowClose();
      });
    }
  };

  return (
    <Form
      formTitles={{ name: 'Series', formType: series ? 'Edit' : 'Create' }}
      fields={[createSeriesFields]}
      currentInfo={currentInfo}
      errorCases={errorCases}
      setErrorStatus={setErrorStatus}
      loading={loading}
      isSaving={isSaving}
      setOpenForm={setOpenSeriesForm}
      openForm={openSeriesForm}
      handleConfirm={handleConfirm}
    />
  );
};

export default SeriesForm;
