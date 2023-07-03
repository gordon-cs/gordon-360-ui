import { FormControl, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonSnackbar from 'components/Snackbar';
import { useState } from 'react';
import userService from 'services/user';
import SearchField from 'views/PeopleSearch/components/SearchFieldList/components/SearchField';

const UpdatePlannedGraduationYear = () => {
  const [open, setOpen] = useState(false);
  const [plannedGraduationYear, setPlannedGraduationYear] = useState('');
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const currentYear = new Date().getFullYear();

  const handleSubmit = async () => {
    try {
      await userService.setPlannedGraduationYear(plannedGraduationYear);
      createSnackbar('Your Planned Graduation Year will update within a couple hours.', 'success');
    } catch {
      createSnackbar('Planned Graduation Year failed to update. Please contact CTS.', 'error');
    }
    setOpen(false);
  };

  const createSnackbar = (message, severity) => {
    setSnackbar({ message, severity, open: true });
  };

  return (
    <div>
      <IconButton style={{ marginBottom: '0.5rem' }} onClick={() => setOpen(true)} size="large">
        <EditIcon style={{ fontSize: 20 }} />
      </IconButton>
      <GordonDialogBox
        open={open}
        onClose={() => setOpen(false)}
        title="Update Planned Graduation Year"
        buttonName="UPDATE"
        buttonClicked={handleSubmit}
        cancelButtonName="CANCEL"
        cancelButtonClicked={() => setOpen(false)}
        sx={12}
      >
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <SearchField
            name="Planned Graduation Year"
            value={plannedGraduationYear}
            updateValue={(event) => setPlannedGraduationYear(event.target.value)}
            options={Array.from({ length: 6 }, (_, i) => ({
              value: (currentYear + i).toString(),
              label: (currentYear + i).toString(),
            }))}
            select
            size={500}
            required="required"
            autoFocus
          />
        </FormControl>
      </GordonDialogBox>
      <GordonSnackbar
        open={snackbar.open}
        severity={snackbar.severity}
        text={snackbar.message}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </div>
  );
};

export default UpdatePlannedGraduationYear;
