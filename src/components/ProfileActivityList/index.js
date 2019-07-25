import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

//Public Profile Involvements List
export default class ProfileActivityList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      network: 'online',
    };
  }
  render() {
    const { Activity } = this.props;
    const imgStyle = {
      width: '90%',
    };

    /* Used to re-render the page when the network connection changes.
     *  this.state.network is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', event => {
      if (
        event.data === 'online' &&
        this.state.network === 'offline' &&
        event.origin === window.location.origin
      ) {
        // We set the state twice due to a bug where react won't re-render on time
        this.setState({ network: 'online' });
        this.setState({ network: 'online' });
      } else if (
        event.data === 'offline' &&
        this.state.network === 'online' &&
        event.origin === window.location.origin
      ) {
        this.setState({ network: 'offline' });
      }
    });

    /* Gets status of current network connection for online/offline rendering
     *  Defaults to online in case of PWA not being possible
     */
    const networkStatus = JSON.parse(localStorage.getItem('network-status')) || 'online';

    // Creates the My Profile button link depending on the status of the network found in local storage
    let ActivityList;
    if (networkStatus === 'online') {
      ActivityList = (
        <div>
          <Grid container alignItems="center">
            <Grid item xs={10}>
              <List>
                <ListItem>
                  <Link to={`/activity/${Activity.SessionCode}/${Activity.ActivityCode}`}>
                    <Typography>
                      <b>{Activity.ActivityDescription}</b>
                    </Typography>
                    <Typography>{Activity.SessionDescription}</Typography>
                    <Typography>{Activity.ParticipationDescription}</Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={2}>
              <Link to={`/activity/${Activity.SessionCode}/${Activity.ActivityCode}`}>
                <img src={Activity.ActivityImagePath} alt="" style={imgStyle} />
              </Link>
            </Grid>
          </Grid>
          <Divider />
        </div>
      );
    } else {
      ActivityList = (
        <div>
          <Grid container alignItems="center">
            <Grid item xs={10}>
              <List>
                <ListItem>
                  <Grid item xs={10}>
                    <Typography>
                      <b>{Activity.ActivityDescription}</b>
                    </Typography>
                    <Typography>{Activity.SessionDescription}</Typography>
                    <Typography>{Activity.ParticipationDescription}</Typography>
                  </Grid>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={2}>
              <Grid item xs={12}>
                <img src={Activity.ActivityImagePath} alt="" style={imgStyle} />
              </Grid>
            </Grid>
          </Grid>
          <Divider />
        </div>
      );
    }
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
