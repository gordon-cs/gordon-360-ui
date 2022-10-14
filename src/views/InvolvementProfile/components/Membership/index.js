import { Grid, Typography } from '@material-ui/core';
import GordonLoader from 'components/Loader';
import GordonSnackbar from 'components/Snackbar';
import { useUser } from 'hooks';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import membershipService, { Participation } from 'services/membership';
import AdminCard from './components/AdminCard';
import MemberList from './components/MemberList';
import NonMemberButtons from './components/NonMemberButtons';

const Membership = ({ isAdmin, isSiteAdmin, involvementDescription, toggleIsAdmin }) => {
  const [members, setMembers] = useState([]);
  const [followersNum, setFollowersNum] = useState(0);
  const [membersNum, setMembersNum] = useState(0);
  const [participationDetail, setParticipationDetail] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, text: '', severity: '' });
  const [loading, setLoading] = useState(true);
  const { involvementCode, sessionCode } = useParams();
  const { profile } = useUser();

  useEffect(() => {
    const loadMembers = async () => {
      setLoading(true);

      try {
        const [participationDetail, followersNum, membersNum] = await Promise.all([
          membershipService.search(profile.AD_Username, sessionCode, involvementCode),
          membershipService.getFollowersNum(involvementCode, sessionCode),
          membershipService.getMembersNum(involvementCode, sessionCode),
        ]);
        setParticipationDetail(participationDetail);
        setFollowersNum(followersNum);
        setMembersNum(membersNum);

        if ((participationDetail[0] && participationDetail[1] !== 'Guest') || isSiteAdmin) {
          setMembers(await membershipService.get(involvementCode, sessionCode));
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    loadMembers();
  }, [involvementCode, isAdmin, isSiteAdmin, sessionCode, profile.AD_Username]);

  const createSnackbar = (text, severity) => {
    setSnackbar({ open: true, text, severity });
  };

  const handleSubscribe = async () => {
    let data = {
      Activity: involvementCode,
      Session: sessionCode,
      Username: profile.AD_Username,
      Participation: Participation.Guest,
      CommentText: 'Subscriber',
      GroupAdmin: false,
    };
    await membershipService.addMembership(data);
    setParticipationDetail(
      await membershipService.search(profile.AD_Username, sessionCode, involvementCode),
    );
    setFollowersNum(await membershipService.getFollowersNum(involvementCode, sessionCode));
  };

  const handleUnsubscribe = async () => {
    await membershipService.remove(participationDetail[2]);
    setParticipationDetail(
      await membershipService.search(profile.AD_Username, sessionCode, involvementCode),
    );
    setFollowersNum(await membershipService.getFollowersNum(involvementCode, sessionCode));
  };

  const handleAddMember = async () => {
    setMembers(await membershipService.get(involvementCode, sessionCode));
  };

  const handleLeave = async () => {
    const newParticipationDetail = await membershipService.search(
      profile.AD_Username,
      sessionCode,
      involvementCode,
    );
    setParticipationDetail(newParticipationDetail);
    if (isSiteAdmin) {
      setMembers(await membershipService.get(involvementCode, sessionCode));
    }
    setMembersNum(await membershipService.getMembersNum(involvementCode, sessionCode));
  };

  let content;

  if (loading === true) {
    return <GordonLoader />;
  } else {
    if ((participationDetail[0] && participationDetail[1] !== 'Guest') || isSiteAdmin) {
      content = (
        <>
          {(isAdmin || isSiteAdmin) && (
            <Grid item>
              <AdminCard
                createSnackbar={createSnackbar}
                sessionCode={sessionCode}
                isSiteAdmin={isSiteAdmin}
                onAddMember={handleAddMember}
                involvementDescription={involvementDescription}
              />
            </Grid>
          )}
          <Grid item>
            <MemberList
              members={members}
              isAdmin={isAdmin}
              isSiteAdmin={isSiteAdmin}
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
