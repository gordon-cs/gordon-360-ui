import { Grid, Card, CardContent, Button } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import styles from '../Update.module.css';

const NotAlumni = () => {
  return (
    <Grid container justifyContent="center" spacing="16">
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent
            style={{
              margin: 'auto',
              textAlign: 'center',
            }}
          >
            <br />
            <h1>Update Information Unavailable</h1>
            <h4>Updating alumni info is currently available for alumni only</h4>
            <br />
            <br />
          </CardContent>
          <Grid container justifyContent="center">
            <Button
              component={Link}
              to=""
              variant="contained"
              className={styles.update_info_button}
            >
              Back To Home
            </Button>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export { NotAlumni };
