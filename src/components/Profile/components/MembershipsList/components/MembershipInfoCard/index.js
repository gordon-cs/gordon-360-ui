import React from 'react';
import classnames from 'classnames';
import {
  Divider,
  Grid,
  List,
  ListItem,
  Switch,
  Typography,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanel,
} from '@material-ui/core/';
import { Link } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import useNetworkStatus from 'hooks/useNetworkStatus';
import './index.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const MembershipInfoCard = ({ myProf, membership, onTogglePrivacy }) => {
  const isOnline = useNetworkStatus();

  const OnlineOnlyLink = ({ children }) => {
    const linkClass = classnames({
      'gc360-link': isOnline,
      'private-membership': membership.IsInvolvementPrivate || membership.Privacy,
      'public-membership': !(membership.IsInvolvementPrivate || membership.Privacy),
    });
    if (isOnline) {
      <Link to={`/activity/${children.SessionCode}/${children.ActivityCode}`}>
    </Link>
      return <div>{children}</div>;
    } else {
      return <div className={linkClass}>{children}</div>;
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
                <OnlineOnlyLink>
                  <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography fontWeight="fontWeightBold">
                        {membership[0].ActivityDescription}
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <List>
                        {membership.map((element) => (
                          <ListItem>
                            <Link to={`/activity/${element.SessionCode}/${element.ActivityCode}`}>
                              {element.SessionDescription +
                                ' (' +
                                element.ParticipationDescription +
                                ')'}
                            </Link>
                          </ListItem>
                        ))}
                      </List>
                    </ExpansionPanelDetails>
                    <Typography>{membership.ParticipationDescription}</Typography>
                  </ExpansionPanel>
                </OnlineOnlyLink>
              </ListItem>
            </List>
          </Grid>

          {myProf && (
            <Grid container item xs={4} alignItems="center">
              <Grid item xs={12} align="center">
                {isOnline &&
                  (membership[0].IsInvolvementPrivate ? (
                    <LockIcon className="lock-icon" />
                  ) : (
                    <Switch
                      onChange={() => {
                        membership.map((element) => onTogglePrivacy(element));
                      }}
                      checked={!membership[0].Privacy}
                    />
                  ))}
              </Grid>
              <Grid item xs={12} align="center">
                <Typography>
                  {membership[0].Privacy || membership[0].IsInvolvementPrivate
                    ? 'Private'
                    : 'Public'}
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
          className="membership-info-card-image"
          alignItems="center"
        >
          <OnlineOnlyLink>
            <img
              src={membership[0].ActivityImagePath}
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
