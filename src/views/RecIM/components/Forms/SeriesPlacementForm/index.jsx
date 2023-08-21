import { useState, useEffect, useMemo } from 'react';
import Form from '../Form';
import { getSeriesWinners, updateSeriesWinners } from 'services/recim/series';
import { Typography, Grid, Tabs, Tab } from '@mui/material';
import { Box } from '@mui/system';
import styles from '../Forms.module.css';

const SeriesPlacementForm = ({
  createSnackbar,
  onClose,
  openSeriesPlacementForm,
  setOpenSeriesPlacementForm,
  series,
}) => {
  // Fetch data required for form creation
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [seriesWinners, setSeriesWinners] = useState();
  const [teamStanding, setTeamStanding] = useState([]);
  const [targetTeamID, setTargetTeamID] = useState();
  const [selectedTab, setSelectedTab] = useState(0);
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const sortTeams = () => {
      let ts = series.TeamStanding.sort((a, b) => {
        if (a.WinCount > b.WinCount) return -1;
        if (a.WinCount === b.WinCount) {
          if (a.LossCount < b.LossCount) return -1;
          if (a.LossCount === b.LossCount) {
            if (a.SportsmanshipRating > b.SportsmanshipRating) return -1;
          }
        }
        return 1;
      });
      setTeamStanding(ts);
    };
    sortTeams();
  }, [series]);

  useEffect(() => {
    if (teamStanding.length) setTargetTeamID(teamStanding[0].TeamID);
  }, [teamStanding]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      getSeriesWinners(series.ID).then(setSeriesWinners);
      setLoading(false);
    };
    loadData();
  }, [series, reload]);

  const scores = [
    {
      label: 'Assigned Team Points',
      name: 'Points',
      type: 'number',
    },
  ];

  const currentInfo = useMemo(() => {
    var targetTeamPoints = seriesWinners?.find((team) => team.TeamID === targetTeamID);
    let info = {
      TeamID: targetTeamID,
      SeriesID: series.ID,
      Points: `${targetTeamPoints?.Points}`,
    };
    setRequest(info);
    return info;
  }, [series.ID, targetTeamID, seriesWinners]);

  const navigationContent = (
    <Box className={styles.scrollableCenteredTabs} mt={1}>
      <Tabs
        value={selectedTab}
        scrollButtons
        allowScrollButtonsMobile
        onChange={(event, tabIndex) => {
          setLoading(true);
          handleConfirm();
          setSelectedTab(tabIndex);
          setTargetTeamID(series.TeamStanding[tabIndex].TeamID);
          setLoading(false);
        }}
        variant="scrollable"
        aria-label="team name edit stats tabs"
        textColor="secondary"
        indicatorColor="secondary"
      >
        {series.TeamStanding.map((team) => {
          return <Tab label={team.Name} />;
        })}
      </Tabs>
    </Box>
  );

  const handleConfirm = (newInfo, handleWindowClose) => {
    if (request !== currentInfo && request.Points?.length) {
      setSaving(true);
      let fullRequest = { ...currentInfo, ...request };
      updateSeriesWinners(series.ID, fullRequest)
        .then(() => {
          setSaving(false);
          createSnackbar(`Series placement points have been edited`, 'success');

          let existingIndex = seriesWinners?.findIndex((team) => team.TeamID === targetTeamID);

          //pseudo update
          if (existingIndex === -1) {
            seriesWinners.push(fullRequest);
            createSnackbar(
              `This team does not have an affiliation, points will not be permanently stored`,
              'warning',
            );
          } else seriesWinners[existingIndex].Points = fullRequest.Points;

          if (handleWindowClose) {
            onClose();
            handleWindowClose();
            setSelectedTab(0);
          }
        })
        .catch((reason) => {
          setSaving(false);
          createSnackbar(
            `There was a problem with editing the series' placement points: ${reason.title}`,
            'error',
          );
        });
    }
  };

  return (
    <Form
      formTitles={{
        name: 'Series Placements',
        contentCardTitles: ['Teams'],
        formType: 'Edit',
      }}
      fields={[scores]}
      headerNotes={
        <Typography>
          <i>*Upon Completed, the winner will be automatically generated</i>
        </Typography>
      }
      additionalContent={navigationContent}
      currentInfo={currentInfo}
      loading={loading}
      isSaving={isSaving}
      setOpenForm={setOpenSeriesPlacementForm}
      openForm={openSeriesPlacementForm}
      newInfoCallback={setRequest}
      handleConfirm={handleConfirm}
    />
  );
};

export default SeriesPlacementForm;
