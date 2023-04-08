import { useState, useEffect, useMemo } from 'react';
import Form, { isNumeric, requiredFieldValidation } from '../Form';
import {
  createSeries,
  editSeries,
  getSeriesStatusTypes,
  getSeriesTypes,
} from 'services/recim/series';

const commonFields = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    validate: requiredFieldValidation,
    helperText: '*Required',
    required: true,
  },
  {
    label: 'Series Start Date',
    name: 'startDate',
    type: 'datetime',
    validate: requiredFieldValidation,
    helperText: '*Required',
    required: true,
  },
  {
    label: 'Series End Date',
    name: 'endDate',
    type: 'datetime',
    validate: requiredFieldValidation,
    helperText: '*Required',
    required: true,
  },
];

const SeriesForm = ({
  closeWithSnackbar,
  openSeriesForm,
  setOpenSeriesForm,
  activityID,
  existingActivitySeries,
  scheduleID,
  series, // If series passed, allows edit
  activityTeams,
}) => {
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

  const additionalFields = series
    ? [
        {
          label: 'Series Status',
          name: 'statusID',
          type: 'select',
          menuItems: statuses.map((status) => status.Description),
          validate: requiredFieldValidation,
          helperText: '*Required',
          required: true,
        },
        {
          label: 'Teams',
          name: 'TeamIDs',
          type: 'multiselect',
          menuItems: activityTeams.map((team) => team.Name),
          validate: requiredFieldValidation,
          helperText: '*Required',
          required: true,
        },
      ]
    : [
        {
          label: 'Series Type',
          name: 'typeID',
          type: 'select',
          menuItems: seriesType.map((seriesType) => seriesType.Description),
          validate: requiredFieldValidation,
          helperText: '*Required',
          required: true,
        },
        {
          label: 'Reference Series',
          name: 'referenceSeriesID',
          type: 'select',
          menuItems: existingActivitySeries.map((series) => series.Name),
          helperText: '*Optional',
          required: false,
        },
        {
          label: 'Number of Teams',
          name: 'numberOfTeamsAdmitted',
          type: 'number',
          validate: isNumeric,
          helperText: '*Invalid Number',
          required: true,
        },
      ];

  const currentInfo = useMemo(() => {
    if (series) {
      return {
        name: series.Name,
        startDate: series.StartDate,
        endDate: series.EndDate,
        TeamIDs: series.TeamStanding.map(
          (ts) => activityTeams.find((t) => t.ID === ts.TeamID)?.Name,
        ),
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
  }, [activityID, activityTeams, scheduleID, series]);

  const handleConfirm = (newInfo, handleWindowClose) => {
    setSaving(true);

    let seriesRequest = { ...currentInfo, ...newInfo };

    if (series) {
      seriesRequest.statusID = statuses.find(
        (status) => status.Description === seriesRequest.statusID,
      ).ID;

      let idArray = [];
      seriesRequest.TeamIDs.forEach((value) => {
        idArray.push(activityTeams.find((team) => team.Name === value).ID);
      });
      seriesRequest.TeamIDs = idArray;

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
      fields={[commonFields.concat(additionalFields)]}
      currentInfo={currentInfo}
      loading={loading}
      isSaving={isSaving}
      setOpenForm={setOpenSeriesForm}
      openForm={openSeriesForm}
      handleConfirm={handleConfirm}
    />
  );
};

export default SeriesForm;
