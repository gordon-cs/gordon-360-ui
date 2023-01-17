import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  Breadcrumbs,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import HomeIcon from '@mui/icons-material/Home';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useUser } from 'hooks';
import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import styles from './Activity.module.css';
import { MatchList, SeriesList, TeamList } from './../../components/List';
import ActivityForm from 'views/RecIM/components/Forms/ActivityForm';
import CreateTeamForm from '../../components/Forms/CreateTeamForm';
import { getActivityByID } from 'services/recim/activity';
import { Link as LinkRouter } from 'react-router-dom';
import CreateSeriesForm from 'views/RecIM/components/Forms/CreateSeriesForm';

const Activity = () => {
  const { activityID } = useParams();
  const { profile } = useUser();
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState({});
  const [openActivityForm, setOpenActivityForm] = useState(false);
  const [openCreateTeamForm, setOpenCreateTeamForm] = useState(false);
  const [openCreateSeriesForm, setOpenCreateSeriesForm] = useState(false);
  const subElementStyle = {
    marginBottom: '1em',
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setActivity(await getActivityByID(activityID));
      setLoading(false);
    };
    loadData();
  }, [activityID, openCreateTeamForm, openCreateSeriesForm, openActivityForm]);
  // ^ May be bad practice, but will refresh page on dialog close

  const handleCreateTeamForm = (status) => {
    //if you want to do something with the message make a snackbar function here
    setOpenCreateTeamForm(false);
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
                  <IconButton>
                    <EditIcon
                      onClick={() => {
                        setOpenActivityForm(true);
                      }}
                    />
                  </IconButton>
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
          {activity.Series?.length ? (
            <MatchList matches={activity.Series[0].Match} activityID={activity.ID} />
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
          {activity.Team?.length ? (
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
    // CARD - series
    let seriesCard = (
      <Card>
        <CardHeader title="Series" className={styles.cardHeader} />
        <CardContent>
          {activity.Series?.length ? (
            <SeriesList series={activity.Series} />
          ) : (
            <Typography variant="body1" paragraph>
              No series scheduled yet!
            </Typography>
          )}
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
          <Grid item direction={'column'} xs={12} md={6}>
            <Grid item style={subElementStyle}>
              {seriesCard}
            </Grid>
            <Grid item style={subElementStyle}>
              {teamsCard}
            </Grid>
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

export default Activity;
