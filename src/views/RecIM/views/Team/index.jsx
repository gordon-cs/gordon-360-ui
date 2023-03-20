import { Grid, Typography, Card, CardHeader, CardContent, Button, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Team.module.css';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import Header from '../../components/Header';
import TeamForm from 'views/RecIM/components/Forms/TeamForm';
import InviteParticipantForm from '../../components/Forms/InviteParticipantForm';
import { useUser } from 'hooks';
import { ParticipantList, MatchList } from '../../components/List';
import { getTeamByID, deleteTeam } from 'services/recim/team';
import { getParticipantByUsername } from 'services/recim/participant';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import GordonDialogBox from 'components/GordonDialogBox';
import defaultLogo from 'views/RecIM/recim_logo.png';

const Team = () => {
  const navigate = useNavigate();
  const { teamID } = useParams();
  const { profile } = useUser();
  const [reload, setReload] = useState(false);
  const [team, setTeam] = useState();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [openTeamForm, setOpenTeamForm] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
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
  }, [profile, teamID, openTeamForm, openInviteParticipantForm, reload]);
  // @TODO modify above dependency to only refresh upon form submit (not cancel)

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

  const handleTeamForm = (status) => {
    //if you want to do something with the message make a snackbar function here
    setOpenTeamForm(false);
  };

  const handleDelete = () => {
    deleteTeam(teamID);
    setOpenConfirmDelete(false);
    setOpenSettings(false);
    navigate(`/recim/activity/${team.Activity.ID}`);
    // @TODO add snackbar
  };

  if (!profile) {
    return loading ? <GordonLoader /> : <GordonUnauthorized feature={'the Rec-IM page'} />;
  } else {
    let headerContents = (
      <Grid container direction="row" alignItems="center" columnSpacing={4}>
        <Grid item container xs={9} columnSpacing={4} direction="row" alignItems="center">
          <Grid item>
            <img src={team?.Logo ?? defaultLogo} alt="Team Icon" width="85em"></img>
          </Grid>
          <Grid item>
            <Typography variant="h5" className={styles.title}>
              {team?.Name ?? <GordonLoader size={15} inline />}
              {hasPermissions && (
                <IconButton
                  onClick={() => {
                    setOpenTeamForm(true);
                  }}
                  className={styles.editIconButton}
                  sx={{ ml: 1 }}
                >
                  <EditIcon />
                </IconButton>
              )}
            </Typography>
            {teamRecord()}
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
              </Grid>
            </Grid>
          )}
          {hasPermissions ? (
            <ParticipantList
              participants={team.Participant}
              callbackFunction={(bool) => setReload(bool)}
              showParticipantOptions
              showInactive
            />
          ) : (
            <ParticipantList participants={team.Participant} />
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
              closeWithSnackbar={(status) => {
                handleTeamForm(status);
              }}
              openTeamForm={openTeamForm}
              setOpenTeamForm={(bool) => setOpenTeamForm(bool)}
              activityID={team?.Activity?.ID}
              team={team}
              isAdmin={user?.IsAdmin}
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
          </Grid>
        )}
      </>
    );
  }
};

export default Team;
