import { Grid, Typography, Card, CardHeader, CardContent, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styles from './Team.module.css';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import Header from '../../components/Header';
import { useUser } from 'hooks';
import { ParticipantList, MatchList } from './../../components/List';
import { getTeamByID } from 'services/recim/team';
import { getParticipantByUsername } from 'services/recim/participant';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import InviteParticipantForm from '../../components/Forms/InviteParticipantForm';

const Team = () => {
  const { teamID } = useParams();
  const { profile } = useUser();
  const [team, setTeam] = useState();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
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
        setUser(await getParticipantByUsername(profile.AD_Username));
      }
      setLoading(false);
    };
    loadTeamData();
  }, [profile, teamID]);

  //checks if the team is modifiable by the current user
  useEffect(() => {
    let hasCaptainPermissions = false;
    if (user) {
      if (team) {
        let role =
          team.Participant.find((teamParticipant) => teamParticipant.Username === user.Username)
            ?.Role ?? 'Invalid';
        hasCaptainPermissions =
          team.Activity.RegistrationOpen &&
          (role === 'Co-Captain' || role === 'Team-captain/Creator');
      }
    }
    setHasPermissions(hasCaptainPermissions || user?.IsAdmin);
  }, [team, user]);

  if (!profile) {
    return loading ? <GordonLoader /> : <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else {
    let rosterCard = team && (
      <Card>
        <CardHeader title="Roster" className={styles.cardHeader} />
        <CardContent>
          {hasPermissions ? (
            <ParticipantList participants={team.Participant} showParticipantOptions showInactive />
          ) : (
            <ParticipantList participants={team.Participant} />
          )}
          {hasPermissions && (
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
          )}
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

    let scheduleCard = team && (
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
      <>
        <Header page="team" team={team} expandable />
        {loading ? (
          <GordonLoader />
        ) : (
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} md={6}>
              {scheduleCard}
            </Grid>
            <Grid item xs={12} md={6}>
              {rosterCard}
            </Grid>
          </Grid>
        )}
      </>
    );
  }
};

export default Team;
