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

    this.state = {};
  }
  render() {
    const { Activity } = this.props;
    const imgStyle = {
      width: '90%',
    };
    return (
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
