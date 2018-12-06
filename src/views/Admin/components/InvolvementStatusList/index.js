import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import activity from '../../../../services/activity';
import Button from '@material-ui/core/Button';

export default class InvolvementStatusList extends Component {
  render() {
    const { Activity } = this.props;
    console.log('Activity prop: ', Activity);
    const imgStyle = {
      width: '20%',
    };
    // Link created should look like: /activity/201809/COMPS
    // We are not getting the Activity.sessionCode, just general activities, without a time period
    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={10} lg={12}>
            <Grid container alignItems="center">
              <Grid item xs={4}>
                <Link to={`/activity/${Activity.sessionCode}/${Activity.ActivityCode}`}>
                  <img src={Activity.ActivityImagePath} alt="" style={imgStyle} />
                </Link>
              </Grid>
              <Grid item xs={8}>
                <Link to={`/activity/${Activity.sessionCode}/${Activity.activityCode}`}>
                  <Typography>
                    <b>{Activity.ActivityDescription}</b>
                  </Typography>
                </Link>
              </Grid>
              {/* <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => activity.closeActivity(Activity.ActivityCode, '201809')}
                size="small"
                >
                Close
                </Button>
              </Grid>      */}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
