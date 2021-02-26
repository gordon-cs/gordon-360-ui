import React from 'react';
import classnames from 'classnames';
import { Divider, Grid, List, ListItem, Switch, Typography } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import useNetworkStatus from '../../hooks/useNetworkStatus';
import './index.css';

const MyProfileActivityList = ({ membership, onTogglePrivacy }) => {
  const isOnline = useNetworkStatus();

  const OnlineOnlyLink = ({ children }) => {
    const linkClass = classnames({
      'gc360-link': isOnline,
      'private-membership': membership.IsInvolvementPrivate || membership.Privacy,
      'public-membership': !(membership.IsInvolvementPrivate || membership.Privacy),
    });
    if (isOnline) {
      return (
        <Link
          className={linkClass}
          to={`/activity/${membership.SessionCode}/${membership.ActivityCode}`}
        >
          {children}
        </Link>
      );
    } else {
      return <div className={linkClass}>{children}</div>;
    }
  };

  return (
    <>
      <Grid container alignItems="center" justify="center" className="my-profile-info-card">
        {/* CONTENT ONE (Activity Text and Privacy) */}
        <Grid
          container
          xs={8}
          sm={9}
          md={9}
          lg={8}
          xl={9}
          justify="center"
          alignItems="center"
          className="my-profile-info-card-description"
        >
          <Grid container xs={8} alignItems="center">
            <List>
              <ListItem className="my-profile-info-card-description-text">
                <OnlineOnlyLink>
                  <Typography>
                    <b>{membership.ActivityDescription}</b>
                  </Typography>
                  <Typography>{membership.SessionDescription}</Typography>
                  <Typography>{membership.ParticipationDescription}</Typography>
                </OnlineOnlyLink>
              </ListItem>
            </List>
          </Grid>

          <Grid container xs={4} alignItems="center">
            <Grid container>
              <Grid item xs={12} align="center">
                {isOnline &&
                  (membership.IsInvolvementPrivate ? (
                    <LockIcon className="lock-icon" />
                  ) : (
                    <Switch
                      onChange={() => {
                        onTogglePrivacy(membership);
                      }}
                      checked={!membership.Privacy}
                    />
                  ))}
              </Grid>
              <Grid item xs={12} align="center">
                <Typography>
                  {membership.Privacy || membership.IsInvolvementPrivate ? 'Private' : 'Public'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* CONTENT TWO (Activity Picture) */}
        <Grid
          container
          xs={4}
          sm={3}
          md={3}
          lg={4}
          xl={3}
          className="my-profile-info-card-image"
          alignItems="center"
        >
          <OnlineOnlyLink>
            <img src={membership.ActivityImagePath} alt="" className={isOnline ? 'active' : ''} />
          </OnlineOnlyLink>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default MyProfileActivityList;
