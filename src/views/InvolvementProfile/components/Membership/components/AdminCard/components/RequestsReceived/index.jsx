import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import requestService from 'services/request';
import styles from './RequestsReceived.module.css';

const RequestsReceived = ({ onAddMember }) => {
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
            <ListItem key={request.RequestID} classes={{ secondaryAction: styles.secondaryAction }}>
              <ListItemText
                primary={`${request.FirstName} ${request.LastName} - ${request.ParticipationDescription}`}
                secondary={`${formatDistanceToNow(new Date(request.DateSent))} - ${
                  request.Description
                }`}
              />

              <ListItemSecondaryAction>
                <Button
                  className={styles.redButton}
                  onClick={() => onDeny(request.RequestID)}
                  size="small"
                >
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
