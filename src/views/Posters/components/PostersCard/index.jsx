import { Button, Card, CardContent, CardHeader, Grid, Typography, CardMedia } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import involvementService from 'services/activity';
import InvolvementsGrid from 'views/InvolvementsAll/components/InvolvementsGrid';

//const [myInvolvements, setMyInvolvements] = useState([]);
const PostersCard = () => {
  const [event, setEvents] = useState([]);

  useEffect(() => {
    involvementService.getOpen().then(setEvents);
  }, []);
  return (
    <Card>
      <CardHeader
        title={
          <Grid container direction="row" alignItems="center">
            <Grid item xs={7} align="left">
              Upcoming Events
            </Grid>
            <Grid item xs={5} align="right">
              <Button variant="contained" color="secondary" component={Link} to="/involvements">
                My Involvements
              </Button>
            </Grid>
          </Grid>
        }
        className="gc360_header"
      />
      <CardContent>
        {event.length > 0 ? (
          <Grid item xs={6} sm={4} md={3} lg={2} key={event.ActivityCode}>
            <Card variant="outlined">
              <CardMedia
                component="img"
                alt={'no image'}
                src={event.ActivityImagePath}
                title={'Test'}
              />
              <CardContent>
                <Typography className={'test'}>{event.ActivityDescription}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          <Grid item>Testing</Grid>
        )}
      </CardContent>
    </Card>
  );
};
export default PostersCard;
