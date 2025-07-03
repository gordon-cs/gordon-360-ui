import { Grid, Typography, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';

const PostersGrid = ({ posters, sessionCode, noPostersText }) => {
  return (
    <Grid container direction="row" spacing={4}>
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
                  <Typography>{poster.Title}</Typography>
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
