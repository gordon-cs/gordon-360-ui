import React, { useState, useEffect } from 'react';

import membershipService from 'services/membership';
import involvementService from 'services/activity';
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
  Typography,
  InputLabel,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import AdminCard from './components/AdminCard';
import userService from 'services/user';

const Membership = ({ isAdmin, activityCode, id, sessionCode, activityDescription }) => {
  const [members, setMembers] = useState([]);
  const [activityFollowersNum, setActivityFollowersNum] = useState(0);
  const [activityMembersNum, setActivityMembersNum] = useState(0);
  const [status, setStatus] = useState('');
  const [openJoin, setOpenJoin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
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
        const [
          participationDetail,
          status,
          activityFollowersNum,
          activityMembersNum,
        ] = await Promise.all([
          membershipService.search(id, sessionCode, activityCode),
          involvementService.getStatus(activityCode, sessionCode),
          membershipService.getFollowersNum(activityCode, sessionCode),
          membershipService.getMembersNum(activityCode, sessionCode),
        ]);
        setParticipationDetail(participationDetail);
        setStatus(status);
        setActivityFollowersNum(activityFollowersNum);
        setActivityMembersNum(activityMembersNum);

        const isSuperAdmin = (await userService.getLocalInfo()).college_role === 'god';
        setIsSuperAdmin(isSuperAdmin);

        if ((participationDetail[0] && participationDetail[1] !== 'Guest') || isSuperAdmin) {
          setMembers(await membershipService.get(activityCode, sessionCode));
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    loadMembers();
  }, [activityCode, id, isAdmin, sessionCode]);

  useEffect(() => {
    const resize = () => {
      setIsMobileView(window.innerWidth < 810);
    };

    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  });

  const createSnackbar = (text, severity) => {
    setSnackbar({ open: true, text, severity });
  };

  const onClose = () => {
    setOpenJoin(false);
    setParticipationCode('');
    setTitleComment('');
  };

  const onRequest = async () => {
    let data = {
      ACT_CDE: activityCode,
      SESS_CDE: sessionCode,
      ID_NUM: id,
      PART_CDE: participationCode,
      DATE_SENT: new Date().toLocaleString(),
      COMMENT_TXT: titleComment,
      APPROVED: 'Pending',
    };
    await membershipService.requestMembership(data);
    onClose();
    createSnackbar('Request sent, awaiting approval from a group leader', 'success');
  };

  const onSubscribe = async () => {
    let data = {
      ACT_CDE: activityCode,
      SESS_CDE: sessionCode,
      ID_NUM: id,
      PART_CDE: 'GUEST',
      COMMENT_TXT: 'Subscriber',
      GRP_ADMIN: false,
    };
    await membershipService.addMembership(data);
    setParticipationDetail(await membershipService.search(id, sessionCode, activityCode));
    setActivityFollowersNum(await membershipService.getFollowersNum(activityCode, sessionCode));
  };

  const onUnsubscribe = async () => {
    await membershipService.remove(participationDetail[2]);
    setParticipationDetail(await membershipService.search(id, sessionCode, activityCode));
    setActivityFollowersNum(await membershipService.getFollowersNum(activityCode, sessionCode));
  };

  const compareByLastThenFirst = (a, b) => {
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
  const isActivityClosed = status === 'CLOSED';
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

      const header = isMobileView ? (
        <CardHeader title="Members" style={headerStyle} />
      ) : isAdmin || isSuperAdmin ? (
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
      ) : (
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

      content = (
        <>
          {(isAdmin || isSuperAdmin) && (
            <AdminCard
              activityCode={activityCode}
              activityDescription={activityDescription}
              createSnackbar={createSnackbar}
              isActivityClosed={isActivityClosed}
              sessionCode={sessionCode}
              participationLevel={participationDetail[1]}
              isSuperAdmin={isSuperAdmin}
            />
          )}
          <Card>
            {header}
            <CardContent>
              {members.sort(compareByLastThenFirst).map((groupMember) => (
                <MemberList
                  member={groupMember}
                  admin={isAdmin}
                  key={groupMember.MembershipID}
                  createSnackbar={createSnackbar}
                />
              ))}
            </CardContent>
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
      {' '}
      <Typography>
        <strong>Current Involvement Roster: </strong>
        {activityMembersNum} Member{activityMembersNum === 1 ? '' : 's'} and {activityFollowersNum}{' '}
        Subcriber{activityFollowersNum === 1 ? '' : 's'}
      </Typography>
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
