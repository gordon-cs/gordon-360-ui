import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { Check, Remove, Clear } from '@material-ui/icons';
import { StatusColors } from 'services/wellness';
import SymptomsDialog from 'components/SymptomsDialog';

const useStyles = makeStyles({
  wellness_check: {
    text_align: 'center',

    MuiPaper_elevation1: {
      boxShadow: 'none',
    },

    MuiButton_contained: {
      backgroundColor: $primary_cyan,
      color: $neutral_white,

      '&:hover': {
        backgroundColor: $primary_cyan,
      },
    },

    user_image: {
      maxHeight: '200px',
      minWidth: '160px',
    },

    wellness_header: {
      background_color: $primary_blue,
      color: $neutral_white,
      padding: '10px',
      font_size: '20px',
    },
  },

  wellness_status: {
    GREEN: {
      status_box: {
        height: '250px',
        background_color: $wellness_green,
      },

      status_time: {
        fontSize: 'calc(14px + 1vw)',
        color: $neutral_white,
        padding_bottom: '30px',
      },

      status_animation: {
        text_align: center,
        height: 'calc(70px + 3vw)',
        width: 'calc(70px + 3vw)',
        background_color: $wellness_green,
        color: $neutral_white,
        border_radius: '50%',
        display: inline_block,
        animation_name: animationCheck,
        animation_duration: '1s',
        animation_iteration_count: infinite,
        animation_direction: alternate,
      },
    },

    '@keyframes animationCheck': {
      from: {
        background_color: $wellness_green,
        color: $neutral_white,
      },
      to: {
        background_color: $neutral_white,
        color: $wellness_green,
      },
    },

    YELLOW: {
      status_box: {
        height: '250px',
        background_color: $wellness_yellow,
      },

      status_time: {
        font_size: 'calc(14px + 1vw)',
        color: $neutral_dark_gray,
        padding_bottom: '30px',
      },

      status_animation: {
        text_align: center,
        height: 'calc(70px + 3vw)',
        width: 'calc(70px + 3vw)',
        background_color: $wellness_yellow,
        color: $neutral_dark_gray,
        border_radius: '50%',
        display: 'inline_block',
        animation_name: 'animationBar',
        animation_duration: '1s',
        animation_iteration_count: 'infinite',
        animation_direction: 'alternate',
      },
    },

    '@keyframes animationBar': {
      from: {
        background_color: $wellness_yellow,
        color: $neutral_dark_gray,
      },
      to: {
        background_color: $neutral_dark_gray,
        color: $wellness_yellow,
      },
    },

    RED: {
      status_box: {
        height: '250px',
        background_color: $wellness_red,
      },

      status_time: {
        font_size: 'calc(14px + 1vw)',
        color: $neutral_gray2,
        padding_bottom: '30px',
      },

      status_animation: {
        text_align: 'center',
        height: 'calc(70px + 3vw)',
        width: 'calc(70px + 3vw)',
        background_color: $wellness_red,
        color: $neutral_gray2,
        border_radius: '50%',
        display: 'inline_block',
        animation_name: 'animationCross',
        animation_duration: '1s',
        animation_iteration_count: 'infinite',
        animation_direction: 'alternate',
      },
    },

    '@keyframes animationCross': {
      from: {
        background_color: $wellness_red,
        color: $neutral_gray2,
      },
      to: {
        background_color: $neutral_gray2,
        color: $wellness_red,
      },
    },
  },

  artc_link: {
    color: $primary_cyan,
    text_decoration: 'underline',
  },

  'artc_link:hover': {
    color: $primary_blue,
    text_decoration: 'underline',
  },
});

const HealthStatus = ({ currentStatus, setCurrentStatus, username, image }) => {
  const classes = useStyles();
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
        <Card className={classes.wellness_check}>
          <CardHeader title={username} />
          <CardContent>
            <img
              className="rounded-corners user-image"
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
                  className="rtc-link"
                >
                  the Post-Easter Break Return to Campus form
                </a>{' '}
                before checking in.
              </Typography>
            )}
            {/* END */}
            <Grid className="wellness-status">
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
