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
import LockIcon from '@material-ui/icons/Lock';
import ListItem from '@material-ui/core/ListItem';
import { gordonColors } from '../../theme';
import '../ProfileList/profileList.css';

const styles = {
  colorSwitchBase: {
    color: gordonColors.neutral.lightGray,
    '&$colorChecked': {
      color: gordonColors.primary.cyan,
      '& + $colorBar': {
        backgroundColor: gordonColors.primary.cyan,
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
    this.state = {
      involvementPrivacy: Boolean,
    };
  }

  handleChangeMembershipPrivacy(userMembership) {
    membership.toggleMembershipPrivacy(userMembership);
    this.forceUpdate();
  }

  render() {
    const { Membership } = this.props;
    const { InvolvementPrivacy } = this.props;
    const { classes } = this.props;
    const imgStyle = {
      width: '90%',
    };
    const toggleTextStyle = {
      fontSize: '10pt',
    };
    const membershipItemStyle = {
      opacity: Membership.Privacy || InvolvementPrivacy ? '0.5' : '1',
    };
    // If the Involvement is a regular (non-special/secret group - AKA Public) it is False.
    let myProfileInvolvementsList;
    if (!InvolvementPrivacy) {
      myProfileInvolvementsList = (
        <div>
          <Grid container alignItems="center">
            <Grid item xs={8}>
              <List>
                <ListItem>
                  <Link
                    to={`/activity/${Membership.SessionCode}/${Membership.ActivityCode}`}
                    style={membershipItemStyle}
                  >
                    <Typography>
                      <b>{Membership.ActivityDescription}</b>
                    </Typography>
                    <Typography>{Membership.SessionDescription}</Typography>
                    <Typography>{Membership.ParticipationDescription}</Typography>
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
                      this.handleChangeMembershipPrivacy(Membership);
                    }}
                    checked={!Membership.Privacy}
                    classes={{
                      switchBase: classes.colorSwitchBase,
                      checked: classes.colorChecked,
                      bar: classes.colorBar,
                    }}
                  />
                </Grid>
                <Grid item xs={12} align="center">
                  <Typography style={toggleTextStyle}>
                    {Membership.Privacy ? 'Private' : 'Public'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Link
                to={`/activity/${Membership.SessionCode}/${Membership.ActivityCode}`}
                style={membershipItemStyle}
              >
                <img src={Membership.ActivityImagePath} alt="" style={imgStyle} />
              </Link>
            </Grid>
          </Grid>
          <Divider />
        </div>
      );
      // If the Involvement is some kind of Private group (e.g. scholarship group etc. - AKA Private) it is False.
    } else {
      myProfileInvolvementsList = (
        <div>
          <Grid container alignItems="center">
            <Grid item xs={8}>
              <List>
                <ListItem>
                  <Link
                    to={`/activity/${Membership.SessionCode}/${Membership.ActivityCode}`}
                    style={membershipItemStyle}
                  >
                    <Typography>
                      <b>{Membership.ActivityDescription}</b>
                    </Typography>
                    <Typography>{Membership.SessionDescription}</Typography>
                    <Typography>{Membership.ParticipationDescription}</Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={2}>
              <Grid container>
                <Grid item xs={12} align="center">
                  <Grid container justify="center">
                    <Grid item>
                      <LockIcon className="lock-icon" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} align="center">
                  <Typography style={toggleTextStyle}>
                    {InvolvementPrivacy ? 'Private' : 'Public'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Link
                to={`/activity/${Membership.SessionCode}/${Membership.ActivityCode}`}
                style={membershipItemStyle}
              >
                <img src={Membership.ActivityImagePath} alt="" style={imgStyle} />
              </Link>
            </Grid>
          </Grid>
          <Divider />
        </div>
      );
    }

    return <div>{myProfileInvolvementsList}</div>;
  }
}

MyProfileActivityList.propTypes = {
  Membership: PropTypes.shape({
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
