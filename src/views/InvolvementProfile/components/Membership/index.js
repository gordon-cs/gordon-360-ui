import React, { useState, useEffect } from 'react';

import membershipService from 'services/membership';
import GordonLoader from 'components/Loader';
import GordonSnackbar from 'components/Snackbar';
import MemberList from './components/MemberList';
import { gordonColors } from 'theme';

import { Card, Grid, Typography, CardHeader, CardContent } from '@material-ui/core';
import AdminCard from './components/AdminCard';
import userService from 'services/user';
import NonMemberButtons from './components/NonMemberButtons';
import { useParams } from 'react-router';

const Membership = ({ isAdmin, involvementDescription }) => {
  const [members, setMembers] = useState([]);
  const [followersNum, setFollowersNum] = useState(0);
  const [membersNum, setMembersNum] = useState(0);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [participationDetail, setParticipationDetail] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, text: '', severity: '' });
  const [loading, setLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 810);
  const { involvementCode, sessionCode } = useParams();

  useEffect(() => {
    const loadMembers = async () => {
      setLoading(true);

      try {
        const [participationDetail, followersNum, membersNum] = await Promise.all([
          membershipService.search(userService.getLocalInfo().id, sessionCode, involvementCode),
          membershipService.getFollowersNum(involvementCode, sessionCode),
          membershipService.getMembersNum(involvementCode, sessionCode),
        ]);
        setParticipationDetail(participationDetail);
        setFollowersNum(followersNum);
        setMembersNum(membersNum);

        const isSuperAdmin = (await userService.getLocalInfo()).college_role === 'god';
        setIsSuperAdmin(isSuperAdmin);

        if ((participationDetail[0] && participationDetail[1] !== 'Guest') || isSuperAdmin) {
          setMembers(await membershipService.get(involvementCode, sessionCode));
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    loadMembers();
  }, [involvementCode, isAdmin, sessionCode]);

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

  const onSubscribe = async () => {
    let data = {
      ACT_CDE: involvementCode,
      SESS_CDE: sessionCode,
      ID_NUM: userService.getLocalInfo().id,
      PART_CDE: 'GUEST',
      COMMENT_TXT: 'Subscriber',
      GRP_ADMIN: false,
    };
    await membershipService.addMembership(data);
    setParticipationDetail(
      await membershipService.search(userService.getLocalInfo().id, sessionCode, involvementCode),
    );
    setFollowersNum(await membershipService.getFollowersNum(involvementCode, sessionCode));
  };

  const onUnsubscribe = async () => {
    await membershipService.remove(participationDetail[2]);
    setParticipationDetail(
      await membershipService.search(userService.getLocalInfo().id, sessionCode, involvementCode),
    );
    setFollowersNum(await membershipService.getFollowersNum(involvementCode, sessionCode));
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
  const headerStyle = {
    backgroundColor: gordonColors.primary.blue,
    color: '#FFF',
    padding: '10px',
  };

  if (loading === true) {
    return <GordonLoader />;
  } else {
    if ((participationDetail[0] && participationDetail[1] !== 'Guest') || isSuperAdmin) {
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
              createSnackbar={createSnackbar}
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
        <NonMemberButtons
          participationDetail={participationDetail}
          onSubscribe={onSubscribe}
          onUnsubscribe={onUnsubscribe}
          involvementDescription={involvementDescription}
          createSnackbar={createSnackbar}
        />
      );
    }
  }
  return (
    <>
      <Typography>
        <strong>Current Roster: </strong>
        {membersNum} Member{membersNum === 1 ? '' : 's'} and {followersNum} Subcriber
        {followersNum === 1 ? '' : 's'}
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
