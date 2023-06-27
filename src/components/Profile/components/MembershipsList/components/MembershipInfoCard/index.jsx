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
import LockIcon from '@mui/icons-material/Lock';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { Link } from 'react-router-dom';
import styles from './MembershipInfoCard.module.css';
import membershipService from 'services/membership';
import activity from 'services/activity';
import { useEffect, useState } from 'react';
// import { ArrowDropDown } from '@material-ui/icons';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const PrivacyToggle = ({ element, createSnackbar }) => {
  useEffect(() => {
    async function loadPrivacy() {
      const involvement = await activity.get(element.ActivityCode);
      element.IsInvolvementPrivate = involvement.Privacy;
    }
    loadPrivacy();
  }, [element]);

  const isOnline = useNetworkStatus();

  const [checked] = useState(element.Privacy);

  const toggleMembershipPrivacy = async (element) => {
    try {
      let updated = await membershipService.setMembershipPrivacy(
        element.MembershipID,
        !element.Privacy,
      );
      if (updated.Privacy !== element.Privacy) {
        createSnackbar(membership.Privacy ? 'Membership Shown' : 'Membership Hidden', 'success');
      } else {
        createSnackbar(
          membership.Privacy ? 'Failed to Show Membership' : 'Failed to Hide Membership',
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
        {isOnline && element.IsInvolvementPrivate && <LockIcon />}
        <Switch
          onChange={() => {
            toggleMembershipPrivacy(element);
          }}
          checked={!checked}
          key={element.ActivityDescription + element.ActivityCode}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Typography>
          {element.Privacy || element.IsInvolvementPrivate ? 'Private' : 'Public'}
        </Typography>
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

const MembershipInfoCard = ({ myProf = true, membershipHistory, createSnackbar }) => {
  //the whole list refreshes when privacy changes here
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
                {membershipHistory.Memberships.map((membership) => (
                  <ListItem key={membershipHistory.ActivityCode}>
                    <OnlineOnlyLink element={membership}>
                      <Typography>{membership.SessionDescription}</Typography>
                      <Typography>{membership.ParticipationDescription}</Typography>
                    </OnlineOnlyLink>
                    {true && <PrivacyToggle element={membership} createSnackbar={createSnackbar} />}
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
