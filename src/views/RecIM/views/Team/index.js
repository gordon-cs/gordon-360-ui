import { useParams } from 'react-router';

const Team = () => {
  const { activityID, teamID } = useParams();
  return (
    <p>
      Here with activity id {activityID} team id {teamID}
    </p>
  );
};

export default Team;
