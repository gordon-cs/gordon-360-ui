import { Link } from '@mui/material';
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import { Polar } from 'react-chartjs-2';
import victoryPromiseService from 'services/victoryPromise';
import { gordonColors } from 'theme';
import styles from './VictoryPromiseDisplay.module.css';
import {
  ChristianCharacterIcon,
  IntellectualMaturityIcon,
  LeadershipWorldwideIcon,
  LivesOfServiceIcon,
} from './VictroyPromiseIcons';

const labels = [
  'Christian Character',
  'Intellectual Maturity',
  'Lives of Service',
  'Leadership Worldwide',
];

const colors = {
  christianCharacter: gordonColors.secondary.red,
  intellectualMaturity: gordonColors.secondary.green,
  livesOfService: gordonColors.secondary.yellow,
  leadershipWorldwide: gordonColors.primary.cyan,
};

const getDatasets = (scores) => {
  const scoreValues = Object.values(scores);
  const minimumScore = [...scoreValues].sort().at(0) || 1;
  const emptySliceValue = minimumScore - 0.3;
  const data = scoreValues.map((s) => (s > 0 ? s : emptySliceValue));

  const backgroundColor = Object.entries(scores).map(([key, value]) =>
    value > 0 ? colors[key] : gordonColors.neutral.lightGray,
  );

  return [
    {
      data,
      backgroundColor,
      borderWidth: 3,
    },
  ];
};

const VictoryPromiseDisplay = (props) => {
  const [defaultVPMode, setDefaultVPMode] = useState(true);
  const [scores, setScores] = useState({
    christianCharacter: 0,
    intellectualMaturity: 0,
    livesOfService: 0,
    leadershipWorldwide: 0,
  });

  useEffect(() => {
    victoryPromiseService.getVPScore().then(([scores]) =>
      setScores({
        christianCharacter: scores.TOTAL_VP_CC_SCORE,
        intellectualMaturity: scores.TOTAL_VP_IM_SCORE,
        livesOfService: scores.TOTAL_VP_LS_SCORE,
        leadershipWorldwide: scores.TOTAL_VP_LW_SCORE,
      }),
    );
  }, []);

  let content;

  if (defaultVPMode) {
    content = (
      <Grid container direction="column" alignItems="center">
        <Grid>
          <ChristianCharacterIcon
            title="Christian Character"
            description="Opportunities encouraging faith formation and its connection to living, learning and leading with others"
            active={scores.christianCharacter > 0}
          />
          <IntellectualMaturityIcon
            title="Intellectual Maturity"
            description="Opportunities to extend critical reasoning, deepen understanding, and ignite imagination"
            active={scores.livesOfService > 0}
          />
        </Grid>
        <Grid>
          <LivesOfServiceIcon
            title="Lives of Service"
            description="Opportunities to lend one's strengths and talents with our partners to our neighbors"
            active={scores.livesOfService > 0}
          />
          <LeadershipWorldwideIcon
            title="Leadership Worldwide"
            description="Opportunities to develop one's understanding and influence in God's amazing, dynamic and challenging world"
            active={scores.leadershipWorldwide > 0}
          />
        </Grid>
      </Grid>
    );
  } else {
    const datasets = getDatasets(scores);
    content = (
      <Polar
        data={{ labels, datasets }}
        options={{
          legend: {
            display: false,
          },
          scale: {
            display: false,
            ticks: {
              display: false,
              max: (Math.max(...datasets[0].data) ?? 0.8) + 0.2,
              min: 0,
              maxTicksLimit: 1,
            },
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                const score = tooltipItem.yLabel;
                const value = score < 1 && score > 0 ? 0 : score;
                var label = data.labels[tooltipItem.index];
                return `${label}: ${value}`;
              },
            },
          },
        }}
      />
    );
  }

  return (
    <Card>
      <CardHeader title="Victory Promise" className={styles.header} />
      <CardContent>
        <Stack alignItems="center" spacing={2}>
          <Button variant="contained" onClick={() => setDefaultVPMode((m) => !m)}>
            Change Style
          </Button>
          <Box className={styles.content}>{content}</Box>
          {props.isOnline && (
            <Link href="https://www.gordon.edu/victorypromise" className="gc360_text_link">
              Click here for more information!
            </Link>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default VictoryPromiseDisplay;
