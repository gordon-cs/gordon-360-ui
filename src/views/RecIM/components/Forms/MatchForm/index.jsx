import { useState, useMemo, useEffect } from 'react';
import Form from '../Form';
import { createMatch, updateMatch, getSurfaces, getMatchStatusTypes } from 'services/recim/match';

const MatchForm = ({
  closeWithSnackbar,
  openMatchInformationForm,
  setOpenMatchInformationForm,
  activity,
  match,
}) => {
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
      setSurfaces(await getSurfaces());
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
        return surface.Name;
      }),
      error: errorStatus.SurfaceID,
      helperText: '*Required',
      required: true,
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
        required: true,
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
        required: true,
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
        required: true,
      },
    );
  } else if (match) {
    createMatchFields.push(
      {
        label: 'Start Time',
        name: 'StartTime',
        type: 'datetime',
        error: errorStatus.StartTime,
        helperText: '*Required',
        required: true,
      },
      {
        label: 'Teams',
        name: 'TeamIDs',
        type: 'multiselect',
        menuItems: match.Series.TeamStanding.map((team) => {
          return team.Name;
        }),
        error: errorStatus.TeamIDs,
        helperText: '*Required',
        required: true,
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
        required: true,
      },
    );
  }

  const currentInfo = useMemo(() => {
    if (match) {
      //I tried using inbuild javascript functions but I can't wrap my head around multiple
      //filters. You are welcome to improve on the logic below if you so desire.
      var teamIDs = [];
      match.Team.forEach((team) =>
        teamIDs.push(match.Series.TeamStanding.find((_team) => team.ID === _team.TeamID)?.Name),
      );
      return {
        StartTime: match.StartTime,
        StatusID:
          matchStatus.find((type) => type.Description === match.Status) == null
            ? ''
            : matchStatus.find((type) => type.Description === match.Status).Description,
        SurfaceID:
          surfaces.find((type) => type.Name === match.Surface) == null
            ? ''
            : surfaces.find((type) => type.Name === match.Surface).Name,
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

  const errorCases = (field, value) => {
    switch (field) {
      default:
        return false;
    }
  };

  const handleConfirm = (newInfo, handleWindowClose, setSaving) => {
    setSaving(true);

    let teamNames = newInfo.TeamIDs;
    let matchRequest = { ...currentInfo, ...newInfo };
    matchRequest.TeamIDs = teamNames;

    if (activity)
      matchRequest.SeriesID = activity.Series.find(
        (series) => series.Name === matchRequest.SeriesID,
      ).ID;

    matchRequest.SurfaceID = surfaces.find((surface) => surface.Name === matchRequest.SurfaceID).ID;

    let idArray = [];
    matchRequest.TeamIDs.forEach((value) => {
      if (activity) idArray.push(activity.Team.find((team) => team.Name === value).ID);
      else if (match)
        idArray.push(match.Series.TeamStanding.find((team) => team.Name === value)?.TeamID);
    });
    matchRequest.TeamIDs = idArray;

    if (activity)
      createMatch(matchRequest).then((result) => {
        closeWithSnackbar({
          type: 'success',
          message: 'Match information created successfully',
        });
        handleWindowClose();
      });
    else if (match) {
      matchRequest.StatusID = matchStatus.find(
        (type) => type.Description === matchRequest.StatusID,
      ).ID;
      updateMatch(match.ID, matchRequest).then((result) => {
        closeWithSnackbar({
          type: 'success',
          message: 'Match information edited successfully',
        });
        handleWindowClose();
      });
    }
  };

  return (
    <Form
      formTitle={{ name: 'Match', formType: match ? 'Edit' : 'Create' }}
      fields={createMatchFields}
      currentInfo={currentInfo}
      errorCases={errorCases}
      setErrorStatus={setErrorStatus}
      loading={loading}
      setOpenForm={setOpenMatchInformationForm}
      openForm={openMatchInformationForm}
      handleConfirm={handleConfirm}
    />
  );
};

export default MatchForm;
