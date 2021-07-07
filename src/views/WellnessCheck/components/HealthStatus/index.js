import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, Grid, /*Typography,*/ styled } from '@material-ui/core';
import { Check, Remove, Clear } from '@material-ui/icons';
import { keyframes } from '@material-ui/styled-engine'
import { StatusColors } from 'services/wellness';
import SymptomsDialog from 'components/SymptomsDialog';
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

  let wellnessColor;
  let altWellnessColor;
  let animatedIcon;

  switch (currentStatus) {
    case StatusColors.GREEN:
      animatedIcon = <Check style={{ fontSize: iconSize }} />;
      wellnessColor = '#005500';
      altWellnessColor = '#ffffff';
      break;

    case StatusColors.YELLOW:
      animatedIcon = <Remove style={{ fontSize: iconSize }} />;
      wellnessColor = '#ffcc00';
      altWellnessColor = '#31342b';
      break;

    case StatusColors.RED:
      animatedIcon = <Clear style={{ fontSize: iconSize }} />;
      wellnessColor = 'a30000';
      altWellnessColor = '#cccccb';
      break;

    default:
      break;
  }

  const WellnessCard = styled(Card)({
    textAlign: 'center',
  });

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

  const StatusBox = styled(CardContent)({
    height: 250,
    backgroundColor: wellnessColor,
  });

  const StatusTime = styled('div')({
    fontSize: 14 + vw,
    color: altWellnessColor,
    paddingBottom: 30,
  });

  const animation = keyframes`
  from {
    background-color: ${wellnessColor};
    color: ${altWellnessColor};
  }
  to {
    background-color: ${altWellnessColor};
    color: ${wellnessColor};
  }
  `;

  const StatusAnimation = styled('div')({
    textAlign: 'center',
    height: 70 + 3 * vw,
    width: 70 + 3 * vw,
    backgroundColor: wellnessColor,
    color: altWellnessColor,
    borderRadius: 50,
    display: 'inline-block',
    animation: `${animation} 1s infinite alternate`
  });


  return (
    <Grid container justify="center" spacing={2}>
      <Grid item xs={12} md={8}>
        <WellnessCard>
          <CardHeader title={username} />
          <CardContent>
            <img
              className="rounded-corners"
              src={`data:image/jpg;base64,${image}`}
              alt={username}
              style={{ maxHeight: 200, minWidth: 160 }}
            />
            {/* TODO: Remove following code block after Spring 2021 move in is complete */}
            {/* START
            {currentStatus === StatusColors.RED && (
              <Typography variant="h5">
                Students must fill out{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://forms.office.com/r/BFdQwaTBR1"
                  className="rtc-link"
                >
                  the Post-Easter Break Return to Campus form
                </a>{' '}
                before checking in.
              </Typography>
            )} */}
            {/* END */}
            <Grid>
              <Card>
                <StatusBox>
                  <StatusTime>{time}</StatusTime>

                  <StatusAnimation>{animatedIcon}</StatusAnimation>
                </StatusBox>
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
          <div textAlign="center">Questions? Health Center: (978) 867-4300 </div>
        </WellnessCard>
      </Grid>
    </Grid>
  );
};

export default HealthStatus;
