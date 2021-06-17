import React, { useEffect, useState } from 'react';
import { Typography, Grid, Fab, Card, CardHeader, CardContent } from '@material-ui/core';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { projectName } from 'project-name';
import PropTypes from 'prop-types';
import PWAInstructions from 'components/PWAInstructions/index';
import LoginDialogue from 'components/LoginDialogue';
import GetAppIcon from '@material-ui/icons/GetApp';
import { ga } from 'react-ga';
import './guestWelcome.css';

const GuestWelcome = ({ onLogIn }) => {
  const isOnline = useNetworkStatus();
  const [openPWAInstructions, setOpenPWAInstructions] = useState(false);
  const [showPWALink, setShowPWALink] = useState(false);
  const [deferredPWAPrompt, setDeferredPWAPrompt] = useState();

  useEffect(() => {
    document.title = `Login | ${projectName}`;

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
    <div className="gw-background">
      <Grid container direction="column" alignItems="center" className="gw-container" spacing={3}>
        <Grid item>
          <Grid container style={{ textAlign: 'center' }}>
            <Card raised className="gw-card">
              <CardHeader title="Welcome to Gordon360!" />
              <CardContent>
                <Typography>
                  As a guest, you have access to a limited view of the site. Login for full access.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid item>
          <LoginDialogue onLogIn={onLogIn} />
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

GuestWelcome.propTypes = {
  onLogIn: PropTypes.func.isRequired,
};

export default GuestWelcome;
