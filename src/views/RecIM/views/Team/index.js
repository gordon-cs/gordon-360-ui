import { useParams } from 'react-router';

const Team = () => {
  const { leagueID, teamID } = useParams();
  return (
    <p>
      Here with league id {leagueID} team id {teamID}
    </p>
  );
};

export default Team;
