import React from 'react';
import classnames from 'classnames';
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
} from '@material-ui/core/';
import { Link } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import useNetworkStatus from 'hooks/useNetworkStatus';
import './index.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const MembershipInfoCard = ({ myProf, membership, onTogglePrivacy }) => {
  const isOnline = useNetworkStatus();

  const PriavacyToggle = ({ element }) => {
    return (
      myProf && (
        <Grid container item xs={4} alignItems="center">
          <Grid item xs={12} align="center">
            {isOnline && element.IsInvolvementPrivate ? (
              <LockIcon className="lock-icon" />
            ) : (
              <Switch
                onChange={() => {
                  onTogglePrivacy(element);
                }}
                checked={!element.Privacy}
              />
            )}
          </Grid>
          <Grid item xs={12} align="center">
            <Typography>
              {element.Privacy || element.IsInvolvementPrivate ? 'Private' : 'Public'}
            </Typography>
          </Grid>
        </Grid>
      )
    );
  };

  const OnlineOnlyLink = ({ children, element }) => {
    const linkclass = classnames({
      'gc360-link': isOnline,
      'private-membership': membership.IsInvolvementPrivate || membership.Privacy,
      'public-membership': !(membership.IsInvolvementPrivate || membership.Privacy),
    });
    if (isOnline) {
      return (
        <ListItem key={element.ActivityCode + element.SessionCode}>
          <Link
            linkclass="gc360-link"
            to={`/activity/${element.SessionCode}/${element.ActivityCode}`}
          >
            {children}
          </Link>
        </ListItem>
      );
    } else {
      console.log('oh no, no internet :(');
      return (
        <List>
          {membership.map((element) => (
            <ListItem>
              <div>
                {element.SessionDescription + ' (' + element.ParticipationDescription + ')'}
              </div>
            </ListItem>
          ))}
        </List>
      );
    }
  };

  return (
    <>
      <Grid container alignItems="center" justify="center" className="membership-info-card">
        <Grid
          container
          item
          xs={8}
          sm={9}
          lg={8}
          xl={9}
          justify="flex-start"
          alignItems="center"
          className="membership-info-card-description"
        >
          <Grid item xs={8}>
            <List>
              <ListItem className="my-profile-info-card-description-text">
                <Accordion TransitionProps= {{unmountOnExit: false}}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight="fontWeightBold">
                      {membership[0].ActivityDescription}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container>
                      <List>
                        {membership.map((element) => {
                          return(
                            <>
                          <OnlineOnlyLink element={element}>
                            {element.SessionDescription +
                              ' (' +
                              element.ParticipationDescription +
                              ')'}
                          </OnlineOnlyLink>
                          <PriavacyToggle element={element}>
                            {element}
                          </PriavacyToggle>
                          </>
                          )
                        })}
                      </List>
                    </Grid>
                  </AccordionDetails>
                  <Typography>{membership.ParticipationDescription}</Typography>
                </Accordion>
              </ListItem>
            </List>
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={4}
          sm={3}
          lg={4}
          xl={3}
          className="membership-info-card-image"
          alignItems="center"
        >
          {/* <OnlineOnlyLink> */}
          <img src={membership[0].ActivityImagePath} alt="" className={isOnline ? 'active' : ''} />
          {/* </OnlineOnlyLink> */}
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default MembershipInfoCard;
