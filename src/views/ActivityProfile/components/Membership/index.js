import React, { useState, useEffect } from 'react';

import involvementService from 'services/activity';
import membershipService from 'services/membership';
import GordonLoader from 'components/Loader';
import GordonSnackbar from 'components/Snackbar';
import MemberList from './components/MemberList';
import RequestsReceived from './components/RequestsReceived';
import { gordonColors } from 'theme';
import AddPersonIcon from '@material-ui/icons/PersonAdd';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  CardHeader,
} from '@material-ui/core';

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
  const [openAddMember, setOpenAddMember] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const [participationCode, setParticipationCode] = useState('');
  const [titleComment, setTitleComment] = useState('');
  const [participationDetail, setParticipationDetail] = useState([]);
  const [addEmail, setAddEmail] = useState('');
  const [requests, setRequests] = useState([]);
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

        if (isAdmin) {
          // Not necessary, but good security to have
          const requests = await membershipService.getRequests(
            activityCode,
            sessionInfo.SessionCode,
          );

          setRequests(requests);
        }
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

  const onConfirmRoster = async () => {
    await involvementService.closeActivity(activityCode, sessionInfo.SessionCode);
    refresh();
  };

  const onReopenActivity = async () => {
    await involvementService.reopenActivity(activityCode, sessionInfo.SessionCode);
    refresh();
  };

  const onClose = () => {
    setOpenAddMember(false);
    setOpenJoin(false);
    setParticipationCode('');
    setTitleComment('');
  };

  const onAddMember = async () => {
    let memberEmail = addEmail;
    if (!memberEmail.toLowerCase().includes('@gordon.edu')) {
      memberEmail = memberEmail + '@gordon.edu';
    }

    try {
      let addID = await membershipService.getEmailAccount(memberEmail).then(function (result) {
        return result.GordonID;
      });
      let data = {
        ACT_CDE: activityCode,
        SESS_CDE: sessionInfo.SessionCode,
        ID_NUM: addID,
        PART_CDE: participationCode,
        COMMENT_TXT: titleComment,
        GRP_ADMIN: false,
      };
      // if a user is already a member of an involvement, attempting addMembership(data)
      //  will return 'undefined'. So, if this happens, alert the user
      let alreadyIn = await membershipService.addMembership(data);
      if (typeof alreadyIn === 'undefined') {
        // User is already a member of this involvement
        setSnackbar({ open: true, text: `${addEmail} is already a member`, severity: 'info' });
      } else {
        setSnackbar({ open: true, text: `Successfully added ${addEmail}`, severity: 'success' });
        refresh();
      }
    } catch (error) {
      switch (error.name) {
        case 'NotFoundError':
          setSnackbar({
            open: true,
            text: 'Nobody with that username was found',
            severity: 'error',
          });
          break;

        default:
          console.log('Something went wrong');
          break;
      }
    }
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
    setSnackbar({
      open: true,
      text: 'Request sent, awaiting approval from a group leader',
      severity: 'success',
    });
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
  let adminView;
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

        // Only advisors and superadmins can re-open the roster
        const confirmRoster = !isActivityClosed ? (
          <Button variant="contained" color="primary" onClick={onConfirmRoster}>
            Confirm final roster
          </Button>
        ) : participationDetail[1] === 'Advisor' || isSuperAdmin ? (
          <Button variant="contained" color="primary" onClick={onReopenActivity}>
            Reopen roster
          </Button>
        ) : null;

        adminView = (
          <>
            <Card>
              <CardHeader title="Membership Requests" style={headerStyle} />
              <CardContent>
                <Grid container spacing={2} direction="column">
                  <Grid item>
                    {requests.length === 0 ? (
                      <Typography>There are no pending requests</Typography>
                    ) : (
                      <RequestsReceived involvement={requests[0]} />
                    )}
                  </Grid>

                  <Grid item align="right">
                    {confirmRoster}
                    &emsp;
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isActivityClosed}
                      onClick={() => setOpenAddMember(true)}
                      startIcon={<AddPersonIcon />}
                    >
                      Add member
                    </Button>
                  </Grid>
                </Grid>
                {(participationDetail[1] === 'Advisor' || isSuperAdmin) && (
                  <Typography>* FERPA protected student</Typography>
                )}
              </CardContent>
            </Card>

            <Dialog open={openAddMember} keepMounted align="center">
              <DialogTitle>Add a member to {activityDescription}</DialogTitle>
              <DialogContent>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <TextField
                      required
                      fullWidth
                      onChange={(e) => setAddEmail(e.target.value)}
                      label="Username"
                      variant="filled"
                    />
                  </Grid>
                  <Grid item>
                    <FormControl variant="filled" required fullWidth>
                      <InputLabel id="involvement-profile-add-member-select-participation">
                        Participation
                      </InputLabel>
                      <Select
                        value={participationCode}
                        onChange={(event) => setParticipationCode(event.target.value)}
                        labelId="involvement-profile-add-member-select-participation"
                      >
                        <MenuItem value="ADV">Advisor</MenuItem>
                        <MenuItem value="LEAD">Leader</MenuItem>
                        <MenuItem value="MEMBR">Member</MenuItem>
                        <MenuItem value="GUEST">Guest</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="filled"
                      label="Title/Comment"
                      fullWidth
                      onChange={(event) => setTitleComment(event.target.value)}
                      value={titleComment}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={onClose}>
                  CANCEL
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!addEmail || !participationCode}
                  onClick={onAddMember}
                >
                  Add member
                </Button>
              </DialogActions>
            </Dialog>
          </>
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
          {adminView}
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
