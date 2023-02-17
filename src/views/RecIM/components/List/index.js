import { List, Typography } from '@mui/material';
import { ActivityListing, MatchListing, ParticipantListing, TeamListing } from './Listing';

const ActivityList = ({ activities }) => {
  if (!activities?.length) return <Typography>No activities to show.</Typography>;
  let content = activities.map((activity) => (
    <ActivityListing key={activity.ID} activity={activity} />
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
        showParticipantOptions={showParticipantOptions}
      />
    );
  });
  return <List dense>{content}</List>;
};

const MatchList = ({ matches, activityID }) => {
  if (!matches?.length) return <Typography>No matches to show.</Typography>;
  let content = matches.map((match) => (
    <MatchListing key={match.ID} match={match} activityID={activityID} />
  ));

  return <List dense>{content}</List>;
};
// setTargetTeamID is used for edit Match teams
const TeamList = ({ teams, match, invite, setTargetTeamID }) => {
  if (!teams?.length && !match) return <Typography>No teams to show.</Typography>;
  let content = match
    ? match.Team.map((team) => (
        <TeamListing key={team.ID} team={team} match={match} setTargetTeamID={setTargetTeamID} />
      ))
    : teams.map((team) => <TeamListing key={team.ID} team={team} invite={invite} />);
  return <List dense>{content}</List>;
};

export { ActivityList, ParticipantList, MatchList, TeamList };
