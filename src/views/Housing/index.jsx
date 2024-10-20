import { Card, Grid } from '@mui/material';
import RDView from './components/RDView';
import RAView from './components/RAView';
import { useAuthGroups } from 'hooks';
import { AuthGroup } from 'services/auth';

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
    return <RAView />;
  } else {
    return null;
  }
};

export default Housing;
