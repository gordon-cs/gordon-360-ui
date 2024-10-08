import { Card, Grid } from '@mui/material';
import { useAuthGroups } from 'hooks';
import { AuthGroup } from 'services/auth';
import RDView from './components/RDView';

const Housing = () => {
  const isFaculty = useAuthGroups(AuthGroup.Faculty);

  if (isFaculty) {
    return (
      <Grid container>
        <Card>
          <RDView className="jsx" />
        </Card>
      </Grid>
    );
  } else {
    return null;
  }
};

export default Housing;
