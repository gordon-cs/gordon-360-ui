import { Grid, Typography, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useNavigate } from 'react-router-dom';
import styles from './InvolvementsGrid.module.css';

const getRole = (activity, myInvolvements) => {
  const match = myInvolvements?.find((inv) => inv.ActivityCode === activity.ActivityCode);
  if (!match) return null;
  switch (
    match.Participation // Adds status of involvements
  ) {
    case 'LEAD':
      return 'Leader';
    case 'ADV':
      return 'Advisor';
    case 'MEMBR':
      return 'Member';
    case 'GUEST':
      return 'Subscriber';
    default:
      return null;
  }
};

const InvolvementsGrid = ({
  involvements,
  sessionCode,
  noInvolvementsText,
  myInvolvements = [],
}) => {
  const isOnline = useNetworkStatus();
  const navigate = useNavigate();

  return (
    <Grid container direction="row" spacing={4} className={styles.involvements_grid}>
      {involvements?.length > 0 ? (
        involvements?.map((activity) => {
          const role = getRole(activity, myInvolvements);
          return (
            <Grid item xs={6} sm={4} md={3} lg={3} key={activity.ActivityCode}>
              <Card variant="outlined">
                <CardActionArea
                  onClick={() => {
                    if (isOnline) {
                      navigate(`/activity/${sessionCode}/${activity.ActivityCode}`);
                    }
                  }}
                >
                  <CardMedia
                    loading="lazy"
                    component="img"
                    alt={activity.ActivityDescription}
                    src={activity.ActivityImagePath}
                    title={activity.ActivityDescription}
                  />
                  <CardContent>
                    <Typography className={styles.involvement_description}>
                      {activity.ActivityDescription}
                    </Typography>
                    {role && (
                      <Typography variant="subtitle2" color="warning" sx={{ fontStyle: 'italic' }}>
                        {role}
                      </Typography>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })
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
