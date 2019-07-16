// Modified code from https://codepen.io/DZuz14/pen/oqeMpY?editors=0010

import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { gordonColors } from '../../../../../theme';
import './ProgressBar.css';

/**
 * Prop: percentage - A number that indicates how full the bar is
 * Prop: color - The color of the filled part of the bar.
 */
export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percentage: this.props.percentage,
      color: this.props.color,
    };
  }

  render() {
    return (
      <div>
        <Bar percentage={this.state.percentage} color={this.state.color} />
      </div>
    );
  }
}

// The "shell"
const Bar = props => {
  return (
    <div className="progress-bar">
      <Filler percentage={props.percentage} color={props.color} />
    </div>
  );
};

// The "filled" part
const Filler = props => {
  return (
    <div
      className="filler"
      style={{ width: `${props.percentage}%`, background: `${props.color}` }}
    />
  );
};
