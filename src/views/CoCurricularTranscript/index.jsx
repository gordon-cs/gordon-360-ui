import { Print } from '@mui/icons-material';
import { Card, CardContent, CardHeader, Fab, Grid, Typography } from '@mui/material';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import { useUser } from 'hooks';
import { useEffect, useState } from 'react';
import transcriptService from 'services/transcript';
import styles from './CoCurricularTranscript.module.css';
import Activity from './Components/CoCurricularTranscriptActivity';
import Experience from './Components/CoCurricularTranscriptExperience';

const CoCurricularTranscript = () => {
  const [loading, setLoading] = useState(true);
  const [honors, setHonors] = useState([]);
  const [experiences, setExperience] = useState([]);
  const [employments, setEmployments] = useState([]);
  const [service, setService] = useState([]);
  const [activities, setActivities] = useState([]);
  const { profile, loading: loadingProfile } = useUser();

  useEffect(() => {
    const loadTranscript = async () => {
      setLoading(true);
      const { honors, experiences, service, activities } = transcriptService.getMemberships(
        profile.AD_Username,
      );

      const jobs = await transcriptService.getEmployment();

      setHonors(honors);
      setExperience(experiences);
      setService(service);
      setActivities(activities);
      setEmployments(jobs);

      setLoading(false);
    };
    if (profile) {
      loadTranscript();
    }
  }, [profile]);

  if (loading || loadingProfile) {
    return <GordonLoader />;
  }

  if (!profile) {
    return <GordonUnauthorized feature={'your experience transcript'} />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={10} xl={8}>
        <Card elevation={10}>
          <CardHeader
            title={
              <Typography component="h1" variant="h5">
                Gordon College Experience Transcript
              </Typography>
            }
            subheader={
              <>
                <Typography component="p" variant="subtitle1">
                  {profile.fullName}
                </Typography>
                {profile.GradDate && (
                  <Typography component="p" variant="subtitle1">
                    Class of {transcriptService.getGradCohort(profile.GradDate)}
                  </Typography>
                )}
                {profile.Majors && (
                  <Typography component="p" variant="subtitle1">
                    Major{profile.Majors.length > 1 ? 's' : ''}: {profile.Majors.join(', ')}
                  </Typography>
                )}
                {profile.Minors && (
                  <Typography component="p" variant="subtitle1">
                    Minor{profile.Minors.length > 1 ? 's' : ''}: {profile.Minors.join(', ')}
                  </Typography>
                )}
              </>
            }
            disableTypography
          />
          <CardContent>
            {honors.length > 0 && (
              <>
                <Typography variant="h6" component="h2">
                  <b>Honors, Leadership, and Research</b>
                </Typography>
                {honors.map((activity) => (
                  <Activity
                    key={activity.activityCode}
                    sessions={activity.session}
                    leaderSessions={activity.leaderSessions}
                    description={activity.activityDescription}
                  />
                ))}
              </>
            )}
            {(experiences.length > 0 || employments.length > 0) && (
              <>
                <Typography variant="h6" component="h2">
                  <b>Experience</b>
                </Typography>
                {experiences
                  .map((activity) => (
                    <Activity
                      key={activity.activityCode}
                      sessions={activity.sessions}
                      leaderSessions={activity.leaderSessions}
                      description={activity.activityDescription}
                    />
                  ))
                  .concat(
                    employments
                      .map((employment) => <Experience Experience={employment} />)
                      .reverse(),
                  )}
              </>
            )}
            {service.length > 0 && (
              <>
                <Typography variant="h6" component="h2">
                  <b>Service Learning</b>
                </Typography>
                {service.map((activity) => (
                  <Activity
                    key={activity.activityCode}
                    sessions={activity.sessions}
                    leaderSessions={activity.leaderSessions}
                    description={activity.activityDescription}
                  />
                ))}
              </>
            )}
            {activities.length > 0 && (
              <>
                <Typography variant="h6" component="h2">
                  <b>Activities</b>
                </Typography>

                {activities.map((activity) => (
                  <Activity
                    key={activity.activityCode}
                    sessions={activity.sessions}
                    leaderSessions={activity.leaderSessions}
                    description={activity.activityDescription}
                  />
                ))}
              </>
            )}
          </CardContent>
        </Card>
        <Fab
          color="primary"
          variant="extended"
          className={[styles.fab, styles.no_print]}
          onClick={() => window.print()}
        >
          <Print />
          Print
        </Fab>
      </Grid>
    </Grid>
  );
};

export default CoCurricularTranscript;
