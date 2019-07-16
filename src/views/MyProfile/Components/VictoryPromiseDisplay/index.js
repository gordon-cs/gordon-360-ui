import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import Tooltip from '@material-ui/core/Tooltip';
import { gordonColors } from '../../../../theme';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ProgressBar from './ProgressBar';
import { Pie } from 'react-chartjs-2';
import victory from '../../../../services/victory';

export default class VictoryPromiseDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ['intellect', 'character', 'leadership', 'service'],
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
      CC: null,
      IM: null,
      LS: null,
      LW: null,
    };
  }
  componentWillMount() {
    this.getVPScores();
  }

  async getVPScores() {
    const scores = await victory.getVPScore();
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
  }

  setColor() {
    this.setState({
      datasets: [
        {
          data: [
            this.state.CC || 25,
            this.state.IM || 25,
            this.state.LS || 25,
            this.state.LW || 25,
          ],
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

  render() {
    return (
      <div>
        <Pie
          data={{
            labels: this.state.labels,
            datasets: this.state.datasets,
          }}
          height="50%"
        />
        <br />
      </div>
    );
  }
}
