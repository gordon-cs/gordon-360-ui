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
import '../../app.css';

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
  handleChangeMembershipPrivacy(userMembership) {
    membership.toggleMembershipPrivacy(userMembership);
    this.forceUpdate();
  }

  render() {
    const { Membership } = this.props;
    const { InvolvementPrivacy } = this.props;
    const { classes } = this.props;
    const imgStyle = {
      width: '100%',
      maxWidth: '8.125rem',
      padding: '0.3rem',
      borderRadius: '.625rem',
    };
    const toggleTextStyle = {
      fontSize: '12pt',
    };
    const membershipItemStyle = {
      opacity: Membership.Privacy || InvolvementPrivacy ? '0.5' : '1',
    };
    // The Grid lengths for each content inside of the card based on Material-UI's breakpoints
    const cardContentLengths = {
      text: {
        xs: 7,
        sm: 8,
        md: 6,
        lg: 7,
        xl: 6,
      },
      privacy: {
        xs: 2,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 2,
      },
      picture: {
        xs: 3,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 2,
      },
    };

    // If the Involvement is a regular (non-special/secret group - AKA Public) it is False.
    let myProfileInvolvementsList;
    if (!InvolvementPrivacy) {
      myProfileInvolvementsList = (
        <div>
          <Grid container alignItems="center" justify="center">
            <Grid
              item
              xs={cardContentLengths.text.xs}
              sm={cardContentLengths.text.sm}
              md={cardContentLengths.text.md}
              lg={cardContentLengths.text.lg}
              xl={cardContentLengths.text.xl}
            >
              <List>
                <ListItem style={{ paddingLeft: '0.5rem' }}>
                  {/* A link to the activity is only available if the user is online */}
                  {this.props.network === 'online' ? (
                    <Link
                      className="gc360-link"
                      to={`/activity/${Membership.SessionCode}/${Membership.ActivityCode}`}
                      style={membershipItemStyle}
                    >
                      <Typography>
                        <b>{Membership.ActivityDescription}</b>
                      </Typography>
                      <Typography>{Membership.SessionDescription}</Typography>
                      <Typography>{Membership.ParticipationDescription}</Typography>
                    </Link>
                  ) : (
                    <div style={membershipItemStyle}>
                      <Typography>
                        <b>{Membership.ActivityDescription}</b>
                      </Typography>
                      <Typography>{Membership.SessionDescription}</Typography>
                      <Typography>{Membership.ParticipationDescription}</Typography>
                    </div>
                  )}
                </ListItem>
              </List>
            </Grid>
            <Grid
              item
              xs={cardContentLengths.privacy.xs}
              sm={cardContentLengths.privacy.sm}
              md={cardContentLengths.privacy.md}
              lg={cardContentLengths.privacy.lg}
              xl={cardContentLengths.privacy.xl}
            >
              {this.props.network === 'online' && (
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
                        track: classes.colorBar,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} align="center">
                    <Typography style={toggleTextStyle}>
                      {Membership.Privacy ? 'Private' : 'Public'}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid
              item
              xs={cardContentLengths.picture.xs}
              sm={cardContentLengths.picture.sm}
              md={cardContentLengths.picture.md}
              lg={cardContentLengths.picture.lg}
              xl={cardContentLengths.picture.xl}
              style={{ paddingLeft: '1rem', paddingTop: '0.3rem' }}
            >
              {/* A link to the activity is only available if the user is online */}
              {this.props.network === 'online' ? (
                <Link
                  className="gc360-link"
                  to={`/activity/${Membership.SessionCode}/${Membership.ActivityCode}`}
                  style={membershipItemStyle}
                >
                  <img src={Membership.ActivityImagePath} alt="" style={imgStyle} />
                </Link>
              ) : (
                <div style={membershipItemStyle}>
                  <img src={Membership.ActivityImagePath} alt="" style={imgStyle} />
                </div>
              )}
            </Grid>
          </Grid>
          <Divider />
        </div>
      );
      // If the Involvement is some kind of Private group (ejj.g. scholarship group etc. - AKA Private) it is False.
    } else {
      myProfileInvolvementsList = (
        <div>
          <Grid container alignItems="center" justify="center">
            <Grid
              item
              xs={cardContentLengths.text.xs}
              sm={cardContentLengths.text.sm}
              md={cardContentLengths.text.md}
              lg={cardContentLengths.text.lg}
              xl={cardContentLengths.text.xl}
            >
              <List>
                <ListItem style={{ paddingLeft: '0.5rem' }}>
                  {/* A link to the activity is only available if the user is online */}
                  {this.props.network === 'online' ? (
                    <Link
                      className="gc360-link"
                      to={`/activity/${Membership.SessionCode}/${Membership.ActivityCode}`}
                      style={membershipItemStyle}
                    >
                      <Typography>
                        <b>{Membership.ActivityDescription}</b>
                      </Typography>
                      <Typography>{Membership.SessionDescription}</Typography>
                      <Typography>{Membership.ParticipationDescription}</Typography>
                    </Link>
                  ) : (
                    <div style={membershipItemStyle}>
                      <Typography>
                        <b>{Membership.ActivityDescription}</b>
                      </Typography>
                      <Typography>{Membership.SessionDescription}</Typography>
                      <Typography>{Membership.ParticipationDescription}</Typography>
                    </div>
                  )}
                </ListItem>
              </List>
            </Grid>

            <Grid
              item
              xs={cardContentLengths.privacy.xs}
              sm={cardContentLengths.privacy.sm}
              md={cardContentLengths.privacy.md}
              lg={cardContentLengths.privacy.lg}
              xl={cardContentLengths.privacy.xl}
            >
              {this.props.network === 'online' && (
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
              )}
            </Grid>

            <Grid
              item
              xs={cardContentLengths.picture.xs}
              sm={cardContentLengths.picture.sm}
              md={cardContentLengths.picture.md}
              lg={cardContentLengths.picture.lg}
              xl={cardContentLengths.picture.xl}
              style={{ paddingLeft: '1rem', paddingTop: '0.3rem' }}
            >
              {/* A link to the activity is only available if the user is online */}
              {this.props.network === 'online' ? (
                <Link
                  className="gc360-link"
                  to={`/activity/${Membership.SessionCode}/${Membership.ActivityCode}`}
                  style={membershipItemStyle}
                >
                  <img src={Membership.ActivityImagePath} alt="" style={imgStyle} />
                </Link>
              ) : (
                <div style={membershipItemStyle}>
                  <img src={Membership.ActivityImagePath} alt="" style={imgStyle} />
                </div>
              )}
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
