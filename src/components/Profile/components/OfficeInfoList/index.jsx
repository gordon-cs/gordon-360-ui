import { Card, CardContent, CardHeader, Grid, List, Typography } from '@mui/material';
import ProfileInfoListItem from '../ProfileInfoListItem';
import styles from './OfficeInfoList.module.css';
import UpdateOffice from './UpdateOfficeLocationDialog';
import UpdateOfficeHours from './UpdateOfficeHoursDialog';
import UpdateMail from './UpdateMailDestinationDialog';
import GordonTooltip from 'components/GordonTooltip';

const OfficeInfoList = ({
  myProf,
  profile: {
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
  // Only display on FacStaff profiles
  if (!PersonType?.includes('fac')) {
    return null;
  }

  // Only display if there is some info to show
  if (!myProf && !BuildingDescription && !OnCampusRoom && !OnCampusPhone && !office_hours) {
    return null;
  }

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

  const officeHours = myProf ? (
    <ProfileInfoListItem
      title="Office Hours:"
      contentText={
        <Grid container spacing={0} alignItems="center">
          <Grid item>{office_hours ? office_hours : 'Add office hours here'}</Grid>
          <Grid item>
            <UpdateOfficeHours officeHours={office_hours} />
          </Grid>
        </Grid>
      }
    />
  ) : office_hours ? (
    <ProfileInfoListItem title="Office Hours:" contentText={office_hours} />
  ) : null;

  const room = myProf ? (
    <ProfileInfoListItem
      title="Room:"
      contentText={
        <Grid container spacing={0} alignItems="center">
          <Grid item>
            {BuildingDescription || OnCampusRoom
              ? (BuildingDescription, OnCampusRoom)
              : 'Add your office location here'}
          </Grid>
          <Grid item>
            <UpdateOffice />
          </Grid>
        </Grid>
      }
    />
  ) : BuildingDescription || OnCampusRoom ? (
    <ProfileInfoListItem title="Room:" contentText={`${BuildingDescription}, ${OnCampusRoom}`} />
  ) : null;

  const mailstop = myProf ? (
    <ProfileInfoListItem
      title="Mailstop:"
      contentText={
        <Grid container spacing={0} alignItems="center">
          <Grid item>
            <Typography>
              {Mail_Location ? Mail_Location : 'Add your mail location here'}
              {Mail_Description && (
                <GordonTooltip
                  content={Mail_Description}
                  enterTouchDelay={50}
                  leaveTouchDelay={2000}
                />
              )}
            </Typography>
          </Grid>
          <Grid item>
            <UpdateMail />
          </Grid>
        </Grid>
      }
    />
  ) : Mail_Location ? (
    <ProfileInfoListItem title="Mailstop:" contentText={Mail_Location} />
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
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default OfficeInfoList;
