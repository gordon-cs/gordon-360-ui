import { Component, Fragment } from 'react';
import { gordonColors } from 'theme';

import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';

export default class RemoveScheduleDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      removeMyScheduleOpen: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onDialogSubmit();
    this.props.handleRemoveMyScheduleClose();
  };

  render() {
    const button = {
      background: gordonColors.primary.cyan,
      color: 'white',
    };

    return (
      <Fragment>
        <Dialog
          open={this.props.removeMyScheduleOpen}
          keepMounted
          onClose={this.props.handleRemoveMyScheduleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Are you sure about removing this event?</DialogTitle>
          <DialogActions>
            <Button
              onClick={this.props.handleRemoveMyScheduleClose}
              variant="contained"
              style={button}
            >
              No
            </Button>
            <Button variant="contained" onClick={this.handleSubmit} style={button}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
