import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  DialogContentText,
  CardMedia,
  Grid,
  Link,
  List,
  TextField,
  Typography,
} from '@mui/material';
import DATA from 'views/Posters/dummy-posters/dummyposters.jsx';

const ClubPosters = ({ clubName, clubCode }) => {
  let pizzaSlice = [];
  for (var i = 0; i < DATA.length; i++) {
    if (DATA[i].org == clubCode) {
      pizzaSlice.push(DATA[i]);
    }
  }

  return (
    <Card elevation={0}>
      <CardHeader
        title={`Posters from ${clubName}`}
        className="gc360_header"
        style={{ marginLeft: 0, width: '125%' }}
      />
      <CardContent>
        <Grid container direction="row" spacing={4} className={'test1'}>
          {pizzaSlice?.length > 0 ? (
            pizzaSlice.map((item) => (
              <Grid item xs={6} sm={4} md={3} lg={3} key={item.key}>
                <Card variant="outlined" elevation={0}>
                  <CardActionArea component={Link} to="/Page404">
                    <CardMedia
                      loading="lazy"
                      component="img"
                      alt={item.alt}
                      src={item.image}
                      title={item.title}
                      description={item.desc}
                    />
                    <CardContent>
                      <Typography className={'Poster Title'} variant="h6" fontWeight="bold">
                        {item.title}
                      </Typography>
                      <Typography
                        className={'Poster Description'}
                        variant="body2"
                        fontStyle="italic"
                        fontWeight="light"
                      >
                        {item.desc}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item>
              <Typography variant="h5" align="center">
                {'No Posters to Show for this involvement'}
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
    //Gonna need to filter for strictly individual club events
  );
};

export default ClubPosters;
