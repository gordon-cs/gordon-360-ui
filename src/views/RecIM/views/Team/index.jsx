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
} from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Team.module.css';
import GordonLoader from 'components/Loader';
import GordonUnauthenticated from 'components/GordonUnauthenticated';
import GordonSnackbar from 'components/Snackbar';
import Header from '../../components/Header';
import TeamForm from 'views/RecIM/components/Forms/TeamForm';
import ImageOptions from 'views/RecIM/components/Forms/ImageOptions';
import InviteParticipantForm from '../../components/Forms/InviteParticipantForm';
import { useUser } from 'hooks';
import { ParticipantList, MatchList } from '../../components/List';
import { getTeamByID, deleteTeam } from 'services/recim/team';
import { getParticipantByUsername } from 'services/recim/participant';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import GordonDialogBox from 'components/GordonDialogBox';
import defaultLogo from 'views/RecIM/recim_logo.png';
import userService from 'services/user';

const Team = () => {
  const navigate = useNavigate();
  const { teamID } = useParams();
  const { profile } = useUser();
  const [team, setTeam] = useState();
  const [logo, setLogo] = useState();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [user, setUser] = useState();
  const [openTeamForm, setOpenTeamForm] = useState(false);
  const [openImageOptions, setOpenImageOptions] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [hasPermissions, setHasPermissions] = useState(false);
  const [openInviteParticipantForm, setOpenInviteParticipantForm] = useState(false);
  const [anchorEl, setAnchorEl] = useState();
  const openMenu = Boolean(anchorEl);

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

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
  }, [profile, teamID, reload]);

  //checks if the team is modifiable by the current user
  useEffect(() => {
    let hasCaptainPermissions = false;
    if (user && team) {
      let role = team.Participant.find(
        (teamParticipant) => teamParticipant.Username === user.Username,
      )?.Role;
      hasCaptainPermissions =
        team.Activity.RegistrationOpen &&
        (role === 'Co-Captain' || role === 'Team-captain/Creator');
    }
    setHasPermissions(hasCaptainPermissions || user?.IsAdmin);
  }, [team, user]);

  useEffect(() => {
    const setSoloLogo = async () => {
      let username = team.Participant[0]?.Username;
      const { def: defaultImage, pref: preferredImage } = await userService.getImage(username);
      setLogo(`data:image/jpg;base64,${preferredImage || defaultImage}`);
    };
    if (team?.Activity.SoloRegistration) {
      setLogo(setSoloLogo());
    } else {
      setLogo(team?.Logo ?? defaultLogo);
    }
  }, [team]);

  const teamRecord = () => {
    if (team) {
      if (team.TeamRecord[0]) {
        return (
          <Typography className={styles.subtitle}>
            {team.TeamRecord[0].WinCount ?? 0}W : {team.TeamRecord[0].LossCount ?? 0}L :{' '}
            {team.TeamRecord[0].TieCount ?? 0}T
          </Typography>
        );
      }
      return <Typography className={styles.subtitle}>Activity has not started</Typography>;
    }
    return <GordonLoader size={15} inline />;
  };

  const handleDelete = async () => {
    await deleteTeam(teamID);
    setOpenConfirmDelete(false);
    navigate(`/recim/activity/${team.Activity.ID}`);
    // @TODO add snackbar
  };

  // default closure
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // menu button click
  const handleButtonClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  if (!profile) {
    return loading ? <GordonLoader /> : <GordonUnauthenticated feature={'the Rec-IM page'} />;
  } else {
    let headerContents = (
      <Grid
        container
        direction="row"
        alignItems="center"
        columnSpacing={4}
        className={styles.header}
      >
        <Grid item container xs={9} columnSpacing={4} direction="row" alignItems="center">
          <Grid item>
            <Button
              className={styles.logoContainer}
              disabled={!hasPermissions || team?.Activity.SoloRegistration}
              onClick={() => {
                setOpenImageOptions(true);
              }}
            >
              <img src={logo} className={styles.logo} alt="Team Icon"></img>
              {hasPermissions && !team?.Activity.SoloRegistration && (
                <div className={styles.overlay}>
                  <Typography className={styles.overlayText}>edit</Typography>
                </div>
              )}
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Typography className={styles.title}>
              {team?.Name ?? <GordonLoader size={15} inline />}
            </Typography>
            {teamRecord()}
          </Grid>
        </Grid>
        {hasPermissions && (
          <Grid item xs={3} textAlign={'right'}>
            <IconButton onClick={handleButtonClick} sx={{ mr: '1rem' }}>
              <SettingsIcon
                fontSize="large"
                sx={
                  openMenu && {
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
          </Grid>
        )}
      </Grid>
    );

    let rosterCard = team && (
      <Card>
        <CardHeader title="Roster" className={styles.cardHeader} />
        <CardContent>
          {hasPermissions && !team.Activity.SoloRegistration && (
            <Grid container className={styles.buttonArea}>
              <Grid item xs={12}>
                <Grid container justifyContent="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddCircleRoundedIcon />}
                    className={styles.actionButton}
                    onClick={() => {
                      setOpenInviteParticipantForm(true);
                    }}
                  >
                    Invite Participant
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
          {hasPermissions ? (
            <ParticipantList
              participants={team.Participant}
              callbackFunction={(bool) => setReload(bool)}
              showParticipantOptions
              showInactive
              isAdmin={true}
            />
          ) : (
            <ParticipantList participants={team.Participant} />
          )}
        </CardContent>
        <InviteParticipantForm
          createSnackbar={createSnackbar}
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
          {team.Match?.length > 0 ? (
            <MatchList matches={team.Match} activityID={team.Activity?.ID} />
          ) : (
            <Typography className={styles.secondaryText}>
              No matches scheduled at this time!
            </Typography>
          )}
        </CardContent>
      </Card>
    );

    return (
      <>
        <Header team={team}>{headerContents}</Header>
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

            {/* forms and dialogs */}
            <TeamForm
              createSnackbar={createSnackbar}
              onClose={() => setReload((prev) => !prev)}
              openTeamForm={openTeamForm}
              setOpenTeamForm={(bool) => setOpenTeamForm(bool)}
              activityID={team?.Activity?.ID}
              team={team}
              isAdmin={user?.IsAdmin}
            />
            <ImageOptions
              category={'Team'}
              component={team}
              createSnackbar={createSnackbar}
              onClose={() => setReload((prev) => !prev)}
              openImageOptions={openImageOptions}
              setOpenImageOptions={setOpenImageOptions}
            />
            <GordonDialogBox
              title="Admin Settings"
              fullWidth
              open={openConfirmDelete}
              cancelButtonClicked={() => setOpenConfirmDelete(false)}
              cancelButtonName="Close"
            >
              <br />
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography>Permanently delete the team '{team.Name}'</Typography>
                </Grid>
                <Grid item>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => setOpenConfirmDelete(true)}
                  >
                    Delete this team
                  </Button>
                </Grid>
              </Grid>
            </GordonDialogBox>
            <GordonDialogBox
              title="Confirm Delete"
              open={openConfirmDelete}
              cancelButtonClicked={() => setOpenConfirmDelete(false)}
              cancelButtonName="No, keep this team"
              buttonName="Yes, delete this team"
              buttonClicked={() => handleDelete()}
              severity="error"
            >
              <br />
              <Typography variant="body1">
                Are you sure you want to permanently delete this team: '{team.Name}'?
              </Typography>
              <Typography variant="body1">
                This will remove this team for {team.Participant?.length ?? 0} participant
                {team.Participant?.length !== 1 && 's'}.
              </Typography>
              <Typography variant="body1">This action cannot be undone.</Typography>
            </GordonDialogBox>
            <InviteParticipantForm
              createSnackbar={createSnackbar}
              onClose={() => setReload((prev) => !prev)}
              openInviteParticipantForm={openInviteParticipantForm}
              setOpenInviteParticipantForm={(bool) => setOpenInviteParticipantForm(bool)}
              teamID={teamID}
            />
            <Menu
              open={openMenu}
              onClose={handleMenuClose}
              anchorEl={anchorEl}
              className={styles.menu}
            >
              <Typography className={styles.menuTitle}>
                {user?.IsAdmin ? 'Admin' : 'Captain'} Settings
              </Typography>
              <MenuItem
                dense
                onClick={() => {
                  setOpenTeamForm(true);
                  handleMenuClose();
                }}
                className={styles.menuButton}
              >
                Edit Team Details
              </MenuItem>
              <MenuItem
                dense
                onClick={() => {
                  setOpenInviteParticipantForm(true);
                  handleMenuClose();
                }}
                className={styles.menuButton}
              >
                Invite a Participant
              </MenuItem>
              {user?.IsAdmin && (
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
              )}
            </Menu>
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

export default Team;
