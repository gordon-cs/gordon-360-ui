import { useState, useEffect } from 'react';
import styles from './EmergencyInfoList.module.css';
import ProfileInfoListItem from '../ProfileInfoListItem';
import user from 'services/user';

import { Typography, Grid, Card, CardHeader, CardContent, List } from '@material-ui/core';

const formatPhone = (phone) => {
  if (phone?.length === 10) {
    return `(${phone?.slice(0, 3)}) ${phone?.slice(3, 6)}-${phone?.slice(6)}`;
  } else {
    return phone;
  }
};

const EmergencyInfoList = ({ username }) => {
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  useEffect(() => {
    const loadEmrg = async () => {
      setEmergencyContacts(await user.getEmergencyInfo(username));
    };
    loadEmrg();
  }, [username]);

  return (
    <Grid item xs={12}>
      <Card className={styles.emrg_info_list}>
        <Grid container className={styles.emrg_info_list_header}>
          <CardHeader title="Emergency Contact Information" />
        </Grid>
        <CardContent>
          <List>
            {emergencyContacts.map((emrgContact) => (
              <>
                <ProfileInfoListItem
                  title="Emergency Contact:"
                  contentText={
                    emrgContact.FirstName +
                    ' ' +
                    emrgContact.LastName +
                    (emrgContact.Relationship ? ' (' + emrgContact.Relationship + ')' : '')
                  }
                  contentClass={'private'}
                />
                <ul type="disc">
                  <li>
                    <ProfileInfoListItem
                      title="Mobile Phone:"
                      contentText={
                        <a href={`tel:${emrgContact.MobilePhone}`} className="gc360_text_link">
                          {formatPhone(emrgContact.MobilePhone)}
                        </a>
                      }
                      contentClass={'private'}
                    />
                  </li>
                  <li>
                    <ProfileInfoListItem
                      title="Home Phone:"
                      contentText={
                        <a href={`tel:${emrgContact.HomePhone}`} className="gc360_text_link">
                          {formatPhone(emrgContact.HomePhone)}
                        </a>
                      }
                      contentClass={'private'}
                    />
                  </li>
                  <li>
                    <ProfileInfoListItem
                      title="Work Phone:"
                      contentText={
                        <a href={`tel:${emrgContact.WorkPhone}`} className="gc360_text_link">
                          {formatPhone(emrgContact.WorkPhone)}
                        </a>
                      }
                      contentClass={'private'}
                    />
                  </li>
                </ul>
              </>
            ))}
            <Typography align="left" className={styles.disclaimer}>
              Private: visible only to Gordon Police
            </Typography>
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default EmergencyInfoList;
