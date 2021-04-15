import React from 'react';
import { Backdrop, Button, Card, CardContent, Grid, Typography } from '@material-ui/core/';
import GordonLoader from '../../../../components/Loader';
import GordonDialogBox from '../../../../components/GordonDialogBox';
import SaveButton from './components/SaveButton';

const BottomBar = ({
  canEditApplication,
  disabled,
  saving,
  submitDialogOpen,
  submitAlertText,
  unsavedChanges,
  onSaveButtonClick,
  onSubmitButtonClick,
  onSubmitAppAccepted,
  onCloseDialog,
  onCloseOkay,
}) => (
  <Card className={'sticky-page-bottom-bar'} variant="outlined">
    <CardContent>
      <Grid container direction="row" justify="flex-end" spacing={2}>
        {canEditApplication ? (
          <React.Fragment>
            <Grid item xs={12} sm={6}>
              {saving === 'failed' ? (
                <Typography variant="overline" color="error">
                  Something went wrong while trying to save the application
                </Typography>
              ) : unsavedChanges ? (
                <Typography variant="body1">You have unsaved changes</Typography>
              ) : (
                <Typography variant="body1">All changes to be saved</Typography>
              )}
            </Grid>
            <Grid container item xs={12} sm={6} lg={4} spacing={2}>
              <Grid item xs={6}>
                <SaveButton
                  saving={saving}
                  onClick={onSaveButtonClick}
                  disabled={!unsavedChanges}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  onClick={onSaveButtonClick}
                  color="primary"
                  fullWidth
                  disabled={disabled}
                >
                  Save & Submit
                </Button>
              </Grid>
            </Grid>
            <Backdrop open={saving && saving !== 'success' && saving !== 'failed'}>
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
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                You are not the editor of this application, so you cannot edit or save changes to
                this applications.
              </Typography>
            </Grid>
            <Grid container item xs={12} sm={6} lg={4} spacing={2}>
              <Grid item xs={6}>
                <SaveButton disabled />
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" fullWidth disabled>
                  Save & Submit
                </Button>
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    </CardContent>
  </Card>
);

export default BottomBar;
