import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import parseISO from 'date-fns/parseISO';
import {
  Button,
  Grid,
  Typography,
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
} from '@material-ui/core';
import membershipService from 'services/membership';
import './requests-received.css';

const RequestReceived = ({ involvement }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const loadRequests = async () => {
      setRequests(
        await membershipService.getRequests(involvement.ActivityCode, involvement.SessionCode),
      );
    };

    loadRequests();
  }, [involvement]);

  const onApprove = async (id) => {
    await membershipService.approveRequest(id);
    setRequests((prevRequests) => prevRequests.filter((r) => r.RequestID !== id));
  };

  const onDeny = async (id) => {
    await membershipService.denyRequest(id);
    setRequests((prevRequests) => prevRequests.filter((r) => r.RequestID !== id));
  };

  const title = <Typography variant="h6">{involvement.ActivityDescription}</Typography>;

  return (
    <Accordion className="requests-received">
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {requests.length > 0 ? (
          <Badge color="error" badgeContent={requests.length}>
            {title}
          </Badge>
        ) : (
          title
        )}
      </AccordionSummary>
      <AccordionDetails className="requests-received-list">
        {requests?.length > 0 ? (
          requests
            .sort((a, b) => parseISO(b.DateSent) - parseISO(a.DateSent))
            .map((request) => (
              <Grid key={request.RequestID} container direction="row" spacing={2}>
                <Grid item xs={4}>
                  <Typography>
                    {request.FirstName} {request.LastName}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <span className="weak">{membershipService.getDiffDays(request.DateSent)}</span>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>{request.ParticipationDescription} </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>{request.CommentText}</Typography>
                </Grid>
                <Grid item xs={8} container spacing={1} justify="flex-end">
                  <Grid item>
                    <Button
                      variant="contained"
                      className="deny-request-button"
                      onClick={() => onDeny(request.RequestID)}
                      size="small"
                    >
                      Deny
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onApprove(request.RequestID)}
                      size="small"
                    >
                      Approve
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
            ))
        ) : (
          <Typography variant="body2" className="message_text">
            No Requests to Show
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default RequestReceived;
