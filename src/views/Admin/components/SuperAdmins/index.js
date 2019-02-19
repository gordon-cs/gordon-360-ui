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
      </Card>
    );
  }
}
