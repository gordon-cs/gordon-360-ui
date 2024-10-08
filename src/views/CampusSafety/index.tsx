import { Typography, Card, CardContent, CardHeader, Grid } from '@mui/material';
import styles from './CampusSafety.module.scss';

const CampusSafety = () => {
  return (
    <Grid className={styles.campus_safety} container justifyContent={'center'}>
      <Grid item xs={12} lg={10}>
        <Card className={styles.campus_safety_card}>
          <CardHeader
            className={styles.campus_safety_title}
            title="Campus Safety Resources"
            titleTypographyProps={{ variant: 'h4' }}
          />
        </Card>
      </Grid>
      <Grid item xs={12} lg={5}>
        <Grid item xs={12} lg={12}>
          <Card className={styles.campus_safety_card}>
            <CardHeader
              className={styles.campus_safety_title}
              title={
                <div>
                  <b> Gordon </b>Police
                </div>
              }
              titleTypographyProps={{ variant: 'h4' }}
            />
            <CardContent>
              <Typography variant="body1">Gordon Police Resources</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Card className={styles.campus_safety_card}>
            <CardHeader
              className={styles.campus_safety_title}
              title={
                <div>
                  <b> Health </b>Center
                </div>
              }
              titleTypographyProps={{ variant: 'h4' }}
            />
            <CardContent>
              <Typography variant="body1">Health Center Resources</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={5}>
        <Grid item xs={12} lg={12}>
          <Card className={styles.campus_safety_card}>
            <CardHeader
              className={styles.campus_safety_title}
              title={'Title IX'}
              titleTypographyProps={{ variant: 'h4' }}
            />
            <CardContent>
              <Typography variant="body1">Title IX Resources</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Card className={styles.campus_safety_card}>
            <CardHeader
              className={styles.campus_safety_title}
              title={
                <div>
                  <b> Counseling </b>Center
                </div>
              }
              titleTypographyProps={{ variant: 'h4' }}
            />
            <CardContent>
              <Typography variant="body1">Counseling Center Resources</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Card className={styles.campus_safety_card}>
            <CardHeader
              className={styles.campus_safety_title}
              title={
                <div>
                  <b> Chapel </b>Office
                </div>
              }
              titleTypographyProps={{ variant: 'h4' }}
            />
            <CardContent>
              <Typography variant="body1">Chapel Office Resources</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CampusSafety;
