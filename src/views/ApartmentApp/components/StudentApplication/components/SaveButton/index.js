import React from 'react';
import { Button } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import GordonLoader from '../../../../../../components/Loader';
import './saveButton.css';

const SaveButton = (props) => {
  const loaderSize = 20;

  const handleSaveButtonClick = () => {
    props.onClick();
  };

  if (props.saving) {
    if (props.saving === 'success') {
      return <CheckCircleIcon className="success" />;
    } else if (props.saving === 'failed') {
      return <ErrorIcon className="error" />;
    } else {
      return <GordonLoader size={loaderSize} />;
    }
  } else {
    return (
      <Button
        disabled={props.saving}
        variant="contained"
        color="primary"
        onClick={handleSaveButtonClick}
      >
        Save
      </Button>
    );
  }
};

export default SaveButton;
