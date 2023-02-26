import { Grid, Typography } from '@mui/material';
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
  const [membership, setMembership] = useState();
  const [snackbar, setSnackbar] = useState({ open: false, text: '', severity: '' });
  const [loading, setLoading] = useState(true);
  const [shouldShowMemberships, setShouldShowMemberships] = useState(false);
  const { involvementCode, sessionCode } = useParams();
  const { profile } = useUser();

  useEffect(() => {
    const loadMembershipStats = async () => {
      setLoading(true);

      try {
        const [[membership], followersNum, membersNum] = await Promise.all([
          membershipService.get({ username: profile.AD_Username, sessionCode, involvementCode }),
          membershipService.getFollowersNum(involvementCode, sessionCode),
          membershipService.getMembersNum(involvementCode, sessionCode),
        ]);
        setMembership(membership);
        setFollowersNum(followersNum);
        setMembersNum(membersNum);

        setShouldShowMemberships(
          (membership && membership.Participation !== Participation.Guest) || isSiteAdmin,
        );

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    loadMembershipStats();
  }, [involvementCode, isAdmin, isSiteAdmin, sessionCode, profile.AD_Username]);

  useEffect(() => {
    const loadMembers = async () => {
      setLoading(true);
      if (shouldShowMemberships) {
        setMembers(await membershipService.get({ involvementCode, sessionCode }));
      }
      setLoading(false);
    };
    loadMembers();
  }, [involvementCode, sessionCode, shouldShowMemberships]);

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
    const newMembership = await membershipService.addMembership(data);
    setMembership(newMembership);
    setFollowersNum(await membershipService.getFollowersNum(involvementCode, sessionCode));
  };

  const handleUnsubscribe = async () => {
    await membershipService.remove(membership?.MembershipID);
    setMembership();
    setFollowersNum(await membershipService.getFollowersNum(involvementCode, sessionCode));
  };

  const handleAddMember = async () => {
    setMembers(await membershipService.get({ involvementCode, sessionCode }));
  };

  const handleLeave = async () => {
    setMembership();
    if (isSiteAdmin) {
      setMembers(await membershipService.get({ involvementCode, sessionCode }));
    }
    setMembersNum(await membershipService.getMembersNum(involvementCode, sessionCode));
  };

  let content;

  if (loading === true) {
    return <GordonLoader />;
  } else {
    if (shouldShowMemberships) {
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
            isGuest={membership?.Participation === Participation.Guest}
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
