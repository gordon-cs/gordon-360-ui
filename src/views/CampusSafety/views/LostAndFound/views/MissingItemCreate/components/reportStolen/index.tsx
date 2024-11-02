import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import styles from './ReportStolen.module.scss';

type ReportStolenModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (description: string) => void;
};

const ReportStolenModal: React.FC<ReportStolenModalProps> = ({ open, onClose, onSubmit }) => {
  const [description, setDescription] = React.useState('');

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(description);
    setDescription('');
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className={styles.title}>Report Item Stolen</DialogTitle>
      <DialogContent>
        <Typography variant="body1" align="center" className={styles.notice}>
          If this is an urgent request, call{' '}
          <span className={styles.phoneNumber}>978-867-4444</span>
        </Typography>
        <Typography variant="body2" align="center" className={styles.subtext}>
          Otherwise, Gordon Police will contact you soon to follow up.
        </Typography>
        <TextField
          label="Please describe in detail why you believe this item was stolen, to assist the investigation"
          variant="outlined"
          multiline
          fullWidth
          minRows={4}
          value={description}
          onChange={handleDescriptionChange}
          className={styles.textField}
          InputLabelProps={{
            style: { whiteSpace: 'normal', wordWrap: 'break-word' },
          }}
        />
      </DialogContent>
      <DialogActions className={styles.actions}>
        <Button onClick={onClose} className={styles.cancelButton}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} className={styles.submitButton}>
          Report Stolen
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportStolenModal;
