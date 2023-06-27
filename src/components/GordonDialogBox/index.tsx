import {
  AlertColor,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from '@mui/material';
import { Alert, AlertTitle } from '@mui/material';
import { PropsWithChildren } from 'react';

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
}: PropsWithChildren<Props>) => (
  <Dialog
    {...otherProps}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {severity ? (
        <Alert variant="filled" severity={severity}>
          <AlertTitle>
            <strong>{title}</strong>
          </AlertTitle>
        </Alert>
      ) : (
        title
      )}
    </DialogTitle>
    <DialogContent sx={{ padding: '1rem' }} id="alert-dialog-description">
      {children}
    </DialogContent>
    <DialogActions>
      {cancelButtonClicked && (
        <Button variant="contained" color="neutral" onClick={cancelButtonClicked}>
          {cancelButtonName ?? 'Cancel'}
        </Button>
      )}
      {closeButtonClicked && (
        <Button variant="contained" color="neutral" onClick={closeButtonClicked}>
          {closeButtonName ?? 'Close'}
        </Button>
      )}
      {buttonClicked && (
        <Button
          variant="contained"
          onClick={buttonClicked}
          color="primary"
          disabled={isButtonDisabled}
        >
          {buttonName ?? 'Okay'}
        </Button>
      )}
    </DialogActions>
  </Dialog>
);

export default GordonDialogBox;
