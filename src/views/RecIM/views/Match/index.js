import { Grid, Card, CardHeader, CardContent } from '@mui/material';
import { useParams } from 'react-router';
import { useUser } from 'hooks';
import { useState, useEffect } from 'react';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import Header from '../../components/Header';
import styles from './Match.module.css';
import { ParticipantList } from './../../components/List';
import { getMatchByID } from 'services/recim/match';
import EditMatchStatsForm from 'views/RecIM/components/Forms/EditMatchStatsForm';

const RosterCard = ({ participants, teamName }) => (
  <Card>
    <CardHeader title={teamName ?? 'No team yet...'} className={styles.cardHeader} />
    <CardContent>
      <ParticipantList participants={participants} />
    </CardContent>
  </Card>
);

const Match = () => {
  const { matchID } = useParams();
  const { profile } = useUser();
  const [match, setMatch] = useState();
  const [loading, setLoading] = useState(true);
  const [openEditMatchStatsForm, setOpenEditMatchStatsForm] = useState(false);
  const [selectedScores, setSelectedScores] = useState();

  useEffect(() => {
    const loadMatch = async () => {
      setLoading(true);
      setMatch(await getMatchByID(matchID));
      setLoading(false);
    };
    loadMatch();
  }, [matchID, openEditMatchStatsForm]);

  const handleEditMatchStatsForm = (status) => {
    setOpenEditMatchStatsForm(false);
  };

  if (loading && !profile) {
    return <GordonLoader />;
  } else if (!profile) {
    // The user is not logged in
    return <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else {
    return (
      <>
        <Header
          page="match"
          match={match}
          setOpenHeaderForm={setOpenEditMatchStatsForm}
          setSelectedMatchScores={setSelectedScores}
          expandable
        />
        {loading ? (
          <GordonLoader />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RosterCard
                participants={match.Team[0]?.Participant}
                teamName={match.Team[0]?.Name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RosterCard
                participants={match.Team[1]?.Participant}
                teamName={match.Team[1]?.Name}
              />
            </Grid>
          </Grid>
        )}
        {openEditMatchStatsForm && (
          <EditMatchStatsForm
            matchID={match.ID}
            teamMatchHistory={selectedScores}
            closeWithSnackbar={(status) => {
              handleEditMatchStatsForm(status);
            }}
            openEditMatchStatsForm={openEditMatchStatsForm}
            setOpenEditMatchStatsForm={setOpenEditMatchStatsForm}
          />
        )}
      </>
    );
  }
};

export default Match;
