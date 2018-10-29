import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

export default class OpenInvolvementsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { Activity } = this.props;

    // membership.getFollowersNum(activityCode, sessionCode),
    console.log(Activity);

    return (
      <div>
        <Grid container alignItems="center">
          <Grid item xs={8}>
            <List>
              <ListItem>
                <Link to={`/activity/${Activity.sessionCode}/${Activity.activityCode}`}>
                  <Typography>
                    <b>{Activity.ActivityDescription}</b>
                  </Typography>
                </Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={2}>
            <Link to={`/activity/${Activity.sessionCode}/${Activity.activityCode}`}>
              <img src={Activity.ActivityImagePath} alt="" />
            </Link>
          </Grid>
        </Grid>
        <Divider />
      </div>
    );
  }
}
