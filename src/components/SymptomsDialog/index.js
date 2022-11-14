import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import wellness, { StatusColor } from 'services/wellness';
import styles from './SymptomsDialog.module.css';

const SymptomsDialog = ({ isOpen, setIsOpen, setStatus }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="submit-dialog"
      aria-describedby="submit-symptoms"
      className={styles.symptoms_dialog}
    >
      <DialogTitle>Symptom Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You are about to confirm that you have recently experienced COVID-19 symptoms.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            wellness.postAnswer(StatusColor.Yellow).then((status) => setStatus(status));
            setIsOpen(false);
          }}
          className={styles.confirm_symptoms}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SymptomsDialog;
