import React from 'react';
import { Button } from '@material-ui/core/';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import GordonLoader from 'components/Loader';

const LOADER_SIZE = 20;

const DynamicButton = ({ buttonText, disabled, startIcon = null, status, onClick }) => {
  let dynamicIcon = startIcon;
  if (startIcon) {
    if (status) {
      if (status === 'success') {
        dynamicIcon = <CheckCircleIcon />;
      } else if (status === 'failed') {
        dynamicIcon = <ErrorIcon />;
      } else {
        dynamicIcon = <GordonLoader size={LOADER_SIZE} />;
      }
    } else {
      dynamicIcon = startIcon;
    }
  }

  return (
    <Button
      disabled={disabled || Boolean(status)}
      variant="contained"
      color="secondary"
      startIcon={dynamicIcon}
      fullWidth
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
};

export default DynamicButton;
