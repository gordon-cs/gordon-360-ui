import { Box } from '@mui/system';
import { Tabs, Tab } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import { getMatchTeamStatusTypes, updateMatchStats } from 'services/recim/match';
import Form from '../Form';
import styles from './EditMatchStatsForm.module.css';

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
  const [selectedTab, setSelectedTab] = useState(0);
  const [teamUpdateData, setTeamUpdateData] = useState({});

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setMatchStatus(await getMatchTeamStatusTypes());
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [targetTeamID]);

  const newInfoCallback = (newInfo, updateData) => {
    if (updateData) {
      setTeamUpdateData((prev) => ({ ...prev, targetTeamID: newInfo }));
    } else {
      setTeamUpdateData((prev) => {
        const state = { ...prev };
        delete state[targetTeamID];
        return state;
      });
    }
  };

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

  const navigationContent = (
    <>
      <Box className={styles.scrollableCenteredTabs} mt={1}>
        <Tabs
          value={selectedTab}
          onChange={(event, tabIndex) => {
            setLoading(true);
            setSelectedTab(tabIndex);
            setTargetTeamID(match.Team[tabIndex].ID);
          }}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="team name edit stats tabs"
        >
          {match.Team.map((team) => {
            return <Tab disabled={Object.values(errorStatus).includes(true)} label={team.Name} />;
          })}
        </Tabs>
      </Box>
    </>
  );

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
      formTitles={{ name: 'Match Stats', formType: 'Edit' }}
      fields={createMatchStatsField}
      currentInfo={currentInfo}
      errorCases={errorCases}
      setErrorStatus={setErrorStatus}
      loading={loading}
      setOpenForm={setOpenEditMatchStatsForm}
      openForm={openEditMatchStatsForm}
      handleConfirm={handleConfirm}
      additionalContent={navigationContent}
      newInfoCallback={newInfoCallback}
      showSubmitButton={false}
    />
  );
};

export default EditMatchStatsForm;
