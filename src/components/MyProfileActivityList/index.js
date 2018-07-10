import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import membership from './../../services/membership';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const styles = {
  colorSwitchBase: {
    color: '#ebeaea',
    '&$colorChecked': {
      color: '#00aeef',
      '& + $colorBar': {
        backgroundColor: '#00aeef',
      },
    },
  },
  colorBar: {},
  colorChecked: {},
};

//MyProfile Involvements List
class MyProfileActivityList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChangeMembershipPrivacy(userMembership) {
    membership.toggleMembershipPrivacy(userMembership);
    this.forceUpdate();
  }

  render() {
    const { Activity } = this.props;
    const { classes } = this.props;
    const imgStyle = {
      width: '90%',
    };
    const toggleTextStyle = {
      fontSize: '10pt',
    };
    const activityItemStyle = {
      opacity: Activity.Privacy ? '0.5' : '1',
    };

    return (
      <div>
        <Grid container alignItems="center">
          <Grid item xs={8}>
            <List>
              <ListItem>
                <Link
                  to={`/activity/${Activity.SessionCode}/${Activity.ActivityCode}`}
                  style={activityItemStyle}
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
          <Grid item xs={2}>
            <Grid container>
              <Grid item xs={12} align="center">
                {/* The function you are trying to fire by clicking the toggle must passed to onChange()
              using an Arrow Function.
              https://stackoverflow.com/questions/33846682/react-onclick-function-fires-on-render
              */}
                <Switch
                  onChange={() => {
                    this.handleChangeMembershipPrivacy(Activity);
                  }}
                  checked={!Activity.Privacy}
                  classes={{
                    switchBase: classes.colorSwitchBase,
                    checked: classes.colorChecked,
                    bar: classes.colorBar,
                  }}
                />
              </Grid>
              <Grid item xs={12} align="center">
                <Typography style={toggleTextStyle}>
                  {Activity.Privacy ? 'Private' : 'Public'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Link
              to={`/activity/${Activity.SessionCode}/${Activity.ActivityCode}`}
              style={activityItemStyle}
            >
              <img src={Activity.ActivityImagePath} alt="" style={imgStyle} />
            </Link>
          </Grid>
        </Grid>
        <Divider />
      </div>
    );
  }
}

MyProfileActivityList.propTypes = {
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

export default withStyles(styles)(MyProfileActivityList);
