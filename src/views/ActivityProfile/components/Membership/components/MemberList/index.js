import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';

import { gordonColors } from 'theme';
import user from 'services/user';
import membership from 'services/membership';

import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Divider,
  DialogActions,
  InputLabel,
} from '@material-ui/core';

const breakpointWidth = 810;

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

const MemberList = ({ member, admin, createSnackbar }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [alertLeave, setAlertLeave] = useState(false);
  const [alertRemove, setAlertRemove] = useState(false);

  const [groupAdmin, setGroupAdmin] = useState(member.GroupAdmin);
  const [participationDescription, setParticipationDescription] = useState(
    member.ParticipationDescription,
  );
  const [participation, setParticipation] = useState(member.Participation);
  const [titleComment, setTitleComment] = useState(member.Description);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < breakpointWidth);

  useEffect(() => {
    const resize = () => {
      setIsMobileView(window.innerWidth < breakpointWidth);
    };

    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  });

  const handleToggleGroupAdmin = async (event) => {
    setGroupAdmin(event.target.checked);
    let data = {
      MEMBERSHIP_ID: member.MembershipID,
      ACT_CDE: member.ActivityCode,
      SESS_CDE: member.SessionCode,
      ID_NUM: member.IDNumber,
      PART_CDE: member.Participation,
    };
    await membership.toggleGroupAdmin(member.MembershipID, data);
    refresh();
  };

  const handleSelect = (event) => {
    setParticipationDescription(event.target.value);
    setParticipation(PARTICIPATION_LEVELS[event.target.value]);
  };

  const onClose = () => {
    setAlertLeave(false);
    setAlertRemove(false);
    setOpenEdit(false);
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
    onClose();
    refresh();
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
    onClose();
    refresh();
  };

  const refresh = () => {
    window.location.reload();
  };

  let mailLoc = Number(member.Mail_Location)
    ? `Box #${member.Mail_Location}`
    : member.Mail_Location || null;

  let content;
  let options;

  if (admin) {
    const disabled = participationDescription === 'Guest' || participationDescription === 'Member';
    // Can't make guests or members a group admin
    const buttons = (
      <>
        <Grid item>
          <Button color="primary" onClick={() => setOpenEdit(true)} variant="outlined" size="small">
            Edit
          </Button>
        </Grid>

        <Grid item>
          <Button
            style={outlinedRedButton}
            onClick={() => setAlertRemove(true)}
            variant="outlined"
            size="small"
          >
            Remove
          </Button>
        </Grid>

        <Dialog open={openEdit} keepMounted align="center">
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
            <Button variant="contained" onClick={onClose}>
              CANCEL
            </Button>
            <Button variant="contained" color="primary" onClick={onEditMember}>
              SUBMIT CHANGES
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={alertRemove} keepMounted align="center">
          <DialogTitle>
            Are you sure you want to remove {member.FirstName} {member.LastName} (
            {member.ParticipationDescription}) from this involvement?
          </DialogTitle>
          <DialogActions>
            <Button variant="contained" onClick={onClose}>
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
      <Grid container alignItems="center" justify="space-between">
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
        <Accordion defaultExpanded={admin && !isMobileView}>
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
        <Grid container>
          <Grid item>
            <Button variant="contained" style={redButton} onClick={() => setAlertLeave(true)}>
              LEAVE
            </Button>

            <Dialog open={alertLeave} keepMounted align="center" onBackdropClick={onClose}>
              <DialogTitle>Are you sure you want to leave this involvement?</DialogTitle>
              <DialogActions>
                <Button variant="contained" color="primary" onClick={onClose}>
                  No, stay
                </Button>
                <Button variant="contained" onClick={confirmLeave} style={redButton}>
                  Yes, leave
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
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
          <Grid item xs={2} style={rowStyle}>
            {options}
          </Grid>
        </Grid>
        <Divider />
      </>
    );
  }

  return content;
};

MemberList.propTypes = {
  member: PropTypes.shape({
    AccountPrivate: PropTypes.number,
    ActivityCode: PropTypes.string.isRequired,
    ActivityDescription: PropTypes.string.isRequired,
    ActivityImagePath: PropTypes.string,
    Description: PropTypes.string,
    EndDate: PropTypes.string,
    FirstName: PropTypes.string.isRequired,
    GroupAdmin: PropTypes.bool,
    IDNumber: PropTypes.number,
    LastName: PropTypes.string.isRequired,
    MembershipID: PropTypes.number,
    Participation: PropTypes.string.isRequired,
    ParticipationDescription: PropTypes.string.isRequired,
    Privacy: PropTypes.string,
    SessionCode: PropTypes.string.isRequired,
    SessionDescription: PropTypes.string.isRequired,
    StartDate: PropTypes.string,
  }).isRequired,
};

export default MemberList;
