import { useState, useMemo, useEffect } from 'react';
import Form, { requiredFieldValidation } from '../Form';
import { createMatch, updateMatch, getSurfaces, getMatchStatusTypes } from 'services/recim/match';

const MatchForm = ({
  closeWithSnackbar,
  openMatchInformationForm,
  setOpenMatchInformationForm,
  series,
  match,
}) => {
  const [loading, setLoading] = useState(false);
  const [isSaving, setSaving] = useState(false);
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
      menuItems: surfaces.map((surface) => surface.Name),
      validate: requiredFieldValidation,
      helperText: '*Required',
      required: true,
    },
  ];

  if (series) {
    createMatchFields.push(
      {
        label: 'Start Time',
        name: 'StartTime',
        type: 'datetime',
        validate: requiredFieldValidation,
        helperText: '*Required',
        required: true,
      },
      {
        label: 'Teams',
        name: 'TeamIDs',
        type: 'multiselect',
        menuItems: series.TeamStanding.map((team) => team.Name),
        validate: requiredFieldValidation,
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
        validate: requiredFieldValidation,
        helperText: '*Required',
        required: true,
      },
      {
        label: 'Teams',
        name: 'TeamIDs',
        type: 'multiselect',
        menuItems: match.Series.TeamStanding.map((team) => team.Name),
        validate: requiredFieldValidation,
        helperText: '*Required',
        required: true,
      },
      {
        label: 'Status',
        name: 'StatusID',
        type: 'select',
        menuItems: matchStatus.map((type) => type.Description),
        validate: requiredFieldValidation,
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
      SeriesID: series?.ID,
      SurfaceID: '',
      TeamIDs: [],
    };
  }, [surfaces, matchStatus, match]);

  const handleConfirm = (newInfo, handleWindowClose) => {
    setSaving(true);

    let teamNames = newInfo.TeamIDs;
    let matchRequest = { ...currentInfo, ...newInfo };
    matchRequest.TeamIDs = teamNames;

    matchRequest.SurfaceID = surfaces.find((surface) => surface.Name === matchRequest.SurfaceID).ID;

    let idArray = [];
    matchRequest.TeamIDs.forEach((value) => {
      if (series) idArray.push(series.TeamStanding.find((team) => team.Name === value).TeamID);
      else if (match)
        idArray.push(match.Series.TeamStanding.find((team) => team.Name === value)?.TeamID);
    });
    matchRequest.TeamIDs = idArray;

    if (series)
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
      formTitles={{ name: 'Match', formType: match ? 'Edit' : 'Create' }}
      fields={[createMatchFields]}
      currentInfo={currentInfo}
      loading={loading}
      isSaving={isSaving}
      setOpenForm={setOpenMatchInformationForm}
      openForm={openMatchInformationForm}
      handleConfirm={handleConfirm}
    />
  );
};

export default MatchForm;
