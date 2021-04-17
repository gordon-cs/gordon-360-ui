import React from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core/';

const ApartmentHeader = ({
  applicationCardsOpen,
  applicationID,
  editorUsername,
  userProfile,
  onShowApplication,
}) => {
  const headerContent = !applicationID
    ? {
        primaryText: 'You are not on any applications for the current semester.',
        secondaryText: 'Click the button to begin a new application.',
        buttonLabel: 'Create a new application',
      }
    : userProfile.AD_Username === editorUsername
    ? {
        primaryText: 'You are on an existing application for this semester.',
        secondaryText: "Click the button to edit your group's application.",
        buttonLabel: 'Edit your application',
      }
    : {
        primaryText:
          'You are on an existing application for this semester, but you are not assigned as the editor.',
        secondaryText: 'Only the application editor may edit the application.',
        buttonLabel: 'View your application',
      };

  return (
    <Card>
      <CardContent>
        <Grid container direction="row" justify="flex-end" spacing={2}>
          <Grid item xs={6} sm={8}>
            <Typography variant="body1">
              {headerContent.primaryText}
              <br />
              {headerContent.secondaryText}
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
              {headerContent.buttonLabel}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ApartmentHeader;
