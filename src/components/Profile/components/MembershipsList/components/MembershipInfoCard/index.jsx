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

const PrivacyToggle = ({ element, createSnackbar, changeStatus }) => {
  useEffect(() => {
    console.log('HERE');
    async function loadPrivacy() {
      const involvement = await activity.get(element.ActivityCode);
      element.IsInvolvementPrivate = involvement.Privacy;
    }
    loadPrivacy();
  }, [element]);

  // const [reload, setReload] = useState(false);

  // useEffect(() => {
  //   if ()
  // }, [reload])

  // useEffect(() => {
  //   changeStatus((val) => !val);
  // }, [element.Privacy]);

  // const isOnline = useNetworkStatus();

  const [checked] = useState(element.Privacy);

  const toggleMembershipPrivacy = async (element) => {
    // debugger;
    try {
      console.log('before');
      console.log('Privacy:', element.Privacy);
      const update = await membershipService.setMembershipPrivacy(
        element.MembershipID,
        !element.Privacy,
      );

      changeStatus(element);
      // changePrivacy(!element.Privacy);
      // setReload(!reload);
      //rerender();
      element.Privacy = !element.Privacy;
      // useEffect(() => {
      //   changeStatus((val) => !val);
      // }, []);
      // changeStatus(element);

      console.log('after');
      console.log('Privacy:', element.Privacy);

      //changeStatus(element.MembershipID);

      if (update.Privacy === element.Privacy) {
        createSnackbar(element.Privacy ? 'Membership Hidden' : 'Membership Shown', 'success');
        setReload(!reload);
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
          onChange={() => {
            toggleMembershipPrivacy(element);
          }}
          checked={!checked}
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
  // const [showPrivate, setShowPrivacy] = useState(element.IsInvolvementPrivate || element.Privacy);
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
  //the whole list refreshes when privacy changes here
  const isOnline = useNetworkStatus();
  const [reload, setReload] = useState(false);
  const [localMembershipHistory, setMembershipHistory] = useState(membershipHistory);
  // console.log(membershipHistory);

  const callBackFunction = ({ change }) => {
    console.log('before LMH ', localMembershipHistory.change.Privacy);

    setMembershipHistory(
      ...localMembershipHistory,
      change,
      // localMembershipHistory.find((m) => m.MembershipID === change.MembershipID)
      // localMembershipHistory.map((mem) => {
      //   if ((mem.MembershipID = change.MembershipID)) {
      //     mem.Privacy = change.Privacy;
      //   }
      // }),
    );
    //localMembershipHistory.change.Privacy = !localMembershipHistory.change.Privacy;
    console.log('after LMH ', localMembershipHistory.change.Privacy);
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
                    {myProf && (
                      <PrivacyToggle
                        element={membership}
                        createSnackbar={createSnackbar}
                        changeStatus={callBackFunction}
                      />
                    )}
                    {/* {myProf && (
                      <Grid container item xs={4} alignItems="center">
                        <Grid item xs={12} align="center">
                          <Switch
                            onChange={() => {
                              toggleMembershipPrivacy(membership);
                            }}
                            checked={!checked}
                            key={membership.ActivityDescription + membership.ActivityCode}
                          />
                        </Grid>
                        <Grid item xs={12} align="center">
                          <Typography>{membership.Privacy ? 'Private' : 'Public'}</Typography>
                        </Grid>
                      </Grid>
                    )} */}
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
