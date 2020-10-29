import React from 'react';
import { Snackbar } from '@material-ui/core/';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const SimpleSnackbar = props => {
  let { open, text, severity, duration, onClose, alertStyle } = props;
  return (
    <Snackbar {...props} open={open} autoHideDuration={duration || 10000} onClose={onClose}>
      <Alert style={alertStyle || { textAlign: 'center' }} onClose={onClose} severity={severity}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default SimpleSnackbar;
