import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import GordonLoader from 'components/Loader';
import parseISO from 'date-fns/parseISO';
import { useEffect, useState } from 'react';
import membershipService, { Participation } from 'services/membership';
import requestService from 'services/request';
import RequestSent from './components/RequestSent';
import RequestReceived from './components/RequestsReceived';
import styles from './Requests.module.css';

const Requests = ({ profile, session }) => {
  const [loading, setLoading] = useState(true);
  const [requestsSent, setRequestsSent] = useState([]);
  const [involvementsLeading, setInvolvementsLeading] = useState([]);

  useEffect(() => {
    Promise.all([
      membershipService
        .get({
          username: profile.AD_Username,
          sessionCode: session,
          participationTypes: Participation.GroupAdmin,
        })
        .then(setInvolvementsLeading),
      requestService.getSentMembershipRequests().then(setRequestsSent),
    ]).then(() => setLoading(false));
  }, [profile, session]);

  const handleCancelRequest = (request) => {
    setRequestsSent((prevRequestsSent) => prevRequestsSent.filter((r) => r !== request));
  };

  let content;
  if (loading) {
    content = <GordonLoader />;
  } else if (involvementsLeading?.length > 0) {
    content = (
      <>
        <CardHeader title="Membership Requests" className={styles.requests_header} />
        <CardContent>
          <Accordion>
            <AccordionSummary
              aria-controls="received-requests-content"
              expandIcon={<ExpandMore className={styles.requests_expand_icon} />}
              className={styles.requests_header}
            >
              <Typography variant="h6">Requests Received</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ flexDirection: 'column' }}>
              {involvementsLeading.map((involvement) => (
                <RequestReceived
                  key={involvement.ActivityCode + involvement.SessionCode}
                  involvement={involvement}
                />
              ))}
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              aria-controls="sent-requests-content"
              expandIcon={<ExpandMore className={styles.requests_expand_icon} />}
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
      </>
    );
  } else {
    content = (
      <>
        <Accordion defaultExpanded>
          <AccordionSummary
            aria-controls="received-requests-content"
            expandIcon={<ExpandMore className={styles.requests_expand_icon} />}
            className={styles.requests_header}
          >
            <CardHeader
              title="Membership Requests"
              className={styles.requests_header}
              style={{ padding: 0 }}
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
      </>
    );
  }

  return (
    <Grid item xs={12} lg={8}>
      <Card className={styles.requests}>{content}</Card>
    </Grid>
  );
};

export default Requests;
