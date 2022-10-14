import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { formatDistanceToNow } from 'date-fns';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import requestService from 'services/request';
import { gordonColors } from 'theme';

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

const RequestsReceived = ({ onAddMember }) => {
  const classes = useStyles();
  const [requests, setRequests] = useState([]);
  const { involvementCode, sessionCode } = useParams();

  useEffect(() => {
    requestService.getPendingRequests(involvementCode, sessionCode).then(setRequests);
  }, [involvementCode, sessionCode]);

  const onApprove = async (id) => {
    await requestService.approveRequest(id);
    setRequests((prevRequests) => prevRequests.filter((r) => r.RequestID !== id));
    onAddMember();
  };

  const onDeny = async (id) => {
    await requestService.denyRequest(id);
    setRequests((prevRequests) => prevRequests.filter((r) => r.RequestID !== id));
  };

  if (requests.length === 0) {
    return <Typography variant="h6">No pending requests</Typography>;
  } else {
    return (
      <List>
        {requests.map((request) => (
          <Fragment key={request.RequestID}>
            <ListItem
              key={request.RequestID}
              classes={{ secondaryAction: classes.secondaryAction }}
            >
              <ListItemText
                primary={`${request.FirstName} ${request.LastName} - ${request.ParticipationDescription}`}
                secondary={`${formatDistanceToNow(new Date(request.DateSent))} - ${
                  request.Description
                }`}
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
          </Fragment>
        ))}
      </List>
    );
  }
};

export default RequestsReceived;
