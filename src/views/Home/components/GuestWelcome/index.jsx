import GetAppIcon from '@mui/icons-material/GetApp';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Fab,
  Grid,
  Typography,
} from '@mui/material';
import PWAInstructions from 'components/PWAInstructions/index';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useEffect, useState } from 'react';
import { ga } from 'react-ga4';
import { authenticate } from 'services/auth';
import styles from './GuestWelcome.module.css';
import GordonLogoVerticalWhite from './images/gordon-logo-vertical-white.svg';

const GuestWelcome = () => {
  const isOnline = useNetworkStatus();
  const [openPWAInstructions, setOpenPWAInstructions] = useState(false);
  const [showPWALink, setShowPWALink] = useState(false);
  const [deferredPWAPrompt, setDeferredPWAPrompt] = useState();

  useEffect(() => {
    // Check if the browser has the PWA quick installation prompt available
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      setDeferredPWAPrompt(e);
    });

    // Check if the PWA was installed
    window.addEventListener('appinstalled', () => {
      // Exits out the PWA Installation dialog box if already opened
      setOpenPWAInstructions(false);
      setShowPWALink(false);
    });

    let displayMode;
    if (navigator.standalone || window.matchMedia('(display-mode: standalone)').matches) {
      // if loaded through PWA
      displayMode = 'standalone';
      setShowPWALink(false);
      setOpenPWAInstructions(false);
    } else {
      // otherwise show install button for PWA
      displayMode = 'browser';
      setShowPWALink(true);
    }
    // Google Analytics to track PWA usage
    ga('set', 'dimension1', displayMode);

    // Removes all events listeners that were invoked in this component
    return function cleanupListener() {
      window.removeEventListener('beforeinstallprompt', () => {});
      window.removeEventListener('appinstalled', () => {});
    };
  }, []);

  return (
    <div className={styles.gw_background}>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={styles.gw_container}
        spacing={3}
      >
        <Grid item>
          <Grid container style={{ textAlign: 'center' }}>
            <Card raised className={styles.gw_card}>
              <CardHeader title="Welcome to Gordon360!" />
              <CardMedia image={GordonLogoVerticalWhite} component="img" />
              <CardContent>
                <Typography>
                  As a guest, you have access to a limited view of the site. Login for full access.
                </Typography>
              </CardContent>
              <CardActions>
                <Container>
                  <Button variant="contained" color="secondary" onClick={authenticate}>
                    Login
                  </Button>
                </Container>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {isOnline && showPWALink && (
          <Grid item>
            <Grid onClick={() => setOpenPWAInstructions(true)}>
              <Fab variant="extended" color="primary">
                <GetAppIcon />
                &nbsp;&nbsp;
                <Typography variant="subtitle1">Install Gordon 360</Typography>
              </Fab>
            </Grid>
          </Grid>
        )}
      </Grid>

      {isOnline && showPWALink && openPWAInstructions && (
        <PWAInstructions
          open={openPWAInstructions}
          handleDisplay={() => setOpenPWAInstructions(!openPWAInstructions)}
          deferredPWAPrompt={deferredPWAPrompt}
        />
      )}
    </div>
  );
};

export default GuestWelcome;
