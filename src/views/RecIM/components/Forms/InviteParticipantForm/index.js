import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import GordonDialogBox from 'components/GordonDialogBox';
import { ParticipantList } from './../../List';
import GordonQuickSearch from 'components/Header/components/QuickSearch';

const InviteParticipantForm = ({
  closeWithSnackbar,
  openInviteParticipantForm,
  setOpenInviteParticipantForm,
}) => {
  const [disableUpdateButton, setDisableUpdateButton] = useState(true);
  const [inviteList, setInviteList] = useState([]);

  useEffect(() => {
    setDisableUpdateButton(!inviteList || !inviteList.length);
  }, [inviteList]);

  const onSearchSubmit = (username) => {
    setInviteList([...inviteList, { username: username }]);
  };

  const removeInvite = (username) => {
    setInviteList(inviteList.filter((participant) => participant.username !== username));
  };

  const handleSubmit = () => {
    console.log('Submitted', inviteList);

    // call service here
    // console.log('call service here').then(() => {
    //   closeWithSnackbar({
    //     type: 'success',
    //     message: 'Teammates invited successfully',
    //   });
    // });

    handleWindowClose();
  };

  const handleWindowClose = () => {
    setOpenInviteParticipantForm(false);
    setInviteList([]);
  };

  return (
    <GordonDialogBox
      open={openInviteParticipantForm}
      title="Invite Teammates"
      fullWidth
      maxWidth="sm"
      buttonClicked={handleSubmit}
      isButtonDisabled={disableUpdateButton}
      buttonName="Send Invites"
      cancelButtonClicked={handleWindowClose}
      cancelButtonName="cancel"
    >
      <Grid container alignItems="center" direction="column" spacing={2} p={2}>
        <Grid item sx={{ width: '100%' }}>
          <ParticipantList minimal participants={inviteList} callbackFunction={removeInvite} />
        </Grid>
        <Grid item>
          <GordonQuickSearch
            customPlaceholderText={'Search for people'}
            disableLink
            onSearchSubmit={(selectedUsername) => onSearchSubmit(selectedUsername)}
          />
        </Grid>
      </Grid>
    </GordonDialogBox>
  );
};

export default InviteParticipantForm;
