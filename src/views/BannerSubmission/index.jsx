import { useIsAuthenticated } from '@azure/msal-react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@mui/material';
import GordonOffline from 'components/GordonOffline';
import GordonUnauthenticated from 'components/GordonUnauthenticated';
import { useAuthGroups, useNetworkStatus } from 'hooks';
import { AuthGroup } from 'services/auth';
import BannerAdmin from './components/BannerAdmin';
import styles from './BannerSubmission.module.css';

const BannerSubmission = () => {
  const authenticated = useIsAuthenticated();
  const isOnline = useNetworkStatus();
  const isAdmin = useAuthGroups(AuthGroup.SiteAdmin);

  if (!authenticated) {
    return <GordonUnauthenticated feature={'the banner submission'} />;
  }

  if (!isOnline) {
    return <GordonOffline feature="Banner Sumission" />;
  }

  if (isAdmin) {
    return <BannerAdmin />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader
            title="Advertise your club or event on the 360 Homepage!"
            titleTypographyProps={{ variant: 'h4', align: 'center' }}
            className="gc360_header"
          />
          <CardContent>
            <Typography variant="h6">Banner Image Guidelines</Typography>
            <Typography variant="body2">
              1. Attach JPG or PNG image with a resolution of 1500 by 600.
              <br />
              2. Text must be clearly legible.
              <br />
              3. Include a url that you would like the banner image to link to in your email.
              <br />
              4. All banner images must be approved. There is limited space, some images may not be
              accepted.
            </Typography>
          </CardContent>
          <CardActions className={styles.banner_submission_card_action}>
            <Button
              variant="contained"
              color="secondary"
              href="mailto:360@gordon.edu?Subject=Banner Image Submission"
            >
              Email the 360 Team
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BannerSubmission;
