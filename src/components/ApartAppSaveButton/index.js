import React, { Component } from 'react';
import 'date-fns';
import { Button } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { gordonColors } from '../../theme';
import GordonLoader from '../Loader';
import '../../views/ApartmentApp/apartmentApp.css';
const styles = {
  success: {
    color: gordonColors.secondary.green,
    fontSize: '26px',
  },
  error: {
    color: gordonColors.secondary.red,
    fontSize: '26px',
  },
};

export default class SaveButton extends Component {
  constructor(props) {
    super(props);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.loaderSize = 20;
  }

  handleSaveButtonClick = () => {
    this.props.onClick();
  };

  render() {
    return (
      <div>
        {this.props.saving ? (
          this.props.saving === 'success' ? (
            <CheckCircleIcon style={styles.success} />
          ) : this.props.saving === 'failed' ? (
            <ErrorIcon style={styles.error} />
          ) : (
            <GordonLoader size={this.loaderSize} />
          )
        ) : (
          <Button
            disabled={this.props.saving || this.props.disabled}
            variant="contained"
            color="primary"
            onClick={this.handleSaveButtonClick}
          >
            Save
          </Button>
        )}
      </div>
    );
  }
}
