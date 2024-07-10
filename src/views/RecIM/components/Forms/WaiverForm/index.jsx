import { Typography } from '@mui/material';
import GordonDialogBox from 'components/GordonDialogBox';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WaiverForm = ({ username, createSnackbar, openWaiverForm, setOpenWaiverForm, onClose }) => {
  const navigate = useNavigate();
  // check if we're updating a pending status or
  const [isParticipant, setIsParticipant] = useState(false);

  const handleCancel = () => {
    setOpenWaiverForm(false);
  };

  let waiverContent = (
    <GordonDialogBox
      onClose={handleCancel}
      open={openWaiverForm}
      buttonName="Sign Waiver"
      buttonClicked={() => {
        window.open('https://forms.gordon.edu/232353329449056', '_blank');
      }}
      cancelButtonName="Cancel"
      cancelButtonClicked={handleCancel}
      title="Waiver Required"
    >
      <Typography marginTop={4} variant="body1" paragraph>
        It appears that you have not yet signed the Bennett Center Release of Liability and Waiver,
        which is required for participation in Rec/IM.
      </Typography>
      <Typography variant="body1" paragraph>
        Please allow 30 minutes after signing the waiver for our records to update.
      </Typography>
    </GordonDialogBox>
  );

  return waiverContent;
};

export default WaiverForm;
