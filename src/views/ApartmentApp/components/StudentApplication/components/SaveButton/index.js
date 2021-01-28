import React from 'react';
import { Button } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import GordonLoader from '../../../../../../components/Loader';
import './saveButton.css';

const SaveButton = ({ saving, onClick }) => {
  const loaderSize = 20;

  const handleSaveButtonClick = () => {
    onClick();
  };

  if (saving) {
    if (saving === 'success') {
      return <CheckCircleIcon className="success" />;
    } else if (saving === 'failed') {
      return <ErrorIcon className="error" />;
    } else {
      return <GordonLoader size={loaderSize} />;
    }
  } else {
    return (
      <Button disabled={saving} variant="contained" color="primary" onClick={handleSaveButtonClick}>
        Save
      </Button>
    );
  }
};

export default SaveButton;
