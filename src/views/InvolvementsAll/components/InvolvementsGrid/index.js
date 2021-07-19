import { Grid, Typography, Card, CardActionArea, CardMedia, CardContent } from '@material-ui/core';
import useNetworkStatus from 'hooks/useNetworkStatus';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './InvolvementsGrid.module.css';

const InvolvementsGrid = ({ involvements, sessionCode, noInvolvementsText }) => {
  const isOnline = useNetworkStatus();
  const history = useHistory();

  return (
    <Grid container direction="row" spacing={4} className="involvements-grid">
      {involvements?.length > 0 ? (
        involvements?.map((activity) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={activity.ActivityCode}>
            <Card variant="outlined">
              <CardActionArea
                onClick={() => {
                  if (isOnline) {
                    history.push(`/activity/${sessionCode}/${activity.ActivityCode}`);
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
                  <Typography className="involvement-description">
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
