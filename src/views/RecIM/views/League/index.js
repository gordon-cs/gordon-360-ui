import { useParams } from 'react-router';

const League = () => {
  let { leagueId } = useParams();
  return <p>Here with league id {leagueId}</p>;
};

export default League;
