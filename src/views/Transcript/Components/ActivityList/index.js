import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider/Divider';
import Button from 'material-ui/Button';
import React, { Component } from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { GridList } from 'material-ui';
//import { Typography, typography } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

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

    let content = (
      <Grid container>
        <Grid item xs={6}>
          <List>
            <ListItem>
              <Typography> {Activity.ActivityDescription} </Typography>
            </ListItem>
          </List>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <List>
            <ListItem>
              <Typography> {Activity.ParticipationDescription} </Typography>
            </ListItem>
          </List>
          <Divider />
        </Grid>
      </Grid>
    );

    return (
      <div>
        <Grid class="SessionDescription">{Activity.SessionDescription}</Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <List>
                <ListItem>Activity</ListItem>
              </List>
              <Divider />
            </Grid>
            <Grid item xs={6}>
              <List>
                <ListItem>Participation</ListItem>
              </List>
              <Divider />
            </Grid>
          </Grid>
        </Grid>
        <Grid>{content}</Grid>
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
