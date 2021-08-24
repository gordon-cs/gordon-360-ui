import { useState, useEffect } from 'react';

import membershipService from 'services/membership';
import GordonLoader from 'components/Loader';
import GordonSnackbar from 'components/Snackbar';
import MemberList from './components/MemberList';

import { Grid, Typography } from '@material-ui/core';
import AdminCard from './components/AdminCard';
import userService from 'services/user';
import NonMemberButtons from './components/NonMemberButtons';
import { useParams } from 'react-router';

const Membership = ({ isAdmin, isSuperAdmin, involvementDescription, toggleIsAdmin }) => {
  const [members, setMembers] = useState([]);
  const [followersNum, setFollowersNum] = useState(0);
  const [membersNum, setMembersNum] = useState(0);
  const [participationDetail, setParticipationDetail] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, text: '', severity: '' });
  const [loading, setLoading] = useState(true);
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

        if ((participationDetail[0] && participationDetail[1] !== 'Guest') || isSuperAdmin) {
          setMembers(await membershipService.get(involvementCode, sessionCode));
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    loadMembers();
  }, [involvementCode, isAdmin, isSuperAdmin, sessionCode]);

  const createSnackbar = (text, severity) => {
    setSnackbar({ open: true, text, severity });
  };

  const handleSubscribe = async () => {
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

  const handleUnsubscribe = async () => {
    await membershipService.remove(participationDetail[2]);
    setParticipationDetail(
      await membershipService.search(userService.getLocalInfo().id, sessionCode, involvementCode),
    );
    setFollowersNum(await membershipService.getFollowersNum(involvementCode, sessionCode));
  };

  const handleAddMember = async () => {
    setMembers(await membershipService.get(involvementCode, sessionCode));
  };

  const handleLeave = async () => {
    const newParticipationDetail = await membershipService.search(
      userService.getLocalInfo().id,
      sessionCode,
      involvementCode,
    );
    setParticipationDetail(newParticipationDetail);
    if (isSuperAdmin) {
      setMembers(await membershipService.get(involvementCode, sessionCode));
    }
    setMembersNum(await membershipService.getMembersNum(involvementCode, sessionCode));
  };

  let content;

  if (loading === true) {
    return <GordonLoader />;
  } else {
    if ((participationDetail[0] && participationDetail[1] !== 'Guest') || isSuperAdmin) {
      content = (
        <>
          {(isAdmin || isSuperAdmin) && (
            <Grid item>
              <AdminCard
                createSnackbar={createSnackbar}
                sessionCode={sessionCode}
                isSuperAdmin={isSuperAdmin}
                onAddMember={handleAddMember}
              />
            </Grid>
          )}
          <Grid item>
            <MemberList
              members={members}
              isAdmin={isAdmin}
              isSuperAdmin={isSuperAdmin}
              createSnackbar={createSnackbar}
              onLeave={handleLeave}
              onToggleIsAdmin={toggleIsAdmin}
            />
          </Grid>
        </>
      );
    } else {
      content = (
        <Grid item>
          <NonMemberButtons
            isGuest={participationDetail[1] === 'Guest'}
            onSubscribe={handleSubscribe}
            onUnsubscribe={handleUnsubscribe}
            involvementDescription={involvementDescription}
            createSnackbar={createSnackbar}
          />
        </Grid>
      );
    }
  }
  return (
    <>
      <Grid item>
        <Typography>
          <strong>Current Roster: </strong>
          {membersNum} Member{membersNum === 1 ? '' : 's'} and {followersNum} Subcriber
          {followersNum === 1 ? '' : 's'}
        </Typography>
      </Grid>
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
