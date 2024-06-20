import { Grid } from '@mui/material';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonQuickSearch from 'components/Header/components/QuickSearch';
import GordonLoader from 'components/Loader';
import { useUser } from 'hooks';
import { useEffect, useState } from 'react';
import { getAccountsBasicInfo } from 'services/recim/participant';
import { addParticipantToTeam, createTeam, deleteTeamParticipant } from 'services/recim/team';
import userService from 'services/user';
import { ParticipantList } from './../../List';
import styles from './InviteParticipantForm.module.css';

const InviteParticipantForm = ({
  createSnackbar,
  onClose,
  openInviteParticipantForm,
  setOpenInviteParticipantForm,
  teamID,
  individualSport,
  activityID,
}) => {
  const { profile } = useUser();
  const [disableUpdateButton, setDisableUpdateButton] = useState(true);
  const [inviteList, setInviteList] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDisableUpdateButton(!inviteList || !inviteList.length);
  }, [inviteList]);

  const onSearchSubmit = (person) => {
    // Check if participant exists in invite list
    if (inviteList.find((p) => p.Username === person.UserName)) {
      createSnackbar('Participant already in list', 'error');
      return;
    }

    setInviteList([
      ...inviteList,
      {
        Username: person.UserName,
        FirstName: person.FirstName,
        LastName: person.LastName,
        IsCustom: person.Username?.split('.').at(-1) === 'custom',
      },
    ]);
  };

  const removeInvite = (username) => {
    setInviteList(inviteList.filter((participant) => participant.Username !== username));
  };

  const handleSubmit = async () => {
    setSaving(true);
    let errorList = [];
    for (let index = 0; index < inviteList.length; index++) {
      let participantData = {
        Username: inviteList[index].Username,
        RoleTypeID: 2,
      };

      if (individualSport) {
        // if inviting a participant to an individual sport activity, create the team first
        const username = inviteList[index].Username;
        const profileInfo = await userService.getProfileInfo(username);
        const request = {
          Name: profileInfo.fullName,
          ActivityID: activityID,
        };
        await createTeam(username, request)
          .then((team) => {
            // add the participant to the team and then remove the admin's default participation
            addParticipantToTeam(team.ID, participantData).catch((reason) => {
              createSnackbar(
                `There was a problem adding ${username} to team: ${reason.title}`,
                'error',
              );
            });
            deleteTeamParticipant(team.ID, profile.AD_Username);
          })
          .catch((reason) => {
            createSnackbar(
              `There was a problem deleting ${profile.AD_Username} from team: ${reason.title}`,
              'error',
            );
          })
          .catch((reason) => {
            createSnackbar(
              `There was an issue creating team ${profileInfo.fullName}: ${reason.title}`,
              'error',
            );
          });
      } else {
        addParticipantToTeam(teamID, participantData).catch((reason) => {
          errorList.push({ username: inviteList[index].Username, reason: reason.title });
        });
      }
    }
    setSaving(false);
    let errorMessage = 'Error inviting:\n';
    errorList.forEach((value) => {
      errorMessage += errorMessage + `${value.username} with reason ${value.reason}`;
    });
    if (errorList.length !== 0) {
      createSnackbar(errorMessage, 'error');
    } else {
      createSnackbar('Invited your participants successfully', 'success');
    }
    onClose();
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
        <Grid container alignContent="center" direction="column" spacing={2} p={2}>
          <Grid item xs={12}>
            <ParticipantList minimal participants={inviteList} callbackFunction={removeInvite} />
          </Grid>
          {!saving && (
            <Grid item xs={12}>
              <GordonQuickSearch
                customPlaceholderText="Search for people"
                disableLink
                onSearchSubmit={onSearchSubmit}
                searchFunction={getAccountsBasicInfo}
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
