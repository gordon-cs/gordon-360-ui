import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  CardMedia,
  CardActionArea,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import UploadForm from './Forms/UploadForm/Form';
import DATA from './dummy-posters/dummyposters';

const Posters = () => {
  const [openUploadForm, setOpenUploadForm] = useState(false);

  const pizzaSlice = DATA.slice(0, 2);

  return (
    <Grid container justifyContent="center" spacing={4}>
      <Dialog open={openUploadForm} onClose={() => setOpenUploadForm(false)}>
        <DialogTitle>Upload Poster</DialogTitle>
        <DialogContent>
          <UploadForm onClose={() => setOpenUploadForm(false)} />
        </DialogContent>
      </Dialog>

      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader
            title={
              <Grid container direction="row" alignItems="center">
                <Grid item xs={7} align="left">
                  My Upcoming Club Events
                </Grid>
                <Grid item xs={5} align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setOpenUploadForm(true)}
                  >
                    Upload Poster
                  </Button>
                </Grid>
              </Grid>
            }
            className="gc360_header"
          />
          <CardContent>
            <Grid container direction="row" spacing={4} className={'test1'}>
              {pizzaSlice.map((item) => (
                <Grid item xs={6} sm={4} md={3} lg={3} key={item.key}>
                  <Card variant="outlined">
                    <CardActionArea component="div">
                      <CardMedia
                        loading="lazy"
                        component="img"
                        alt={item.alt}
                        src={item.image}
                        title={item.title}
                      />
                      <CardContent>
                        <Typography className={'Poster Title'}>{item.title}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader title="All Posters" className="gc360_header" />
          <CardContent>
            <Grid container direction="row" spacing={4}>
              {DATA.map((item) => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={item.key}>
                  <Card variant="outlined">
                    <CardActionArea component="div">
                      <CardMedia
                        loading="lazy"
                        component="img"
                        alt={item.alt}
                        src={item.image}
                        title={item.title}
                      />
                      <CardContent>
                        <Typography className={'Poster Title'}>{item.title}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Posters;
