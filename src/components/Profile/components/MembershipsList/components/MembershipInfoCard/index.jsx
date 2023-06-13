import { Divider, Grid, List, ListItem, Switch, Typography } from '@mui/material/';
import LockIcon from '@mui/icons-material/Lock';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { Link } from 'react-router-dom';
import styles from './MembershipInfoCard.module.css';
import { newTheme } from 'theme';

const MembershipInfoCard = ({ myProf, membership, onTogglePrivacy }) => {
  const isOnline = useNetworkStatus();

  const OnlineOnlyLink = ({ children }) => {
    const showPrivate = membership.IsInvolvementPrivate || membership.Privacy;
    if (isOnline) {
      return (
        <Link
          className={`gc360_text_link ${
            showPrivate ? styles.private_membership : styles.public_membership
          }`}
          style={{
            color: newTheme.colorSchemes.light.palette.primary[300],
          }}
          to={`/activity/${membership.SessionCode}/${membership.ActivityCode}`}
        >
          {children}
        </Link>
      );
    } else {
      return (
        <div className={`${showPrivate ? styles.private_membership : styles.public_membership}`}>
          {children}
        </div>
      );
    }
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        className={styles.membership_info_card}
      >
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
            <img
              src={membership.ActivityImagePath}
              alt=""
              className={isOnline ? styles.active : ''}
            />
          </OnlineOnlyLink>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default MembershipInfoCard;
