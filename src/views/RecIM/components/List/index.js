import { List } from '@mui/material';
import { ActivityListing, MatchListing, ParticipantListing, TeamListing } from './Listing';

const ActivityList = ({ activities }) => {
  let content = activities.map((activity) => <ActivityListing activity={activity} />);
  return <List>{content}</List>;
};

const ParticipantList = ({ participants }) => {
  let content = participants.map((participant) => <ParticipantListing participant={participant} />);
  return <List>{content}</List>;
};

const MatchList = ({ matches }) => {
  let content = matches.map((match) => <MatchListing match={match} />);
  return <List>{content}</List>;
};

const TeamList = ({ teams }) => {
  let content = teams.map((team) => <TeamListing team={team} />);
  return <List>{content}</List>;
};

export { ActivityList, ParticipantList, MatchList, TeamList };
