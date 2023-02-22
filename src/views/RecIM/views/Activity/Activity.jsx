import { Grid, Typography, Card, CardHeader, CardContent, Button, IconButton } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'hooks/hooks';
import GordonLoader from 'components/Loader/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized/GordonUnauthorized';
import Header from '../../components/Header/Header';
import styles from './Activity.module.css';
import { TeamList } from '../../components/List/List';
import TeamForm from '../../components/Forms/TeamForm/TeamForm';
import { getActivityByID } from 'services/recim/activity';
import ActivityForm from 'views/RecIM/components/Forms/ActivityForm/ActivityForm';
import MatchForm from 'views/RecIM/components/Forms/MatchForm/MatchForm';
import CreateSeriesForm from 'views/RecIM/components/Forms/CreateSeriesForm/CreateSeriesForm';
import { getParticipantByUsername, getParticipantTeams } from 'services/recim/participant';
import EditIcon from '@mui/icons-material/Edit';
import ScheduleList from './components/ScheduleList/ScheduleList';

const Activity = () => {
  const navigate = useNavigate();
  const { activityID } = useParams();
  const { profile } = useUser();
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState();
  const [openActivityForm, setOpenActivityForm] = useState(false);
  const [openMatchForm, setOpenMatchForm] = useState(false);
  const [openCreateSeriesForm, setOpenCreateSeriesForm] = useState(false);
  const [openTeamForm, setOpenTeamForm] = useState(false);
  const [user, setUser] = useState();
  const [userTeams, setUserTeams] = useState();
  const [canCreateTeam, setCanCreateTeam] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setActivity(await getActivityByID(activityID));
      if (profile) {
        setUser(await getParticipantByUsername(profile.AD_Username));
        setUserTeams(await getParticipantTeams(profile.AD_Username));
      }
      setLoading(false);
    };
    loadData();
  }, [
    profile,
    activityID,
    openActivityForm,
    openTeamForm,
    openCreateSeriesForm,
    openMatchForm,
    reload,
  ]);
  // @TODO modify above dependency to only refresh upon form submit (not cancel)

  // disable create team if participant already is participating in this activity,
  // unless they're an admin
  useEffect(() => {
    if (activity && userTeams && user) {
      let participating = false;
      userTeams.forEach((team) => {
        if (team.Activity.ID === activity.ID) participating = true;
      });
      setCanCreateTeam(!participating || user.IsAdmin || activity.RegistrationOpen);
    }
  }, [activity, user, userTeams]);

  const handleActivityForm = (status) => {
    //if you want to do something with the message make a snackbar function here
    setOpenActivityForm(false);
  };

  const handleTeamFormSubmit = (status, setOpenTeamForm) => {
    //if you want to do something with the message make a snackbar function here
    setOpenTeamForm(false);
  };

  const handleMatchFormSubmit = (status, setOpenMatchForm) => {
    //if you want to do something with the message make a snackbar function here
    setOpenMatchForm(false);
  };

  const handleCreateSeriesForm = (status) => {
    //if you want to do something with the message make a snackbar function here
    setOpenCreateSeriesForm(false);
  };

  // profile hook used for future authentication
  // Administration privs will use AuthGroups -> example can be found in
  //           src/components/Header/components/NavButtonsRightCorner
  if (!profile) {
    return loading ? <GordonLoader /> : <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else {
    let headerContents = (
      <Grid container direction="row" alignItems="center" columnSpacing={4}>
        <Grid item>
          <img src={''} alt="Activity Icon" width="85em"></img>
        </Grid>
        <Grid item xs={8} md={5}>
          <Typography variant="h5" className={styles.title}>
            {activity?.Name ?? <GordonLoader size={15} inline />}
            {user?.IsAdmin && (
              <IconButton
                onClick={() => {
                  setOpenActivityForm(true);
                }}
                className={styles.editIconButton}
                sx={{ ml: 1 }}
              >
                <EditIcon />
              </IconButton>
            )}
          </Typography>
          <Typography variant="h6" className={styles.subtitle}>
            <i>Description of activity</i>
          </Typography>
        </Grid>
        {openActivityForm && (
          <ActivityForm
            activity={activity}
            closeWithSnackbar={(status) => {
              handleActivityForm(status);
            }}
            openActivityForm={openActivityForm}
            setOpenActivityForm={(bool) => setOpenActivityForm(bool)}
          />
        )}
      </Grid>
    );

    let scheduleCard = activity && (
      <Card>
        <CardHeader title="Schedule" className={styles.cardHeader} />
        <CardContent className={styles.schedule}>
          {user?.IsAdmin && (
            <Grid container className={styles.buttonArea}>
              <Grid item xs={6}>
                <Grid container justifyContent="center">
                  <Button
                    variant="contained"
                    color="warning"
                    startIcon={<AddCircleRoundedIcon />}
                    className={styles.actionButton}
                    onClick={() => {
                      setOpenMatchForm(true);
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
          )}
          {activity.Series?.length ? (
            activity.Series.map((series) => {
              return (
                <ScheduleList
                  isAdmin={user?.IsAdmin}
                  series={series}
                  activityID={activityID}
                  reload={reload}
                  setReload={setReload}
                />
              );
            })
          ) : (
            <Typography variant="body1" paragraph>
              No series scheduled yet!
            </Typography>
          )}
        </CardContent>
      </Card>
    );

    let teamsCard = activity && (
      <Card>
        <CardHeader title="Teams" className={styles.cardHeader} />
        <CardContent>
          {canCreateTeam && (
            <Grid container className={styles.buttonArea}>
              <Grid item xs={12}>
                <Grid container justifyContent="center">
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
                </Grid>
              </Grid>
            </Grid>
          )}
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
      <>
        <Header activity={activity}>{headerContents}</Header>
        {loading ? (
          <GordonLoader />
        ) : (
          <Grid container justifyContent="center" spacing={2}>
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
            {openTeamForm && (
              <TeamForm
                closeWithSnackbar={(teamID, status) => {
                  handleTeamFormSubmit(status, setOpenTeamForm);
                  navigate(`${activityID}/team/${teamID}`);
                }}
                openTeamForm={openTeamForm}
                setOpenTeamForm={(bool) => setOpenTeamForm(bool)}
                activityID={activityID}
              />
            )}
            {openMatchForm && (
              <MatchForm
                closeWithSnackbar={(status) => {
                  handleMatchFormSubmit(status, setOpenMatchForm);
                }}
                openMatchForm={openMatchForm}
                setOpenMatchForm={(bool) => setOpenMatchForm(bool)}
                activity={activity}
              />
            )}
            {openCreateSeriesForm && (
              <CreateSeriesForm
                closeWithSnackbar={(status) => {
                  handleCreateSeriesForm(status);
                }}
                openCreateSeriesForm={openCreateSeriesForm}
                setOpenCreateSeriesForm={(bool) => setOpenCreateSeriesForm(bool)}
                activityID={activity.ID}
                existingActivitySeries={activity.Series}
              />
            )}
            {openTeamForm && (
              <TeamForm
                closeWithSnackbar={(teamID, status) => {
                  handleTeamFormSubmit(status, setOpenTeamForm);
                  navigate(`/team/${teamID}`);
                }}
                openTeamForm={openTeamForm}
                setOpenTeamForm={(bool) => setOpenTeamForm(bool)}
                activityID={activityID}
              />
            )}
            {openMatchForm && (
              <MatchForm
                closeWithSnackbar={(status) => {
                  handleTeamFormSubmit(status, setOpenMatchForm);
                }}
                openMatchForm={openMatchForm}
                setOpenMatchForm={(bool) => setOpenMatchForm(bool)}
                activity={activity}
              />
            )}
            {openCreateSeriesForm && (
              <CreateSeriesForm
                closeWithSnackbar={(status) => {
                  handleCreateSeriesForm(status);
                }}
                openCreateSeriesForm={openCreateSeriesForm}
                setOpenCreateSeriesForm={(bool) => setOpenCreateSeriesForm(bool)}
                activityID={activity.ID}
                existingActivitySeries={activity.Series}
              />
            )}
          </Grid>
        )}
      </>
    );
  }
};

export default Activity;
