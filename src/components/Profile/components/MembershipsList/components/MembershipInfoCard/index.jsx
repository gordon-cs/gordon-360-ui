import {
  Divider,
  Grid,
  List,
  ListItem,
  Switch,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material/';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { Link } from 'react-router-dom';
import styles from './MembershipInfoCard.module.css';
import membershipService from 'services/membership';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const PrivacyToggle = ({ element, createSnackbar }) => {
  const toggleMembershipPrivacy = async (element) => {
    try {
      const update = await membershipService.setMembershipPrivacy(
        element.MembershipID,
        !element.Privacy,
      );
      element.Privacy = !element.Privacy;

      if (update.Privacy === element.Privacy) {
        createSnackbar(element.Privacy ? 'Membership Hidden' : 'Membership Shown', 'success');
      } else {
        createSnackbar(
          element.Privacy ? 'Failed to Show Membership' : 'Failed to Hide Membership',
          'error',
        );
      }
    } catch {
      createSnackbar('Privacy Change Failed', 'error');
    }
  };

  return (
    <Grid container item xs={4} alignItems="center">
      <Grid item xs={12} align="center">
        <Switch
          onChange={() => 
            toggleMembershipPrivacy(element);
          }
          checked={!element.Privacy}
          key={element.ActivityDescription + element.ActivityCode}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Typography>{element.Privacy ? 'Private' : 'Public'}</Typography>
      </Grid>
    </Grid>
  );
};

const OnlineOnlyLink = ({ element, children }) => {
  const isOnline = useNetworkStatus();
  const showPrivate = element.IsInvolvementPrivate || element.Privacy;
  if (isOnline) {
    return (
      <Link
        className={`gc360_text_link ${
          showPrivate ? styles.private_membership : styles.public_membership
        }`}
        to={`/activity/${element.SessionCode}/${element.ActivityCode}`}
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

const MembershipInfoCard = ({ myProf, membershipHistory, createSnackbar }) => {
  const isOnline = useNetworkStatus();
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        className={styles.membership_info_card}
      >
        <Grid
          item
          xs={9}
          sm={10}
          lg={9}
          xl={10}
          className={styles.membership_info_card_description}
        >
          <Accordion>
            <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
              <Typography fontWeight="fontWeightBold">
                {membershipHistory.ActivityDescription}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {membershipHistory.Memberships.map((session) => (
                  <ListItem key={membershipHistory.ActivityCode}>
                    <Grid container xs={12} className={styles.membership_info_card_description}>
                      <Grid item xs={7}>
                        <OnlineOnlyLink element={session}>
                          <Typography>{session.SessionDescription}</Typography>
                          <Typography>{session.ParticipationDescription}</Typography>
                        </OnlineOnlyLink>
                      </Grid>
                      <Grid item xs={4}>
                        {myProf && (
                          <PrivacyToggle element={session} createSnackbar={createSnackbar} />
                        )}
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid
          item
          xs={3}
          sm={2}
          lg={3}
          xl={2}
          className={styles.membership_info_card_image}
          alignItems="center"
          container
        >
          <OnlineOnlyLink element={membershipHistory.Memberships[0]}>
            <img
              src={membershipHistory.ActivityImagePath}
              alt=""
              className={isOnline ? 'active' : ''}
            />
          </OnlineOnlyLink>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default MembershipInfoCard;
