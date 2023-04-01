import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import GordonDialogBox from 'components/GordonDialogBox';
import { ParticipantList } from './../../List';
import GordonQuickSearch from 'components/Header/components/QuickSearch';
import { addParticipantToTeam } from 'services/recim/team';
import GordonLoader from 'components/Loader';
import styles from './InviteParticipantForm.module.css';

const InviteParticipantForm = ({
  createSnackbar,
  openInviteParticipantForm,
  setOpenInviteParticipantForm,
  teamID,
}) => {
  const [disableUpdateButton, setDisableUpdateButton] = useState(true);
  const [inviteList, setInviteList] = useState([]);
  const [saving, setSaving] = useState(false);

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

  const handleSubmit = () => {
    setSaving(true);
    let errorList = [];
    for (let index = 0; index < inviteList.length; index++) {
      let participantData = {
        Username: inviteList[index].Username,
        RoleTypeID: 2,
      };
      addParticipantToTeam(teamID, participantData).catch((reason) => {
        errorList.push({username: inviteList[index].Username, reason: reason.title})
      });
    }
    setSaving(false);
    let errorMessage = "Error inviting:\n"
    errorList.forEach((value) => {
      errorMessage += errorMessage + `${value.username} with reason ${value.reason}`
    })
    if (errorList.length !== 0) {
      createSnackbar(errorMessage, 'error')
    } else {
      createSnackbar('Invited your participants successfully', 'success')
    }
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
        PaperProps={{ className: styles.dialogPaper }} // allow people search overflow
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
        {saving && <GordonLoader size={32} />}
      </GordonDialogBox>
    </>
  );
};

export default InviteParticipantForm;
