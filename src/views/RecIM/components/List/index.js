import { List } from '@material-ui/core';
import { ActivityListing, MatchListing, ParticipantListing, TeamListing } from './Listing';

const ActivityList = ({ activities }) => {
  let content = activities.map((activity) => <ActivityListing activity={activity} />);
  return <List dense>{content}</List>;
};

const ParticipantList = ({ participants }) => {
  let content = participants.map((participant) => <ParticipantListing participant={participant} />);
  return <List dense>{content}</List>;
};

const MatchList = ({ matches }) => {
  let content = matches.map((match) => <MatchListing match={match} />);
  return <List dense>{content}</List>;
};

const TeamList = ({ teams }) => {
  let content = teams.map((team) => <TeamListing team={team} />);
  return <List dense>{content}</List>;
};

export { ActivityList, ParticipantList, MatchList, TeamList };
