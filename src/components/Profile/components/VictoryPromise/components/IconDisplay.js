import { Grid } from '@mui/material';
import {
  ChristianCharacterIcon,
  IntellectualMaturityIcon,
  LeadershipWorldwideIcon,
  LivesOfServiceIcon,
} from './VictroyPromiseIcons';

const IconDisplay = ({ scores }) => (
  <Grid container direction="column" alignItems="center">
    <Grid>
      <ChristianCharacterIcon
        title="Christian Character"
        description="Opportunities encouraging faith formation and its connection to living, learning and leading with others"
        active={scores.christian_character > 0}
      />
      <IntellectualMaturityIcon
        title="Intellectual Maturity"
        description="Opportunities to extend critical reasoning, deepen understanding, and ignite imagination"
        active={scores.lives_of_service > 0}
      />
    </Grid>
    <Grid>
      <LivesOfServiceIcon
        title="Lives of Service"
        description="Opportunities to lend one's strengths and talents with our partners to our neighbors"
        active={scores.lives_of_service > 0}
      />
      <LeadershipWorldwideIcon
        title="Leadership Worldwide"
        description="Opportunities to develop one's understanding and influence in God's amazing, dynamic and challenging world"
        active={scores.leadership_worldwide > 0}
      />
    </Grid>
  </Grid>
);

export default IconDisplay;
