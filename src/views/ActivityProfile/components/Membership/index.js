import React, { useState, useEffect } from 'react';

import membershipService from 'services/membership';
import GordonLoader from 'components/Loader';
import GordonSnackbar from 'components/Snackbar';
import MemberList from './components/MemberList';
import { gordonColors } from 'theme';

import {
  Button,
  Card,
  CardActions,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  FormControl,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  CardHeader,
} from '@material-ui/core';
import AdminCard from './components/AdminCard';

const Membership = ({
  status,
  isAdmin,
  isSuperAdmin,
  activityCode,
  id,
  sessionInfo,
  members,
  activityDescription,
}) => {
  const [openJoin, setOpenJoin] = useState(false);
  const [participationCode, setParticipationCode] = useState('');
  const [titleComment, setTitleComment] = useState('');
  const [participationDetail, setParticipationDetail] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, text: '', severity: '' });
  const [loading, setLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 810);

  useEffect(() => {
    const loadMembers = async () => {
      setLoading(true);
      try {
        const participationDetail = await membershipService.search(
          id,
          sessionInfo.SessionCode,
          activityCode,
        );
        setParticipationDetail(participationDetail);

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    loadMembers();
  }, [activityCode, id, isAdmin, sessionInfo.SessionCode]);

  useEffect(() => {
    const resize = () => {
      setIsMobileView(window.innerWidth < 810);
    };

    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  });

  const createSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const onClose = () => {
    setOpenJoin(false);
    setParticipationCode('');
    setTitleComment('');
  };

  const onRequest = async () => {
    let date = new Date();
    let data = {
      ACT_CDE: activityCode,
      SESS_CDE: sessionInfo.SessionCode,
      ID_NUM: id,
      PART_CDE: participationCode,
      DATE_SENT: date.toLocaleString(),
      COMMENT_TXT: titleComment,
      APPROVED: 'Pending',
    };
    await membershipService.requestMembership(data);
    onClose();
    createSnackbar('Request sent, awaiting approval from a group leader', 'success');
    //Used to call refresh() here, but it caused requests not to go through
  };

  const onSubscribe = async () => {
    let data = {
      ACT_CDE: activityCode,
      SESS_CDE: sessionInfo.SessionCode,
      ID_NUM: id,
      PART_CDE: 'GUEST',
      COMMENT_TXT: 'Subscriber',
      GRP_ADMIN: false,
    };
    await membershipService.addMembership(data);
    refresh();
  };

  // Called when Unsubscribe button clicked
  const onUnsubscribe = async () => {
    let participationDescription = participationDetail[2];
    await membershipService.remove(participationDescription);
    setParticipationDetail([false, false, null]);
  };

  const refresh = () => {
    window.location.reload();
  };

  // Compare members initially by last name, then by first name, A-Z
  const compareFunction = (a, b) => {
    if (a.LastName.toUpperCase() < b.LastName.toUpperCase()) {
      return -1;
    }
    if (a.LastName.toUpperCase() > b.LastName.toUpperCase()) {
      return 1;
    }
    if (a.FirstName.toUpperCase() < b.FirstName.toUpperCase()) {
      return -1;
    }
    if (a.FirstName.toUpperCase() > b.FirstName.toUpperCase()) {
      return 1;
    }
    return 0;
  };

  let content;
  let isActivityClosed = status === 'CLOSED';
  let header;
  const headerStyle = {
    backgroundColor: gordonColors.primary.blue,
    color: '#FFF',
    padding: '10px',
  };

  if (loading === true) {
    return <GordonLoader />;
  } else {
    if ((participationDetail[0] && participationDetail[1] !== 'Guest') || isSuperAdmin) {
      // User is in activity and not a guest (unless user is superadmin [god mode])
      if (isAdmin || isSuperAdmin) {
        header = (
          <CardHeader
            title={
              <Grid container direction="row">
                <Grid item xs={2}>
                  Name
                </Grid>
                <Grid item xs={2}>
                  Participation
                </Grid>
                <Grid item xs={3}>
                  Title/Comment
                </Grid>
                <Grid item xs={2}>
                  Mail #
                </Grid>
                <Grid item xs={3}>
                  Admin
                </Grid>
              </Grid>
            }
            titleTypographyProps={{ variant: 'h6' }}
            style={headerStyle}
          />
        );
      } else {
        header = (
          <CardHeader
            title={
              <Grid container direction="row">
                <Grid item xs={4}>
                  Name
                </Grid>
                <Grid item xs={4}>
                  Participation
                </Grid>
                <Grid item xs={4}>
                  Mail #
                </Grid>
              </Grid>
            }
            style={headerStyle}
          />
        );
      }
      if (isMobileView) {
        header = <CardHeader title="Members" style={headerStyle} />;
      }
      content = (
        <>
          {(isAdmin || isSuperAdmin) && (
            <AdminCard
              activityCode={activityCode}
              activityDescription={activityDescription}
              createSnackbar={createSnackbar}
              isActivityClosed={isActivityClosed}
              sessionCode={sessionInfo.SessionCode}
              participationLevel={participationDetail[1]}
              isSuperAdmin={isSuperAdmin}
            />
          )}
          <Card>
            {header}
            {members
              .sort((a, b) => compareFunction(a, b))
              .map((groupMember) => (
                <MemberList member={groupMember} admin={isAdmin} key={groupMember.MembershipID} />
              ))}
          </Card>
        </>
      );
    } else {
      content = (
        <>
          <CardActions>
            {participationDetail[1] === 'Guest' ? (
              <Button variant="contained" color="primary" onClick={onUnsubscribe}>
                Unsubscribe
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                disabled={isActivityClosed}
                onClick={onSubscribe}
              >
                Subscribe
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              disabled={isActivityClosed}
              onClick={() => setOpenJoin(true)}
            >
              Join
            </Button>
          </CardActions>

          <Dialog open={openJoin} keepMounted>
            <DialogTitle>Join {activityDescription}</DialogTitle>
            <DialogContent>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <FormControl variant="filled" fullWidth>
                    <InputLabel id={`involvement-profile-join-${activityDescription}`}>
                      Participation
                    </InputLabel>
                    <Select
                      required
                      value={participationCode}
                      onChange={(event) => setParticipationCode(event.target.value)}
                      labelId={`involvement-profile-join-${activityDescription}`}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="ADV">Advisor</MenuItem>
                      <MenuItem value="LEAD">Leader</MenuItem>
                      <MenuItem value="MEMBR">Member</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <TextField
                    variant="filled"
                    label="Title/Comment"
                    fullWidth
                    onChange={(event) => setTitleComment(event.target.value)}
                  />
                </Grid>
              </Grid>

              <DialogActions>
                <Button onClick={onClose} variant="contained" color="primary">
                  Cancel
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={!participationCode}
                  onClick={onRequest}
                >
                  Submit
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </>
      );
    }
  }
  return (
    <>
      {content}

      <GordonSnackbar
        {...snackbar}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      />
    </>
  );
};

export default Membership;
