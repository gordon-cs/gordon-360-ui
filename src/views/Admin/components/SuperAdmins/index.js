import React, { Component } from 'react';
import SuperAdminList from './components/SuperAdminList';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import GordonLoader from '../../../../components/Loader';
import admin from '../../../../services/admin';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { gordonColors } from '../../../../theme';
import membership from '../../../../services/membership';

export default class SuperAdmin extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      loading: true,
      admins: [],
      open: false, //add admin dialogue box
      newAdminEmail: '',
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

  handleText = event => {
    this.setState({ newAdminEmail: event.target.value });
  };

  async handleSubmit() {
    let adminEmail = this.state.newAdminEmail;
    if (!adminEmail.toLowerCase().includes('@gordon.edu')) {
      adminEmail = adminEmail + '@gordon.edu';
    }
    let addID = await membership.getEmailAccount(adminEmail).then(function(result) {
      return result.GordonID;
    });
    let data = {
      ID_NUM: addID,
      EMAIL: adminEmail,
      USER_NAME: adminEmail.split('@')[0],
      SUPER_ADMIN: true, //Used to be distinction between superadmin (godmode), admin, and groupadmin
      //now just superadmin and groupadmin
    };
    await admin.addAdmin(data);
    this.handleClose();
    window.location.reload(); //refresh
  }

  //close add admin dialogue
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const buttonStyle = {
      margin: '20px',
      background: gordonColors.primary.blue,
      color: 'white',
    };
    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '10px',
    };

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

    return (
      <Card>
        <div>
          <div style={headerStyle}>
            <Typography variant="body2" align="center" style={headerStyle}>
              Super Admins
            </Typography>
          </div>
          {content}
        </div>
        <Button style={buttonStyle} onClick={this.handleAdd}>
          Add Super Admin
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth="true"
        >
          <DialogTitle id="form-dialog-title">Add Super Admin</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Super Admin Email (or username)"
              type="email"
              onChange={this.handleText}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Add Super Admin
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    );
  }
}
