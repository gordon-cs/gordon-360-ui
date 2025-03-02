import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import styles from './DeleteConfirmation.module.scss';

type DeleteConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className={styles.title}>Delete Missing Item Report?</DialogTitle>
      <DialogContent>
        <Typography variant="body1" align="center" className={styles.notice}>
          Please delete if you would no longer like Gordon Police to search for this item.
        </Typography>
        <Typography variant="body2" align="center" className={styles.subtext}>
          (i.e. item found, replaced, etc.)
        </Typography>
      </DialogContent>
      <DialogActions className={styles.actions}>
        <Button onClick={onClose} className={styles.cancelButton}>
          Cancel
        </Button>
        <Button onClick={onSubmit} className={styles.submitButton}>
          Delete Report
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
