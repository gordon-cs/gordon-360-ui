import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import './index.css';

// Learn more about Dialog's API at https://material-ui.com/api/dialog/
// Learn more about Alert's API at https://material-ui.com/api/alert/

/**
 * This callback type is called `onClickCallback` and is displayed as a global symbol.
 *
 * @callback onClickCallback
 */

/**
 * This callback type is called `onCloseCallback` and is displayed as a global symbol.
 *
 * @callback onCloseCallback
 */

/**
 * @param {Object} props the component props
 * @param {Boolean} props.open Boolean that determines if the dialog should be visible or not
 * @param {onCloseCallback} props.onClose A callback function fired after the component requests to be closed
 * @param {String} props.title The title of the dialog box
 * @param {onClickCallback} props.buttonClicked A function called when the confirming button is clicked
 * @param {String} [props.buttonName] The text of the button confirming the dialog is read/accepted
 * @param {Boolean} [props.isButtonDisabled] Whether the primary button is disabled
 * @param {onClickCallback} [props.cancelButtonClicked] A function called when the canceling button is clicked
 * @param {String} [props.cancelButtonName] The text of the button canceling the dialog is read/accepted
 * @param {String} [props.severity] The severity of the alert (Examples: "error", "warning", "info", etc.)
 *
 * @returns {JSX.Element} A dialog box with the passed in content
 */
const GordonDialogBox = ({
  open,
  onClose,
  title,
  buttonClicked,
  buttonName,
  isButtonDisabled = false,
  cancelButtonClicked,
  cancelButtonName,
  severity,
  children,
}) => {
  return (
    <Dialog
      className="gc360-gordondialogbox"
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="gc360-gordondialogbox_title" id="alert-dialog-title">
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
      <DialogContent className="gc360-gordondialogbox_content" id="alert-dialog-description">
        {typeof children === String ? (
          <DialogContentText className="gc360-gordondialogbox_text">{children}</DialogContentText>
        ) : (
          children
        )}
      </DialogContent>
      <DialogActions className="gc360-gordondialogbox_actions">
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
