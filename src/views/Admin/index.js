import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import { gordonColors } from '../../theme';
import InvolvementsStatus from './components/InvolvementsStatus';
import SuperAdmin from './components/SuperAdmins';
import user from '../../services/user';

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSuperAdmin: false,
      currentSession: '',
    };
  }

  async componentWillMount() {
    const college_role = await user.getLocalInfo().college_role;
    this.setState({ isSuperAdmin: college_role === 'god' ? true : false });
  }

  render() {
    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '10px',
    };

    if (this.state.isSuperAdmin) {
      return (
        <Grid container justify="center" spacing={16}>
          <Grid item xs={12} lg={8}>
            <InvolvementsStatus status={'Open'} />
          </Grid>

          <Grid item xs={12} lg={8}>
            <InvolvementsStatus status={'Closed'} />
          </Grid>

          <Grid item xs={12} lg={8}>
            <SuperAdmin />
          </Grid>
        </Grid>
      );
    } else {
      return <div />;
    }
  }
}
