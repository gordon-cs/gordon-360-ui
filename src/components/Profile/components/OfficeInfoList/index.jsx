import { useState, Fragment } from 'react';
import { Card, CardContent, CardHeader, Grid, List, Typography, IconButton } from '@mui/material';
import ProfileInfoListItem from '../ProfileInfoListItem';
import { Markup } from 'interweave';
import styles from './OfficeInfoList.module.css';
import { gordonColors } from 'theme';
import UpdateOffice from './UpdateOfficeLocationDialog';
import UpdateOfficeHours from './UpdateOfficeHoursDialog';
import UpdateMail from './UpdateMailDestinationDialog';
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
    <ProfileInfoListItem title="Office Hours:" contentText={`${office_hours}`} />
  ) : null;

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
        myProf ? (
          <Grid container spacing={0} alignItems="center">
            <Grid item>
              <Typography>
                {Mail_Location}
                <GordonTooltip
                  content={Mail_Description}
                  enterTouchDelay={50}
                  leaveTouchDelay={2000}
                />
              </Typography>
            </Grid>
            <Grid item>
              <UpdateMail />
            </Grid>
          </Grid>
        ) : (
          <Typography>
            {Mail_Location}
            <GordonTooltip content={Mail_Description} enterTouchDelay={50} leaveTouchDelay={2000} />
          </Typography>
        )
      }
    />
  ) : null;

  const updateOfficeInfo =
    myProf && PersonType?.includes('fac') ? (
      <Typography align="left" className={styles.note}>
        NOTE: Update your office info{' '}
        <a
          href="https://go.gordon.edu/general/myaccount.cfm"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: gordonColors.primary.blue }}
        >
          here
        </a>
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
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default OfficeInfoList;
