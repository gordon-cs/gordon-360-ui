import { Grid } from '@mui/material';
import { VictoryPromiseCategory } from 'services/victoryPromise';
import VictoryPromiseIcon from './VictoryPromiseIcons';

type Props = { scores: Record<VictoryPromiseCategory, number> };

const IconDisplay = ({ scores }: Props) => (
  <Grid container direction="column" alignItems="center">
    <Grid>
      <VictoryPromiseIcon category="christian_character" active={scores.christian_character > 0} />
      <VictoryPromiseIcon
        category="intellectual_maturity"
        active={scores.intellectual_maturity > 0}
      />
    </Grid>
    <Grid>
      <VictoryPromiseIcon category="lives_of_service" active={scores.lives_of_service > 0} />
      <VictoryPromiseIcon
        category="leadership_worldwide"
        active={scores.leadership_worldwide > 0}
      />
    </Grid>
  </Grid>
);

export default IconDisplay;
