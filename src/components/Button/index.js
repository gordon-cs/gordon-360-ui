import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Button,
} from 'reactstrap';

import './button.css';

export default class GordonButton extends Component {
  render() {
    return (
      <Button {...this.props} className="gordon-button">
        {this.props.children}
      </Button>
    );
  }
}

GordonButton.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'light',
    'dark',
  ]),
};

GordonButton.defaultProps = {
  color: 'primary',
};
