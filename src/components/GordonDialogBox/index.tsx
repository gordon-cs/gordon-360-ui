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
import styles from './GordonDialogBox.module.css';

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
  const handleKeyPress = (event: { key: string }) => {
    if (
      !isButtonDisabled &&
      event.key === 'Enter' &&
      document.activeElement?.className ===
        'MuiDialog-container MuiDialog-scrollPaper css-hz1bth-MuiDialog-container'
    ) {
      buttonClicked(event);
    }
  };

  return (
    <Dialog
      className={styles.gc360_gordondialogbox}
      {...otherProps}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onKeyDown={(event) => handleKeyPress(event)}
    >
      <DialogTitle
        className={styles.gc360_gordondialogbox_title}
        id="alert-dialog-title"
        sx={severity ? { bgcolor: `${severity}.main`, pb: '0' } : { bgcolor: 'primary.main' }}
      >
        {severity ? (
          <Alert variant="contained" severity={severity}>
            <AlertTitle>
              <strong>{title}</strong>
            </AlertTitle>
          </Alert>
        ) : (
          title
        )}
      </DialogTitle>
      <DialogContent className={styles.gc360_gordondialogbox_content} id="alert-dialog-description">
        {children}
      </DialogContent>
      <DialogActions className={styles.gc360_gordondialogbox_actions}>
        {cancelButtonClicked && (
          <Button variant="contained" color="neutral" onClick={cancelButtonClicked}>
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
