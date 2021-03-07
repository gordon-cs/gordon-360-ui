import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../app.css';
import './index.css';

import { Grid, Divider, Typography, List, ListItem } from '@material-ui/core';

export default class ProfileActivityList extends Component {
  render() {
    const { Activity } = this.props;

    // Creates the My Profile button link depending on the status of the network found in local storage
    let ActivityList = (
      <div>
        <Grid container alignItems="center" className="public-profile-info-card">
          <Grid
            container
            xs={7}
            sm={9}
            md={9}
            lg={9}
            xl={9}
            alignItems="center"
            className="public-profile-info-card-text"
          >
            <List>
              <ListItem>
                <Link
                  to={`/activity/${Activity.SessionCode}/${Activity.ActivityCode}`}
                  className="gc360-link"
                >
                  <Typography>
                    <b>{Activity.ActivityDescription}</b>
                  </Typography>
                  <Typography>{Activity.SessionDescription}</Typography>
                  <Typography>{Activity.ParticipationDescription}</Typography>
                </Link>
              </ListItem>
            </List>
          </Grid>
          <Grid
            container
            xs={5}
            sm={3}
            md={3}
            lg={3}
            xl={3}
            justify="flex-end"
            alignItems="center"
            className="public-profile-info-card-picture"
          >
            <Link
              to={`/activity/${Activity.SessionCode}/${Activity.ActivityCode}`}
              className="gc360-link"
            >
              <img src={Activity.ActivityImagePath} alt="" />
            </Link>
          </Grid>
        </Grid>
        <Divider />
      </div>
    );
    return ActivityList;
  }
}

ProfileActivityList.propTypes = {
  Activity: PropTypes.shape({
    ActivityDescription: PropTypes.string.isRequired,
    ActivityImagePath: PropTypes.string.isRequired,
    SessionDescription: PropTypes.string.isRequired,
    ActivityCode: PropTypes.string,
    Participation: PropTypes.string,
    ParticipationDescription: PropTypes.string,
    GroupAdmin: PropTypes.bool,
  }).isRequired,
};
