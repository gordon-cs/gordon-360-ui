import { Button, Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { Check, Clear, Remove } from '@material-ui/icons';
import SymptomsDialog from 'components/SymptomsDialog';
import { useUser, useWindowSize } from 'hooks';
import { useEffect, useState } from 'react';
import { StatusColor } from 'services/wellness';
import styles from './HealthStatus.module.css';

const HealthStatus = ({
  currentStatus: { Status: currentStatus, StatusDescription },
  setCurrentStatus,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [time, setTime] = useState(null);
  const [width] = useWindowSize();
  const iconSize = width * 0.03 + 69;
  const { profile, images } = useUser();

  useEffect(() => {
    tick();
    const intervalID = setInterval(tick, 60 * 1000);

    return () => {
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

  let animatedIcon;
  switch (currentStatus) {
    case StatusColor.Green:
      animatedIcon = <Check style={{ fontSize: iconSize }} />;
      break;

    case StatusColor.Yellow:
      animatedIcon = <Remove style={{ fontSize: iconSize }} />;
      break;

    case StatusColor.Red:
      animatedIcon = <Clear style={{ fontSize: iconSize }} />;
      break;

    default:
      break;
  }

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} md={8}>
        <Card className={styles.wellness_check}>
          <CardHeader title={profile.fullName} />
          <CardContent>
            <img
              className={`rounded_corners ${styles.user_image}`}
              src={`data:image/jpg;base64,${images.pref || images.def}`}
              alt={profile.fullName}
            />
            <Grid>
              <Card className={styles[currentStatus]}>
                <CardContent className={styles.box}>
                  <div className={styles.time}>{time}</div>

                  <div className={styles.animation}>{animatedIcon}</div>
                  {StatusDescription && (
                    <p className={styles.status_description}>Status: {StatusDescription}</p>
                  )}
                </CardContent>
              </Card>
              <br />
              {currentStatus === StatusColor.Green && (
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
          <div className={styles.wellness_header}>
            Questions? Email{' '}
            <a className={styles.contact_link} href="mailto:covid-19@gordon.edu">
              Covid-19@gordon.edu
            </a>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HealthStatus;
