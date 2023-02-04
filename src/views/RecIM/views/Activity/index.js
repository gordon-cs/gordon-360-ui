import { Grid, Typography, Card, CardHeader, CardContent, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useUser } from 'hooks';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import styles from './Activity.module.css';
import { MatchList, SeriesList, TeamList } from './../../components/List';
import ActivityForm from 'views/RecIM/components/Forms/ActivityForm';
import TeamForm from '../../components/Forms/TeamForm';
import { getActivityByID } from 'services/recim/activity';
import CreateMatchForm from 'views/RecIM/components/Forms/CreateMatchForm';
import CreateSeriesForm from 'views/RecIM/components/Forms/CreateSeriesForm';
import { getParticipantByUsername, getParticipantTeams } from 'services/recim/participant';

const Activity = () => {
  const { activityID } = useParams();
  const { profile } = useUser();
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState(null);
  const [openTeamForm, setOpenTeamForm] = useState(false);
  const [openCreateMatchForm, setOpenCreateMatchForm] = useState(false);
  const [openCreateSeriesForm, setOpenCreateSeriesForm] = useState(false);
  const [participant, setParticipant] = useState(null);
  const [participantTeams, setParticipantTeams] = useState(null);
  const [canCreateTeam, setCanCreateTeam] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setActivity(await getActivityByID(activityID));
      if (profile) {
        setParticipant(await getParticipantByUsername(profile.AD_Username));
        setParticipantTeams(await getParticipantTeams(profile.AD_Username));
      }
      setLoading(false);
    };
    loadData();
  }, [profile, activityID, openTeamForm, openCreateSeriesForm, openCreateMatchForm]);
  // ^ May be bad practice, but will refresh page on dialog close

  // disable create team if participant already is participating in this activity,
  // unless they're an admin
  useEffect(() => {
    if (participantTeams && participant) {
      let participating = false;
      setCanCreateTeam(activity.RegistrationOpen);
      participantTeams.forEach((team) => {
        if (team.Activity.ID === activity.ID) participating = true;
      });
      setCanCreateTeam(!participating || participant.IsAdmin);
    }
  }, [activity, participant, participantTeams]);
  const handleTeamFormSubmit = (status, setOpenTeamForm) => {
    //if you want to do something with the message make a snackbar function here
    setOpenTeamForm(false);
  };
  const handleCreateSeriesForm = (status) => {
    //if you want to do something with the message make a snackbar function here
    setOpenCreateSeriesForm(false);
  };
  // profile hook used for future authentication
  // Administration privs will use AuthGroups -> example can be found in
  //           src/components/Header/components/NavButtonsRightCorner
  if (loading) {
    return <GordonLoader />;
  } else if (!profile) {
    // The user is not logged in
    return <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else {
    let scheduleCard = (
      <Card>
        <CardHeader title="Schedule" className={styles.cardHeader} />
        <CardContent>
          {activity.Series?.length ? (
            <MatchList matches={activity.Series[0].Match} activityID={activity.ID} />
          ) : (
            <Typography variant="body1" paragraph>
              Games have not yet been scheduled.
            </Typography>
          )}
          {participant?.IsAdmin ? (
            <Grid container justifyContent="center">
              <Button
                variant="contained"
                color="warning"
                startIcon={<AddCircleRoundedIcon />}
                className={styles.actionButton}
                onClick={() => {
                  setOpenCreateMatchForm(true);
                }}
              >
                Create a New Match
              </Button>
            </Grid>
          ) : null}
        </CardContent>
      </Card>
    );

    let teamsCard = (
      <Card>
        <CardHeader title="Teams" className={styles.cardHeader} />
        <CardContent>
          {activity.Team?.length ? (
            <TeamList teams={activity.Team} />
          ) : (
            <Typography variant="body1" paragraph>
              Be the first to create a team!
            </Typography>
          )}
          <Grid container justifyContent="center">
            {canCreateTeam ? (
              <Button
                variant="contained"
                color="warning"
                startIcon={<AddCircleRoundedIcon />}
                className={styles.actionButton}
                onClick={() => {
                  setOpenTeamForm(true);
                }}
              >
                Create a New Team
              </Button>
            ) : null}
          </Grid>
        </CardContent>
      </Card>
    );

    let seriesCard = (
      <Card>
        <CardHeader title="Series" className={styles.cardHeader} />
        <CardContent>
          {activity.Series?.length ? (
            <SeriesList series={activity.Series} />
          ) : (
            <Typography variant="body1" paragraph>
              No series scheduled yet!
            </Typography>
          )}
          <Grid container justifyContent="center">
            {participant?.IsAdmin ? (
              <Button
                variant="contained"
                color="warning"
                startIcon={<AddCircleRoundedIcon />}
                className={styles.actionButton}
                onClick={() => {
                  setOpenCreateSeriesForm(true);
                }}
              >
                Create a New Series
              </Button>
            ) : null}
          </Grid>
        </CardContent>
      </Card>
    );
    return (
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} md={6}>
          {scheduleCard}
        </Grid>
        <Grid item container direction="column" xs={12} md={6} spacing={2} wrap="nowrap">
          <Grid item>{seriesCard}</Grid>
          <Grid item>{teamsCard}</Grid>
        </Grid>
        {openTeamForm ? (
          <TeamForm
            closeWithSnackbar={(status) => {
              handleTeamFormSubmit(status, setOpenTeamForm);
            }}
            openTeamForm={openTeamForm}
            setOpenTeamForm={(bool) => setOpenTeamForm(bool)}
            activityID={activityID}
          />
        ) : openCreateMatchForm ? (
          <CreateMatchForm
            closeWithSnackbar={(status) => {
              handleTeamFormSubmit(status, setOpenCreateMatchForm);
            }}
            openCreateMatchForm={openCreateMatchForm}
            setOpenCreateMatchForm={(bool) => setOpenCreateMatchForm(bool)}
            activity={activity}
          />
        ) : null}
        {openCreateSeriesForm ? (
          <CreateSeriesForm
            closeWithSnackbar={(status) => {
              handleCreateSeriesForm(status);
            }}
            openCreateSeriesForm={openCreateSeriesForm}
            setOpenCreateSeriesForm={(bool) => setOpenCreateSeriesForm(bool)}
            activityID={activity.ID}
            existingActivitySeries={activity.Series}
          />
        ) : null}
      </Grid>
    );
  }
};

export default Activity;
