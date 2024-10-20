import { useState } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GordonDialogBox from 'components/GordonDialogBox';

const UpdateTasks = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton onClick={() => setOpen(true)} size="large" aria-label="Update RA/AC Tasks">
        <EditIcon fontSize="small" />
      </IconButton>

      <GordonDialogBox
        open={open}
        onClose={() => setOpen(false)}
        title="Update RA/AC Tasks"
        buttonName="UPDATE"
        cancelButtonName="CANCEL"
        cancelButtonClicked={() => setOpen(false)}
      />
    </>
  );
};

export default UpdateTasks;
