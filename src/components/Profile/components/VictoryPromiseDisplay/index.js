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

const VictoryPromiseDisplay = (props) => {
  const [defaultVPMode, setDefaultVPMode] = useState(true);
  const [victoryPromisePoints, setVictoryPromisePoints] = useState({
    christianCharacter: 0,
    intellectualMaturity: 0,
    livesOfService: 0,
    leadershipWorldwide: 0,
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
          setVictoryPromisePoints({
            christianCharacter,
            intellectualMaturity,
            livesOfService,
            leadershipWorldwide,
          }),
      );
  }, []);

  const setState = () => {};
  const state = {
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: [
          gordonColors.neutral.lightGray,
          gordonColors.neutral.lightGray,
          gordonColors.neutral.lightGray,
          gordonColors.neutral.lightGray,
        ],
      },
    ],
    options: '',
    CC: 0,
    IM: 0,
    LS: 0,
    LW: 0,
    CCColor: gordonColors.neutral.lightGray,
    IMColor: gordonColors.neutral.lightGray,
    LSColor: gordonColors.neutral.lightGray,
    LWColor: gordonColors.neutral.lightGray,
  };

  const getVPScores = async () => {
    const {
      christianCharacter: CC,
      intellectualMaturity: IM,
      livesOfService: LS,
      leadershipWorldwide: LW,
    } = victoryPromisePoints;
    var arr = [CC, IM, LS, LW];
    const min = arr.filter((x) => x > 0)[0] ? arr.filter((x) => x > 0).sort()[0] : 1;
    var emptySlice = min - 0.3;

    if (CC > 0) {
      setState({ CCColor: gordonColors.secondary.red, CC_ON: true });
    } else {
      setState({ CC: emptySlice });
    }
    if (IM > 0) {
      setState({ IMColor: gordonColors.secondary.green, IM_ON: true });
    } else {
      setState({ IM: emptySlice });
    }
    if (LS > 0) {
      setState({ LSColor: gordonColors.secondary.yellow, LS_ON: true });
    } else {
      setState({ LS: emptySlice });
    }
    if (LW > 0) {
      setState({ LWColor: gordonColors.primary.cyan, LW_ON: true });
    } else {
      setState({ LW: emptySlice });
    }

    if (CC === 0 && IM === 0 && LS === 0 && LW === 0) {
      setState({
        CC: 0.97,
        IM: 0.97,
        LS: 0.97,
        LW: 0.97,
        options: {
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
              max: 1,
              min: 0,
              maxTicksLimit: 1,
            },
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                var label = data.labels[tooltipItem.index];
                return label + ': 0';
              },
            },
          },
        },
      });
    } else {
      setState({
        options: {
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
              max: Math.max(state.CC, state.IM, state.LS, state.LW) + 0.2,
              min: 0,
              maxTicksLimit: 1,
            },
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                var label = data.labels[tooltipItem.index];
                if (tooltipItem.yLabel < min) {
                  return label + ': 0';
                } else {
                  return label + ': ' + tooltipItem.yLabel;
                }
              },
            },
          },
        },
      });
    }

    setColor();
  };

  const setColor = () => {
    setState({
      datasets: [
        {
          data: [state.CC, state.IM, state.LS, state.LW],
          backgroundColor: [state.CCColor, state.IMColor, state.LSColor, state.LWColor],
          borderAlign: 'center',
          borderWidth: 3,
        },
      ],
    });
  };

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
            active={victoryPromisePoints.christianCharacter > 0}
          />
          <IntellectualMaturityIcon
            title="Intellectual Maturity"
            description="Opportunities to extend critical reasoning, deepen understanding, and ignite imagination"
            active={victoryPromisePoints.livesOfService > 0}
          />
        </Grid>
        <Grid>
          <LivesOfServiceIcon
            title="Lives of Service"
            description="Opportunities to lend one's strengths and talents with our partners to our neighbors"
            active={victoryPromisePoints.livesOfService > 0}
          />
          <LeadershipWorldwideIcon
            title="Leadership Worldwide"
            description="Opportunities to develop one's understanding and influence in God's amazing, dynamic and challenging world"
            active={victoryPromisePoints.leadershipWorldwide > 0}
          />
        </Grid>
      </Grid>
    );
  } else {
    content = (
      <Grid container justifyContent="center">
        <Polar
          className={styles.victory_promise}
          data={{ labels, datasets: state.datasets }}
          options={state.options}
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
