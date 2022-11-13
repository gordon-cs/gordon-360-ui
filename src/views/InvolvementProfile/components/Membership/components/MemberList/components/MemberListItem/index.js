import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GordonDialogBox from 'components/GordonDialogBox';
import { useUser } from 'hooks';
import { useEffect, useState } from 'react';
import membership from 'services/membership';
import userService from 'services/user';
import { gordonColors } from 'theme';

const rowStyle = {
  margin: '10px 0px',
  padding: '10px 0px',
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

const PlaceHolderAvatar = () => (
  <svg width="50" height="50" viewBox="0 0 50 50">
    <rect width="50" height="50" rx="10" ry="10" fill="#CCC" />
  </svg>
);

const MemberListItem = ({
  member,
  isAdmin,
  isSiteAdmin,
  createSnackbar,
  isMobileView,
  onLeave,
  onToggleIsAdmin,
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [titleDialog, setTitleDialog] = useState(member.Description);
  const [isLeaveAlertOpen, setIsLeaveAlertOpen] = useState(false);
  const [isRemoveAlertOpen, setIsRemoveAlertOpen] = useState(false);
  const [isUnadminSelfDialogOpen, setIsUnadminSelfDialogOpen] = useState(false);

  const [groupAdmin, setGroupAdmin] = useState(member.GroupAdmin);
  const [participationDescription, setParticipationDescription] = useState(
    member.ParticipationDescription,
  );
  const [participation, setParticipation] = useState(member.Participation);
  const [title, setTitle] = useState(member.Description);
  const [avatar, setAvatar] = useState();
  const { profile } = useUser();

  useEffect(() => {
    const loadAvatar = async () => {
      if (member.AD_Username) {
        const { def: defaultImage, pref: preferredImage } = await userService.getImage(
          member.AD_Username,
        );
        const avatarImage = preferredImage || defaultImage;
        setAvatar(avatarImage ? `data:image/jpg;base64,${avatarImage}` : undefined);
      }
    };
    loadAvatar();
  }, [member.AD_Username]);

  const handleToggleGroupAdmin = async () => {
    if (isAdmin && !isSiteAdmin && member.IDNumber?.toString() === profile.ID) {
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
    setTitle(member.Description);
  };

  const onEditMember = async () => {
    let data = {
      MEMBERSHIP_ID: member.MembershipID,
      ACT_CDE: member.ActivityCode,
      SESS_CDE: member.SessionCode,
      ID_NUM: member.IDNumber,
      PART_CDE: participation,
      COMMENT_TXT: titleDialog,
    };
    await membership.editMembership(member.MembershipID, data);
    setTitle(titleDialog);
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
    setIsRemoveAlertOpen(false);
  };

  const handleRemove = () => {
    if (member.IDNumber?.toString() === profile.ID) {
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

  if (isAdmin || isSiteAdmin) {
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

        <GordonDialogBox
          open={isEditDialogOpen}
          title={`Edit ${member.FirstName} ${member.LastName} (${member.ParticipationDescription})`}
          buttonClicked={onEditMember}
          buttonName="Submit Changes"
          cancelButtonClicked={handleCloseEditDialog}
        >
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
                onChange={(e) => setTitleDialog(e.target.value)}
                defaultValue={title}
                label="Title"
              />
            </Grid>
          </Grid>
        </GordonDialogBox>

        <GordonDialogBox
          open={isRemoveAlertOpen}
          title="Confirm Removing Member"
          buttonClicked={confirmLeave}
          cancelButtonClicked={() => setIsRemoveAlertOpen(false)}
        >
          Are you sure you want to remove {member.FirstName} {member.LastName} (
          {member.ParticipationDescription}) from this involvement?
        </GordonDialogBox>
      </>
    );

    options = (
      <Grid container alignItems="center" justifyContent="space-evenly">
        <Grid item>
          <Checkbox
            checked={groupAdmin}
            color="primary"
            disabled={disabled}
            onChange={handleToggleGroupAdmin}
          />
        </Grid>

        {buttons}
      </Grid>
    );

    content = (
      <>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={1} style={rowStyle}>
            <Avatar
              src={avatar}
              alt={`${member.FirstName} ${member.LastName}`}
              variant="rounded"
              style={{ width: '4rem', height: '4rem', margin: '0 1rem 0 0' }}
            >
              {!avatar && <PlaceHolderAvatar />}
            </Avatar>
          </Grid>
          <Grid item xs={3}>
            {profile.PersonType?.includes?.('stu') & member.IsAlumni ? (
              <Typography>
                {member.FirstName} {member.LastName}
              </Typography>
            ) : (
              <Link href={`/profile/${member.AD_Username}`} underline="hover">
                <Typography>
                  {member.FirstName} {member.LastName}
                </Typography>
              </Link>
            )}
          </Grid>
          <Grid item xs={4} style={rowStyle}>
            <Typography>{title ? title : participationDescription}</Typography>
          </Grid>
          <Grid item xs={2} style={rowStyle}>
            <Typography>{member.Mail_Location}</Typography>
          </Grid>
          <Grid item xs={2} style={rowStyle}>
            {options}
          </Grid>
        </Grid>
        <Divider />
      </>
    );

    if (isMobileView) {
      options = (
        <Grid container alignItems="center" justifyContent="flex-end" spacing={3}>
          <Grid item sm={2} align="center">
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
        <Accordion defaultExpanded={(isAdmin || isSiteAdmin) && !isMobileView}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={9} sm={10}>
                <Grid container spacing={3} wrap="nowrap" alignItems="center">
                  <Grid>
                    <Avatar
                      src={avatar}
                      alt={`${member.FirstName} ${member.LastName}`}
                      variant="rounded"
                      style={{ width: '4rem', height: '4rem', margin: '0 1rem 0 0' }}
                    >
                      {!avatar && <PlaceHolderAvatar />}
                    </Avatar>
                  </Grid>
                  <Grid>
                    {profile.PersonType?.includes?.('stu') & member.IsAlumni ? (
                      <Typography>
                        {member.FirstName} {member.LastName}
                      </Typography>
                    ) : (
                      <Link href={`/profile/${member.AD_Username}`} underline="hover">
                        <Typography>
                          {member.FirstName} {member.LastName}
                        </Typography>
                      </Link>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3} sm={2}>
                <Typography>{member.ParticipationDescription} </Typography>
                <Typography>{mailLoc}</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container direction="column">
              <Grid item>{options}</Grid>
              <Grid item>{title}</Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      );
    }
  } else {
    if (member.IDNumber?.toString() === profile.ID) {
      options = (
        <Button variant="contained" style={redButton} onClick={() => setIsLeaveAlertOpen(true)}>
          LEAVE
        </Button>
      );
    }

    content = (
      <>
        <Divider />
        <Grid container alignItems="center" spacing={2} wrap="nowrap">
          <Grid item md={1} style={rowStyle}>
            <Avatar
              src={avatar}
              alt={`${member.FirstName} ${member.LastName}`}
              variant="rounded"
              style={{ width: '4rem', height: '4rem', margin: '0 1rem 0 0' }}
            >
              {!avatar && <PlaceHolderAvatar />}
            </Avatar>
          </Grid>
          <Grid item xs={3} style={rowStyle}>
            {profile.PersonType?.includes?.('stu') & member.IsAlumni ? (
              <Typography>
                {member.FirstName} {member.LastName}
              </Typography>
            ) : (
              <Link href={`/profile/${member.AD_Username}`} underline="hover">
                <Typography>
                  {member.FirstName} {member.LastName}
                </Typography>
              </Link>
            )}
          </Grid>
          <Grid item xs={4} style={rowStyle}>
            <Typography>{title ? title : participationDescription}</Typography>
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

  return (
    <>
      {content}
      <GordonDialogBox
        open={isLeaveAlertOpen}
        buttonName="Yes, Leave"
        buttonClicked={confirmLeave}
        cancelButtonName="No, Stay"
        cancelButtonClicked={() => setIsLeaveAlertOpen(false)}
      >
        Are you sure you want to leave this involvement?
      </GordonDialogBox>
      <GordonDialogBox
        open={isUnadminSelfDialogOpen}
        buttonClicked={onToggleIsAdmin}
        cancelButtonClicked={() => setIsUnadminSelfDialogOpen(false)}
      >
        Are you sure you want to remove yourself from the list of group admins? You won't be able to
        undo this action.
      </GordonDialogBox>
    </>
  );
};

export default MemberListItem;
