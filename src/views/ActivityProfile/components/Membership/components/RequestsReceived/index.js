import React, { useState, useEffect } from 'react';

import { gordonColors } from 'theme';
import membership from 'services/membership';

import {
  Button,
  Typography,
  Divider,
  List,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
  makeStyles,
} from '@material-ui/core';

const redButton = {
  color: gordonColors.secondary.red,
};

const useStyles = makeStyles(
  {
    secondaryAction: {
      paddingRight: 155,
    },
  },
  { name: 'MuiListItem' },
);

const RequestsReceived = ({ involvement }) => {
  const [requests, setRequests] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const loadRequests = async () => {
      setRequests(await membership.getRequests(involvement.ActivityCode, involvement.SessionCode));
    };
    loadRequests();
  }, [involvement.ActivityCode, involvement.SessionCode]);

  const onApprove = async (id) => {
    await membership.approveRequest(id);
    setRequests((prevRequests) => prevRequests.filter((r) => r.RequestID !== id));
  };

  const onDeny = async (id) => {
    await membership.denyRequest(id);
    setRequests((prevRequests) => prevRequests.filter((r) => r.RequestID !== id));
  };

  if (requests.length === 0) {
    return <Typography>No requests to show</Typography>;
  } else {
    return (
      <List>
        {requests.reverse().map((request) => (
          <React.Fragment key={request.RequestID}>
            <ListItem key={request.RequestID} classes={classes.secondaryAction}>
              <ListItemText
                primary={`${request.FirstName} ${request.LastName} - ${request.ParticipationDescription}`}
                secondary={`${membership.getDiffDays(request.DateSent)} - ${request.CommentText}`}
              />

              <ListItemSecondaryAction>
                <Button style={redButton} onClick={() => onDeny(request.RequestID)} size="small">
                  Deny
                </Button>
                &emsp;
                <Button color="primary" onClick={() => onApprove(request.RequestID)} size="small">
                  Approve
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    );
  }
};

export default RequestsReceived;
