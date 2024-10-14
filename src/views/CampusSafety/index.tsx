import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Link,
} from '@mui/material';
import styles from './CampusSafety.module.scss';

const policeCard = (
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
    <CardContent className={styles.campus_safety_card}>
      <Grid container justifyContent={'center'}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Emergency?
          </Typography>
          <br />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Call Gordon Police
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            P 978-867-<b>3333</b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <br />
          <br />
          <Typography variant="h5" align="center">
            Non-Emergency Assistance:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            P 978-867-<b>4444</b>
          </Typography>
          <br />
        </Grid>

        <Link
          href="https://www.gordon.edu/police"
          underline="hover"
          className={`gc360_text_link`}
          target="_blank"
          variant="h5"
        >
          Gordon Police Resources
        </Link>
        <br />
        <br />
        <Grid item xs={12}>
          <br />
          <Divider orientation="horizontal" variant="middle" />
          <br />
          <Typography variant="h5" align="center">
            Missing Something?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <br />
          <Box textAlign={'center'}>
            <Button color="secondary" variant="contained">
              Lost and Found
            </Button>
          </Box>
          <br />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

const titleIXCard = (
  <Card className={styles.campus_safety_card}>
    <CardHeader
      className={styles.campus_safety_title}
      title="Sexual Misconduct Resources"
      titleTypographyProps={{ variant: 'h4' }}
    />
    <CardContent>
      <Grid container justifyContent={'center'}>
        <Link
          href="https://www.gordon.edu/titleix"
          underline="hover"
          className={`gc360_text_link`}
          target="_blank"
          variant="h5"
        >
          Gordon Title IX Page
        </Link>
      </Grid>
      <Grid container justifyContent={'center'}>
        <Link
          href="https://www.gordon.edu/sexualmisconduct/report"
          underline="hover"
          className={`gc360_text_link`}
          target="_blank"
          variant="h5"
        >
          File a Report
        </Link>
      </Grid>
    </CardContent>
  </Card>
);

const healthCenterCard = (
  <Card className={styles.campus_safety_card}>
    <CardHeader
      className={styles.campus_safety_title}
      title="Health Center"
      titleTypographyProps={{ variant: 'h4' }}
    />
    <CardContent>
      <Grid container justifyContent={'center'}>
        <Link
          href="https://www.gordon.edu/healthcenter"
          underline="hover"
          className={`gc360_text_link`}
          target="_blank"
          variant="h5"
          align="center"
        >
          Health Center Resources
        </Link>
      </Grid>
    </CardContent>
  </Card>
);

const counselingCenterCard = (
  <Card className={styles.campus_safety_card}>
    <CardHeader
      className={styles.campus_safety_title}
      title="Counseling Center"
      titleTypographyProps={{ variant: 'h4' }}
    />
    <CardContent>
      <Grid container justifyContent={'center'}>
        <Link
          href="https://www.gordon.edu/counselingwellness"
          underline="hover"
          className={`gc360_text_link`}
          target="_blank"
          variant="h5"
        >
          Counseling Center Resources
        </Link>
      </Grid>
    </CardContent>
  </Card>
);

const chapelOfficeCard = (
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
);

const CampusSafety = () => {
  return (
    <Grid className={styles.campus_safety} container justifyContent={'center'}>
      <Grid item xs={12} lg={10}>
        <Card className={styles.campus_safety_card}>
          <CardHeader
            className={styles.campus_safety_title}
            title={
              <div>
                <b>Gordon</b> Campus Safety Resources
              </div>
            }
            titleTypographyProps={{ variant: 'h4' }}
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={5}>
        {policeCard}
        {healthCenterCard}
      </Grid>
      <Grid item xs={12} md={6} lg={5}>
        {counselingCenterCard}
        {titleIXCard}
        {chapelOfficeCard}
      </Grid>
    </Grid>
  );
};

export default CampusSafety;
