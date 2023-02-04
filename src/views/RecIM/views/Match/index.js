import { Grid, Typography, Card, CardHeader, CardContent } from '@mui/material';
import { useParams } from 'react-router';
import { useUser } from 'hooks';
import { useState, useEffect } from 'react';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import styles from './Match.module.css';
import { ParticipantList } from './../../components/List';
import { getMatchByID } from 'services/recim/match';
// import EditIcon from '@mui/icons-material/Edit'

const RosterCard = ({ participants, teamName }) => (
  <Card>
    <CardHeader title={teamName ?? 'No team yet...'} className={styles.cardHeader} />
    <CardContent>
      <ParticipantList participants={participants} />
    </CardContent>
  </Card>
);

const Match = () => {
  const { activityID, matchID } = useParams();
  const { profile } = useUser();
  const [match, setMatch] = useState();
  const [loading, setLoading] = useState(true);
  // const [openMatchForm, setOpenMatchForm] = useState(false);

  useEffect(() => {
    const loadMatch = async () => {
      setLoading(true);
      setMatch(await getMatchByID(matchID));
      setLoading(false);
    };
    loadMatch();
  }, [matchID]);

  if (loading) {
    return <GordonLoader />;
  } else if (!profile) {
    // The user is not logged in
    return <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else {
    return (
      <>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <RosterCard participants={match.Team[0]?.Participant} teamName={match.Team[0]?.Name} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RosterCard participants={match.Team[1]?.Participant} teamName={match.Team[1]?.Name} />
          </Grid>
        </Grid>
      </>
    );
  }
};

export default Match;
