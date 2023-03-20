import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from 'hooks';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import Header from '../../components/Header';
import styles from './Activity.module.css';
import { TeamList } from '../../components/List';
import TeamForm from '../../components/Forms/TeamForm';
import { deleteActivity, getActivityByID } from 'services/recim/activity';
import ActivityForm from 'views/RecIM/components/Forms/ActivityForm';
import MatchForm from 'views/RecIM/components/Forms/MatchForm';
import SeriesForm from 'views/RecIM/components/Forms/SeriesForm';
import { getParticipantByUsername, getParticipantTeams } from 'services/recim/participant';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import ScheduleList from './components/ScheduleList';
import { formatDateTimeRange } from '../../components/Helpers';
import GordonDialogBox from 'components/GordonDialogBox';
import defaultLogo from 'views/RecIM/recim_logo.png';
import { TabPanel } from 'views/RecIM/components';
import { Box } from '@mui/system';

const getNumMatches = (seriesArray) => {
  let n = 0;
  seriesArray.forEach((series) => {
    n += series.Match?.length ?? 0;
  });
  return n;
};

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
  const [selectedSeriesTab, setSelectedSeriesTab] = useState(0);
  const [reload, setReload] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

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
      setCanCreateTeam((!participating && activity.RegistrationOpen) || user.IsAdmin);
    }
  }, [activity, user, userTeams]);

  // autofocus on active series
  useEffect(() => {
    if (activity)
      if (activity.Series.length > 0) {
        let now = new Date().toJSON();
        let index = activity.Series.findIndex(
          (series) => series.StartDate < now && now < series.EndDate,
        );
        if (index !== -1) setSelectedSeriesTab(index);
      }
  }, [activity]);

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

  const handleDelete = () => {
    deleteActivity(activityID);
    setOpenConfirmDelete(false);
    setOpenSettings(false);
    navigate(`/recim`);
    // @TODO add snackbar
  };

  // profile hook used for future authentication
  // Administration privs will use AuthGroups -> example can be found in
  //           src/components/Header/components/NavButtonsRightCorner
  if (!profile) {
    return loading ? <GordonLoader /> : <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else {
    let headerContents = (
      <Grid container direction="row" alignItems="center" columnSpacing={4}>
        <Grid item container xs={9} columnSpacing={4} direction="row" alignItems="center">
          <Grid item>
            <img src={activity?.Logo ?? defaultLogo} alt="Activity Icon" width="85em"></img>
          </Grid>
          <Grid item>
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
              <i>
                {activity?.StartDate
                  ? formatDateTimeRange(activity.StartDate, activity.EndDate)
                  : `Description of activity`}
              </i>
            </Typography>
          </Grid>
        </Grid>
        {user?.IsAdmin && (
          <Grid item xs={3} textAlign={'right'}>
            <IconButton
              onClick={() => {
                setOpenSettings(true);
              }}
              sx={{ mr: '1rem' }}
            >
              <SettingsIcon fontSize="large" />
            </IconButton>
          </Grid>
        )}
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
                    Create a Match
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
                    Create a Series
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
            <Typography className={styles.secondaryText}>No series scheduled yet!</Typography>
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
                    Create a Team
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}{' '}
          {activity.Series.length > 0 ? (
            <>
              <Box className={styles.scrollableCenteredTabs}>
                <Tabs
                  value={selectedSeriesTab}
                  onChange={(event, tabIndex) => setSelectedSeriesTab(tabIndex)}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="admin control center tabs"
                >
                  {activity.Series.map((series) => {
                    return <Tab label={series.Name} />;
                  })}
                </Tabs>
              </Box>
              {activity.Series.map((series, index) => {
                return (
                  <TabPanel value={selectedSeriesTab} index={index}>
                    <TeamList series={series} />
                  </TabPanel>
                );
              })}
            </>
          ) : (
            <>
              {activity.Team?.length ? (
                <TeamList teams={activity.Team} />
              ) : (
                <Typography className={styles.secondaryText}>
                  Be the first to create a team!
                </Typography>
              )}
            </>
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
              <Grid item xs={12} md={7}>
                {scheduleCard}
              </Grid>
              <Grid item direction={'column'} xs={12} md={5}>
                <Grid item className={styles.gridItemStack}>
                  {teamsCard}
                </Grid>
              </Grid>
            </Grid>

            {/* forms and dialogs */}
            <MatchForm
              closeWithSnackbar={(status) => {
                handleMatchFormSubmit(status, setOpenMatchForm);
              }}
              openMatchForm={openMatchForm}
              setOpenMatchForm={(bool) => setOpenMatchForm(bool)}
              activity={activity}
            />
            <SeriesForm
              closeWithSnackbar={(status) => {
                handleCreateSeriesForm(status);
              }}
              openSeriesForm={openCreateSeriesForm}
              setOpenSeriesForm={(bool) => setOpenCreateSeriesForm(bool)}
              activityID={activity.ID}
              existingActivitySeries={activity.Series}
            />
            <TeamForm
              closeWithSnackbar={(teamID, status) => {
                handleTeamFormSubmit(status, setOpenTeamForm);
                navigate(`team/${teamID}`);
              }}
              openTeamForm={openTeamForm}
              setOpenTeamForm={(bool) => setOpenTeamForm(bool)}
              activityID={activityID}
            />
            <GordonDialogBox
              title="Admin Settings"
              fullWidth
              open={openSettings}
              cancelButtonClicked={() => setOpenSettings(false)}
              cancelButtonName="Close"
            >
              <br />
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography>Permanently delete the activity '{activity.Name}'</Typography>
                </Grid>
                <Grid item>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => setOpenConfirmDelete(true)}
                  >
                    Delete this activity
                  </Button>
                </Grid>
              </Grid>
            </GordonDialogBox>
            <GordonDialogBox
              title="Confirm Delete"
              open={openConfirmDelete}
              cancelButtonClicked={() => setOpenConfirmDelete(false)}
              cancelButtonName="No, keep this activity"
              buttonName="Yes, delete this activity"
              buttonClicked={() => handleDelete()}
              severity="error"
            >
              <br />
              <Typography variant="body1">
                Are you sure you want to permanently delete this activity: '{activity.Name}'?
              </Typography>
              <Typography variant="body1">
                This includes <b>{activity.Team?.length ?? 0} teams</b> and
                <b> {activity.Series?.length ?? 0} series</b>, with a total of{' '}
                <b>{getNumMatches(activity.Series)} matches</b>.
              </Typography>
              <Typography variant="body1">This action cannot be undone.</Typography>
            </GordonDialogBox>
          </Grid>
        )}
      </>
    );
  }
};

export default Activity;
