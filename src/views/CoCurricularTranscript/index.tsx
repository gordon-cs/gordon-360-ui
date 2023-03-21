import { Print } from '@mui/icons-material';
import { Card, CardContent, CardHeader, Fab, Grid, Typography } from '@mui/material';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import { useUser } from 'hooks';
import { useEffect, useState } from 'react';
import transcriptService, { StudentEmployment } from 'services/transcript';
import userService, { MembershipHistory, Profile } from 'services/user';
import styles from './CoCurricularTranscript.module.css';
import Activity from './Components/CoCurricularTranscriptActivity';
import Experience from './Components/CoCurricularTranscriptExperience';

const CoCurricularTranscript = () => {
  const [loading, setLoading] = useState(true);
  const [honors, setHonors] = useState<MembershipHistory[]>([]);
  const [experiences, setExperience] = useState<MembershipHistory[]>([]);
  const [employments, setEmployments] = useState<StudentEmployment[]>([]);
  const [service, setService] = useState<MembershipHistory[]>([]);
  const [activities, setActivities] = useState<MembershipHistory[]>([]);
  const { profile, loading: loadingProfile } = useUser();

  useEffect(() => {
    const loadTranscript = async () => {
      if (!profile) return;

      setLoading(true);
      const [memberships, jobs] = await Promise.all([
        transcriptService.getMemberships(profile.AD_Username),
        transcriptService.getEmployment(),
      ]);
      const { honors, experiences, service, activities } = memberships;

      setHonors(honors);
      setExperience(experiences);
      setService(service);
      setActivities(activities);
      setEmployments(jobs);

      setLoading(false);
    };

    loadTranscript();
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
              <Typography component="h1" variant="h4">
                Gordon College Experience Transcript
              </Typography>
            }
            subheader={<SubHeader profile={profile} />}
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
                    key={activity.ActivityCode}
                    sessions={activity.Sessions}
                    description={activity.ActivityDescription}
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
                      key={activity.ActivityCode}
                      sessions={activity.Sessions}
                      description={activity.ActivityDescription}
                    />
                  ))
                  .concat(
                    employments
                      .map((employment, index) => (
                        <Experience key={index} Experience={employment} />
                      ))
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
                    key={activity.ActivityCode}
                    sessions={activity.Sessions}
                    description={activity.ActivityDescription}
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
          className={`${styles.fab} ${styles.no_print}`}
          onClick={() => window.print()}
        >
          <Print />
          Print
        </Fab>
      </Grid>
    </Grid>
  );
};

const SubHeader = ({ profile }: { profile: Profile }) => (
  <>
    <Typography component="p" variant="h6">
      {profile.fullName}
    </Typography>
    {userService.isStudent(profile) && (
      <>
        {profile.GradDate && (
          <Typography component="p" variant="h6">
            Class of {transcriptService.getGradCohort(profile.GradDate)}
          </Typography>
        )}
        {profile.Majors.length > 0 && (
          <Typography component="p" variant="h6">
            Major{profile.Majors.length > 1 ? 's' : ''}: {profile.Majors.join(', ')}
          </Typography>
        )}
        {profile.Minors.length > 0 && (
          <Typography component="p" variant="h6">
            Minor{profile.Minors.length > 1 ? 's' : ''}: {profile.Minors.join(', ')}
          </Typography>
        )}
      </>
    )}
  </>
);

export default CoCurricularTranscript;
