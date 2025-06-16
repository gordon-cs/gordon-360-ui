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
    severity?: AlertColor;
    duration?: number;
    onClose: () => void;
    link?: string; // Add a link prop
    linkText?: string;
  };

const SimpleSnackbar = ({
  children,
  open,
  text,
  severity,
  duration = 10000,
  onClose,
  link,
  linkText,
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
        {text}{' '}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {linkText || 'Click here'}
          </a>
        )}
      </Alert>
    </Snackbar>
  );
};

export default SimpleSnackbar;
