import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './LostAndFoundCard.module.scss';
import { Launch, NotListedLocation, WhereToVote } from '@mui/icons-material';
import ActiveReports from './components/ActiveReports';
import FoundReports from './components/FoundReports';

const LostAndFoundCard = () => {
  return (
    <>
      <Card>
        <CardHeader
          title={
            <Link to="/lostandfound">
              <Grid container direction="row">
                <Grid item xs={7}>
                  Lost and Found
                </Grid>
                <Grid container direction="row" justifyContent={'flex-end'} item xs={5}>
                  <Launch color="secondary" />
                </Grid>
              </Grid>
            </Link>
          }
          className={`gc360_header ${styles.linkHeader}`}
        />
        <CardContent>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/lostandfound/missingitemform"
                className={styles.button}
              >
                <NotListedLocation />
                Report Lost
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/lostandfound/reportfound"
                className={styles.button}
              >
                <WhereToVote />
                Report Found
              </Button>
            </Grid>
          </Grid>
          <FoundReports />
          <Card>
            <CardHeader title="My Reports" />
          </Card>
          <ActiveReports />
        </CardContent>
      </Card>
    </>
  );
};

export default LostAndFoundCard;
