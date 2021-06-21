import { useState } from 'react';
import './index.css';
import ProfileInfoListItem from '../ProfileInfoListItem';
import user from 'services/user';

import { Typography, Grid, Card, CardHeader, CardContent, List } from '@material-ui/core';
import { useEffect } from 'react';

const formatPhone = (phone) => {
  let tele = String(phone);
  if (tele.length === 10) {
    return '(' + tele.slice(0, 3) + ') ' + tele.slice(3, 6) + '-' + tele.slice(6);
  }
  if (tele !== 'undefined') {
    return tele;
  }
};

const EmergencyInfoList = ({ username }) => {
  const [emrg, setEmrg] = useState([]);

  useEffect(() => {
    const loadEmrg = async () => {
      setEmrg(await user.getEmergencyInfo(username));
    };
    loadEmrg();
  }, [username]);

  const disclaimer = (
    <Typography align="left" className="disclaimer">
      Private: visible only to Gordon Police
    </Typography>
  );

  return (
    <Grid item xs={12}>
      <Card className={`emrg-info-list`}>
        <Grid container className="emrg-info-list-header">
          <CardHeader title="Emergency Contact Information" />
        </Grid>
        <CardContent>
          <List>
            {emrg.map((emrgContact) => (
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
                        <a href={`tel:${emrgContact.MobilePhone}`} className="gc360-text-link">
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
                        <a href={`tel:${emrgContact.HomePhone}`} className="gc360-text-link">
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
                        <a href={`tel:${emrgContact.WorkPhone}`} className="gc360-text-link">
                          {formatPhone(emrgContact.WorkPhone)}
                        </a>
                      }
                      contentClass={'private'}
                    />
                  </li>
                </ul>
              </>
            ))}
            {disclaimer}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default EmergencyInfoList;
