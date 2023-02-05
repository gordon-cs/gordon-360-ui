import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  Chip,
  Breadcrumbs,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import HomeIcon from '@mui/icons-material/Home';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useUser } from 'hooks';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import styles from './Activity.module.css';
import { MatchList, TeamList } from './../../components/List';
import ActivityForm from 'views/RecIM/components/Forms/ActivityForm';
import TeamForm from '../../components/Forms/TeamForm';
import { getActivityByID } from 'services/recim/activity';
import { Link as LinkRouter } from 'react-router-dom';
import CreateMatchForm from 'views/RecIM/components/Forms/CreateMatchForm';
import CreateSeriesForm from 'views/RecIM/components/Forms/CreateSeriesForm';
import { getParticipantByUsername, getParticipantTeams } from 'services/recim/participant';
import UpdateIcon from '@mui/icons-material/Update';
import RestoreIcon from '@mui/icons-material/Restore';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { standardDate } from 'views/RecIM/components/Helpers';
import { DateTime } from 'luxon';

const Activity = () => {
  const navigate = useHistory();
  const { activityID } = useParams();
  const { profile } = useUser();
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState();
  const [openActivityForm, setOpenActivityForm] = useState(false);
  const [openCreateMatchForm, setOpenCreateMatchForm] = useState(false);
  const [openCreateSeriesForm, setOpenCreateSeriesForm] = useState(false);
  const [openTeamForm, setOpenTeamForm] = useState(false);
  const [participant, setParticipant] = useState();
  const [participantTeams, setParticipantTeams] = useState();
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
  }, [
    profile,
    activityID,
    openTeamForm,
    openCreateSeriesForm,
    openActivityForm,
    openCreateMatchForm,
  ]);
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
  const handleActivityForm = (status) => {
    //if you want to do something with the message make a snackbar function here
    setOpenActivityForm(false);
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
    let activityHeader = (
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
                  <Typography color="text.primary">{activity.Name}</Typography>
                </Breadcrumbs>
              </Grid>
              <hr className={styles.recimNavHeaderLine} />
            </Grid>
            <Grid item container direction="row" alignItems="center" columnSpacing={4}>
              <Grid item>
                <img src={''} alt="Activity Icon" width="85em"></img>
              </Grid>
              <Grid item xs={8} md={5}>
                <Typography variant="h5" className={styles.activityTitle}>
                  {activity.Name}
                  {participant?.IsAdmin ? (
                    <IconButton>
                      <EditIcon
                        onClick={() => {
                          setOpenActivityForm(true);
                        }}
                      />
                    </IconButton>
                  ) : null}
                </Typography>
                <Typography variant="h6" className={styles.activitySubtitle}>
                  <i>Description of activity</i>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
    // CARD - schedule
    let scheduleCard = (
      <Card>
        <CardHeader title="Schedule" className={styles.cardHeader} />
        <CardContent className={styles.schedule}>
          {participant?.IsAdmin ? (
            <Grid container className={styles.buttonArea}>
              <Grid item xs={6}>
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
              </Grid>
              <Grid item xs={6}>
                <Grid container justifyContent="center">
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
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          {activity.Series?.length ? (
            activity.Series.map((series) => {
              return <ScheduleList series={series} activityID={activityID} />;
            })
          ) : (
            <Typography variant="body1" paragraph>
              No series scheduled yet!
            </Typography>
          )}
        </CardContent>
      </Card>
    );
    // CARD - teams
    let teamsCard = (
      <Card>
        <CardHeader title="Teams" className={styles.cardHeader} />
        <CardContent>
          {participant?.IsAdmin ? (
            <Grid container className={styles.buttonArea}>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
          ) : null}
          {activity.Team?.length ? (
            <TeamList teams={activity.Team} />
          ) : (
            <Typography variant="body1" paragraph>
              Be the first to create a team!
            </Typography>
          )}
        </CardContent>
      </Card>
    );

    return (
      <Grid container spacing={2} direction="column" wrap="nowrap">
        <Grid item alignItems="center" xs={12}>
          {activityHeader}
        </Grid>
        <Grid item container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={6}>
            {scheduleCard}
          </Grid>
          <Grid item direction={'column'} xs={12} md={6}>
            <Grid item className={styles.gridItemStack}>
              {teamsCard}
            </Grid>
          </Grid>
        </Grid>
        {openTeamForm ? (
          <TeamForm
            closeWithSnackbar={(teamID, status) => {
              handleTeamFormSubmit(status, setOpenTeamForm);
              navigate.push(`${activityID}/team/${teamID}`)
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
        {openActivityForm ? (
          <ActivityForm
            activity={activity}
            closeWithSnackbar={(status) => {
              handleActivityForm(status);
            }}
            openActivityForm={openActivityForm}
            setOpenActivityForm={(bool) => setOpenActivityForm(bool)}
          />
        ) : null}
        <Typography>Activity ID: {activityID} (testing purposes only)</Typography>
      </Grid>
    );
  }
};

const ScheduleList = ({ series, activityID }) => {
  let startDate = DateTime.fromISO(series.StartDate);
  let endDate = DateTime.fromISO(series.EndDate);

  const status = () => {
    let now = DateTime.fromMillis(Date.now());
    // future series
    if (now < startDate)
      return <Chip icon={<UpdateIcon />} label="scheduled" color="secondary" size="small"></Chip>;
    // past series
    else if (now > endDate)
      return <Chip icon={<RestoreIcon />} label="completed" color="success" size="small"></Chip>;
    // current series
    return <Chip icon={<ScheduleIcon />} label="ongoing" color="warning" size="small"></Chip>;
  };

  return (
    <>
      <Grid container className={styles.seriesHeader} alignItems="center" columnSpacing={2}>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" className={styles.seriesMainText}>
            {series.Name}
          </Typography>
          <Typography className={styles.seriesSecondaryText}>
            Schedule Type: {series.Type}
          </Typography>
        </Grid>
        <Grid item container xs={12} sm={3}>
          <Grid item xs={10}>
            <Typography>
              <i>
                {standardDate(startDate, false)} - {standardDate(endDate, false)}
              </i>
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} sm={3} justifyContent="center">
          {status()}
        </Grid>
      </Grid>
      {series.Match.length ? (
        <MatchList matches={series.Match} activityID={activityID} />
      ) : (
        <Typography variant="body1" paragraph>
          Games have not yet been scheduled for this series.
        </Typography>
      )}
    </>
  );
};

export default Activity;
