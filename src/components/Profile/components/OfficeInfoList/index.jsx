import { useState, Fragment } from 'react';
import { Card, CardContent, CardHeader, Grid, List, Typography, IconButton } from '@mui/material';
import ProfileInfoListItem from '../ProfileInfoListItem';
import { Markup } from 'interweave';
import styles from './OfficeInfoList.module.css';
import UpdateOffice from './UpdateOfficeLocationDialog';
import EditDescriptionDialog from './EditDescriptionDialog';
import GordonTooltip from 'components/GordonTooltip';
import user from 'services/user';
import EditIcon from '@mui/icons-material/Edit';

const OfficeInfoList = ({
  myProf,
  profile: {
    AD_Username,
    BuildingDescription,
    OnCampusDepartment,
    OnCampusRoom,
    OnCampusPhone,
    PersonType,
    office_hours,
    Mail_Location,
    Mail_Description,
  },
}) => {
  const [editDescriptionOpen, setEditDescriptionOpen] = useState(false);
  const [profile, setProfile] = useState();
  const [description, setDescription] = useState('');

  const loadData = async (searchedUser) => {
    try {
      const profileInfo = await user.getProfileInfo(AD_Username);

      setProfile(profileInfo);
      if (profileInfo.PersonType?.includes('fac')) {
        setDescription(profileInfo.office_hours);
      } else {
        setDescription('');
      }
    } catch (e) {}
  };

  const handleEditDescriptionOpen = () => {
    setEditDescriptionOpen(true);
  };

  const handleEditDescriptionClose = () => {
    setEditDescriptionOpen(false);
  };

  const handleDescriptionSubmit = async (descValue) => {
    await user.updateOfficeHours(descValue);
    loadData(profile);
  };
  console.log(description);
  let editDescriptionButton, editDialog;

  if (myProf) {
    editDialog = (
      <EditDescriptionDialog
        onDialogSubmit={handleDescriptionSubmit}
        handleEditDescriptionClose={handleEditDescriptionClose}
        editDescriptionOpen={editDescriptionOpen}
        descriptiontext={office_hours}
      />
    );
  }

  if (myProf) {
    editDescriptionButton = (
      <Fragment>
        <IconButton
          style={{ marginBottom: '0.5rem' }}
          onClick={handleEditDescriptionOpen}
          size="large"
        >
          <EditIcon style={{ fontSize: 20 }} />
        </IconButton>
      </Fragment>
    );
  }

  // Only display on FacStaff profiles
  if (!PersonType?.includes('fac')) {
    return null;
  }

  // Only display if there is some info to show
  // if (!BuildingDescription && !OnCampusRoom && !OnCampusPhone && !office_hours) {
  //   return null;
  // }

  const department = OnCampusDepartment ? (
    <ProfileInfoListItem title="Department:" contentText={OnCampusDepartment} />
  ) : null;

  const officePhone = OnCampusPhone ? (
    <ProfileInfoListItem
      title="Office Phone:"
      contentText={
        <a href={'tel:978867' + OnCampusPhone} className="gc360_text_link">
          {'(978) 867-' + OnCampusPhone}
        </a>
      }
    />
  ) : null;

  const officeHours = (
    <ProfileInfoListItem
      title="Office Hours:"
      contentText={
        <Grid>
          <Markup content={description} />
          {editDescriptionButton}
        </Grid>
      }
    />
  );

  const room =
    BuildingDescription || OnCampusRoom ? (
      <ProfileInfoListItem
        title="Room:"
        contentText={
          myProf ? (
            <Grid container spacing={0} alignItems="center">
              <Grid item>
                {BuildingDescription}, {OnCampusRoom}
              </Grid>
              <Grid item>
                <UpdateOffice />
              </Grid>
            </Grid>
          ) : (
            `${BuildingDescription}, ${OnCampusRoom}`
          )
        }
      />
    ) : null;

  const mailstop = Mail_Location ? (
    <ProfileInfoListItem
      title="Mailstop:"
      contentText={
        <Typography>
          {Mail_Location}
          {<GordonTooltip content={Mail_Description} enterTouchDelay={50} leaveTouchDelay={2000} />}
        </Typography>
      }
    />
  ) : null;

  const updateOfficeInfo =
    myProf && PersonType?.includes('fac') ? (
      <Typography align="left" className={styles.note}>
        NOTE: Update your office hours in the Schedule Panel below.
      </Typography>
    ) : null;

  return (
    <Grid item xs={12} lg={12}>
      <Card className={styles.office_info_list}>
        <Grid container className={styles.office_info_list_header}>
          <CardHeader title="Office Information" />
        </Grid>

        <CardContent>
          <List>
            {department}
            {room}
            {mailstop}
            {officePhone}
            {officeHours}
            {updateOfficeInfo}
          </List>
        </CardContent>
      </Card>
      {editDialog}
    </Grid>
  );
};

export default OfficeInfoList;
