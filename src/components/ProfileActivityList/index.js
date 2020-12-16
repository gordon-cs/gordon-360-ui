import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import '../../app.css';
import './index.css';

export default class ProfileActivityList extends Component {
  render() {
    const { Activity } = this.props;
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
