import React from 'react';
import { Backdrop, Button, Card, CardContent, Grid, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import GordonLoader from 'components/Loader';
import GordonDialogBox from 'components/GordonDialogBox';
import SaveButton from './components/SaveButton';

const deleteAlertText = (
  <span>
    Are you sure you want to delete this application?
    <br />
    This action cannot be undone.
  </span>
);

// TODO: Improve this text for the users
const submitAlertText = (
  <span>
    Please confirm that all the information you have entered is valid
    <br />
    Click "Accept" below to submit this application
  </span>
);

const BottomBar = ({
  applicationCardsOpen,
  applicationID,
  canEditApplication,
  deleteDialogOpen,
  disableSubmit,
  saving,
  submitDialogOpen,
  submitStatus,
  unsavedChanges,
  onCloseDialog,
  onCloseOkay,
  onDeleteAppAccepted,
  onDeleteButtonClick,
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

  if (submitStatus === 'success') {
    dynamicContent = {
      primaryText: 'The application was submitted successfully!',
      openCardsButtonLabel: 'View your application',
    };
  } else if (!applicationCardsOpen) {
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
    if (submitStatus === 'failed') {
      dynamicContent = {
        primaryText: 'Something went wrong while trying to submit the application.',
        itemProps: {
          variant: 'overline',
          color: 'error',
        },
      };
    } else if (saving === 'failed') {
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
          <Grid container item xs={12} sm={6} lg={4} spacing={2}>
            {!applicationCardsOpen ? (
              <Grid item xs>
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
              <>
                <Grid item xs>
                  <SaveButton
                    disabled={!canEditApplication || !unsavedChanges}
                    buttonText={'Save & Continue'}
                    status={saving}
                    onClick={canEditApplication ? onSaveButtonClick : undefined}
                  />
                </Grid>
                <Grid item xs>
                  <SaveButton
                    disabled={!canEditApplication || disableSubmit}
                    buttonText={'Submit'}
                    status={submitStatus}
                    onClick={canEditApplication ? onSubmitButtonClick : undefined}
                  />
                </Grid>
              </>
            )}
            {applicationID && (
              <Grid item xs>
                <SaveButton
                  disabled={!canEditApplication || !applicationID}
                  buttonText={'Delete'}
                  startIcon={<DeleteIcon />}
                  status={submitStatus}
                  onClick={canEditApplication ? onDeleteButtonClick : undefined}
                />
              </Grid>
            )}
          </Grid>
          <Backdrop open={saving === true || submitStatus === true}>
            <GordonLoader />
          </Backdrop>
          <GordonDialogBox
            open={deleteDialogOpen}
            onClose={onCloseDialog}
            labelledby={'submit-application-dialog'}
            describedby={'confirm-application'}
            title={'Delete apartment application?'}
            text={deleteAlertText}
            buttonClicked={onDeleteAppAccepted}
            buttonName={'Accept'}
            cancelButtonClicked={onCloseOkay}
            cancelButtonName={'Cancel'}
            severity={'warning'}
          />
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
