import { List, Typography } from '@mui/material';
import { ActivityListing, MatchListing, ParticipantListing, TeamListing } from './Listing';
import { useNavigate } from 'react-router-dom';

const ActivityList = ({ activities, showActivityOptions }) => {
  if (!activities?.length) return <Typography>No activities to show.</Typography>;
  let content = activities.map((activity) => (
    <ActivityListing
      key={activity.ID}
      activity={activity}
      showActivityOptions={showActivityOptions}
    />
  ));
  return <List dense>{content}</List>;
};

const ParticipantList = ({
  participants,
  minimal,
  showParticipantOptions,
  showInactive,
  callbackFunction,
}) => {
  if (!participants?.length) return <Typography>No participants to show.</Typography>;
  let content = participants.map((participant) => {
    if (!showInactive && participant.Role === 'Inactive') {
      return null;
    }
    return (
      <ParticipantListing
        key={participant.username}
        participant={participant}
        minimal={minimal}
        callbackFunction={callbackFunction}
        showParticipantOptions={
          showParticipantOptions && participant.Role !== 'Team-captain/Creator'
        }
      />
    );
  });
  return <List dense>{content}</List>;
};

const MatchList = ({ matches, activityID }) => {
  if (!matches?.length || !matches[0]) return <Typography>No matches to show.</Typography>;
  let content = matches.map((match) => (
    <MatchListing key={match?.ID} match={match} activityID={activityID} />
  ));

  return <List dense>{content}</List>;
};
// setTargetTeamID is used for edit Match teams
const TeamList = ({ teams, match, invite, setInvites, setTargetTeamID }) => {
  const navigate = useNavigate();
  if (!teams?.length && !match) return <Typography>No teams to show.</Typography>;

  const handleInviteResponse = (response, activityID, teamID) => {
    if (response === 'accepted') {
      navigate(`activity/${activityID}/team/${teamID}`);
    } else if (response === 'rejected') {
      setInvites(teams.filter((team) => team.ID !== teamID));
    }
  };

  let content = match
    ? match.Team.map((team) => (
        <TeamListing key={team.ID} team={team} match={match} setTargetTeamID={setTargetTeamID} />
      ))
    : teams.map((team) => (
        <TeamListing
          key={team.ID}
          team={team}
          invite={invite}
          callbackFunction={handleInviteResponse}
        />
      ));
  return <List dense>{content}</List>;
};

export { ActivityList, ParticipantList, MatchList, TeamList };
