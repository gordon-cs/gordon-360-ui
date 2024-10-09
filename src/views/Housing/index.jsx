import { Card, Grid } from '@mui/material';
import RDView from './components/RDView';
import { isFacStaff as checkIsFacStaff, isFacStaff } from 'services/user';

const Housing = () => {
  if (isFacStaff) {
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
