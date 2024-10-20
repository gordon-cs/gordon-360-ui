import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Header from '../../components/Header';
import styles from './LostAndFound.module.css';

const LostAndFound = () => {
  return (
    <>
      <Header></Header>
      <Grid container justifyContent="center">
        <Grid item sm={10}>
          <Card className={styles.card}>
            <CardHeader className={styles.title} title="Gordon Lost and Found"></CardHeader>
            <CardContent>
              <Grid container>
                <Grid item sm={0.5}>
                  <InfoOutlinedIcon />
                </Grid>
                <Grid item sm={10}>
                  <Typography variant="h5">Gordon Police manages campus lost & found</Typography>
                  <br />
                  <Typography variant="body1">
                    Police staff will view reports, and you will be notified if your item is found.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default LostAndFound;
