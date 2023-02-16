import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import GordonDialogBox from 'components/GordonDialogBox';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import TuneIcon from '@mui/icons-material/Tune';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useUser } from 'hooks';
import { ContentCard } from 'views/RecIM/components/Forms/components/ContentCard';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import Header from '../../components/Header';
import styles from './Activity.module.css';
import { MatchList, TeamList } from './../../components/List';
import TeamForm from '../../components/Forms/TeamForm';
import { getActivityByID } from 'services/recim/activity';
import ActivityForm from 'views/RecIM/components/Forms/ActivityForm';
import MatchForm from 'views/RecIM/components/Forms/MatchForm';
import CreateSeriesForm from 'views/RecIM/components/Forms/CreateSeriesForm';
import { getParticipantByUsername, getParticipantTeams } from 'services/recim/participant';
import EditIcon from '@mui/icons-material/Edit';
import UpdateIcon from '@mui/icons-material/Update';
import RestoreIcon from '@mui/icons-material/Restore';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { standardDate } from 'views/RecIM/components/Helpers';
import { DateTime } from 'luxon';
import { scheduleSeriesMatches } from 'services/recim/series';

const Activity = () => {
  const navigate = useHistory();
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
      setCanCreateTeam(activity.RegistrationOpen);
      userTeams.forEach((team) => {
        if (team.Activity.ID === activity.ID) participating = true;
      });
      setCanCreateTeam(!participating || user.IsAdmin);
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
          {user?.IsAdmin && (
            <Grid container className={styles.buttonArea}>
              <Grid item xs={12}>
                <Grid container justifyContent="center">
                  {canCreateTeam && (
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
                  )}
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
                  navigate.push(`${activityID}/team/${teamID}`);
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
                  navigate.push(`${activityID}/team/${teamID}`);
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

const ScheduleList = ({ series, activityID, reload, setReload }) => {
  const [anchorEl, setAnchorEl] = useState();
  const openMenu = Boolean(anchorEl);
  const [openAutoSchedulerDisclaimer, setOpenAutoSchedulerDisclaimer] = useState(false);
  const [disclaimerContent, setDisclaimerContent] = useState('');
  let startDate = DateTime.fromISO(series.StartDate);
  let endDate = DateTime.fromISO(series.EndDate);

  // default closure
  const handleClose = () => {
    setAnchorEl(null);
  };

  // edit button
  const handleEdit = () => {
    console.log(`edit series#${series.ID}, ${series.Name}`);
    handleClose();
  };

  // autoschedule button
  const handleAutoSchedule = () => {
    const numMatches = (type, numTeams) => {
      switch (type) {
        case 'Round Robin':
          return (numTeams * (numTeams - 1)) / 2;
        case 'Single Elim':
          return numTeams - 1;
        case 'Ladder':
          return 1; //temporary
        case 'Double Elim':
          return numTeams * 2 - 1;
        default:
          return null;
      }
    };
    setDisclaimerContent(
      <Typography margin={4}>
        <Typography variant="body1" paragraph>
          {series.Match.length > 0 &&
            `${series.Name} already has ${series.Match.length} on-going/scheduled matches.`}
          You are attempting to create an additional {''}
          <b>{numMatches(series.Type, series.TeamStanding.length)}</b> {''}
          matches in the format of {series.Type} among {series.TeamStanding.length} teams
        </Typography>

        <Typography variant="body1" paragraph>
          Each match has an estimated length of {series.Schedule.EstMatchTime} minutes, with a 15
          minutes buffer in between each match. Matches will be scheduled to start on {''}
          {standardDate(startDate, false)}, or the earliest available day, at{' '}
          {DateTime.fromISO(series.Schedule.StartTime).toLocaleString(DateTime.TIME_SIMPLE)}.{' '}
        </Typography>
      </Typography>,
    );
    setOpenAutoSchedulerDisclaimer(true);
    handleClose();
  };

  const handleConfirmAutoSchedule = () => {
    scheduleSeriesMatches(series.ID).then((res) => {
      console.log(res);
      setOpenAutoSchedulerDisclaimer(false);
      setReload(!reload);
    });
  };

  // delete button
  const handleDelete = () => {
    console.log(`delete series#${series.ID}, ${series.Name}`);
    handleClose();
  };

  // menu button click
  const handleButtonClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

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
      <Grid container className={styles.seriesHeader} alignItems="center" columnSpacing={1}>
        <Grid item container direction="column" xs={10} sm={5}>
          <Typography variant="h6" className={styles.seriesMainText}>
            {series.Name}{' '}
          </Typography>
          <Typography className={styles.seriesSecondaryText}>{series.Type}</Typography>
        </Grid>
        <Grid item container xs={12} sm={3}>
          <Grid item xs={10}>
            <Typography className={styles.seriesDateText}>
              {standardDate(startDate, false)} - {standardDate(endDate, false)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item sm={3} justifyContent="center">
          {status()}
        </Grid>

        {series.TeamStanding.length > 0 && (
          <Grid container item sm={1} justifyContent="center">
            <IconButton onClick={handleButtonClick}>
              <TuneIcon inline />
            </IconButton>{' '}
          </Grid>
        )}
        <Menu open={openMenu} onClose={handleClose} anchorEl={anchorEl}>
          <MenuItem dense onClick={handleEdit} divider>
            Edit
          </MenuItem>
          <MenuItem dense onClick={handleAutoSchedule} divider>
            Auto-schedule
          </MenuItem>
          <MenuItem dense onClick={handleDelete} className={styles.redButton} divider>
            Delete
          </MenuItem>
        </Menu>
      </Grid>
      {series.Match.length ? (
        <MatchList matches={series.Match} activityID={activityID} />
      ) : (
        <Typography variant="body1" paragraph>
          Games have not yet been scheduled for this series.
        </Typography>
      )}
      <GordonDialogBox
        open={openAutoSchedulerDisclaimer}
        title="Auto-Scheduler Disclaimer"
        fullWidth
        maxWidth="sm"
        buttonClicked={() => handleConfirmAutoSchedule()}
        buttonName="I Understand"
        cancelButtonClicked={() => setOpenAutoSchedulerDisclaimer(false)}
        cancelButtonName="Cancel"
      >
        <ContentCard title={`You are attempting to use the auto-scheduler for ${series.Name}`}>
          {disclaimerContent}
        </ContentCard>
      </GordonDialogBox>
    </>
  );
};

export default Activity;
