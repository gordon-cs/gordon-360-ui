import { useEffect, useState } from 'react';

import { PersonAdd as AddPersonIcon } from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import GordonDialogBox from 'components/GordonDialogBox';
import { useParams } from 'react-router';
import involvementService from 'services/activity';
import membershipService from 'services/membership';
import { stripDomain } from 'services/utils';
import RequestsReceived from './components/RequestsReceived';
import { ConflictError, NotFoundError } from 'services/error';
import styles from './AdminCard.module.css';

const AdminCard = ({ createSnackbar, isSiteAdmin, involvementDescription, onAddMember }) => {
  const [isRosterClosed, setIsRosterClosed] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [participationCode, setParticipationCode] = useState('');
  const [titleComment, setTitleComment] = useState('');
  const { involvementCode, sessionCode } = useParams();

  useEffect(() => {
    involvementService
      .getStatus(involvementCode, sessionCode)
      .then((s) => setIsRosterClosed(s === 'CLOSED'));
  }, [involvementCode, sessionCode]);

  const onConfirmRoster = async () => {
    await involvementService.closeActivity(involvementCode, sessionCode);
    setIsRosterClosed(true);
  };

  const onReopenRoster = async () => {
    await involvementService.reopenActivity(involvementCode, sessionCode);
    setIsRosterClosed(false);
  };

  const handleAddMember = async () => {
    let formattedUsername = stripDomain(username.toLowerCase());

    try {
      let data = {
        Activity: involvementCode,
        Session: sessionCode,
        Username: formattedUsername,
        Participation: participationCode,
        CommentText: titleComment,
        GroupAdmin: false,
        Privacy: false,
      };

      await membershipService.addMembership(data);
      createSnackbar(`Successfully added ${username}`, 'success');
      onAddMember();
      setIsDialogOpen(false);
    } catch (error) {
      if (error.Message === 'The Person is already part of the activity.') {
        createSnackbar(`${username} is already a member`, 'info');
      } else {
        if (error instanceof ConflictError) {
          createSnackbar(`${username} is already a member`, 'info');
        } else if (error instanceof NotFoundError) {
          createSnackbar('Nobody with that username was found', 'error');
        } else {
          createSnackbar('An error has occured', 'error');
          console.log(error);
        }
      }
    }
  };

  return (
    <>
      <Card>
        <CardHeader title="Manage Roster" className={styles.cardHeader} />
        <CardContent>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <RequestsReceived onAddMember={onAddMember} />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                disabled={isRosterClosed}
                onClick={() => setIsDialogOpen(true)}
                startIcon={<AddPersonIcon />}
              >
                Add member
              </Button>
            </Grid>
            <Grid item>
              {(!isRosterClosed || isSiteAdmin) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={isRosterClosed ? onReopenRoster : onConfirmRoster}
                >
                  {isRosterClosed ? 'Reopen Roster' : 'Confirm Final Roster'}
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <GordonDialogBox
        open={isDialogOpen}
        title={`Add a member to ${involvementDescription}`}
        buttonName="Add Member"
        buttonClicked={handleAddMember}
        isButtonDisabled={!username || !participationCode}
        cancelButtonClicked={() => setIsDialogOpen(false)}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              required
              fullWidth
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
              variant="filled"
            />
          </Grid>
          <Grid item>
            <FormControl variant="filled" required fullWidth>
              <InputLabel id="involvement-profile-add-member-select-participation">
                Participation
              </InputLabel>
              <Select
                onChange={(event) => setParticipationCode(event.target.value)}
                labelId="involvement-profile-add-member-select-participation"
              >
                <MenuItem value="ADV">Advisor</MenuItem>
                <MenuItem value="LEAD">Leader</MenuItem>
                <MenuItem value="MEMBR">Member</MenuItem>
                <MenuItem value="GUEST">Guest</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              variant="filled"
              label="Title/Comment"
              type="search"
              fullWidth
              onChange={(event) => setTitleComment(event.target.value)}
            />
          </Grid>
        </Grid>
      </GordonDialogBox>
    </>
  );
};

export default AdminCard;
