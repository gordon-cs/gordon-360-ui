import { useParams } from 'react-router';

const Team = () => {
  let { leagueId, teamId } = useParams();
  return (
    <p>
      Here with league id {leagueId} team id {teamId}
    </p>
  );
};

export default Team;
