import { useState, useMemo, useEffect } from 'react';
import { getMatchTeamStatusTypes, updateMatchStats } from 'services/recim/match';
import Form from '../Form';

const EditMatchStatsForm = ({
  match,
  closeWithSnackbar,
  openEditMatchStatsForm,
  setOpenEditMatchStatsForm,
}) => {
  const [errorStatus, setErrorStatus] = useState({
    Score: false,
    StatusID: false,
    SportsmanshipScore: false,
  });
  const [loading, setLoading] = useState(true);
  const [matchStatus, setMatchStatus] = useState([]);
  const [targetTeamID, setTargetTeamID] = useState(match.Team[0].ID);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setMatchStatus(await getMatchTeamStatusTypes());
      setLoading(false);
    };
    loadData();
  }, []);

  const createMatchStatsField = [
    {
      label: 'Score',
      name: 'Score',
      type: 'number',
      error: errorStatus.Score,
      helperText: '*Required',
      required: true,
    },
    {
      label: 'Sportsmanship',
      name: 'SportsmanshipScore',
      type: 'number',
      error: errorStatus.SportsmanshipScore,
      helperText: "*Required & Can't be more than 5",
      required: true,
    },
    {
      label: 'Status',
      name: 'StatusID',
      type: 'select',
      menuItems: matchStatus.map((type) => {
        return type.Description;
      }),
      error: errorStatus.StatusID,
      helperText: '*Required',
      required: true,
    },
  ];

  const currentInfo = useMemo(() => {
    var targetTeamStats = match.Scores.find((score) => score.TeamID === targetTeamID);
    return {
      TeamID: targetTeamID,
      Score: `${targetTeamStats.TeamScore}`,
      SportsmanshipScore: `${targetTeamStats.SportsmanshipScore}`,
      StatusID:
        matchStatus.find((type) => type.Description === targetTeamStats.Status) == null
          ? ''
          : matchStatus.find((type) => type.Description === targetTeamStats.Status).Description,
    };
  }, [match, targetTeamID, matchStatus]);

  const errorCases = (field, value) => {
    switch (field) {
      case 'Sportsmanship':
        return value < 0 || value > 5;
      case 'Score':
        return !/^[0-9]+$/.test(value);
      default:
        return false;
    }
  };

  const handleConfirm = (newInfo, handleWindowClose, setSaving) => {
    setSaving(true);
    let matchStatsRequest = { ...currentInfo, ...newInfo };
    matchStatsRequest.StatusID = matchStatus.find(
      (status) => status.Description === matchStatsRequest.StatusID,
    )?.ID;
    updateMatchStats(match.ID, matchStatsRequest).then(() => {
      setSaving(false);
      closeWithSnackbar({
        type: 'success',
        message: 'Match edited successfully',
      });
      handleWindowClose();
    });
  };

  return (
    <Form
      formTitle={{ name: 'Match Stats', formType: 'Edit' }}
      fields={createMatchStatsField}
      currentInfo={currentInfo}
      errorCases={errorCases}
      setErrorStatus={setErrorStatus}
      loading={loading}
      setOpenForm={setOpenEditMatchStatsForm}
      openForm={openEditMatchStatsForm}
      handleConfirm={handleConfirm}
    />
  );
};

export default EditMatchStatsForm;
