import React, { useEffect, useState } from 'react';

import {
  CardActions,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core';
import membershipService from 'services/membership';
import { useParams } from 'react-router';
import userService from 'services/user';
import involvementService from 'services/activity';

const NonMemberButtons = ({
  participationDetail,
  onUnsubscribe,
  onSubscribe,
  involvementDescription,
  createSnackbar,
}) => {
  const [isRosterClosed, setIsRosterClosed] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const [participationCode, setParticipationCode] = useState('');
  const [titleComment, setTitleComment] = useState('');
  const { involvementCode, sessionCode } = useParams();

  useEffect(() => {
    involvementService
      .getStatus(involvementCode, sessionCode)
      .then((s) => setIsRosterClosed(s === 'CLOSED'));
  }, [involvementCode, sessionCode]);

  const onClose = () => {
    setOpenJoin(false);
    setParticipationCode('');
    setTitleComment('');
  };

  const onRequest = async () => {
    let data = {
      ACT_CDE: involvementCode,
      SESS_CDE: sessionCode,
      ID_NUM: userService.getLocalInfo().id,
      PART_CDE: participationCode,
      DATE_SENT: new Date().toLocaleString(),
      COMMENT_TXT: titleComment,
      APPROVED: 'Pending',
    };
    await membershipService.requestMembership(data);
    onClose();
    createSnackbar('Request sent, awaiting approval from a group leader', 'success');
  };

  return (
    <>
      <CardActions>
        {participationDetail[1] === 'Guest' ? (
          <Button variant="contained" color="primary" onClick={onUnsubscribe}>
            Unsubscribe
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            disabled={isRosterClosed}
            onClick={onSubscribe}
          >
            Subscribe
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          disabled={isRosterClosed}
          onClick={() => setOpenJoin(true)}
        >
          Join
        </Button>
      </CardActions>

      <Dialog open={openJoin} keepMounted>
        <DialogTitle>Join {involvementDescription}</DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <FormControl variant="filled" fullWidth>
                <InputLabel id={`involvement-profile-join-${involvementDescription}`}>
                  Participation
                </InputLabel>
                <Select
                  required
                  value={participationCode}
                  onChange={(event) => setParticipationCode(event.target.value)}
                  labelId={`involvement-profile-join-${involvementDescription}`}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="ADV">Advisor</MenuItem>
                  <MenuItem value="LEAD">Leader</MenuItem>
                  <MenuItem value="MEMBR">Member</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                variant="filled"
                label="Title/Comment"
                fullWidth
                onChange={(event) => setTitleComment(event.target.value)}
              />
            </Grid>
          </Grid>

          <DialogActions>
            <Button onClick={onClose} variant="contained" color="primary">
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              disabled={!participationCode}
              onClick={onRequest}
            >
              Submit
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NonMemberButtons;
