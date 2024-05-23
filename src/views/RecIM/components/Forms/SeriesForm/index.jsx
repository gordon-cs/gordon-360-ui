import { useState, useEffect, useMemo } from 'react';
import { Grid } from '@mui/material';
import Form from '../Form';
import {
  createSeries,
  editSeries,
  getSeriesStatusTypes,
  getSeriesTypes,
} from 'services/recim/series';
import { Typography } from '@mui/material';

const commonFields = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    helperText: '*Required',
    required: true,
  },
  {
    label: 'Series Start Date',
    name: 'startDate',
    type: 'datetime',
    helperText: '*Required',
    required: true,
  },
  {
    label: 'Series End Date',
    name: 'endDate',
    type: 'datetime',
    helperText: '*Required',
    required: true,
  },
];

const SeriesForm = ({
  createSnackbar,
  onClose,
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
          helperText: '*Required',
          required: true,
        },
        {
          label: 'Teams',
          name: 'TeamIDs',
          type: 'multiselect',
          menuItems: activityTeams.map((team) => team.Name),
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
          min: 0,
          helperText: '*Invalid Number',
        },
      ];
  additionalFields.push({
    label: 'Points for Winning',
    name: 'points',
    type: 'number',
    min: 0,
    helperText: '*Invalid Number',
  });

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
        points: series.Points,
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
        points: 0,
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

      editSeries(series.ID, seriesRequest)
        .then(() => {
          setSaving(false);
          createSnackbar(`Series ${seriesRequest.name} has been successfully edited`, 'success');
          onClose();
          handleWindowClose();
        })
        .catch((reason) => {
          createSnackbar(`There was a problem editing your series: ${reason.title}`, 'error');
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
      createSeries(referenceSeriesID, seriesRequest)
        .then(() => {
          setSaving(false);
          createSnackbar(`Series ${seriesRequest.name} has been successfully created`, 'success');
          onClose();
          handleWindowClose();
        })
        .catch((reason) => {
          setSaving(false);
          createSnackbar(`There was a problem creating your series: ${reason.title}`, 'error');
        });
    }
  };

  const seriesDefinition = (
    <Grid item xs={12}>
      <Typography variant="body2" color="gray" paragraph>
        * A Series is a set of matches under a given activity
      </Typography>
    </Grid>
  );

  return (
    <Form
      formTitles={{ name: 'Series', formType: series ? 'Edit' : 'Create' }}
      fields={[commonFields.concat(additionalFields)]}
      additionalContent={seriesDefinition}
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
