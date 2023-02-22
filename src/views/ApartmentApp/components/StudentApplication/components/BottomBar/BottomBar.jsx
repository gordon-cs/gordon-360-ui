import { Card, CardContent, Grid, Typography } from '@mui/material/';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import SaveIcon from '@mui/icons-material/Save';
import DynamicButton from 'components/DynamicButton/DynamicButton';
// @TODO CSSMODULES - outside directory
import styles from '../../../../ApartmentApp.module.css';

/**
 * Renders the bottom bar for the apartment application page
 *
 * @param {Object} props The React component props
 * @param {boolean} props.applicationCardsOpen Indicates whether the application cards are open and visible
 * @param {number} props.applicationID Application ID number of this application
 * @param {boolean} props.canEditApplication Indicates whether the current using is authorized to edit the application
 * @param {boolean | string} props.deleting Status of delete operation
 * @param {Object} props.disableSubmit boolean to disable the submit button
 * @param {boolean | string} props.saving Status of save operation
 * @param {boolean | string} props.submitStatus Status of submit operation
 * @param {boolean} props.unsavedChanges Indicates whether the page currently contains unsaved changes
 * @param {Function} props.onDeleteButtonClick Callback
 * @param {Function} props.onSaveButtonClick Callback
 * @param {Function} props.onShowApplication Callback
 * @param {Function} props.onSubmitButtonClick Callback for the submit application button
 * @returns {JSX.Element} JSX Element for the bottom bar
 */
const BottomBar = ({
  applicationCardsOpen,
  applicationID,
  canEditApplication,
  deleting,
  disableSubmit,
  saving,
  submitStatus,
  unsavedChanges,
  onDeleteButtonClick,
  onSaveButtonClick,
  onShowApplication,
  onSubmitButtonClick,
}) => {
  let dynamicContent = {
    primaryText: '',
    secondaryText: '',
    openCardsButtonLabel: 'Open application',
    itemProps: {},
  };

  //TODO: Refactor this to do something more compact like the dialogProps in StudentApplication
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
    if (submitStatus === 'error') {
      dynamicContent = {
        primaryText: 'Something went wrong while trying to submit the application.',
        itemProps: {
          variant: 'overline',
          color: 'error',
        },
      };
    } else if (saving === 'error') {
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
      dynamicContent = { primaryText: 'All changes have been saved.' };
    }
  }

  return (
    <Card className={styles.sticky_page_bottom_bar} variant="outlined">
      <CardContent>
        <Grid container direction="row" justifyContent="flex-end" spacing={2}>
          <Grid item xs={12} sm>
            <Typography variant="body1" {...dynamicContent.itemProps}>
              {dynamicContent.primaryText}
              {dynamicContent.secondaryText && <br />}
              {dynamicContent.secondaryText}
            </Typography>
          </Grid>
          <Grid container item xs={12} sm={7} lg={6} spacing={2}>
            {!applicationCardsOpen && (
              <Grid item xs>
                <DynamicButton
                  color={'secondary'}
                  disabled={applicationCardsOpen}
                  buttonText={dynamicContent.openCardsButtonLabel}
                  onClick={onShowApplication}
                />
              </Grid>
            )}
            <Grid item xs>
              <DynamicButton
                color="error"
                buttonText={'Delete'}
                startIcon={<DeleteIcon />}
                status={deleting}
                onClick={canEditApplication ? onDeleteButtonClick : undefined}
              />
            </Grid>
            {applicationCardsOpen && (
              <>
                <Grid item xs>
                  <DynamicButton
                    color={'secondary'}
                    disabled={!canEditApplication || !unsavedChanges}
                    buttonText={'Save'}
                    startIcon={<SaveIcon />}
                    status={saving}
                    onClick={canEditApplication ? onSaveButtonClick : undefined}
                  />
                </Grid>
                <Grid item xs>
                  <DynamicButton
                    color={'primary'}
                    disabled={!canEditApplication || Boolean(disableSubmit)}
                    buttonText={'Submit'}
                    startIcon={<PublishIcon />}
                    status={submitStatus}
                    onClick={canEditApplication ? onSubmitButtonClick : undefined}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BottomBar;
