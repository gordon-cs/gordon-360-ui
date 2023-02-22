import { Button } from '@mui/material/';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import GordonLoader from 'components/Loader/Loader';

const LOADER_SIZE = 20;

const DynamicButton = ({ buttonText, className, color, disabled, startIcon, status, onClick }) => {
  let dynamicIcon = startIcon;
  if (startIcon) {
    if (status) {
      if (status === 'success') {
        dynamicIcon = <CheckCircleIcon />;
      } else if (status === 'error') {
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
      className={className}
      disabled={disabled || Boolean(status)}
      variant="contained"
      color={color ?? 'primary'}
      startIcon={dynamicIcon}
      fullWidth
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
};

export default DynamicButton;
