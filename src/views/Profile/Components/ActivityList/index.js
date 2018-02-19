import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider/Divider';
import React, { Component } from 'react';
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
    const style = {
      width: '90%',
    };

    return (
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
