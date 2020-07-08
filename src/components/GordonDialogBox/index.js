import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

// Learn more about Dialog's API at https://material-ui.com/api/dialog/

/*
Props:
  open - Boolean that determines if the dialog should be visible or not
  onClose - A callback function fired after the component requests to be closed
  labelledby - The id(s) of the element(s) that label the dialog.
  describedby - The id(s) of the element(s) that describe the dialog.
  title - The title of the dialog box
  text - The content of the dialog box
  buttonClicked - A function called when the confirming button is clicked
  buttonName - The text of the button confirming the dialog is read/accepted
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
