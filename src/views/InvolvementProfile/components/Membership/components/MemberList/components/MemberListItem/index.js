import React, { useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Grid,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  TextField,
  Typography,
  Select,
  MenuItem,
} from '@material-ui/core';

import { gordonColors } from 'theme';
import user from 'services/user';
import membership from 'services/membership';
const rowStyle = {
  padding: '10px',
};
const redButton = {
  background: gordonColors.secondary.red,
  color: 'white',
};
const outlinedRedButton = {
  color: gordonColors.secondary.red,
};

const PARTICIPATION_LEVELS = {
  Member: 'MEMBR',
  Leader: 'LEAD',
  Advisor: 'ADV',
  Guest: 'GUEST',
};

const MemberListItem = ({
  member,
  isAdmin,
  isSuperAdmin,
  createSnackbar,
  isMobileView,
  onLeave,
  onToggleIsAdmin,
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLeaveAlertOpen, setIsLeaveAlertOpen] = useState(false);
  const [isRemoveAlertOpen, setIsRemoveAlertOpen] = useState(false);
  const [isUnadminSelfDialogOpen, setIsUnadminSelfDialogOpen] = useState(false);

  const [groupAdmin, setGroupAdmin] = useState(member.GroupAdmin);
  const [participationDescription, setParticipationDescription] = useState(
    member.ParticipationDescription,
  );
  const [participation, setParticipation] = useState(member.Participation);
  const [titleComment, setTitleComment] = useState(member.Description);

  const handleToggleGroupAdmin = async () => {
    if (isAdmin && !isSuperAdmin && member.IDNumber === Number(user.getLocalInfo().id)) {
      setIsUnadminSelfDialogOpen(true);
    } else {
      let data = {
        MEMBERSHIP_ID: member.MembershipID,
        ACT_CDE: member.ActivityCode,
        SESS_CDE: member.SessionCode,
        ID_NUM: member.IDNumber,
        PART_CDE: member.Participation,
      };
      await membership.toggleGroupAdmin(member.MembershipID, data);
      setGroupAdmin((c) => !c);
    }
  };

  const handleSelect = (event) => {
    setParticipationDescription(event.target.value);
    setParticipation(PARTICIPATION_LEVELS[event.target.value]);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setParticipationDescription(member.ParticipationDescription);
    setTitleComment(member.Description);
  };

  const onEditMember = async () => {
    let data = {
      MEMBERSHIP_ID: member.MembershipID,
      ACT_CDE: member.ActivityCode,
      SESS_CDE: member.SessionCode,
      ID_NUM: member.IDNumber,
      PART_CDE: participation,
      COMMENT_TXT: titleComment,
    };
    await membership.editMembership(member.MembershipID, data);
    setIsEditDialogOpen(false);
  };

  const confirmLeave = async () => {
    await membership.remove(member.MembershipID);
    let inInvolvement = await membership.search(
      member.IDNumber,
      member.SessionCode,
      member.ActivityCode,
    )[0];
    if (inInvolvement) {
      createSnackbar('Leaving involvement failed', 'error');
    } else {
      createSnackbar('Leaving involvement succeeded', 'success');
    }
    onLeave();
    setIsLeaveAlertOpen(false);
  };

  const handleRemove = () => {
    if (member.IDNumber === Number(user.getLocalInfo().id)) {
      setIsLeaveAlertOpen(true);
    } else {
      setIsRemoveAlertOpen(true);
    }
  };

  let content;
  let options;

  let mailLoc = Number(member.Mail_Location)
    ? `Box #${member.Mail_Location}`
    : member.Mail_Location || null;

  if (isAdmin || isSuperAdmin) {
    const disabled = participationDescription === 'Guest' || participationDescription === 'Member';
    // Can't make guests or members a group admin
    const buttons = (
      <>
        <Grid item>
          <Grid container direction="column" align="center" spacing={2}>
            <Grid item>
              <Button
                color="primary"
                onClick={() => setIsEditDialogOpen(true)}
                variant="outlined"
                size="small"
              >
                Edit
              </Button>
            </Grid>

            <Grid item>
              <Button
                style={outlinedRedButton}
                onClick={handleRemove}
                variant="outlined"
                size="small"
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Dialog open={isEditDialogOpen} keepMounted align="center">
          <DialogTitle>
            Edit {member.FirstName} {member.LastName} ({member.ParticipationDescription})
          </DialogTitle>
          <DialogContent>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="member-edit-select-participation">Participation</InputLabel>
                  <Select
                    required
                    value={participationDescription}
                    onChange={handleSelect}
                    labelId="member-edit-select-participation"
                  >
                    <MenuItem value="Advisor">Advisor</MenuItem>
                    <MenuItem value="Leader">Leader</MenuItem>
                    <MenuItem value="Member">Member</MenuItem>
                    <MenuItem value="Guest">Guest</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  variant="filled"
                  fullWidth
                  onChange={(e) => setTitleComment(e.target.value)}
                  defaultValue={member.Description}
                  label="Title/Comment"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleCloseEditDialog}>
              CANCEL
            </Button>
            <Button variant="contained" color="primary" onClick={onEditMember}>
              SUBMIT CHANGES
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={isRemoveAlertOpen} keepMounted align="center">
          <DialogTitle>
            Are you sure you want to remove {member.FirstName} {member.LastName} (
            {member.ParticipationDescription}) from this involvement?
          </DialogTitle>
          <DialogActions>
            <Button variant="contained" onClick={() => setIsRemoveAlertOpen(false)}>
              CANCEL
            </Button>
            <Button variant="contained" color="primary" onClick={confirmLeave}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );

    options = (
      <Grid container alignItems="center" justify="space-evenly">
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={groupAdmin}
                color="primary"
                disabled={disabled}
                onChange={handleToggleGroupAdmin}
              />
            }
          />
        </Grid>

        {buttons}
      </Grid>
    );

    content = (
      <>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={2} style={rowStyle}>
            <Typography>
              {member.FirstName} {member.LastName}
            </Typography>
          </Grid>
          <Grid item xs={2} style={rowStyle}>
            <Typography>{participationDescription}</Typography>
          </Grid>
          <Grid item xs={3} style={rowStyle}>
            <Typography>{titleComment}</Typography>
          </Grid>
          <Grid item xs={2} style={rowStyle}>
            <Typography>{member.Mail_Location}</Typography>
          </Grid>
          <Grid item xs={3} style={rowStyle}>
            {options}
          </Grid>
        </Grid>
        <Divider />
      </>
    );

    if (isMobileView) {
      options = (
        <Grid container alignItems="center" justify="flex-end" spacing={4}>
          <Grid item sm={3} align="center">
            <FormControlLabel
              control={
                <Checkbox
                  checked={groupAdmin}
                  color="primary"
                  disabled={disabled}
                  onChange={handleToggleGroupAdmin}
                />
              }
              label="Group Admin"
            />
          </Grid>
          {buttons}
        </Grid>
      );

      content = (
        <Accordion defaultExpanded={(isAdmin || isSuperAdmin) && !isMobileView}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container>
              <Grid item xs={6} sm={7} md={8}>
                <Typography>
                  {member.FirstName} {member.LastName}
                </Typography>
              </Grid>
              <Grid item xs={4} sm={3} md={2}>
                <Typography>{member.ParticipationDescription} </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{mailLoc}</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container direction="column">
              <Grid item>{options}</Grid>
              <Grid item>{titleComment}</Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      );
    }
  } else {
    if (member.IDNumber.toString() === user.getLocalInfo().id) {
      options = (
        <Button variant="contained" style={redButton} onClick={() => setIsLeaveAlertOpen(true)}>
          LEAVE
        </Button>
      );
    }

    content = (
      <>
        <Grid container style={rowStyle} direction="row" alignItems="center">
          <Grid item xs={4} style={rowStyle}>
            <Typography>
              {member.FirstName} {member.LastName}
            </Typography>
          </Grid>
          <Grid item xs={4} style={rowStyle}>
            <Typography>{participationDescription}</Typography>
          </Grid>
          <Grid item xs={2} style={rowStyle}>
            <Typography>{mailLoc}</Typography>
          </Grid>
          <Grid item style={rowStyle} align="flex-end">
            {options}
          </Grid>
        </Grid>
        <Divider />
      </>
    );
  }

  return (
    <>
      {content}
      <Dialog
        open={isLeaveAlertOpen}
        keepMounted
        align="center"
        onBackdropClick={() => setIsLeaveAlertOpen(false)}
      >
        <DialogTitle>Are you sure you want to leave this involvement?</DialogTitle>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={() => setIsLeaveAlertOpen(false)}>
            No, stay
          </Button>
          <Button variant="contained" onClick={confirmLeave} style={redButton}>
            Yes, leave
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isUnadminSelfDialogOpen}>
        <DialogTitle>
          Are you sure you want to remove yourself from the list of group admins? You won't be able
          to undo this action.
        </DialogTitle>
        <DialogActions>
          <Button variant="outlined" onClick={() => setIsUnadminSelfDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="outlined" style={redButton} onClick={onToggleIsAdmin}>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MemberListItem;
