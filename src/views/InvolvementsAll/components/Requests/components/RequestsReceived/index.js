import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Button,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { formatDistanceToNow } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import { Fragment, useEffect, useState } from 'react';
import requestService from 'services/request';
import styles from './RequestsReceived.module.css';

const RequestReceived = ({ involvement }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    requestService
      .getPendingRequests(involvement.ActivityCode, involvement.SessionCode)
      .then(setRequests);
  }, [involvement]);

  const onApprove = async (id) => {
    await requestService.approveRequest(id);
    setRequests((prevRequests) => prevRequests.filter((r) => r.RequestID !== id));
  };

  const onDeny = async (id) => {
    await requestService.denyRequest(id);
    setRequests((prevRequests) => prevRequests.filter((r) => r.RequestID !== id));
  };

  const title = <Typography variant="h6">{involvement.ActivityDescription}</Typography>;

  return (
    <Accordion className={styles.requests_received}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {requests.length > 0 ? (
          <Badge color="error" badgeContent={requests.length}>
            {title}
          </Badge>
        ) : (
          title
        )}
      </AccordionSummary>
      <AccordionDetails className={styles.requests_received_list}>
        {requests?.length > 0 ? (
          <List>
            {requests
              .sort((a, b) => parseISO(b.DateSent) - parseISO(a.DateSent))
              .map((request) => (
                <Fragment key={request.RequestID}>
                  <ListItem key={request.RequestID}>
                    <ListItemText
                      primary={`${request.FirstName} ${request.LastName} - ${request.ParticipationDescription}`}
                      secondary={`${formatDistanceToNow(new Date(request.DateSent))} - ${
                        request.CommentText
                      }`}
                    />

                    <ListItemSecondaryAction>
                      <Button
                        className={styles.deny_request_button}
                        onClick={() => onDeny(request.RequestID)}
                        size="small"
                      >
                        Deny
                      </Button>
                      &emsp;
                      <Button
                        color="primary"
                        onClick={() => onApprove(request.RequestID)}
                        size="small"
                      >
                        Approve
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </Fragment>
              ))}
          </List>
        ) : (
          <Typography variant="body2" className={styles.message_text}>
            No Requests to Show
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default RequestReceived;
