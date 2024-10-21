import { useState } from 'react';
import { useIsAuthenticated } from '@azure/msal-react';
import {
  Card,
  CardContent,
  CardActionArea,
  CardHeader,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import GordonOffline from 'components/GordonOffline';
import GordonUnauthenticated from 'components/GordonUnauthenticated';
import { useAuthGroups, useNetworkStatus } from 'hooks';
import { AuthGroup } from 'services/auth';
// import storageService from 'services/storage';
import styles from './Admin.module.css';
import CliftonStrengthsUpload from './components/CliftonStrengthsUpload';
import InvolvementStatusList from './components/InvolvementsStatus';

const Admin = () => {
  const isAdmin = useAuthGroups(AuthGroup.SiteAdmin);
  const isOnline = useNetworkStatus();
  const isAuthenticated = useIsAuthenticated();

  // State for all posters
  const [allPosters, setAllPosters] = useState([]);

  if (!isAuthenticated) {
    return <GordonUnauthenticated feature={'the admin page'} />;
  }

  if (!isOnline) {
    return <GordonOffline feature="Editing Administrators" />;
  }

  if (isAdmin) {
    return (
      <Grid container justifyContent="center" spacing={2}>
        {/* All Posters Section */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardHeader title="All Posters" className="gc360_header" />
            <CardContent>
              <Grid container direction="row" spacing={4}>
                {allPosters.map((item) => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={item.key}>
                    <Card variant="outlined">
                      <CardActionArea component="div">
                        <CardMedia
                          loading="lazy"
                          component="img"
                          alt={item.alt}
                          src={item.image}
                          title={item.title}
                        />
                        <CardContent>
                          <Typography className={'Poster Title'}>{item.title}</Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={8}>
          <InvolvementStatusList status={'Open'} />
        </Grid>

        <Grid item xs={12} lg={8}>
          <InvolvementStatusList status={'Closed'} />
        </Grid>

        <Grid item xs={12} lg={8}>
          <CliftonStrengthsUpload />
        </Grid>

        <Grid item xs={12} lg={8}>
          <Card>
            <CardHeader title="Site Admins" align="center" className={styles.cardheader} />
            <Grid container justifyContent="center">
              <Typography variant="p">
                Visit{' '}
                <Link href="https://groups.gordon.edu/group/360-SiteAdmin-SG" target="_blank">
                  groups.gordon.edu
                </Link>{' '}
                to view and make changes.
              </Typography>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default Admin;
