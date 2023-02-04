import { Grid, Typography, Card, CardHeader, CardContent, Button, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styles from './Team.module.css';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import { useUser } from 'hooks';
import { ParticipantList, MatchList } from './../../components/List';
import { getTeamByID } from 'services/recim/team';
import { getParticipantByUsername } from 'services/recim/participant';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import InviteParticipantForm from '../../components/Forms/InviteParticipantForm';

const Team = () => {
  const { teamID } = useParams();
  const { profile } = useUser();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [participant, setParticipant] = useState(null);
  const [hasPermissions, setHasPermissions] = useState(false);

  const [openInviteParticipantForm, setOpenInviteParticipantForm] = useState(false);
  const handleInviteParticipantForm = (status) => {
    //if you want to do something with the message make a snackbar function here
    setOpenInviteParticipantForm(false);
  };

  useEffect(() => {
    const loadTeamData = async () => {
      setLoading(true);
      setTeam(await getTeamByID(teamID));
      if (profile) {
        setParticipant(await getParticipantByUsername(profile.AD_Username));
      }
      setLoading(false);
    };
    loadTeamData();
  }, [profile, teamID]);

  //checks if the team is modifiable by the current user
  useEffect(() => {
    let hasCaptainPermissions = false;
    let isAdmin = false;
    if (participant) {
      isAdmin = participant.IsAdmin;
      if (team) {
        let role =
          team.Participant.find((person) => person.Username === participant.Username) == null
            ? 'Invalid'
            : team.Participant.find((person) => person.Username === participant.Username).Role;
        hasCaptainPermissions =
          team.Activity.RegistrationOpen &&
          (role === 'Co-Captain' || role === 'Team-captain/Creator');
      }
    }
    setHasPermissions(hasCaptainPermissions || isAdmin);
  }, [team, participant]);

  if (loading) {
    return <GordonLoader />;
  } else if (!profile) {
    // The user is not logged in
    return <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else {
    let rosterCard = (
      <Card>
        <CardHeader title="Roster" className={styles.cardHeader} />
        <CardContent>
          {hasPermissions ? (
            <ParticipantList participants={team.Participant} showParticipantOptions />
          ) : (
            <ParticipantList participants={team.Participant} />
          )}
          {hasPermissions ? (
            <Grid container justifyContent="center">
              <Button
                variant="contained"
                color="warning"
                startIcon={<AddCircleRoundedIcon />}
                className={styles.actionButton}
                onClick={() => {
                  setOpenInviteParticipantForm(true);
                }}
              >
                Invite Participant
              </Button>
            </Grid>
          ) : null}
        </CardContent>
        <InviteParticipantForm
          closeWithSnackbar={(status) => {
            handleInviteParticipantForm(status);
          }}
          openInviteParticipantForm={openInviteParticipantForm}
          setOpenInviteParticipantForm={(bool) => setOpenInviteParticipantForm(bool)}
          teamID={teamID}
        />
      </Card>
    );

    let scheduleCard = (
      <Card>
        <CardHeader title="Schedule" className={styles.cardHeader} />
        <CardContent>
          {team.Match?.length ? (
            <MatchList matches={team.Match} activityID={team.Activity?.ID} />
          ) : (
            <Typography variant="body1" paragraph>
              No matches scheduled at this time!
            </Typography>
          )}
        </CardContent>
      </Card>
    );

    return (
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} md={6}>
          {scheduleCard}
        </Grid>
        <Grid item xs={12} md={6}>
          {rosterCard}
        </Grid>
        <p>
          Activity ID: {team.Activity?.ID} Team ID: {teamID} (for testing purposes only)
        </p>
      </Grid>
    );
  }
};

export default Team;
