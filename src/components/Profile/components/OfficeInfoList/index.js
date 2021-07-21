import React from 'react';
import styles from './OfficeInfoList.module.css';

import { Grid, Card, CardHeader, CardContent, List } from '@material-ui/core';
import ProfileInfoListItem from '../ProfileInfoListItem';

const OfficeInfoList = ({
  profile: {
    BuildingDescription,
    OnCampusDepartment,
    OnCampusRoom,
    OnCampusPhone,
    PersonType,
    office_hours,
    Mail_Location,
  },
}) => {
  // Only display on FacStaff profiles
  if (!PersonType?.includes('fac')) {
    return null;
  }

  // Only display if there is some info to show
  if (!BuildingDescription && !OnCampusRoom && !OnCampusPhone && !office_hours) {
    return null;
  }

  const department = OnCampusDepartment ? (
    <ProfileInfoListItem title="Department:" contentText={OnCampusDepartment} />
  ) : null;

  const officePhone = OnCampusPhone ? (
    <ProfileInfoListItem
      title="Office Phone:"
      contentText={
        <a href={'tel:978867' + OnCampusPhone} className={styles.gc360-text-link}>
          {'(978) 867-' + OnCampusPhone}
        </a>
      }
    />
  ) : null;

  const officeHours = office_hours ? (
    <ProfileInfoListItem title="Office Hours:" contentText={office_hours} />
  ) : null;

  const room =
    BuildingDescription || OnCampusRoom ? (
      <ProfileInfoListItem title="Room:" contentText={`${BuildingDescription}, ${OnCampusRoom}`} />
    ) : null;

  const mailstop = Mail_Location ? (
    <ProfileInfoListItem title="Mailstop:" contentText={Mail_Location} />
  ) : null;

  return (
    <Grid item xs={12}>
      <Card className={styles.office-info-list}>
        <Grid container className={styles.office-info-list-header}>
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
