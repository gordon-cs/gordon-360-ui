import { Typography, Card, CardContent, CardHeader, Grid, Link } from '@mui/material';
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
              <Link
                href="https://www.gordon.edu/police"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
                variant="h5"
              >
                Gordon Police Resources
              </Link>
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
              <Link
                href="https://www.gordon.edu/healthcenter"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
                variant="h5"
              >
                Health Center Resources
              </Link>
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
              <Link
                href="https://www.gordon.edu/titleix"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
                variant="h5"
              >
                Gordon Title IX Page
              </Link>
              <br />
              <Link
                href="https://www.gordon.edu/sexualmisconduct/report"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
                variant="h5"
              >
                File a Report
              </Link>
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
              <Link
                href="https://www.gordon.edu/counselingwellness"
                underline="hover"
                className={`gc360_text_link`}
                target="_blank"
                variant="h5"
              >
                Counseling Center Resources
              </Link>
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
