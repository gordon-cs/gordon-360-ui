import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { gordonColors } from '../../../../../../theme';
import admin from '../../../../../../services/admin';

export default class SuperAdminList extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.state = {};
  }

  async componentWillMount() {
    this.setState({});
  }

  handleRemove() {
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
        <Grid container style={itemStyle}>
          <Grid item xs={4}>
            <Typography>{this.props.Admin.USER_NAME}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" style={buttonStyle} onClick={this.handleRemove}>
              Remove
            </Button>
          </Grid>
        </Grid>
        <Divider />
      </div>
    );
  }
}
