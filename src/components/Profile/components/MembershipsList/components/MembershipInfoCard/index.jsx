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
import { element } from 'prop-types';

const PrivacyToggle = ({ element, createSnackbar, changeStatus }) => {
  useEffect(() => {
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

  const toggleMembershipPrivacy = async (element) => {
    debugger;
    try {
      console.log('before');
      console.log('Privacy:', element.Privacy);
      const update = await membershipService.setMembershipPrivacy(
        element.MembershipID,
        !element.Privacy,
      );

      element.Privacy = !element.Privacy;

      console.log('after');
      console.log('Privacy:', element.Privacy);

      if (update.Privacy === element.Privacy) {
        createSnackbar(element.Privacy ? 'Membership Hidden' : 'Membership Shown', 'success');
        // try {
        //   changeStatus(element);
        // } catch (e) {
        //   console.error(e);
        //   createSnackbar('callback not right', 'error');
        // }
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

const MembershipInfoCard = ({
  myProf,
  membershipHistory,
  createSnackbar,
  changeState,
  state,
  firstIndex,
}) => {
  //the whole list refreshes when privacy changes here
  const isOnline = useNetworkStatus();
  const [localMembershipHistory, setMembershipHistory] = useState(membershipHistory);

  const callBackFunction = (change) => {
    debugger;
    console.log('change', change);
    console.log('localMembershipHisory ', localMembershipHistory);
    let index;
    localMembershipHistory.Memberships.map((mem, i) => {
      if (mem.MembershipID === change.MembershipID) {
        index = i;
        mem.Privacy = change.Privacy;
        console.log('after LMH mem', localMembershipHistory.mem);
      }
    });
    console.log('index ', index);
    console.log(
      'localMembershipHistory.Memberships[index] ',
      localMembershipHistory.Memberships[index],
    );

    // setMembershipHistory(
    //   // ...membershipHistory,
    //   // // (membershipHistory.Memberships = change),
    //   // (membershipHistory.Memberships = change),
    //   (membershipHistory.Memberships[index] = change),
    //   //   membershipHistory.Memberships.map((mem, i) => {
    //   //     if (mem.MembershipID === change.MembershipID) {
    //   //       mem.Privacy = change.Privacy;
    //   //     }
    //   //   }),
    // );

    // changeState(...state, (state[firstIndex].Memberships[index] = change));
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
                {membershipHistory.Memberships.map((session) => (
                  <ListItem key={membershipHistory.ActivityCode}>
                    <OnlineOnlyLink element={session}>
                      <Typography>{session.SessionDescription}</Typography>
                      <Typography>{session.ParticipationDescription}</Typography>
                    </OnlineOnlyLink>
                    {myProf && (
                      <PrivacyToggle
                        element={session}
                        createSnackbar={createSnackbar}
                        //changeStatus={callBackFunction}
                        changeStatus={callBackFunction}
                      />
                    )}
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
