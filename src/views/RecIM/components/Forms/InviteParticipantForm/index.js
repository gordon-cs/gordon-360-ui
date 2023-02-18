import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import GordonDialogBox from 'components/GordonDialogBox';
import { ParticipantList } from './../../List';
import GordonQuickSearch from 'components/Header/components/QuickSearch';
import GordonSnackbar from 'components/Snackbar';
import { addParticipantToTeam } from 'services/recim/team';
import { useCallback } from 'react';
import GordonLoader from 'components/Loader';

const InviteParticipantForm = ({
  closeWithSnackbar,
  openInviteParticipantForm,
  setOpenInviteParticipantForm,
  teamID,
}) => {
  const [disableUpdateButton, setDisableUpdateButton] = useState(true);
  const [inviteList, setInviteList] = useState([]);
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [saving, setSaving] = useState(false);

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  useEffect(() => {
    setDisableUpdateButton(!inviteList || !inviteList.length);
  }, [inviteList]);

  const onSearchSubmit = (username) => {
    // Check if participant exists in invite list
    for (let index = 0; index < inviteList.length; index++) {
      if (inviteList[index].Username === username) {
        createSnackbar('Participant already in list', 'error');
        return;
      }
    }

    setInviteList([...inviteList, { Username: username }]);
  };

  const removeInvite = (username) => {
    setInviteList(inviteList.filter((participant) => participant.Username !== username));
  };

  const handleSubmit = async () => {
    setSaving(true);
    for (let index = 0; index < inviteList.length; index++) {
      let participantData = {
        Username: inviteList[index].Username,
        RoleTypeID: 2,
      };
      await addParticipantToTeam(teamID, participantData);
    }
    setSaving(false);
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
        isButtonDisabled={disableUpdateButton || saving}
        buttonName={saving ? 'Sending...' : 'Send Invites'}
        cancelButtonClicked={handleWindowClose}
        cancelButtonName="cancel"
      >
        <Grid container alignItems="center" direction="column" spacing={2} p={2}>
          <Grid item sx={{ width: '100%' }}>
            <ParticipantList minimal participants={inviteList} callbackFunction={removeInvite} />
          </Grid>
          {!saving && (
            <Grid item>
              <GordonQuickSearch
                customPlaceholderText={'Search for people'}
                disableLink
                onSearchSubmit={(selectedUsername) => onSearchSubmit(selectedUsername)}
              />
            </Grid>
          )}
        </Grid>
        <GordonSnackbar
          open={snackbar.open}
          text={snackbar.message}
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        />
        {saving && <GordonLoader size={32} />}
      </GordonDialogBox>
    </>
  );
};

export default InviteParticipantForm;
