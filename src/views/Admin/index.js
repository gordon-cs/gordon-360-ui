import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import { gordonColors } from '../../theme';

export default class Admin extends Component {
  render() {
    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '10px',
    };

    return (
      <Grid container align="center" spacing={16}>
        <Grid item xs={12}>
          <Card>
            <div style={headerStyle}>
              <Typography variant="body2" style={headerStyle}>
                Open Involvements
              </Typography>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <div style={headerStyle}>
              <Typography variant="body2" style={headerStyle}>
                Closed Involvements
              </Typography>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <div style={headerStyle}>
              <Typography variant="body2" style={headerStyle}>
                Super Admins
              </Typography>
            </div>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
