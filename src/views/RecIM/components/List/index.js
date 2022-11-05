import { List } from '@mui/material';
import { ActivityListing, MatchListing, ParticipantListing, TeamListing } from './Listing';

const ActivityList = ({ activities }) => {
  let content = activities.map((activity) => (
    <ActivityListing key={activity.ID} activity={activity} />
  ));
  return <List>{content}</List>;
};

const ParticipantList = ({ participants }) => {
  let content = participants.map((participant) => (
    <ParticipantListing key={participant.username} participant={participant} />
  ));
  return <List>{content}</List>;
};

const MatchList = ({ matches }) => {
  // @TODO key needs to be updated to match id once exists
  let content = matches.map((match) => <MatchListing key={match.ID} match={match} />);
  return <List>{content}</List>;
};

const TeamList = ({ teams }) => {
  // @TODO key needs to be updated to team id once exists
  let content = teams.map((team) => <TeamListing key={team} team={team} />);
  return <List>{content}</List>;
};

export { ActivityList, ParticipantList, MatchList, TeamList };
