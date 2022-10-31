import { Snackbar, Alert } from '@mui/material/';
import {
  CheckCircleOutlineOutlined,
  ErrorOutline,
  InfoOutlined,
  ReportProblemOutlined,
} from '@mui/icons-material/';

const SimpleSnackbar = ({ open, text, severity, duration = 10000, onClose, ...otherProps }) => {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={onClose} {...otherProps}>
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        iconMapping={{
          success: <CheckCircleOutlineOutlined />,
          info: <InfoOutlined />,
          warning: <ReportProblemOutlined />,
          error: <ErrorOutline />,
        }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

export default SimpleSnackbar;
