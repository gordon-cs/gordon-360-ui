import { Print } from '@mui/icons-material';
import { Card, CardContent, CardHeader, Fab, Grid, Typography } from '@mui/material';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import { useUser } from 'hooks';
import { useEffect, useState } from 'react';
import membershipService, { NonGuestParticipations } from 'services/membership';
import transcriptService from 'services/transcript';
import user from 'services/user';
import styles from './CoCurricularTranscript.module.css';
import Activity from './Components/CoCurricularTranscriptActivity';
import Experience from './Components/CoCurricularTranscriptExperience';

const CoCurricularTranscript = () => {
  const [loading, setLoading] = useState(true);
  const [categorizedMemberships, setCategorizedMemberships] = useState();
  const { profile, loading: loadingProfile } = useUser();

  useEffect(() => {
    const loadTranscript = async () => {
      setLoading(true);
      try {
        const memberships = await membershipService.get({
          username: profile.AD_Username,
          participationTypes: NonGuestParticipations,
        });
        const categorizedMemberships = transcriptService.filterMemberships(memberships);
        categorizedMemberships.experience.employments = await user.getEmploymentInfo();

        setCategorizedMemberships(categorizedMemberships);
      } catch (error) {
        this.setState({ error });
      }

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

  const otherInvolvements = categorizedMemberships.activities.length > 0;
  const honorsLeadership = categorizedMemberships.honors.length > 0;
  const serviceLearning = categorizedMemberships.service.length > 0;
  const experiences =
    categorizedMemberships.experience.experiences.length > 0 ||
    categorizedMemberships.experience.employments.length > 0;

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
            {honorsLeadership && (
              <>
                <Typography variant="h6" component="h2">
                  <b>Honors, Leadership, and Research</b>
                </Typography>
                {transcriptService
                  .groupActivityByCode(categorizedMemberships.honors)
                  .map((activity) => (
                    <Activity {...activity} />
                  ))}
              </>
            )}
            {experiences && (
              <>
                <Typography variant="h6" component="h2">
                  <b>Experience</b>
                </Typography>
                {transcriptService
                  .groupActivityByCode(categorizedMemberships.experience.experiences)
                  .map((activity) => <Activity {...activity} />)
                  .concat(
                    categorizedMemberships.experience.employments
                      .map((employment) => <Experience Experience={employment} />)
                      .reverse(),
                  )}
              </>
            )}
            {serviceLearning && (
              <>
                <Typography variant="h6" component="h2">
                  <b>Service Learning</b>
                </Typography>
                {transcriptService
                  .groupActivityByCode(categorizedMemberships.service)
                  .map((activity) => (
                    <Activity {...activity} />
                  ))}
              </>
            )}
            {otherInvolvements && (
              <>
                <Typography variant="h6" component="h2">
                  <b>Activities</b>
                </Typography>

                {transcriptService
                  .groupActivityByCode(categorizedMemberships?.activities)
                  .map((activity) => (
                    <Activity {...activity} />
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
