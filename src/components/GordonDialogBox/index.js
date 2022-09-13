import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import styles from './GordonDialogBox.module.css';

/**
 * @param {Object} props the component props
 * @param {boolean} props.open boolean that determines if the dialog should be visible or not
 * @param {(event: {}) => void} props.onClose A callback function fired after the component requests to be closed
 * @param {string} props.title The title of the dialog box
 * @param {string} props.titleClass name of title class
 * @param {(event: {}) => void} props.buttonClicked A function called when the confirming button is clicked
 * @param {string} [props.buttonName] The text of the button confirming the dialog is read/accepted
 * @param {boolean} props.fullWidth If true, the dialog stretches to maxWidth
 * @param {string} props.maxWidth Determine the max-width of the dialog. The dialog width grows with the size of the screen
 * @param {boolean} [props.isButtonDisabled] Whether the primary button is disabled
 * @param {(event: {}) => void} [props.cancelButtonClicked] A function called when the canceling button is clicked
 * @param {string} [props.cancelButtonName] The text of the button canceling the dialog is read/accepted
 * @param {string} [props.severity] The severity of the alert (Examples: "error", "warning", "info", etc.)
 * @param {JSX.Element} [props.children] The children of this component
 * @returns {JSX.Element} A dialog box with the passed in content
 */
const GordonDialogBox = ({
  title,
  titleClass,
  buttonClicked,
  buttonName,
  isButtonDisabled = false,
  cancelButtonClicked,
  cancelButtonName,
  severity,
  children,
  ...otherProps
}) => {
  const handleClose = (event, reason) => {
    if (typeof cancelButtonClicked === 'function') {
      cancelButtonClicked();
    }
  };

  return (
    <Dialog
      className={styles.gc360_gordondialogbox}
      onClose={handleClose}
      {...otherProps}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        className={titleClass ? titleClass : styles.gc360_gordondialogbox_title}
        id="alert-dialog-title"
      >
        {severity ? (
          <Alert variant="filled" severity={severity}>
            <AlertTitle>
              <strong>{title}</strong>
            </AlertTitle>
          </Alert>
        ) : (
          title
        )}
      </DialogTitle>
      <DialogContent className={styles.gc360_gordondialogbox_content} id="alert-dialog-description">
        {typeof children === String ? (
          <DialogContentText className={styles.gc360_gordondialogbox_text}>
            {children}
          </DialogContentText>
        ) : (
          children
        )}
      </DialogContent>
      <DialogActions className={styles.gc360_gordondialogbox_actions}>
        {cancelButtonClicked && (
          <Button variant="contained" onClick={cancelButtonClicked}>
            {cancelButtonName ?? 'Cancel'}
          </Button>
        )}
        {buttonClicked && (
          <Button
            variant="contained"
            onClick={buttonClicked}
            color="primary"
            disabled={isButtonDisabled}
          >
            {buttonName ?? 'Okay'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default GordonDialogBox;
