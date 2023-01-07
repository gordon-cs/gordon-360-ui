import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import GordonDialogBox from 'components/GordonDialogBox';
import { ParticipantList } from './../../List';
import GordonQuickSearch from 'components/Header/components/QuickSearch';
import GordonSnackbar from 'components/Snackbar';
import { addParticipantToTeam } from 'services/recim/team';
import { useCallback } from 'react';

const InviteParticipantForm = ({
  closeWithSnackbar,
  openInviteParticipantForm,
  setOpenInviteParticipantForm,
  teamID,
}) => {
  const [disableUpdateButton, setDisableUpdateButton] = useState(true);
  const [inviteList, setInviteList] = useState([]);
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  useEffect(() => {
    setDisableUpdateButton(!inviteList || !inviteList.length);
  }, [inviteList]);

  const onSearchSubmit = (username) => {
    let containsUsername = false;
    inviteList.forEach((value) => {
      if (value.username === username) containsUsername = true;
    });

    if (containsUsername) {
      createSnackbar('Participant already in list', 'error');
      return;
    }

    setInviteList([...inviteList, { username: username }]);
  };

  const removeInvite = (username) => {
    setInviteList(inviteList.filter((participant) => participant.username !== username));
  };

  const handleSubmit = () => {
    console.log('Submitted', inviteList);
    inviteList.forEach((value) => {
      let participantData = {
        Username: value.username,
        RoleTypeID: 2,
      };
      addParticipantToTeam(teamID, participantData).catch((reason) => {
        console.log(reason);
      });
    });

    handleWindowClose();
  };

  const handleWindowClose = () => {
    setOpenInviteParticipantForm(false);
    setInviteList([]);
  };

  return (
    <>
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
        <GordonSnackbar
          open={snackbar.open}
          text={snackbar.message}
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        />
      </GordonDialogBox>
    </>
  );
};

export default InviteParticipantForm;
