import { Link } from '@mui/material';
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import { Polar } from 'react-chartjs-2';
import { toTitleCase } from 'services/utils';
import victoryPromiseService from 'services/victoryPromise';
import { gordonColors } from 'theme';
import styles from './VictoryPromiseDisplay.module.css';
import {
  ChristianCharacterIcon,
  IntellectualMaturityIcon,
  LeadershipWorldwideIcon,
  LivesOfServiceIcon,
} from './VictroyPromiseIcons';

const colorsMap = {
  christian_character: gordonColors.secondary.red,
  intellectual_maturity: gordonColors.secondary.green,
  lives_of_service: gordonColors.secondary.yellow,
  leadership_worldwide: gordonColors.primary.cyan,
};

const graphOrder = {
  christian_character: 3,
  intellectual_maturity: 0,
  lives_of_service: 2,
  leadership_worldwide: 1,
};

const getDatasets = (scores) => {
  const minimumScore = Math.min(...Object.values(scores));
  const emptySliceValue = (minimumScore || 1) - 0.3;

  const colors = new Array(4);
  const data = new Array(4);
  const labels = new Array(4);

  Object.entries(scores).forEach(([key, value]) => {
    const index = graphOrder[key];
    labels[index] = toTitleCase(key, '_');
    if (value > 0) {
      colors[index] = colorsMap[key];
      data[index] = value;
    } else {
      colors[index] = gordonColors.neutral.lightGray;
      data[index] = emptySliceValue;
    }
  });

  const datasets = [
    {
      data,
      backgroundColor: colors,
      borderWidth: 3,
    },
  ];

  return { labels, datasets };
};

const VictoryPromiseDisplay = (props) => {
  const [defaultVPMode, setDefaultVPMode] = useState(true);
  const [scores, setScores] = useState({
    christian_character: 0,
    intellectual_maturity: 0,
    leadership_worldwide: 0,
    lives_of_service: 0,
  });

  useEffect(() => {
    victoryPromiseService.getVPScore().then(([scores]) =>
      setScores({
        christian_character: scores.TOTAL_VP_CC_SCORE,
        intellectual_maturity: scores.TOTAL_VP_IM_SCORE,
        lives_of_service: scores.TOTAL_VP_LS_SCORE,
        leadership_worldwide: scores.TOTAL_VP_LW_SCORE,
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
  } else {
    const { labels, datasets } = getDatasets(scores);
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
