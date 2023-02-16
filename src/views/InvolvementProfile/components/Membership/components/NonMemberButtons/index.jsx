import {
  Button,
  CardActions,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import GordonDialogBox from 'components/GordonDialogBox';
import { useUser } from 'hooks';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import involvementService from 'services/activity';
import requestService, { RequestStatus } from 'services/request';

const NonMemberButtons = ({
  isGuest,
  onUnsubscribe,
  onSubscribe,
  involvementDescription,
  createSnackbar,
}) => {
  const [isRosterClosed, setIsRosterClosed] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [participationCode, setParticipationCode] = useState('');
  const [titleComment, setTitleComment] = useState('');
  const { involvementCode, sessionCode } = useParams();
  const { profile } = useUser();

  useEffect(() => {
    const load = async () => {
      const rosterStatus = await involvementService.getStatus(involvementCode, sessionCode);
      setIsRosterClosed(rosterStatus === 'CLOSED');
    };
    load();
  }, [involvementCode, sessionCode]);

  const onClose = () => {
    setIsJoinDialogOpen(false);
    setParticipationCode('');
    setTitleComment('');
  };

  const onRequest = async () => {
    let data = {
      Activity: involvementCode,
      Session: sessionCode,
      Username: profile.AD_Username,
      Participation: participationCode,
      DateSent: new Date().toLocaleString(),
      CommentText: titleComment,
      Status: RequestStatus.Pending,
    };

    try {
      await requestService.requestMembership(data);
      onClose();
      createSnackbar('Request sent, awaiting approval from a group leader', 'success');
    } catch (err) {
      if (
        err.Message ===
        'A request for this activity has already been made for you and is awaiting group leader approval.'
      ) {
        createSnackbar('You already have a pending request to join this involvement.', 'info');
      } else {
        createSnackbar(
          'There was a problem sending your request to join. Please try again or contact CTS',
          'error',
        );
      }
    }
  };

  return (
    <>
      <CardActions>
        {isGuest ? (
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
          onClick={() => setIsJoinDialogOpen(true)}
        >
          Join
        </Button>
      </CardActions>

      <GordonDialogBox
        open={isJoinDialogOpen}
        title={`Join ${involvementDescription}`}
        buttonClicked={onRequest}
        cancelButtonClicked={onClose}
      >
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

export default NonMemberButtons;
