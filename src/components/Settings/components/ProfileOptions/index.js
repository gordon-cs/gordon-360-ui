import {
  Grid,
  Card,
  List,
  CardHeader,
  CardContent,
  Typography,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import userService from 'services/user';
import styles from './ProfileOptions.module.css';
import SettingsListItem from '../SettingsListItem';

const ProfileOptions = ({ isOnline, settings, createSnackbar }) => {
  const [isMobilePhonePrivate, setIsMobilePhonePrivate] = useState(settings);

  const handleChangeMobilePhonePrivacy = async () => {
    try {
      await userService.setMobilePhonePrivacy(!isMobilePhonePrivate);
      setIsMobilePhonePrivate(!isMobilePhonePrivate);

      createSnackbar(
        isMobilePhonePrivate ? 'Mobile Phone Visible' : 'Mobile Phone Hidden',
        'success',
      );
    } catch {
      createSnackbar('Privacy Change Failed', 'error');
    }
  };

  const MobilePhone = (
    <SettingsListItem
      title="Mobile Phone"
      ContentIcon={
        <FormControlLabel
          control={
            <Switch onChange={handleChangeMobilePhonePrivacy} checked={!isMobilePhonePrivate} />
          }
          label={isMobilePhonePrivate ? 'Private' : 'Public'}
          labelPlacement="bottom"
          disabled={!isOnline}
        />
      }
      // privateInfo={profile.CliftonStrengths.Private}
    />
  );

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={8}>
        <Card className={styles.settings}>
          <CardHeader
            className={styles.settings_title}
            title="Gordon 360 Settings"
            titleTypographyProps={{ variant: 'h4' }}
          />
          <CardContent>
            <Card className={styles.settings_section}>
              <CardHeader className={styles.settings_header} title="Profile Options" />
              <CardContent>
                <List>{MobilePhone}</List>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfileOptions;
