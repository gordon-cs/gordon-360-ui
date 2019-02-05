import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { gordonColors } from '../../theme';
import InvolvementsStatus from './components/InvolvementsStatus';

export default class Admin extends Component {
  render() {
    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '10px',
    };

    return (
      <Grid container justify="center" spacing={16}>
        <Grid item xs={12} lg={8}>
          <InvolvementsStatus status={'Open'} />
        </Grid>

        <Grid item xs={12} lg={8}>
          <InvolvementsStatus status={'Closed'} />
        </Grid>

        <Grid item xs={12} lg={8}>
          <Card>
            <div style={headerStyle}>
              <Typography variant="body2" align="center" style={headerStyle}>
                Super Admins
              </Typography>
            </div>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
