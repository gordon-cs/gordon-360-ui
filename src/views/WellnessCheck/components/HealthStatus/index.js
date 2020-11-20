import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { Check, Remove, Clear } from '@material-ui/icons';
import { StatusColors } from '../../../../services/wellness';
import SymptomsDialog from '../../../../components/SymptomsDialog';
import './index.css';

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
    <Grid container justify="center" spacing={2}>
      <Grid item xs={12} md={8}>
        <Card className="wellness-check">
          <CardContent>
            <CardHeader title={username} />
            <Card>
              <img
                className="rounded-corners user-image"
                src={`data:image/jpg;base64,${image}`}
                alt={username}
              />
            </Card>
            <Grid spacing={2} className="wellness-status">
              <Card className={currentStatus}>
                <CardContent className="status-box">
                  <div className="status-time">{time}</div>

                  <div className="status-animation">{animatedIcon}</div>
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
          <div className="wellness-header">Questions? Health Center: (978) 867-4300 </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HealthStatus;
