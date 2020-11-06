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
import wellness from '../../../../services/wellness';
import GordonLoader from '../../../../components/Loader';
import { Check, Remove } from '@material-ui/icons';
import './index.css';

const SYMPTOMS = true;
const NO_SYMPTOMS = false;

const HealthStatus = () => {
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(true);
  const [time, setTime] = useState(null);
  const [iconSize, setIconSize] = useState(0);

  useEffect(() => {
    setLoading(true);

    tick();
    const intervalID = setInterval(tick, 60 * 1000);

    setIconSize(window.innerWidth * 0.03 + 69);
    window.addEventListener('resize', resizeIcon);

    wellness
      .getStatus()
      .then((answer) => {
        if (answer.length && answer[0].answerValid && answer[0].userAnswer === NO_SYMPTOMS) {
          setCurrentStatus(NO_SYMPTOMS);
        } else {
          setCurrentStatus(SYMPTOMS);
        }
      })
      .then(() => setLoading(false));

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

  const ReportSymptomsButton = () => {
    if (currentStatus === NO_SYMPTOMS) {
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
              wellness.postAnswer(SYMPTOMS).then(() => {
                setCurrentStatus(SYMPTOMS);
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
    if (currentStatus === NO_SYMPTOMS) {
      return (
        <div className="status-animation">
          <Check style={{ fontSize: iconSize }} />
        </div>
      );
    } else {
      return (
        <div className="status-animation">
          <Remove style={{ fontSize: iconSize }} />
        </div>
      );
    }
  };

  if (loading) {
    return <GordonLoader />;
  } else {
    return (
      <Grid spacing={2} className="wellness-status">
        <Card className={currentStatus ? 'symptoms' : 'no-symptoms'}>
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
