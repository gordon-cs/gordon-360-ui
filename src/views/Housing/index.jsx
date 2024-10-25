import { Box, Card, Grid } from '@mui/material';
import { useAuthGroups } from 'hooks';
import { AuthGroup } from 'services/auth';

import RDView from './components/RDView';
import RAView from './components/RAView';
import ResidentView from './components/ResidentView';

const Housing = () => {
  const isFaculty = useAuthGroups(AuthGroup.Faculty);
  const isStudent = useAuthGroups(AuthGroup.Student);

  if (isFaculty) {
    return (
      <Grid container>
        <Card>
          <RDView className="jsx" />
        </Card>
      </Grid>
    );
  } else if (isStudent) {
    return <ResidentView className="jsx" />;
  } else {
    return null;
  }
};

export default Housing;
