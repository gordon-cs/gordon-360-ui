import { Link } from '@mui/material';
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material';
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
      borderAlign: 'center',
      borderWidth: 3,
    },
  ];
};

const VictoryPromiseDisplay = (props) => {
  const [defaultVPMode, setDefaultVPMode] = useState(true);
  const [scores, setScores] = useState({
    christianCharacter: 1,
    intellectualMaturity: 4,
    livesOfService: 3,
    leadershipWorldwide: 2,
  });

  useEffect(() => {
    victoryPromiseService
      .getVPScore()
      .then(
        ([
          {
            TOTAL_VP_CC_SCORE: christianCharacter,
            TOTAL_VP_IM_SCORE: intellectualMaturity,
            TOTAL_VP_LS_SCORE: livesOfService,
            TOTAL_VP_LW_SCORE: leadershipWorldwide,
          },
        ]) =>
          setScores({
            christianCharacter,
            intellectualMaturity,
            livesOfService,
            leadershipWorldwide,
          }),
      );
  }, []);

  let content;

  if (defaultVPMode) {
    content = (
      <Grid
        xs={12}
        item
        container
        justifyContent="center"
        direction="column"
        className={styles.victory_promise_container_card_container_content_box_layout}
      >
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
      <Grid container justifyContent="center">
        <Polar
          className={styles.victory_promise}
          data={{ labels, datasets }}
          options={{
            legend: {
              display: false,
            },
            scale: {
              display: false,
              gridLines: {
                display: true,
              },
              ticks: {
                display: false,
                max: (Math.max(...datasets[0].data) ?? 0.8) + 0.2,
                min: 0,
                maxTicksLimit: 1,
              },
            },
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  const value =
                    tooltipItem.yLabel < 1 && tooltipItem.yLabel > 0 ? 0 : tooltipItem.yLabel;
                  var label = data.labels[tooltipItem.index];
                  console.log(tooltipItem, data, value, label);
                  return `${label}: ${value}`;
                },
              },
            },
          }}
        />
      </Grid>
    );
  }

  return (
    <div className={styles.victory_promise}>
      <Grid container item xs className={styles.victory_promise_header}>
        <CardHeader title="Victory Promise" />
      </Grid>
      <Grid
        container
        className={styles.victory_promise_container}
        alignItems="center"
        justifyContent="center"
      >
        <Card className={styles.victory_promise_container_card}>
          <CardContent className={styles.victory_promise_container_card_container}>
            <Grid item align="center">
              <Button
                variant="contained"
                className={styles.victory_promise_container_card_container_button_style}
                onClick={() => setDefaultVPMode((m) => !m)}
              >
                Change Style
              </Button>
            </Grid>
            <Grid
              container
              align="center"
              className={styles.victory_promise_container_card_container_content}
            >
              {content}
            </Grid>
            {props.isOnline && (
              <Grid
                container
                justifyContent="center"
                className={styles.victory_promise_container_card_container_link}
              >
                <Link href="https://www.gordon.edu/victorypromise" className="gc360_text_link">
                  Click here for more information!
                </Link>
              </Grid>
            )}
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default VictoryPromiseDisplay;
