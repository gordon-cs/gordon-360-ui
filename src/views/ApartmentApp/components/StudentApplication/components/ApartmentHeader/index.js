import React from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core/';

const ApartmentHeader = ({
  applicationCardsOpen,
  applicationDetails,
  userProfile,
  onShowApplication,
}) => {
  return (
    <Card>
      <CardContent>
        <Grid container direction="row" justify="flex-end" spacing={2}>
          {applicationDetails.ApplicationID < 1 ? (
            <React.Fragment>
              <Grid item xs={6} sm={8}>
                <Typography variant="body1">
                  Placeholder Text
                  <br />
                  No existing applications found
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Button
                  variant="contained"
                  onClick={onShowApplication}
                  color="primary"
                  fullWidth
                  disabled={applicationCardsOpen}
                >
                  Create a new application
                </Button>
              </Grid>
            </React.Fragment>
          ) : userProfile.AD_Username === applicationDetails.EditorProfile.AD_Username ? (
            <React.Fragment>
              <Grid item xs={6} sm={8}>
                <Typography variant="body1">Existing application for this semester:</Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Button
                  variant="contained"
                  onClick={onShowApplication}
                  color="primary"
                  fullWidth
                  disabled={applicationCardsOpen}
                >
                  Edit your application
                </Button>
              </Grid>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Grid item xs={6} sm={8}>
                <Typography variant="body1">
                  Only the application editor may edit the application.
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Button
                  variant="contained"
                  onClick={onShowApplication}
                  color="primary"
                  fullWidth
                  disabled={applicationCardsOpen}
                >
                  View your application
                </Button>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ApartmentHeader;
