import {
  AlertColor,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from '@mui/material';
import { KeyboardEvent, PropsWithChildren } from 'react';

type Props = {
  open: boolean;
  title: string;
  buttonClicked: (event: {}) => void;
  buttonName?: string;
  isButtonDisabled?: boolean;
  closeButtonClicked?: (event: {}) => void;
  closeButtonName?: string;
  cancelButtonClicked?: (event: {}) => void;
  cancelButtonName?: string;
  severity?: AlertColor;
} & Partial<DialogProps>;

const GordonDialogBox = ({
  title,
  buttonClicked,
  buttonName,
  isButtonDisabled = false,
  closeButtonClicked,
  closeButtonName,
  cancelButtonClicked,
  cancelButtonName,
  severity,
  children,
  ...otherProps
}: PropsWithChildren<Props>) => {
  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      !isButtonDisabled &&
      event.key === 'Enter' &&
      event.currentTarget.classList.contains('MuiDialog-root')
    ) {
      buttonClicked(event);
    }
  };

  return (
    <Dialog
      {...otherProps}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onKeyDown={(event) => handleKeyPress(event)}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={
          severity
            ? { bgcolor: `${severity}.main`, color: `${severity}.contrastText` }
            : { bgcolor: 'primary.main', color: 'primary.contrastText' }
        }
      >
        {title}
      </DialogTitle>
      <DialogContent id="alert-dialog-description">{children}</DialogContent>
      <DialogActions>
        {cancelButtonClicked && (
          <Button variant="outlined" onClick={cancelButtonClicked}>
            {cancelButtonName ?? 'Cancel'}
          </Button>
        )}
        {buttonClicked && (
          <Button
            variant="contained"
            onClick={buttonClicked}
            color={severity ?? 'primary'}
            disabled={isButtonDisabled}
          >
            {buttonName ?? 'Okay'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default GordonDialogBox;
