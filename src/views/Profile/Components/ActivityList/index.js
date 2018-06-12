import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider/Divider';
import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';

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
    const imgStyle = {
      width: '90%',
    };
    const textStyle = {
      textIndent: '12pt',
    };

    return (
      <div>
        <Link to={`/activity/${Activity.SessionCode}/${Activity.ActivityCode}`}>
          <Grid container alignItems="center">
            <Grid item xs={10} sm={10} md={10} lg={10} style={textStyle}>
              <Typography>
                <b>{Activity.ActivityDescription}</b>
              </Typography>
              <Typography>{Activity.SessionDescription}</Typography>
              <Typography>{Activity.ParticipationDescription}</Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2}>
              <img src={Activity.ActivityImagePath} alt="" style={imgStyle} />
            </Grid>
          </Grid>
        </Link>
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
