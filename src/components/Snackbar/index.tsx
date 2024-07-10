import { Snackbar, SnackbarProps, Alert, AlertColor, AlertProps } from '@mui/material/';
import {
  CheckCircleOutlineOutlined,
  ErrorOutline,
  InfoOutlined,
  ReportProblemOutlined,
} from '@mui/icons-material/';

type Props = SnackbarProps &
  AlertProps & {
    open: boolean;
    text?: string | null;
    severity: AlertColor;
    duration?: number;
    onClose: () => void;
  };

const SimpleSnackbar = ({
  children,
  open,
  text,
  severity,
  duration = 10000,
  onClose,
  ...otherProps
}: Props) => {
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
