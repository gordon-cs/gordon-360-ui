import { gordonColors } from 'theme';

import { Typography, Grid, Button, Card, CardContent, CardHeader } from '@material-ui/core';

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
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader
            title="Advertise your club or event on the 360 Homepage!"
            titleTypographyProps={{ variant: 'h4', align: 'center' }}
            style={{
              backgroundColor: gordonColors.primary.blue,
              color: 'white',
            }}
          />
          <CardContent>
            <Grid container justifyContent="center" direction="column">
              <Grid item align="left">
                <Typography variant="h6">Banner Image Guidelines</Typography>
                <Typography variant="body2">
                  1. Attach JPG image with a resolution of 1500 by 600.
                  <br />
                  2. Text must be clearly legible.
                  <br />
                  3. Include a url that you would like the banner image to link to in your email.
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
  );
};

export default BannerSubmission;
