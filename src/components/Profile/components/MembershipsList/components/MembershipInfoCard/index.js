import React from 'react';
import classnames from 'classnames';
import { Divider, Grid, List, ListItem, Switch, Typography } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import useNetworkStatus from 'hooks/useNetworkStatus';
import styles from './MembershipInfoCard.module.css';

const MembershipInfoCard = ({ myProf, membership, onTogglePrivacy }) => {
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
      <Grid container alignItems="center" justifyContent="center" className={styles.membership_info_card}>
        <Grid
          container
          item
          xs={8}
          sm={9}
          lg={8}
          xl={9}
          justifyContent="flex-start"
          alignItems="center"
          className={styles.membership_info_card_description}
        >
          <Grid item xs={8}>
            <List>
              <ListItem className={styles.my_profile_info_card_description_text}>
                <OnlineOnlyLink>
                  <Typography fontWeight="fontWeightBold">
                    {membership.ActivityDescription}
                  </Typography>
                  <Typography>{membership.SessionDescription}</Typography>
                  <Typography>{membership.ParticipationDescription}</Typography>
                </OnlineOnlyLink>
              </ListItem>
            </List>
          </Grid>

          {myProf && (
            <Grid container item xs={4} alignItems="center">
              <Grid item xs={12} align="center">
                {isOnline &&
                  (membership.IsInvolvementPrivate ? (
                    <LockIcon className={styles.lock_icon} />
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
          )}
        </Grid>

        <Grid
          container
          item
          xs={4}
          sm={3}
          lg={4}
          xl={3}
          className={styles.membership_info_card_image}
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

export default MembershipInfoCard;
