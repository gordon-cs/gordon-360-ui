import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider/Divider';
import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

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

    let content = (
      <div>
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={10}>
            <Typography>{Activity.ActivityDescription}</Typography>
            <Typography>{Activity.SessionDescription}</Typography>
            <Typography>{Activity.ParticipationDescription}</Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <img src={Activity.ActivityImagePath} alt="" style={style} />
          </Grid>
        </Grid>
        <Divider />
      </div>
    );
    return content;
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
