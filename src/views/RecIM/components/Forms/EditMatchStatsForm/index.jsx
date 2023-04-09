import { Box } from '@mui/system';
import { Tabs, Tab } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import { getMatchTeamStatusTypes, updateMatchStats, getMatchByID } from 'services/recim/match';
import Form, { validateFieldFromUpdatedInfo } from '../Form';
import styles from './EditMatchStatsForm.module.css';
import { useParams } from 'react-router';

const EditMatchStatsForm = ({
  match,
  setMatch,
  createSnackbar,
  onClose,
  openEditMatchStatsForm,
  setOpenEditMatchStatsForm,
}) => {
  const { matchID } = useParams();
  const [loading, setLoading] = useState(true);
  const [isSaving, setSaving] = useState(false);
  const [matchStatus, setMatchStatus] = useState([]);
  const [targetTeamID, setTargetTeamID] = useState(match.Team[0].ID);
  const [selectedTab, setSelectedTab] = useState(0);
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setMatchStatus(await getMatchTeamStatusTypes());
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    const updateMatch = async () => {
      setMatch(await getMatchByID(matchID));
    };
    updateMatch();
    setLoading(false);
  }, [targetTeamID, setMatch, matchID]);

  const createMatchStatsField = [
    {
      label: 'Score',
      name: 'Score',
      type: 'number',
      min: 0,
      helperText: '*Required',
      required: true,
    },
    {
      label: 'Sportsmanship',
      name: 'SportsmanshipScore',
      type: 'number',
      min: 1,
      max: 5,
      helperText: "*Required & Can't be more than 5",
      required: true,
    },
    {
      label: 'Status',
      name: 'StatusID',
      type: 'select',
      menuItems: matchStatus.map((type) => type.Description),
      helperText: '*Required',
      required: true,
    },
  ];

  const currentInfo = useMemo(() => {
    var targetTeamStats = match.Scores.find((score) => score.TeamID === targetTeamID);
    let info = {
      TeamID: targetTeamID,
      Score: `${targetTeamStats.TeamScore}`,
      SportsmanshipScore: `${targetTeamStats.SportsmanshipScore}`,
      StatusID:
        matchStatus.find((type) => type.Description === targetTeamStats.Status) == null
          ? ''
          : matchStatus.find((type) => type.Description === targetTeamStats.Status).Description,
    };
    setRequest(info);
    return info;
  }, [match, targetTeamID, matchStatus]);

  const errors = request
    ? createMatchStatsField.filter(validateFieldFromUpdatedInfo(request))
    : null;

  const navigationContent = (
    <>
      <Box className={styles.scrollableCenteredTabs} mt={1}>
        <Tabs
          value={selectedTab}
          onChange={(event, tabIndex) => {
            setLoading(true);
            handleConfirm();
            setSelectedTab(tabIndex);
            setTargetTeamID(match.Team[tabIndex].ID);
          }}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="team name edit stats tabs"
        >
          {match.Team.map((team) => {
            return <Tab disabled={errors?.length > 0} label={team.Name} />;
          })}
        </Tabs>
      </Box>
    </>
  );

  const handleConfirm = (handleWindowClose) => {
    if (request !== currentInfo) {
      setSaving(true);
      let requestInfo = { ...currentInfo, ...request };
      requestInfo.StatusID = matchStatus.find(
        (status) => status.Description === requestInfo.StatusID,
      )?.ID;
      updateMatchStats(match.ID, requestInfo)
        .then(() => {
          setSaving(false);
          createSnackbar(
            `Match stats successfully edited for team ${match.Team[selectedTab].Name}`,
            'success',
          );

          if (handleWindowClose) {
            onClose();
            handleWindowClose();
          }
        })
        .catch((reason) => {
          setSaving(false);
          createSnackbar(
            `There was a problem editing the match stats for team ${match.Team[selectedTab].Name}`,
            'error',
          );
        });
    }
  };

  return (
    <Form
      formTitles={{ name: 'Match Stats', formType: 'Edit' }}
      fields={[createMatchStatsField]}
      currentInfo={currentInfo}
      loading={loading}
      isSaving={isSaving}
      setOpenForm={setOpenEditMatchStatsForm}
      openForm={openEditMatchStatsForm}
      handleConfirm={handleConfirm}
      additionalContent={navigationContent}
      newInfoCallback={setRequest}
      showConfirmationWindow={false}
    />
  );
};

export default EditMatchStatsForm;
