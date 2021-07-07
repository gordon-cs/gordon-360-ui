import { Button } from '@material-ui/core/';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import GordonLoader from 'components/Loader';

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
