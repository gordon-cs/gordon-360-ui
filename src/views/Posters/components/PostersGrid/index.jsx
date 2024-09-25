import { Grid, Typography, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
//import styles from './InvolvementsGrid.module.css';
//import GordonLoader from 'components/loader'

const PostersGrid = ({ posters, sessionCode, noPostersText }) => {
  const isOnline = useNetworkStatus();
  const navigate = useNavigate();

  return (
    <Grid container direction="row" spacing={4} className={'test1'}>
      {posters?.length > 0 ? (
        posters?.map((poster) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={poster.key}>
            <Card variant="outlined">
              <CardActionArea
                // component={Link} to="/activity/"
                onClick={() => {
                  // if (isOnline) {
                  //   navigate(`/activity/${sessionCode}/${activity.ActivityCode}`);
                  // }
                  alert(`${poster.title}`);
                }}
              >
                <CardMedia
                  component="img"
                  alt={poster.alt}
                  src={poster.image}
                  title={poster.title}
                />
                <CardContent>
                  <Typography className={'test2'}>{poster.title}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item>
          <Typography variant="h5" align="center">
            {noPostersText}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default PostersGrid;
