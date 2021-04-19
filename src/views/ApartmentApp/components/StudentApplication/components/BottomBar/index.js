import React from 'react';
import { Backdrop, Button, Card, CardContent, Grid, Typography } from '@material-ui/core/';
import GordonLoader from '../../../../../../components/Loader';
import GordonDialogBox from '../../../../../../components/GordonDialogBox';
import SaveButton from './components/SaveButton';

const submitAlertText = (
  <span>
    This feature is not yet implemented.
    <br />
    Clicking the "Accept" button will simply hide the application cards.
  </span>
);

const BottomBar = ({
  applicationCardsOpen,
  applicationID,
  canEditApplication,
  disableSubmit,
  editorUsername,
  saving,
  submitDialogOpen,
  unsavedChanges,
  onCloseDialog,
  onCloseOkay,
  onSaveButtonClick,
  onShowApplication,
  onSubmitAppAccepted,
  onSubmitButtonClick,
}) => {
  let dynamicContent = {
    primaryText: '',
    secondaryText: '',
    openCardsButtonLabel: 'Open application',
    itemProps: {},
  };

  if (!applicationCardsOpen) {
    if (!applicationID) {
      dynamicContent = {
        primaryText: 'You are not on any applications for the current semester.',
        secondaryText: 'Click the button to begin a new application.',
        openCardsButtonLabel: 'Create a new application',
      };
    } else if (canEditApplication) {
      dynamicContent = {
        primaryText: 'You are on an existing application for this semester.',
        secondaryText: "Click the button to edit your group's application.",
        openCardsButtonLabel: 'Edit your application',
      };
    } else {
      dynamicContent = {
        primaryText:
          'You are on an existing application for this semester, but you are not assigned as the editor.',
        secondaryText: 'Only the application editor may edit the application.',
        openCardsButtonLabel: 'View your application',
      };
    }
  } else {
    if (saving === 'failed') {
      dynamicContent = {
        primaryText: 'Something went wrong while trying to save the application.',
        itemProps: {
          variant: 'overline',
          color: 'error',
        },
      };
    } else if (!applicationID) {
      // TODO: Improve the wording/phrasing of this primaryText
      dynamicContent = {
        primaryText: 'This application has not yet been saved',
      };
    } else if (unsavedChanges) {
      dynamicContent = { primaryText: 'You have unsaved changes.' };
    } else {
      dynamicContent = { primaryText: 'All changes to be saved.' };
    }
  }

  return (
    <Card className={'sticky-page-bottom-bar'} variant="outlined">
      <CardContent>
        <Grid container direction="row" justify="flex-end" spacing={2}>
          <Grid item xs={12} sm>
            <Typography variant="body1" {...dynamicContent.itemProps}>
              {dynamicContent.primaryText}
              {dynamicContent.secondaryText && <br />}
              {dynamicContent.secondaryText}
            </Typography>
          </Grid>
          {!applicationCardsOpen ? (
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                onClick={onShowApplication}
                color="secondary"
                fullWidth
                disabled={applicationCardsOpen}
              >
                {dynamicContent.openCardsButtonLabel}
              </Button>
            </Grid>
          ) : (
            <Grid container item xs={12} sm={6} lg={4} spacing={2}>
              <Grid item xs>
                <SaveButton
                  saving={saving}
                  onClick={canEditApplication && onSaveButtonClick}
                  disabled={!canEditApplication || !unsavedChanges}
                />
              </Grid>
              <Grid item xs>
                <Button
                  variant="contained"
                  onClick={canEditApplication && onSubmitButtonClick}
                  color="secondary"
                  fullWidth
                  disabled={!canEditApplication || disableSubmit}
                >
                  Save & Submit
                </Button>
              </Grid>
            </Grid>
          )}
          <Backdrop open={saving && typeof saving !== 'string'}>
            <GordonLoader />
          </Backdrop>
          <GordonDialogBox
            open={submitDialogOpen}
            onClose={onCloseDialog}
            labelledby={'submit-application-dialog'}
            describedby={'confirm-application'}
            title={'Submit apartment application?'}
            text={submitAlertText}
            buttonClicked={onSubmitAppAccepted}
            buttonName={'Accept'}
            cancelButtonClicked={onCloseOkay}
            cancelButtonName={'Cancel'}
            severity={'warning'}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BottomBar;
