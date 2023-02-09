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
      const { honors, experiences, service, activities } = await transcriptService.getMemberships(
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

  const majors = [
    profile.Major1Description,
    profile.Major2Description,
    profile.Major3Description,
  ].filter(Boolean);
  const minors = [
    profile.Minor1Description,
    profile.Minor2Description,
    profile.Minor3Description,
  ].filter(Boolean);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={10} xl={8}>
        <Card elevation={10}>
          <CardHeader
            title={
              <Typography component="h1" variant="h4">
                Gordon College Experience Transcript
              </Typography>
            }
            subheader={
              <>
                <Typography component="p" variant="h6">
                  {profile.fullName}
                </Typography>
                {profile.GradDate && (
                  <Typography component="p" variant="h6">
                    Class of {transcriptService.getGradCohort(profile.GradDate)}
                  </Typography>
                )}
                {majors.length > 0 && (
                  <Typography component="p" variant="h6">
                    Major{majors.length > 1 ? 's' : ''}: {majors.join(', ')}
                  </Typography>
                )}
                {minors.length > 0 && (
                  <Typography component="p" variant="h6">
                    Minor{minors.length > 1 ? 's' : ''}: {minors.join(', ')}
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
                    key={activity.ActivityCode}
                    sessions={activity.Sessions}
                    description={activity.ActivityDescription}
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
