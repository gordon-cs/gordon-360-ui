import { Box, Card, Grid } from '@mui/material';
import { useAuthGroups } from 'hooks';
import { AuthGroup } from 'services/auth';

import RDView from './components/RDView';

// Components for Resident View
import MyHall from './components/ResidentView/MyHall';
import MyRA from './components/ResidentView/MyRA';
import OnDuty from './components/ResidentView/OnDuty';
import Resources from './components/ResidentView/Resources';

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
    return (
      <Grid container>
        <Box ml={5} /> {/* margin-left for all elements */}
        <Grid item xs={12} md={4} padding={1}>
          <Card>
            <OnDuty className="jsx" />
          </Card>
          <Box mt={5} /> {/* margin-top between OnDuty and MyHall cards */}
          <Card>
            <MyHall className="jsx" />
          </Card>
        </Grid>
        <Box mr={35} /> {/* margin-top of 5 between My Hall and MyRA cards */}
        <Grid item xs={12} md={4} padding={1}>
          <Card>
            <MyRA className="jsx" />
          </Card>
        </Grid>
        <Box mt={5} /> {/* margin-top between MyRA and Resources cards */}
        <Grid item xs={12} md={4} padding={1}>
          <Card>
            <Resources className="jsx" />
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default Housing;
