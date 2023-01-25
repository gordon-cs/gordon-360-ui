import { List } from '@mui/material';
import {
  ActivityListing,
  MatchListing,
  ParticipantListing,
  TeamListing,
  SeriesListing,
} from './Listing';

const ActivityList = ({ activities }) => {
  let content = activities.map((activity) => (
    <ActivityListing key={activity.ID} activity={activity} />
  ));
  return <List dense>{content}</List>;
};

const ParticipantList = ({ participants, minimal, showParticipantOptions, callbackFunction }) => {
  let content = participants.map((participant) => (
    <ParticipantListing
      key={participant.username}
      participant={participant}
      minimal={minimal}
      callbackFunction={callbackFunction}
      showParticipantOptions={showParticipantOptions}
    />
  ));
  return <List dense>{content}</List>;
};

const MatchList = ({ matches, activityID }) => {
  let content = matches.map((match) => (
    <MatchListing key={match.ID} match={match} activityID={activityID} />
  ));
  return <List dense>{content}</List>;
};

const TeamList = ({ teams }) => {
  let content = teams.map((team) => <TeamListing key={team.ID} team={team} />);
  return <List dense>{content}</List>;
};

const SeriesList = ({ series }) => {
  let content = series.map((series) => <SeriesListing key={series.ID} series={series} />);
  return <List dense>{content}</List>;
};

export { ActivityList, ParticipantList, MatchList, TeamList, SeriesList };
