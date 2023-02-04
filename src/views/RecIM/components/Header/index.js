import { Grid, AppBar, Breadcrumbs, Typography, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link as LinkRouter } from 'react-router-dom';
import styles from './Header.module.css';
import { useUser } from 'hooks';
import { getParticipantByUsername } from 'services/recim/participant';
import { getActivityByID } from 'services/recim/activity';
import { getTeamByID } from 'services/recim/team';
import { getMatchByID } from 'services/recim/match';
import ActivityForm from 'views/RecIM/components/Forms/ActivityForm';
import recimLogo from './../../recim_logo.png';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';

const Header = ({ expandable = false }) => {
  const { profile } = useUser();
  const { activityID, teamID, matchID } = useParams();
  const [user, setUser] = useState();
  const [activity, setActivity] = useState();
  const [team, setTeam] = useState();
  const [match, setMatch] = useState();
  const [openActivityForm, setOpenActivityForm] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (profile) {
        setUser(await getParticipantByUsername(profile.AD_Username));
      }
    };
    loadData();
  }, [profile]);

  useEffect(() => {
    const loadData = async () => {
      activityID ? setActivity(await getActivityByID(activityID)) : setActivity();
    };
    loadData();
  }, [activityID]);

  useEffect(() => {
    const loadData = async () => {
      teamID ? setTeam(await getTeamByID(teamID)) : setTeam();
    };
    loadData();
  }, [teamID]);

  useEffect(() => {
    const loadData = async () => {
      matchID ? setMatch(await getMatchByID(matchID)) : setMatch();
    };
    loadData();
  }, [matchID]);

  const handleActivityForm = (status) => {
    //if you want to do something with the message make a snackbar function here
    setOpenActivityForm(false);
  };

  const mainHeader = () => {
    if (expandable === 'home') {
      return (
        <Grid container direction="row" alignItems="center" spacing={4}>
          <Grid item>
            <img src={recimLogo} alt="Rec-IM Logo" width="85em"></img>
          </Grid>
          <Grid item xs={8} md={5} lg={3}>
            <Typography variant="h5" className={styles.title}>
              <b className="accentText">Gordon</b> Rec-IM
            </Typography>
            <Typography variant="h6" className={styles.subtitle}>
              <i>"Competition reveals character"</i>
            </Typography>
          </Grid>
        </Grid>
      );
    }
    if (expandable === 'activity') {
      return (
        <Grid container direction="row" alignItems="center" columnSpacing={4}>
          <Grid item>
            <img src={''} alt="Activity Icon" width="85em"></img>
          </Grid>
          <Grid item xs={8} md={5}>
            <Typography variant="h5" className={styles.title}>
              {activity?.Name}
              {user?.IsAdmin ? (
                <IconButton>
                  <EditIcon
                    onClick={() => {
                      setOpenActivityForm(true);
                    }}
                  />
                </IconButton>
              ) : null}
            </Typography>
            <Typography variant="h6" className={styles.subtitle}>
              <i>Description of activity</i>
            </Typography>
          </Grid>
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
        </Grid>
      );
    }
    return null;
  };

  return (
    <>
      {expandable && <Grid className={styles.mainHeader}>{mainHeader()}</Grid>}
      <AppBar className={styles.stickyNav} sx={!expandable && { mt: '-1rem' }}>
        <Breadcrumbs aria-label="breadcrumb">
          {activity ? (
            <LinkRouter className="gc360_text_link" underline="hover" color="inherit" to={'/recim'}>
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Rec-IM Home
            </LinkRouter>
          ) : (
            <Typography color="text.primary">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Rec-IM Home
            </Typography>
          )}
          {activity &&
            (match || team ? (
              <LinkRouter
                className="gc360_text_link"
                underline="hover"
                color="inherit"
                to={`/recim/activity/${activity.ID}`}
              >
                {activity.Name}
              </LinkRouter>
            ) : (
              <Typography color="text.primary">{activity.Name}</Typography>
            ))}
          {team && <Typography color="text.primary">{team.Name}</Typography>}
          {match && (
            <Typography color="text.primary">
              Match: {match.Team[0]?.Name ?? '____'} vs {match.Team[1]?.Name ?? '____'}{' '}
            </Typography>
          )}
        </Breadcrumbs>
      </AppBar>
    </>
  );
};

export default Header;
