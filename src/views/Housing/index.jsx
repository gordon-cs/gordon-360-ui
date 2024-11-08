import { Box, Card, Grid } from '@mui/material';
import { useAuthGroups } from 'hooks';
import { AuthGroup } from 'services/auth';

import RDView from './components/RDView';
import RAView from './components/RAView';
import ResidentView from './components/ResidentView';

const Housing = () => {
  const isFaculty = useAuthGroups(AuthGroup.Faculty);
  const isStudent = useAuthGroups(AuthGroup.Student);
  const isRA = useAuthGroups(AuthGroup.ResidentAdvisor);
  const isRD = useAuthGroups(AuthGroup.HousingAdmin);

  if (isFaculty) {
    return (
      <Grid container>
        <RDView className="jsx" />
      </Grid>
    );
  } else if (isStudent) {
    return <ResidentView className="jsx" />;
  } else if (isRA) {
    return <RAView />;
  } else {
    return null;
  }
};

export default Housing;
