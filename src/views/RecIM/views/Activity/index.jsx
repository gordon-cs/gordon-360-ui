import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  tooltipClasses,
  ClickAwayListener,
  FormControl,
  Select,
} from '@mui/material';
import { theme360 } from 'theme';
import { styled } from '@mui/material/styles';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from 'hooks';
import GordonLoader from 'components/Loader';
import GordonUnauthenticated from 'components/GordonUnauthenticated';
import GordonSnackbar from 'components/Snackbar';
import Header from '../../components/Header';
import styles from './Activity.module.css';
import { TeamList } from '../../components/List';
import TeamForm from '../../components/Forms/TeamForm';
import { deleteActivity, getActivityByID } from 'services/recim/activity';
import ActivityForm from 'views/RecIM/components/Forms/ActivityForm';
import SeriesForm from 'views/RecIM/components/Forms/SeriesForm';
import WaiverForm from 'views/RecIM/components/Forms/WaiverForm';
import ImageOptions from 'views/RecIM/components/Forms/ImageOptions';
import userService from 'services/user';
import { getParticipantByUsername, getParticipantTeams } from 'services/recim/participant';
import SettingsIcon from '@mui/icons-material/Settings';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import ScheduleList from './components/ScheduleList';
import { formatDateTimeRange } from '../../components/Helpers';
import GordonDialogBox from 'components/GordonDialogBox';
import defaultLogo from 'views/RecIM/recim_logo.png';
import { createTeam } from 'services/recim/team';
import InviteParticipantForm from 'views/RecIM/components/Forms/InviteParticipantForm';

const getNumMatches = (seriesArray) => {
  let n = 0;
  seriesArray.forEach((series) => {
    n += series.Match?.length ?? 0;
  });
  return n;
};

const RulesTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme360.vars.palette.neutral.main,
    color: theme360.vars.palette.neutral.contrastText,
    maxWidth: 200,
  },
}));

const Activity = () => {
  const navigate = useNavigate();
  const { activityID } = useParams();
  const { profile } = useUser();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [activity, setActivity] = useState();
  const [openActivityForm, setOpenActivityForm] = useState(false);
  const [openCreateSeriesForm, setOpenCreateSeriesForm] = useState(false);
  const [openTeamForm, setOpenTeamForm] = useState(false);
  const [openImageOptions, setOpenImageOptions] = useState(false);
  const [openAddSoloTeam, setOpenAddSoloTeam] = useState(false);
  const [user, setUser] = useState();
  const [userTeams, setUserTeams] = useState();
  const [canCreateTeam, setCanCreateTeam] = useState(true);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminAnchorEl, setAdminAnchorEl] = useState();
  const openAdminMenu = Boolean(adminAnchorEl);
  const [openTooltip, setOpenTooltip] = useState(false);
  const [teamListFilter, setTeamListFilter] = useState(false);
  const [openWaiver, setOpenWaiver] = useState(false);

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setActivity(await getActivityByID(activityID));
      if (profile) {
        setUser(await getParticipantByUsername(profile.AD_Username));
      }
      setLoading(false);
    };
    loadData();
  }, [profile, activityID, reload]);

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        setUserTeams(await getParticipantTeams(profile.AD_Username));
        setIsAdmin(user.IsAdmin);
      }
    };
    loadData();
  }, [user, profile]);

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

  // auto select active series for filtering team list
  useEffect(() => {
    if (activity?.Series.length > 0) {
      let now = new Date().toJSON();
      let activeSeries = activity.Series.find(
        (series) => series.StartDate < now && now < series.EndDate,
      );
      if (activeSeries) setTeamListFilter(activeSeries.ID);
    }
  }, [activity]);

  const handleDelete = () => {
    deleteActivity(activityID)
      .then(() => {
        setOpenConfirmDelete(false);
        navigate(`/recim`);
      })
      .catch((reason) => {
        createSnackbar(
          `There was a problem deleting activity ${activity.Name}: ${reason}`,
          'error',
        );
      });
  };

  // default closure
  const handleMenuClose = () => {
    setAdminAnchorEl(null);
  };

  // menu button click
  const handleButtonClick = (e) => {
    setAdminAnchorEl(e.currentTarget);
  };

  let handleJoinActivity = async () => {
    // participant not found
    if (user == null) {
      setOpenWaiver(true);
      return;
    }

    // redundant check for status management
    if (user) {
      switch (user.Status) {
        case 'Deleted':
        // fallthrough
        case 'Pending':
          setOpenWaiver(true);
        case 'Suspension':
        // fallthrough
        case 'Banned':
          return;
        default:
        // continue
      }
    }

    if (activity.SoloRegistration) {
      setLoading(true);
      const profileInfo = await userService.getProfileInfo(profile.AD_Username);
      const request = {
        Name: profileInfo.fullName,
        ActivityID: activityID,
      };
      await createTeam(profile.AD_Username, request);
      setReload((r) => !r);
      createSnackbar(`Activity ${activity.Name} has been joined successfully`, 'success');
      setLoading(false);
    } else {
      setOpenTeamForm(true);
    }
  };

  // profile hook used for future authentication
  // Administration privs will use AuthGroups -> example can be found in
  //           src/components/Header/components/NavButtonsRightCorner
  if (!profile) {
    return loading ? <GordonLoader /> : <GordonUnauthenticated feature={'the Rec-IM page'} />;
  } else {
    let headerContents = (
      <Grid container alignItems="center" columnSpacing={4} className={styles.header}>
        <Grid item container xs={9} columnSpacing={4} alignItems="center">
          <Grid item>
            <Button
              className={styles.logoContainer}
              disabled={!isAdmin}
              onClick={() => {
                setOpenImageOptions(true);
              }}
            >
              <img
                src={activity?.Logo ?? defaultLogo}
                className={styles.logo}
                alt="Activity Icon"
              ></img>
              {isAdmin && (
                <div className={styles.overlay}>
                  <Typography className={styles.overlayText}>edit</Typography>
                </div>
              )}
            </Button>
          </Grid>
          <Grid item>
            <Typography className={styles.title}>
              {activity?.Name ?? <GordonLoader size={15} inline />}
            </Typography>
            <Typography className={styles.subtitle}>
              <i>
                {activity?.StartDate
                  ? formatDateTimeRange(activity.StartDate, activity.EndDate)
                  : `Description of activity`}
              </i>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={3} textAlign={'right'}>
          {isAdmin && (
            <IconButton onClick={handleButtonClick} sx={{ mr: '1rem' }}>
              <SettingsIcon
                fontSize="large"
                sx={
                  openAdminMenu && {
                    animation: 'spin 0.2s linear ',
                    '@keyframes spin': {
                      '0%': {
                        transform: 'rotate(0deg)',
                      },
                      '100%': {
                        transform: 'rotate(120deg)',
                      },
                    },
                  }
                }
              />
            </IconButton>
          )}
          <ClickAwayListener onClickAway={() => setOpenTooltip(false)}>
            <Grid item>
              <RulesTooltip
                placement="bottom-start"
                open={openTooltip}
                title={
                  <>
                    <Typography fontWeight="bold" fontSize="1.5em">
                      Rules for {activity?.Sport.Name}:
                    </Typography>{' '}
                    <Typography fontWeight="italic" fontSize="1.2em" fontStyle="italic">
                      {activity?.Sport.Rules}
                    </Typography>
                  </>
                }
              >
                <IconButton sx={{ mr: '1.3rem' }} onClick={() => setOpenTooltip((prev) => !prev)}>
                  <ImportContactsIcon />
                </IconButton>
              </RulesTooltip>
            </Grid>
          </ClickAwayListener>
        </Grid>
      </Grid>
    );

    let scheduleCard = activity && (
      <Card>
        <CardHeader title="Activity Schedule" className={styles.cardHeader} />
        <CardContent className={styles.schedule}>
          {isAdmin && (
            <Grid container className={styles.buttonArea}>
              <Grid item xs={12}>
                <Grid container justifyContent="center">
                  <Button
                    variant="contained"
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
                  isAdmin={isAdmin}
                  series={series}
                  activityID={activityID}
                  reload={reload}
                  setReload={setReload}
                  createSnackbar={createSnackbar}
                  activityTeams={activity?.Team}
                />
              );
            })
          ) : (
            <Typography sx={{ mt: '1em' }} className={styles.secondaryText}>
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
                <Grid container justifyContent="space-around">
                  <Button
                    variant="contained"
                    startIcon={<AddCircleRoundedIcon />}
                    className={styles.actionButton}
                    onClick={() => handleJoinActivity()}
                  >
                    {activity.SoloRegistration ? 'Join Activity' : 'Create a Team'}
                  </Button>
                  {activity.SoloRegistration && isAdmin && (
                    <Button
                      variant="contained"
                      startIcon={<AddCircleRoundedIcon />}
                      className={styles.actionButton}
                      onClick={() => {
                        setOpenAddSoloTeam(true);
                      }}
                    >
                      Add Participant
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          )}{' '}
          {activity.Series.length > 0 ? (
            <>
              <Grid container justifyContent="center" alignItems="center" columnSpacing={2}>
                <Grid item>
                  <Typography className={styles.secondaryText}>Filter by series: </Typography>
                </Grid>
                <Grid item>
                  <FormControl variant="filled">
                    <Select
                      value={teamListFilter}
                      onChange={(e) => setTeamListFilter(e.target.value)}
                      className={styles.teamListFilterSelect}
                      displayEmpty
                    >
                      <MenuItem value={false}>
                        <em>All Teams</em>
                      </MenuItem>
                      {activity.Series.map((series) => {
                        return <MenuItem value={series.ID}>{series.Name}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <TeamList
                series={
                  teamListFilter && activity.Series.find((series) => series.ID === teamListFilter)
                }
                teams={!teamListFilter && activity.Team}
              />
            </>
          ) : (
            <>
              {activity.Team?.length ? (
                <TeamList teams={activity.Team} />
              ) : (
                <Typography sx={{ mt: '1em' }} className={styles.secondaryText}>
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
              <Grid item xs={12} md={6.5}>
                {scheduleCard}
              </Grid>
              <Grid item direction={'column'} xs={12} md={5.5}>
                <Grid item className={styles.gridItemStack}>
                  {teamsCard}
                </Grid>
              </Grid>
            </Grid>

            <ActivityForm
              activity={activity}
              onClose={() => setReload((prev) => !prev)}
              createSnackbar={createSnackbar}
              openActivityForm={openActivityForm}
              setOpenActivityForm={(bool) => setOpenActivityForm(bool)}
            />
            <SeriesForm
              createSnackbar={createSnackbar}
              onClose={() => {
                setReload((prev) => !prev);
              }}
              openSeriesForm={openCreateSeriesForm}
              setOpenSeriesForm={(bool) => setOpenCreateSeriesForm(bool)}
              activityID={activity.ID}
              existingActivitySeries={activity.Series}
            />
            <TeamForm
              onClose={(teamID) => navigate(`team/${teamID}`)}
              createSnackbar={createSnackbar}
              openTeamForm={openTeamForm}
              setOpenTeamForm={(bool) => setOpenTeamForm(bool)}
              activityID={activityID}
            />
            <ImageOptions
              category={'Activity'}
              createSnackbar={createSnackbar}
              onClose={() => {
                setReload((prev) => !prev);
              }}
              component={activity}
              openImageOptions={openImageOptions}
              setOpenImageOptions={setOpenImageOptions}
            />
            <InviteParticipantForm
              createSnackbar={createSnackbar}
              onClose={() => setReload((prev) => !prev)}
              openInviteParticipantForm={openAddSoloTeam}
              setOpenInviteParticipantForm={(bool) => setOpenAddSoloTeam(bool)}
              individualSport
              activityID={activityID}
            />
            <WaiverForm
              username={profile.AD_Username}
              createSnackbar={createSnackbar}
              onClose={() => {
                setReload((prev) => !prev);
              }}
              openWaiverForm={openWaiver}
              setOpenWaiverForm={(bool) => setOpenWaiver(bool)}
            />
            <Menu
              open={openAdminMenu}
              onClose={handleMenuClose}
              anchorEl={adminAnchorEl}
              className={styles.menu}
            >
              <Typography className={styles.menuTitle}>Admin Settings</Typography>
              <MenuItem
                dense
                onClick={() => {
                  setOpenActivityForm(true);
                  handleMenuClose();
                }}
                className={styles.menuButton}
              >
                Edit Activity Details
              </MenuItem>
              <MenuItem
                dense
                onClick={() => {
                  setOpenConfirmDelete(true);
                  handleMenuClose();
                }}
                className={styles.redButton}
              >
                Delete
              </MenuItem>
            </Menu>
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
            <GordonSnackbar
              open={snackbar.open}
              text={snackbar.message}
              severity={snackbar.severity}
              onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
            />
          </Grid>
        )}
        <GordonSnackbar
          open={snackbar.open}
          text={snackbar.message}
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        />
      </>
    );
  }
};

export default Activity;
