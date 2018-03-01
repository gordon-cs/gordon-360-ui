import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider/Divider';
import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

export default class Activities extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentWillMount() {
    this.loadProfile();
  }
  async loadProfile() {}
  render() {
    const { Activity } = this.props;
    const style = {
      width: '90%',
    };

    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <List>
              <ListItem>
                <ListItemText primary={Activity.ActivityDescription} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={4}>
            <List>
              <ListItem>
                <ListItemText primary={Activity.ParticipationDescription} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={4}>
            <List>
              <ListItem>
                <ListItemText primary={Activity.SessionDescription} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Activities.propTypes = {
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
