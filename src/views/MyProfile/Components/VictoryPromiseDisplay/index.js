import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import Tooltip from '@material-ui/core/Tooltip';
import { gordonColors } from '../../../../theme';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ProgressBar from './ProgressBar';
import { Pie } from 'react-chartjs-2';
import { Polar } from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2';
import victory from '../../../../services/victory';
import PuzzlePiece from 'react-icons/lib/fa/puzzle-piece';
import './VictoryPromise.css';
import basic from './images/00.png';
import { defaults } from 'react-chartjs-2';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import EventIcon from '@material-ui/icons/Event';
import './VictoryPromise.css';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export default class VictoryPromiseDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ['intellect', 'character', 'leadership', 'service'],
      datasets: [
        {
          data: [1, 1, 1, 1],
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
    };
    //defaults.global.animation = false;
  }

  changeMode = () => {
    console.log(this.state.defaultVPMode);
    if (this.state.defaultVPMode) {
      this.setState({ defaultVPMode: false });
    } else {
      this.setState({ defaultVPMode: true });
    }
  };

  componentWillMount() {
    this.getVPScores();
  }

  async getVPScores() {
    const scores = await victory.getVPScore();
    //const CC = scores[0].TOTAL_VP_CC_SCORE;
    const CC = scores[0].TOTAL_VP_CC_SCORE;
    const IM = scores[0].TOTAL_VP_IM_SCORE;
    const LS = scores[0].TOTAL_VP_LS_SCORE;
    const LW = scores[0].TOTAL_VP_LW_SCORE;
    this.setState({ CC, IM, LS, LW });

    if (CC > 0) {
      this.setState({ CCColor: gordonColors.primary.blue });
    }
    if (IM > 0) {
      this.setState({ IMColor: gordonColors.secondary.green });
    }
    if (LS > 0) {
      this.setState({ LSColor: gordonColors.secondary.yellow });
    }
    if (LW > 0) {
      this.setState({ LWColor: gordonColors.secondary.red });
    }

    if (CC + IM + LS + LW === 0) {
      this.setState({
        CC: 1,
        LW: 1,
        IM: 1,
        LS: 1,
        options: {
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var label = data.labels[tooltipItem.index];
                return label + ': 0';
              },
            },
          },
        },
      });
    }

    this.setState({
      options: {
        legend: {
          display: false,
        },
        scale: {
          gridLines: {
            display: true,
          },
          ticks: {
            display: false,
            max: Math.max(this.state.CC, this.state.IM, this.state.LS, this.state.LW),
            min: 0,
            maxTicksLimit: 1,
          },
        },
      },
    });

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
        },
      ],
    });
  }
  //<PuzzlePiece className="left-upper-corner"/>
  //<PuzzlePiece className="right-upper-corner"/>
  render() {
    const style = {
      button: {
        background: gordonColors.primary.cyan,
        color: 'white',
      },
    };
    const HoverText = withStyles(theme => ({
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
        <section>
          <Grid container alignItems="center" align="center" justify="center" spacing="16">
            <Polar
              className="victory-promise"
              data={{ labels: this.state.labels, datasets: this.state.datasets }}
              options={this.state.options}
            />
            <div>
              <Button variant="contained" style={style.button} onClick={() => this.changeMode()}>
                Change Style
              </Button>
            </div>
          </Grid>
        </section>
      );
    } else {
      content = (
        <section>
          <Grid container justify="center">
            <HoverText
              title={
                <React.Fragment>
                  <Typography color="inherit">Christian Character</Typography>
                  {"It's very engaging. Right?"}
                </React.Fragment>
              }
            >
              <HomeIcon className="vpdesign" style={{ fontSize: 50, color: this.state.CCColor }} />
            </HoverText>
            <HoverText
              title={
                <React.Fragment>
                  <Typography color="inherit">Intellectual Maturity</Typography>
                  {"It's very engaging. Right?"}
                </React.Fragment>
              }
            >
              <PeopleIcon
                className="vpdesign"
                style={{ fontSize: 50, color: this.state.IMColor }}
              />
            </HoverText>
            <HoverText
              title={
                <React.Fragment>
                  <Typography color="inherit">Lives of Service</Typography>
                  {"It's very engaging. Right?"}
                </React.Fragment>
              }
            >
              <LocalActivityIcon
                className="vpdesign"
                style={{ fontSize: 50, color: this.state.LSColor }}
              />
            </HoverText>
            <HoverText
              title={
                <React.Fragment>
                  <Typography color="inherit">Leadership Worldwide</Typography>
                  {"It's very engaging. Right?"}
                </React.Fragment>
              }
            >
              <EventIcon className="vpdesign" style={{ fontSize: 50, color: this.state.LWColor }} />
            </HoverText>
          </Grid>
          <Button variant="contained" style={style.button} onClick={() => this.changeMode()}>
            Change Style
          </Button>
        </section>
      );
    }
    return <section>{content}</section>;
  }
}
