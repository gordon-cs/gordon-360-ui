import { Grid, Typography, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
                onClick={() => {
                  alert(`${poster.Title}`);
                }}
              >
                <CardMedia
                  component="img"
                  alt={poster.alt}
                  src={poster.ImagePath}
                  title={poster.Title}
                />
                <CardContent>
                  <Typography className={'test2'}>{poster.Title}</Typography>
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
