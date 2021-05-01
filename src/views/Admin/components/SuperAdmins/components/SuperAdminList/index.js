import React, { Component } from 'react';
import { gordonColors } from 'theme';
import admin from 'services/admin';

import {
  Typography,
  Divider,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

export default class SuperAdminList extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleConfirmedRemove = this.handleConfirmedRemove.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      open: false, //remove admin confirmation box
    };
  }

  async componentDidMount() {
    this.setState({});
  }

  handleRemove() {
    this.setState({ open: true });
  }

  //close remove admin confirmation
  handleClose = () => {
    this.setState({ open: false });
  };

  handleConfirmedRemove() {
    const adminID = this.props.Admin.ADMIN_ID;
    admin.removeAdmin(adminID);
    window.location.reload();
  }

  render() {
    const itemStyle = {
      padding: '10px',
    };
    const buttonStyle = {
      background: gordonColors.secondary.red,
      color: 'white',
    };

    return (
      <div>
        <Grid container style={itemStyle} justify="center">
          <Grid item xs={8}>
            <Typography>{this.props.Admin.USER_NAME}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" style={buttonStyle} onClick={this.handleRemove}>
              Remove
            </Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Are you sure you want to remove this super admin?
              </DialogTitle>
              <DialogContent />
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleConfirmedRemove} color="primary">
                  Remove
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
        <Divider />
      </div>
    );
  }
}
