import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import wellness, { StatusColors } from '../../../../services/wellness';
import GordonLoader from '../../../../components/Loader';
import { Check, Remove, Clear } from '@material-ui/icons';
import './index.css';

const HealthStatus = () => {
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [time, setTime] = useState(null);
  const [iconSize, setIconSize] = useState(0);

  useEffect(() => {
    setLoading(true);
    getCurrentStatus();

    tick();
    const intervalID = setInterval(tick, 60 * 1000);

    setIconSize(window.innerWidth * 0.03 + 69);
    window.addEventListener('resize', resizeIcon);

    return () => {
      window.removeEventListener('resize', resizeIcon);
      clearInterval(intervalID);
    };
  }, []);

  const getCurrentStatus = async () => {
    const status = await wellness.getStatus();
    if (status.IsValid) {
      setCurrentStatus(status.Status);
    } else {
      setCurrentStatus(StatusColors.YELLOW);
    }
    setLoading(false);
  };

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

  const ReportSymptomsButton = () => {
    if (currentStatus === StatusColors.GREEN) {
      return (
        <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
          Report Symptoms
        </Button>
      );
    } else {
      return null;
    }
  };

  const SymptomsDialog = () => {
    return (
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="submit-dialog"
        aria-describedby="submit-symptoms"
        className="symptoms-dialog"
      >
        <DialogTitle>Symptom Positive Response</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to submit that you have recently experienced COVID-19 symptoms.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              wellness.postAnswer(StatusColors.YELLOW).then(() => {
                setCurrentStatus(StatusColors.YELLOW);
                setIsDialogOpen(false);
              })
            }
            className="confirm-symptoms"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const AnimatedIcon = () => {
    switch (currentStatus) {
      case StatusColors.GREEN:
        return (
          <div className="status-animation">
            <Check style={{ fontSize: iconSize }} />
          </div>
        );

      case StatusColors.YELLOW:
        return (
          <div className="status-animation">
            <Remove style={{ fontSize: iconSize }} />
          </div>
        );

      case StatusColors.RED:
        return (
          <div className="status-animation">
            <Clear style={{ fontSize: iconSize }} />
          </div>
        );

      default:
        break;
    }
  };

  if (loading) {
    return <GordonLoader />;
  } else {
    return (
      <Grid spacing={2} className="wellness-status">
        <Card className={currentStatus}>
          <CardContent className="status-box">
            <div className="status-time">{time}</div>
            {AnimatedIcon()}
          </CardContent>
        </Card>
        <br />
        {ReportSymptomsButton()}
        {SymptomsDialog()}
      </Grid>
    );
  }
};

export default HealthStatus;
