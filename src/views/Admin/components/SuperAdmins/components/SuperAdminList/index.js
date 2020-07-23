import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { gordonColors } from '../../../../../../theme';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import admin from '../../../../../../services/admin';

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

  async componentWillMount() {
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
      padding: '.625rem',
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
