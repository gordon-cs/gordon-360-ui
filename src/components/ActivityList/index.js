import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import membership from './../../services/membership';

export default class Activities extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentWillMount() {
    this.loadProfile();
  }
  async loadProfile() {}

  handleChangeMembershipPrivacy(userMembership) {
    userMembership.toggleMembershipPrivacy;
  }

  render() {
    const { Activity } = this.props;
    const imgStyle = {
      width: '90%',
    };
    const toggleTextStyle = {
      fontSize: '10pt',
    };

    return (
      <div>
        <Grid container alignItems="center">
          <Grid item xs={8} sm={8} md={8} lg={8}>
            <Link to={`/activity/${Activity.SessionCode}/${Activity.ActivityCode}`}>
              <Typography>
                <b>{Activity.ActivityDescription}</b>
              </Typography>
              <Typography>{Activity.SessionDescription}</Typography>
              <Typography>{Activity.ParticipationDescription}</Typography>
            </Link>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
            <Grid container>
              <Grid item xs={12} align="center">
                <Switch
                  onClick={this.handleChangeMembershipPrivacy(Activity)}
                  checked={Activity.Privacy}
                />
              </Grid>
              <Grid item xs={12} align="center">
                <Typography style={toggleTextStyle}>Privacy</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <Link to={`/activity/${Activity.SessionCode}/${Activity.ActivityCode}`}>
              <img src={Activity.ActivityImagePath} alt="" style={imgStyle} />
            </Link>
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
