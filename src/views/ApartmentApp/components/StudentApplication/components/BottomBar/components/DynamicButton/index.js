import React from 'react';
import { Button } from '@material-ui/core/';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import SaveIcon from '@material-ui/icons/Save';
import GordonLoader from 'components/Loader';

const DynamicButton = ({ buttonText, disabled, status, onClick }) => {
  const loaderSize = 20;

  let saveButtonIcon = <SaveIcon />;
  if (status) {
    if (status === 'success') {
      saveButtonIcon = <CheckCircleIcon />;
    } else if (status === 'failed') {
      saveButtonIcon = <ErrorIcon />;
    } else {
      saveButtonIcon = <GordonLoader size={loaderSize} />;
    }
  } else {
    saveButtonIcon = <SaveIcon />;
  }

  return (
    <Button
      disabled={disabled || Boolean(status)}
      variant="contained"
      color="secondary"
      startIcon={saveButtonIcon}
      fullWidth
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
};

export default DynamicButton;
