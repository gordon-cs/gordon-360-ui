import React from 'react';
import { Button } from '@material-ui/core/';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import GordonLoader from '../../../../../../../../components/Loader';

const SaveButton = ({ disabled, saving, onClick }) => {
  const loaderSize = 20;

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
      <Button
        disabled={disabled || saving}
        variant="contained"
        color="primary"
        fullWidth
        onClick={onClick}
      >
        Save & Continue
      </Button>
    );
  }
};

export default SaveButton;
