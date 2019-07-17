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
      CC: null,
      IM: null,
      LS: null,
      LW: null,
    };
    //defaults.global.animation = false;
  }
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

    this.setColor();

    if (CC + IM + LS + LW === 0) {
      console.log("All 0's");
      this.setState({
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
    return (
      <Polar
        className="victory-promise"
        data={{ labels: this.state.labels, datasets: this.state.datasets }}
        options={this.state.options}
      />
    );
  }
}
