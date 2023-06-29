import { Component, Fragment } from 'react';
import styles from './RemoveScheduleDialog.module.css';

import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

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
              className={styles.remove_schedule_dialog_button}
            >
              No
            </Button>
            <Button
              variant="contained"
              onClick={this.handleSubmit}
              className={styles.remove_schedule_dialog_button}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
