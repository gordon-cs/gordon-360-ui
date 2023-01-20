import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Breadcrumbs,
  Button,
  IconButton,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styles from './Team.module.css';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import { useUser } from 'hooks';
import { ParticipantList, MatchList } from './../../components/List';
import { getTeamByID } from 'services/recim/team';
import { getParticipantByUsername } from 'services/recim/participant';
import { Link as LinkRouter } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import InviteParticipantForm from '../../components/Forms/InviteParticipantForm';
import EditIcon from '@mui/icons-material/Edit';
import TeamForm from 'views/RecIM/components/Forms/TeamForm';
//expensive, comment on line 36
import { getActivityByID } from 'services/recim/activity';

const Team = () => {
  const { activityID, teamID } = useParams();
  const { profile } = useUser();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openTeamForm, setOpenTeamForm] = useState(false);
  const [participant, setParticipant] = useState(null);
  //this is expensive, so optimally we would want another way to check that registration is open
  const [activity, setActivity] = useState(null);
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
      setActivity(await getActivityByID(activityID));
      if (profile) {
        setParticipant(await getParticipantByUsername(profile.AD_Username));
      }
      setLoading(false);
    };
    loadTeamData();
  }, [profile, activityID, teamID, openTeamForm]);

  //checks if the team is modifiable by the current user
  useEffect(() => {
    let hasCaptainPermissions = false;
    let isAdmin = false;
    if (participant) {
      isAdmin = participant.IsAdmin;
      if (activity && team) {
        let role =
          team.Participant.find((person) => person.Username === participant.Username) == null
            ? 'Invalid'
            : team.Participant.find((person) => person.Username === participant.Username).Role;
        hasCaptainPermissions =
          activity.RegistrationOpen && (role === 'Co-Captain' || role === 'Team-captain/Creator');
      }
    }
    setHasPermissions(hasCaptainPermissions || isAdmin);
  }, [activity, team, participant]);

  const handleTeamForm = (status) => {
    //if you want to do something with the message make a snackbar function here
    setOpenTeamForm(false);
  };

  const teamRecord = () => {
    if (team) {
      if (team.TeamRecord[0]) {
        return (
          <Typography variant="subtitle2">
            {team.TeamRecord[0].Win} W : {team.TeamRecord[0].Loss} L : {team.TeamRecord[0].Tie} T
          </Typography>
        );
      }
      return <Typography variant="subtitle2">Activity has not started</Typography>;
    }
    return null;
  };
  if (loading) {
    return <GordonLoader />;
  } else if (!profile) {
    // The user is not logged in
    return <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else {
    let teamHeader = (
      <Card>
        <CardContent>
          <Grid container direction="column">
            <Grid item container direction="column" alignItems="center">
              <Grid item>
                <Breadcrumbs aria-label="breadcrumb">
                  <LinkRouter
                    className="gc360_text_link"
                    underline="hover"
                    color="inherit"
                    to={'/recim'}
                  >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Rec-IM Home
                  </LinkRouter>
                  <LinkRouter
                    className="gc360_text_link"
                    underline="hover"
                    color="inherit"
                    to={`/recim/activity/${activityID}`}
                  >
                    {activity.Name}
                  </LinkRouter>
                  <Typography color="text.primary">{team.Name}</Typography>
                </Breadcrumbs>
              </Grid>
              <hr className={styles.recimNavHeaderLine} />
            </Grid>
            <Grid item container direction="row" alignItems="center" columnSpacing={4}>
              <Grid item>
                <img src={''} alt="Team Icon" width="85em"></img>
              </Grid>
              <Grid item xs={8} md={5}>
                <Typography variant="h5" className={styles.teamTitle}>
                  {team == null ? <GordonLoader /> : team.Name}
                  {hasPermissions ? (
                    <IconButton>
                      <EditIcon
                        onClick={() => {
                          setOpenTeamForm(true);
                        }}
                      />
                    </IconButton>
                  ) : null}
                </Typography>
                {teamRecord()}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );

    let rosterCard = (
      <Card>
        <CardHeader title="Roster" className={styles.cardHeader} />
        <CardContent>
          <CardContent>
            {hasPermissions ? (
              <ParticipantList participants={team.Participant} showParticipantOptions />
            ) : (
              <ParticipantList participants={team.Participant} />
            )}
          </CardContent>
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
            <MatchList matches={team.Match} activityID={team.ActivityID} />
          ) : (
            <Typography variant="body1" paragraph>
              No matches scheduled at this time!
            </Typography>
          )}
        </CardContent>
      </Card>
    );

    return (
      <Grid container spacing={2}>
        <Grid item alignItems="center" xs={12}>
          {teamHeader}
        </Grid>
        <Grid item container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={6}>
            {scheduleCard}
          </Grid>
          <Grid item xs={12} md={6}>
            {rosterCard}
          </Grid>
        </Grid>
        <p>
          Activity ID: {activityID} Team ID: {teamID} (for testing purposes only)
        </p>
        {openTeamForm ? (
          <TeamForm
            closeWithSnackbar={(status) => {
              handleTeamForm(status);
            }}
            openTeamForm={openTeamForm}
            setOpenTeamForm={(bool) => setOpenTeamForm(bool)}
            activityID={activityID}
            team={team}
          />
        ) : null}
      </Grid>
    );
  }
};

export default Team;
