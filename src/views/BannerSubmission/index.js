import React from 'react';
import { gordonColors } from 'theme';
import './banner.css';

import { Typography, Grid, Button, Card, CardContent } from '@material-ui/core';

const style = {
  color: gordonColors.primary.blue,

  uploadButton: {
    background: gordonColors.primary.cyan,
    color: 'white',
    marginTop: '20px',
  },
};

const BannerSubmission = () => {
  return (
    <section>
      <Grid container justify="center">
        <Grid item xs={12} md={12} lg={8}>
          <br />
          <hr style={style} />
          <Typography variant="h4" gutterBottom align="center">
            Advertise your club or event on the 360 Homepage!
          </Typography>
          <hr style={style} />
          <br />
          <Card>
            <CardContent>
              <Grid container justify="center" direction="column">
                <Grid item align="center">
                  <Typography align="center" variant="h6">
                    Banner Image Guidelines
                  </Typography>
                  <Typography align="left" variant="body2" style={style.instructionsText}>
                    <br />
                    1. Attach JPG image with a resolution of 1500 by 600 <br />
                    2. Text must be clearly legible <br />
                    3. Include a url that you would like the banner image to link to in your email.{' '}
                    <br />
                    4. All banner images must be approved. There is limited space, so not all images
                    will be.
                  </Typography>
                </Grid>
                <Grid item align="center">
                  <a href="mailto:360@gordon.edu?Subject=Banner Image Submission">
                    <Button variant="contained" style={style.uploadButton}>
                      Email the 360 Team
                    </Button>
                  </a>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </section>
  );
};

export default BannerSubmission;
