import { Grid, Typography, Card, CardHeader, CardContent, Button } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useUser } from 'hooks';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import styles from './Activity.module.css';
import { MatchList, TeamList } from './../../components/List';
import CreateTeamForm from '../../components/Forms/CreateTeamForm';
import { getActivityByID } from 'services/recim/activity';

const Activity = () => {
  const { activityID } = useParams();
  const { profile } = useUser();
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
  }, [activityID, openCreateTeamForm]);
  // ^ May be bad practice, but will refresh page on dialog close

  const handleCreateTeamForm = (status) => {
    //if you want to do something with the message make a snackbar function here
    setOpenCreateTeamForm(false);
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
    // CARD - schedule
    let scheduleCard = (
      <Card>
        <CardHeader title="Schedule" className={styles.cardHeader} />
        <CardContent>
          {activity.Series[0].Match ? (
            <MatchList matches={activity.Series[0].Match} />
          ) : (
            <Typography variant="body1" paragraph>
              Games have not yet been scheduled.
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
          {activity.Team.length !== 0 ? (
            <TeamList teams={activity.Team} />
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
      <>
        <Grid container alignItems="center" className={styles.activityHeader}>
          <Grid item>
            <img src={''} alt="Activity Icon" width="85em"></img>
          </Grid>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Grid item>
            <Typography variant="h5">Activity Name</Typography>
            <Typography variant="body" className={styles.grayText}>
              <i>Description of activity</i>
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={2}>
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
      </>
    );
  }
};

export default Activity;
