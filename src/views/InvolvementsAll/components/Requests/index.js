import { useEffect, useState } from 'react';
import {
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import parseISO from 'date-fns/parseISO';
import userService from 'services/user';
import RequestReceived from './components/RequestsReceived';
import RequestSent from './components/RequestSent';
import styles from './Requests.module.css';

const Requests = () => {
  const [requestsSent, setRequestsSent] = useState([]);
  const [involvementsLeading, setInvolvementsLeading] = useState([]);

  useEffect(() => {
    const loadRequests = async () => {
      const id = userService.getLocalInfo().id;
      setInvolvementsLeading(await userService.getLeaderPositions(id));
      setRequestsSent(await userService.getSentMembershipRequests());
    };
    loadRequests();
  }, []);

  const handleCancelRequest = (request) => {
    setRequestsSent((prevRequestsSent) => prevRequestsSent.filter((r) => r !== request));
  };

  // if leading involvements, show two dropdowns for requests received/sent
  if(involvementsLeading?.length > 0) {
    return (
      <Grid item xs={12} lg={8}>
          <Card className={styles.requests}>
            <CardHeader title="Membership Requests" className={styles.requests_header} />
            
            <CardContent>
              <Accordion>
                <AccordionSummary
                  aria-controls="received-requests-content"
                  expandIcon={<ExpandMore style={{ color: 'white' }} />}
                  className={styles.requests_header}
                >
                  <Typography variant="h6">Requests Received</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ flexDirection: 'column' }}>
                  {involvementsLeading.map((involvement) => (
                    <RequestReceived
                      key={involvement.ActivityCode + involvement.SessioinCode}
                      involvement={involvement}
                    />
                  ))}
                </AccordionDetails>
              </Accordion>
    
              <Accordion>
                <AccordionSummary
                  aria-controls="sent-requests-content"
                  expandIcon={<ExpandMore style={{ color: 'white' }} />}
                  className={styles.requests_header}
                >
                  <Typography variant="h6">Requests Sent</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container align="right" direction="row">
                    {requestsSent?.length > 0 ? (
                      requestsSent
                        .sort((a, b) => parseISO(b.DateSent) - parseISO(a.DateSent))
                        .map((request) => (
                          <RequestSent
                            member={request}
                            key={request.RequestID}
                            onCancel={handleCancelRequest}
                          />
                        ))
                    ) : (
                      <Typography variant="h6">You haven't sent any requests</Typography>
                    )}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
      </Grid>
    );
  }
  // otherwise just show the requests sent (if there are any)
  else if(requestsSent?.length > 0) {
    return (
      <Grid item xs={12} lg={8}>
        <Card className={styles.requests}>
          <Accordion defaultExpanded>
            <AccordionSummary
              aria-controls="received-requests-content"
              expandIcon={<ExpandMore style={{ color: 'white' }} />}
              className={styles.requests_header}
            >
              <CardHeader 
                title="Membership Requests"
                className={styles.requests_header}
                  style={{padding: 0}} 
              />
            </AccordionSummary>
            <AccordionDetails style={{ flexDirection: 'column' }}>
              <CardContent>
                <Grid container align="right" direction="row">
                  {requestsSent?.length > 0 ? (
                    requestsSent
                      .sort((a, b) => parseISO(b.DateSent) - parseISO(a.DateSent))
                      .map((request) => (
                        <RequestSent
                          member={request}
                          key={request.RequestID}
                          onCancel={handleCancelRequest}
                        />
                      ))
                  ) : (
                    <Typography variant="h6">You haven't sent any requests</Typography>
                  )}
                </Grid>
              </CardContent>
            </AccordionDetails>
          </Accordion>
        </Card>
      </Grid>
    );
  }
  // otherwise hide component entirely since we have no requests
  return null;
};

export default Requests;
