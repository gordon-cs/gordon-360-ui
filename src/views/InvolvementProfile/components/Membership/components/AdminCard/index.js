import React, { useEffect, useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  Select,
} from '@material-ui/core';
import { PersonAdd as AddPersonIcon } from '@material-ui/icons';

import involvementService from 'services/activity';
import membershipService from 'services/membership';
import RequestsReceived from './components/RequestsReceived';
import { gordonColors } from 'theme';
import { useParams } from 'react-router';

const headerStyle = {
  backgroundColor: gordonColors.primary.blue,
  color: '#FFF',
  padding: '10px',
};

const AdminCard = ({
  createSnackbar,
  participationLevel,
  isSuperAdmin,
  involvementDescription,
  onAddMember,
}) => {
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
    let memberEmail = username;
    if (!memberEmail.toLowerCase().includes('@gordon.edu')) {
      memberEmail = memberEmail + '@gordon.edu';
    }

    try {
      let data = {
        ACT_CDE: involvementCode,
        SESS_CDE: sessionCode,
        // TODO: Fix API to accept username instead of ID and then remove Group Admin privilege to access ID.
        ID_NUM: (await membershipService.getEmailAccount(memberEmail)).GordonID,
        PART_CDE: participationCode,
        COMMENT_TXT: titleComment,
        GRP_ADMIN: false,
      };

      await membershipService.addMembership(data);
      createSnackbar(`Successfully added ${username}`, 'success');
      onAddMember();
      setIsDialogOpen(false);
    } catch (error) {
      console.log(error);
      if (error.Message === 'The Person is already part of the activity.') {
        createSnackbar(`${username} is already a member`, 'info');
      } else {
        switch (error.name) {
          case 'NotFoundError':
            createSnackbar('Nobody with that username was found', 'error');
            break;

          default:
            console.log(error);
            break;
        }
      }
    }
  };

  // Only advisors and superadmins can re-open the roster
  const confirmRoster = !isRosterClosed ? (
    <Button variant="contained" color="primary" onClick={onConfirmRoster}>
      Confirm final roster
    </Button>
  ) : participationLevel === 'Advisor' || isSuperAdmin ? (
    <Button variant="contained" color="primary" onClick={onReopenRoster}>
      Reopen roster
    </Button>
  ) : null;

  return (
    <>
      <Card>
        <CardHeader title="Manage Roster" style={headerStyle} />
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
            <Grid item>{confirmRoster}</Grid>
            {(participationLevel === 'Advisor' || isSuperAdmin) && (
              <Grid item>
                <Typography>* FERPA protected student</Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} keepMounted align="center">
        <DialogTitle>Add a member to {involvementDescription}</DialogTitle>
        <DialogContent>
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
                  value={participationCode}
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
                fullWidth
                onChange={(event) => setTitleComment(event.target.value)}
                value={titleComment}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setIsDialogOpen(false)}>
            CANCEL
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!username || !participationCode}
            onClick={handleAddMember}
          >
            Add member
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminCard;
