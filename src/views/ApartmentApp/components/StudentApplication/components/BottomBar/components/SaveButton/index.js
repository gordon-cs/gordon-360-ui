import React from 'react';
import { Button } from '@material-ui/core/';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import SaveIcon from '@material-ui/icons/Save';
import GordonLoader from 'components/Loader';

const SaveButton = ({ disabled, saving, onClick }) => {
  const loaderSize = 20;

  let saveButtonIcon = <SaveIcon />;
  if (saving) {
    if (saving === 'success') {
      saveButtonIcon = <CheckCircleIcon className="success" />;
    } else if (saving === 'failed') {
      saveButtonIcon = <ErrorIcon className="error" />;
    } else {
      saveButtonIcon = <GordonLoader size={loaderSize} />;
    }
  } else {
    saveButtonIcon = <SaveIcon />;
  }

  return (
    <Button
      disabled={disabled || saving}
      variant="contained"
      color="secondary"
      startIcon={saveButtonIcon}
      fullWidth
      onClick={onClick}
    >
      Save & Continue
    </Button>
  );
};

export default SaveButton;
