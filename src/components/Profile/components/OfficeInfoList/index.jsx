import { useState, Fragment, useEffect } from 'react';
import { Card, CardContent, CardHeader, Grid, List, Typography, IconButton } from '@mui/material';
import ProfileInfoListItem from '../ProfileInfoListItem';
import styles from './OfficeInfoList.module.css';
import UpdateOffice from './UpdateOfficeLocationDialog';
import UpdateOfficeHours from './UpdateOfficeHoursDialog';
import UpdateMail from './UpdateMailDestinationDialog';
import GordonTooltip from 'components/GordonTooltip';
import user from 'services/user';
import EditIcon from '@mui/icons-material/Edit';
import { SignalWifiStatusbarConnectedNoInternet4TwoTone } from '@mui/icons-material';

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
  const [profOfficeHours, setProfOfficeHours] = useState(office_hours);
  const [profMailLocation, setProfMailLocation] = useState(Mail_Location);

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
          <Grid item>{profOfficeHours ? profOfficeHours : 'Add office hours here'}</Grid>
          <Grid item>
            <UpdateOfficeHours
              officeHours={profOfficeHours}
              changeOfficeHours={setProfOfficeHours}
            />
          </Grid>
        </Grid>
      }
    />
  ) : profOfficeHours ? (
    <ProfileInfoListItem title="Office Hours:" contentText={profOfficeHours} />
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
              {profMailLocation ? profMailLocation : 'Add your mail location here'}
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
            <UpdateMail changeMailLocation={setProfMailLocation} />
          </Grid>
        </Grid>
      }
    />
  ) : profMailLocation ? (
    <ProfileInfoListItem title="Mailstop:" contentText={profMailLocation} />
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
