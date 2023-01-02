import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  Breadcrumbs,
} from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import HomeIcon from '@mui/icons-material/Home';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useUser } from 'hooks';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import styles from './Activity.module.css';
import { MatchList, TeamList } from './../../components/List';
import CreateTeamForm from '../../components/Forms/CreateTeamForm';
import { getActivityByID } from 'services/recim/activity';
import { Link as LinkRouter } from 'react-router-dom';

const Activity = () => {
  const { activityID } = useParams();
  const { profile /* profileLoading */ } = useUser();
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState({});
  const [openCreateTeamForm, setOpenCreateTeamForm] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      setActivity(await getActivityByID(activityID));
      setLoading(false);
    };
    loadData();
  }, [activityID]);

  const handleCreateTeamForm = (status) => {
    //if you want to do something with the message make a snackbar function here
    setOpenCreateTeamForm(false);
  };

  console.log('activity', activity);

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
        <CardContent>
          {/* if there are games scheduled, map them here */}
          <MatchList matches={[{ activityID: '1', ID: '789' }]} />
          {/* else "no schedule yet set" */}
          <Typography variant="body1" paragraph>
            Games have not yet been scheduled.
          </Typography>
        </CardContent>
      </Card>
    );

    // CARD - teams
    let teamsCard = (
      <Card>
        <CardHeader title="Teams" className={styles.cardHeader} />
        <CardContent>
          {activity.Team ? (
            <TeamList teams={activity.Team} activityID={activityID} />
          ) : (
            <Typography variant="body1" paragraph>
              Be the first to create a team!
            </Typography>
          )}
          <Grid container justifyContent="center">
            <Button
              variant="contained"
              color="warning"
              startIcon={<AddCircleRoundedIcon />}
              className={styles.actionButton}
              onClick={() => {
                setOpenCreateTeamForm(true);
              }}
            >
              Create a New Team
            </Button>
          </Grid>
        </CardContent>
      </Card>
    );

    return (
      <Grid container spacing={2}>
        <Grid item alignItems="center" xs={12}>
          {activityHeader}
        </Grid>
        <Grid item container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={6}>
            {scheduleCard}
          </Grid>
          <Grid item xs={12} md={6}>
            {teamsCard}
          </Grid>
        </Grid>
        {openCreateTeamForm ? (
          <CreateTeamForm
            closeWithSnackbar={(status) => {
              handleCreateTeamForm(status);
            }}
            openCreateTeamForm={openCreateTeamForm}
            setOpenCreateTeamForm={(bool) => setOpenCreateTeamForm(bool)}
            activityID={activityID}
          />
        ) : null}
        <Typography>Activity ID: {activityID} (testing purposes only)</Typography>
      </Grid>
    );
  }
};

export default Activity;
