import React from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core/';

const ApartmentHeader = ({
  applicationCardsOpen,
  applicationID,
  editorUsername,
  userProfile,
  onShowApplication,
}) => {
  const newApplicationContent = (
    <React.Fragment>
      <Grid item xs={6} sm={8}>
        <Typography variant="body1">
          You are not on any applications for the current semester.
          <br />
          Click the button to begin a new application.
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
  );

  const editApplicationContent = (
    <React.Fragment>
      <Grid item xs={6} sm={8}>
        <Typography variant="body1">
          You are on an existing application for this semester.
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
          Edit your application
        </Button>
      </Grid>
    </React.Fragment>
  );

  const viewApplicationContent = (
    <React.Fragment>
      <Grid item xs={6} sm={8}>
        <Typography variant="body1">
          You are on an existing application for this semester, but you are not assigned as the
          editor.
          <br />
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
  );

  return (
    <Card>
      <CardContent>
        <Grid container direction="row" justify="flex-end" spacing={2}>
          {!applicationID
            ? newApplicationContent
            : userProfile.AD_Username === editorUsername
            ? editApplicationContent
            : viewApplicationContent}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ApartmentHeader;
