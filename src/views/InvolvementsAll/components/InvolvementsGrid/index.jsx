import { Grid, Typography, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useNavigate } from 'react-router-dom';
import styles from './InvolvementsGrid.module.css';

const InvolvementsGrid = ({ involvements, sessionCode, noInvolvementsText }) => {
  const isOnline = useNetworkStatus();
  const navigate = useNavigate();

  return (
    <Grid container direction="row" spacing={4} className={styles.involvements_grid}>
      {involvements?.length > 0 ? (
        involvements?.map((activity) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={activity.ActivityCode}>
            <Card variant="outlined">
              <CardActionArea
                onClick={() => {
                  if (isOnline) {
                    navigate(`/activity/${sessionCode}/${activity.ActivityCode}`);
                  }
                }}
              >
                <CardMedia
                  component="img"
                  alt={activity.ActivityDescription}
                  src={activity.ActivityImagePath}
                  title={activity.ActivityDescription}
                />
                <CardContent>
                  <Typography className={styles.involvement_description}>
                    {activity.ActivityDescription}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item>
          <Typography variant="h5" align="center">
            {noInvolvementsText}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default InvolvementsGrid;
