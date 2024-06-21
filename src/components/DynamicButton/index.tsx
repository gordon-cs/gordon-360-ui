import { Button, ButtonProps } from '@mui/material/';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import GordonLoader from 'components/Loader';

const LOADER_SIZE = 20;

type Props = {
  status: 'success' | 'error' | boolean;
} & ButtonProps;

const DynamicButton = ({ status, ...otherProps }: Props) => {
  const dynamicIcon =
    status === 'success' ? (
      <CheckCircleIcon />
    ) : status === 'error' ? (
      <ErrorIcon />
    ) : Boolean(status) === true ? (
      <GordonLoader size={LOADER_SIZE} />
    ) : (
      otherProps.startIcon
    );

  return (
    <Button
      {...otherProps}
      disabled={otherProps.disabled || Boolean(status)}
      startIcon={dynamicIcon}
    >
      {otherProps.children}
    </Button>
  );
};

export default DynamicButton;
