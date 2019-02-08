import React, { Component } from 'react';
import SuperAdminList from './components/SuperAdminList';
import GordonLoader from '../../../../components/Loader';
import admin from '../../../../services/admin';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { gordonColors } from '../../../../theme';

export default class SuperAdmin extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      loading: true,
      admins: [],
      open: false, //add admin dialogue box
    };
  }

  componentWillMount() {
    this.loadAdmins();
  }

  async loadAdmins() {
    const adminList = await admin.getAdmins();
    this.setState({ loading: false, admins: adminList });
  }

  handleAdd() {
    this.setState({ open: true });
  }

  //close add admin dialogue
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let content;

    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      content = this.state.admins.map(superadmin => (
        <div>
          <SuperAdminList Admin={superadmin} />
        </div>
      ));
    }

    const buttonStyle = {
      margin: '20px',
      background: gordonColors.primary.blue,
      color: 'white',
    };

    return (
      <div>
        {content}
        <Button style={buttonStyle} onClick={this.handleAdd}>
          Add Admin
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Admin</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" label="Admin Email" type="email" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Add Admin
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
