import React from 'react';
import { gordonColors } from 'theme';
import { Polar } from 'react-chartjs-2';
import victory from 'services/victory';
import styles from './VictoryPromiseDisplay.module.css';
import { withStyles } from '@material-ui/core/styles';
import { ReactComponent as OffCC } from './images/Off-CC.svg';
import { ReactComponent as OnCC } from './images/On-CC.svg';
import { ReactComponent as OffIM } from './images/Off-IM.svg';
import { ReactComponent as OnIM } from './images/On-IM.svg';
import { ReactComponent as OffLW } from './images/Off-LW.svg';
import { ReactComponent as OnLW } from './images/On-LW.svg';
import { ReactComponent as OffLS } from './images/Off-LS.svg';
import { ReactComponent as OnLS } from './images/On-LS.svg';

import {
  Grid,
  CardHeader,
  Tooltip,
  Button,
  Typography,
  Card,
  CardContent,
} from '@material-ui/core';

export default class VictoryPromiseDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [
        'Christian Character',
        'Intellectual Maturity',
        'Lives of Service',
        'Leadership Worldwide',
      ],
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
      defaultVPMode: true,
      CC_ON: false,
      IM_ON: false,
      LS_ON: false,
      LW_ON: false,
    };
  }

  changeMode = () => {
    this.setState({
      defaultVPMode: !this.state.defaultVPMode,
    });
  };

  componentDidMount() {
    this.getVPScores();
  }

  async getVPScores() {
    const scores = await victory.getVPScore();
    const CC = scores[0].TOTAL_VP_CC_SCORE;
    const IM = scores[0].TOTAL_VP_IM_SCORE;
    const LS = scores[0].TOTAL_VP_LS_SCORE;
    const LW = scores[0].TOTAL_VP_LW_SCORE;
    this.setState({ CC, IM, LS, LW });

    var arr = [CC, IM, LS, LW];
    const min = arr.filter((x) => x > 0)[0] ? arr.filter((x) => x > 0).sort()[0] : 1;
    var emptySlice = min - 0.3;

    if (CC > 0) {
      this.setState({ CCColor: gordonColors.secondary.red, CC_ON: true });
    } else {
      this.setState({ CC: emptySlice });
    }
    if (IM > 0) {
      this.setState({ IMColor: gordonColors.secondary.green, IM_ON: true });
    } else {
      this.setState({ IM: emptySlice });
    }
    if (LS > 0) {
      this.setState({ LSColor: gordonColors.secondary.yellow, LS_ON: true });
    } else {
      this.setState({ LS: emptySlice });
    }
    if (LW > 0) {
      this.setState({ LWColor: gordonColors.primary.cyan, LW_ON: true });
    } else {
      this.setState({ LW: emptySlice });
    }

    if (CC === 0 && IM === 0 && LS === 0 && LW === 0) {
      this.setState({
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
      this.setState({
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
              max: Math.max(this.state.CC, this.state.IM, this.state.LS, this.state.LW) + 0.2,
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

    this.setColor();
  }

  setColor() {
    this.setState({
      datasets: [
        {
          data: [this.state.CC, this.state.IM, this.state.LS, this.state.LW],
          backgroundColor: [
            this.state.CCColor,
            this.state.IMColor,
            this.state.LSColor,
            this.state.LWColor,
          ],
          borderAlign: 'center',
          borderWidth: 3,
        },
      ],
    });
  }

  openVPLink() {
    window.open('https://www.gordon.edu/victorypromise');
  }

  render() {
    let IMG_CC;
    let IMG_IM;
    let IMG_LS;
    let IMG_LW;

    if (this.state.CC_ON) {
      IMG_CC = <OnCC className="victory-promise-icon" />;
    } else {
      IMG_CC = <OffCC className="victory-promise-icon" />;
    }

    if (this.state.IM_ON) {
      IMG_IM = <OnIM className="victory-promise-icon" />;
    } else {
      IMG_IM = <OffIM className="victory-promise-icon" />;
    }

    if (this.state.LS_ON) {
      IMG_LS = <OnLS className="victory-promise-icon" />;
    } else {
      IMG_LS = <OffLS className="victory-promise-icon" />;
    }

    if (this.state.LW_ON) {
      IMG_LW = <OnLW className="victory-promise-icon" />;
    } else {
      IMG_LW = <OffLW className="victory-promise-icon" />;
    }

    const HoverText = withStyles((theme) => ({
      tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
      },
    }))(Tooltip);

    let content;

    if (this.state.defaultVPMode) {
      content = (
        <Grid
          xs={12}
          item
          container
          justifyContent="center"
          direction="column"
          className="victory-promise-container-card-container-content-box-layout"
        >
          <Grid>
            <HoverText
              title={
                <React.Fragment>
                  <Typography color="inherit">Christian Character</Typography>
                  {
                    'Opportunities encouraging faith formation and its connection to living, learning and leading with others'
                  }
                </React.Fragment>
              }
            >
              {IMG_CC}
            </HoverText>
            <HoverText
              title={
                <React.Fragment>
                  <Typography color="inherit">Intellectual Maturity</Typography>
                  {
                    'Opportunities to extend critical reasoning, deepen understanding, and ignite imagination'
                  }
                </React.Fragment>
              }
            >
              {IMG_IM}
            </HoverText>
          </Grid>
          <Grid>
            <HoverText
              title={
                <React.Fragment>
                  <Typography color="inherit">Lives of Service</Typography>
                  {
                    "Opportunities to lend one's strengths and talents with our partners to our neighbors"
                  }
                </React.Fragment>
              }
            >
              {IMG_LS}
            </HoverText>
            <HoverText
              title={
                <React.Fragment>
                  <Typography color="inherit">Leadership Worldwide</Typography>
                  {
                    "Opportunities to develop one's understanding and influence in God's amazing, dynamic and challenging world"
                  }
                </React.Fragment>
              }
            >
              {IMG_LW}
            </HoverText>
          </Grid>
        </Grid>
      );
    } else {
      content = (
        <Grid container justifyContent="center">
          <Polar
            className="victory-promise"
            data={{ labels: this.state.labels, datasets: this.state.datasets }}
            options={this.state.options}
          />
        </Grid>
      );
    }

    return (
      <div className="victory-promise">
        <Grid container item xs className="victory-promise-header">
          <CardHeader title="Victory Promise" />
        </Grid>
        <Grid
          container
          className="victory-promise-container"
          alignItems="center"
          justifyContent="center"
        >
          <Card className="victory-promise-container-card">
            <CardContent className="victory-promise-container-card-container">
              <Grid item align="center">
                <Button
                  variant="contained"
                  className="victory-promise-container-card-container-button-style"
                  onClick={() => this.changeMode()}
                >
                  Change Style
                </Button>
              </Grid>
              <Grid
                container
                align="center"
                className="victory-promise-container-card-container-content"
              >
                {content}
              </Grid>
              {this.props.network === 'online' && (
                <Grid
                  container
                  justifyContent="center"
                  className="victory-promise-container-card-container-link"
                >
                  <Typography
                    variant="body1"
                    className="victory-promise-container-card-container-link-text"
                    onClick={() => this.openVPLink()}
                  >
                    Click here for more information!
                  </Typography>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
}
