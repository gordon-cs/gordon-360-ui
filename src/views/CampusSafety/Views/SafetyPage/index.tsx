import { Typography, Card, CardContent, CardHeader, Grid, Link } from '@mui/material';
import Header from '../../components/Header';
import styles from './SafetyPage.module.scss';

const policeCard = (
  <Card className={styles.campus_safety_card}>
    <CardHeader
      className={styles.campus_safety_title}
      title="Gordon Police"
      titleTypographyProps={{ variant: 'h4' }}
    />
    <CardContent className={styles.campus_safety_card}>
      <Typography variant="h5" align="center" gutterBottom={true} display="block">
        Emergency?
      </Typography>
      <br />
      <Typography variant="h5" align="center">
        Call Gordon Police
      </Typography>
      <Typography variant="h5" align="center">
        P 978-867-<b>3333</b>
      </Typography>
      <br />
      <br />
      <Typography variant="h5" align="center">
        Non-Emergency Assistance:
      </Typography>
      <Typography variant="h5" align="center">
        P 978-867-<b>4444</b>
      </Typography>
      <br />
      <hr />
      <br />
      <Grid container justifyContent={'center'}>
        <Link
          href="https://www.gordon.edu/police"
          underline="hover"
          className={`gc360_text_link`}
          target="_blank"
          variant="h5"
        >
          Gordon Police Resources
        </Link>
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
      <br />
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
      <br />
      <Grid container justifyContent={'center'}>
        <Link
          href="https://counseling.gordon.edu/TitaniumWeb/WCMenu.aspx"
          underline="hover"
          className={`gc360_text_link`}
          target="_blank"
          variant="h5"
        >
          Request Services
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
      <Grid container justifyContent={'center'}>
        <Link
          href="https://www.gordon.edu/chapel"
          underline="hover"
          className={`gc360_text_link`}
          target="_blank"
          variant="h5"
          align="center"
        >
          Chapel Information
        </Link>
      </Grid>
    </CardContent>
  </Card>
);

const SafetyPage = () => {
  return (
    <>
      <Header safetyPage={true}></Header>
      <Grid className={styles.campus_safety} container justifyContent={'center'}>
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
    </>
  );
};

export default SafetyPage;
