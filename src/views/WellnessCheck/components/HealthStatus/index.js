import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { Check, Remove, Clear } from '@material-ui/icons';
import { StatusColors } from 'services/wellness';
import SymptomsDialog from 'components/SymptomsDialog';
import styles from './HealthStatus.module.css';

const HealthStatus = ({ currentStatus, setCurrentStatus, username, image }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [time, setTime] = useState(null);
  const [iconSize, setIconSize] = useState(0);

  useEffect(() => {
    tick();
    const intervalID = setInterval(tick, 60 * 1000);

    setIconSize(window.innerWidth * 0.03 + 69);
    window.addEventListener('resize', resizeIcon);

    return () => {
      window.removeEventListener('resize', resizeIcon);
      clearInterval(intervalID);
    };
  }, []);

  const tick = () => {
    setTime(
      new Date().toLocaleString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    );
  };

  const resizeIcon = () => {
    setIconSize(window.innerWidth * 0.03 + 69);
  };

  let animatedIcon;
  switch (currentStatus) {
    case StatusColors.GREEN:
      animatedIcon = <Check style={{ fontSize: iconSize }} />;
      break;

    case StatusColors.YELLOW:
      animatedIcon = <Remove style={{ fontSize: iconSize }} />;
      break;

    case StatusColors.RED:
      animatedIcon = <Clear style={{ fontSize: iconSize }} />;
      break;

    default:
      break;
  }

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} md={8}>
        <Card className={styles.wellness_check}>
          <CardHeader title={username} />
          <CardContent>
            <img
              className={`rounded_corners ${styles.user_image}`}
              src={`data:image/jpg;base64,${image}`}
              alt={username}
            />
            {/* TODO: Remove following code block after Spring 2021 move in is complete */}
            {/* START */}
            {currentStatus === StatusColors.RED && (
              <Typography variant="h5">
                Students must fill out{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://forms.office.com/r/BFdQwaTBR1"
                  className={styles.rtc_link}
                >
                  the Post-Easter Break Return to Campus form
                </a>{' '}
                before checking in.
              </Typography>
            )}
            {/* END */}
            <Grid className={styles.wellness_status}>
              <Card className={styles[currentStatus]}>
                <CardContent className={styles.status_box}>
                  <div className={styles.status_time}>{time}</div>

                  <div className={styles.status_animation}>{animatedIcon}</div>
                </CardContent>
              </Card>
              <br />
              {currentStatus === StatusColors.GREEN && (
                <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
                  Report Symptoms
                </Button>
              )}
              <SymptomsDialog
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                setStatus={setCurrentStatus}
              />
            </Grid>
          </CardContent>
          <div className={styles.wellness_header}>Questions? Health Center: (978) 867-4300 </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HealthStatus;
