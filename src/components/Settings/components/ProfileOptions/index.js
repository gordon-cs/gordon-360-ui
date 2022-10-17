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
import styles from './ProfileOptions.module.css';
import SettingsListItem from '../SettingsListItem';

const ProfileOptions = () => {
  const cliftonStrengths = (
    <SettingsListItem // now showing anything
      title="Clifton Strengths"
      ContentIcon={
        <FormControlLabel
          control={
            <Switch
            // onChange={handleChangeCliftonStrengthsPrivacy}
            // checked={!isCliftonStrengthsPrivate}
            />
          }
          // label={isCliftonStrengthsPrivate ? 'Private' : 'Public'}
          labelPlacement="bottom"
          // disabled={!isOnline}
        />
      }
      // privateInfo={profile.CliftonStrengths.Private}
      // myProf={myProf}
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
                <Typography variant="body1" component="ul">
                  <li>Username: 'firstname.lastname' or your Gordon email address</li>
                  <li>Password: Your Gordon College account password</li>
                </Typography>
              </CardContent>
            </Card>
          </CardContent>
          <CardContent>
            <List>{cliftonStrengths}</List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfileOptions;
