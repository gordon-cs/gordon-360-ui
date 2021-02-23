import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

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
 * @typedef {Object} Props
 * @prop  {Boolean} open Boolean that determines if the dialog should be visible or not
 * @prop {onCloseCallback} onClose A callback function fired after the component requests to be closed
 * @prop {String} labelledby The id(s) of the element(s) that label the dialog.
 * @prop {String} describedby The id(s) of the element(s) that describe the dialog.
 * @prop {String} title The title of the dialog box
 * @prop {String} text The content of the dialog box
 * @prop {onClickCallback} buttonClicked A function called when the confirming button is clicked
 * @prop {String} buttonName The text of the button confirming the dialog is read/accepted
 * @prop {String} [severity] The severity of the alert (Examples: "error", "warning", "info", etc.)
 * @prop {onClickCallback} [cancelButtonClicked] A function called when the canceling button is clicked
 * @prop {String} [cancelButtonName] The text of the button canceling the dialog is read/accepted
 *
 * @extends {Component<Props>}
 */
export default class GordonDialogBox extends Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby={this.props.labelledby}
        aria-describedby={this.props.describedby}
      >
        <DialogTitle>{this.props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{this.props.text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={this.props.buttonClicked} color="primary">
            {this.props.buttonName}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
