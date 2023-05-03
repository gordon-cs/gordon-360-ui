import { Print } from '@mui/icons-material';
import { Card, CardContent, CardHeader, Fab, Grid, Typography } from '@mui/material';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import { useUser } from 'hooks';
import { useEffect, useState } from 'react';
import transcriptService, { TranscriptItems } from 'services/transcript';
import userService, { Profile } from 'services/user';
import styles from './CoCurricularTranscript.module.css';
import Activity from './Components/Activity';
import Experience from './Components/Experience';
import { gordonColors } from 'theme';

const SectionTitle: { [Key in keyof TranscriptItems]: string } = {
  experiences: 'Experiences',
  activities: 'Activities',
  honors: 'Honors, Leadership, and Research',
  service: 'Service Learning',
};

const CoCurricularTranscript = () => {
  const [loading, setLoading] = useState(true);
  const [transcriptItems, setTranscriptItems] = useState<TranscriptItems | undefined>();
  const { profile, loading: loadingProfile } = useUser();

  useEffect(() => {
    const loadTranscript = async () => {
      if (!profile) return;

      setLoading(true);

      await transcriptService.getItems(profile.AD_Username).then(setTranscriptItems);

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
    <Grid container justifyContent="center" marginBottom={3}>
      <Grid item xs={12} lg={10} xl={8}>
        <Grid>
          <Card>
            <CardHeader
              title={
                <Typography component="h1" variant="h5">
                  Gordon College Experience Transcript
                </Typography>
              }
              style={{
                backgroundColor: gordonColors.primary.blue,
                color: gordonColors.neutral.grayShades[50],
                textAlign: 'center',
              }}
            />
          </Card>
        </Grid>
        <Card className={styles.transcript_card}>
          <CardHeader subheader={<SubHeader profile={profile} />} disableTypography />
          <CardContent>
            {transcriptItems &&
              Object.entries(transcriptItems).map(
                ([key, items]) =>
                  items.length > 0 && (
                    <>
                      <Typography variant="h6" component="h2">
                        <b>{SectionTitle[key as keyof TranscriptItems]}</b>
                      </Typography>
                      {items.map((activity) =>
                        'Sessions' in activity ? (
                          <Activity
                            key={activity.ActivityCode}
                            sessions={activity.Sessions}
                            description={activity.ActivityDescription}
                          />
                        ) : (
                          <Experience
                            Experience={activity}
                            key={activity.Job_Title + activity.Job_Start_Date}
                          />
                        ),
                      )}
                    </>
                  ),
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
    <Typography component="p" variant="h6" fontWeight={'bold'}>
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
            <b>Major{profile.Majors.length > 1 ? 's' : ''}:</b> {profile.Majors.join(', ')}
          </Typography>
        )}
        {profile.Minors.length > 0 && (
          <Typography component="p" variant="h6">
            <b>Minor{profile.Minors.length > 1 ? 's' : ''}:</b> {profile.Minors.join(', ')}
          </Typography>
        )}
      </>
    )}
  </>
);

export default CoCurricularTranscript;
