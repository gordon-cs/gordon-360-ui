import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import mascot from './mascot.svg';

const message = "Hmmm... We're not quite sure what you're looking for";

const styles = {
  main: {
    height: 'calc(100vh - 72px)',
    margin: '-16px 0px',
    position: 'relative',
  },
  message: {
    padding: '20px',
    maxWidth: '700px',
    fontSize: 'calc(1vw + 1.5em)',
  },
  image: {
    height: '60%',
  },
  mascot: {
    height: '100%',
    maxWidth: '90vw',
  },
};

export default class ProfileNotFound extends Component {

  render() {
    return (
      <Grid container
        justify="center" alignContent="center"
        direction="column"
        style={styles.main}
      >
        <Grid item style={styles.message}>
          <Typography variant="h4" align="center" style={{fontSize: "calc(0.2vw + 0.8em)", color: "rgba(0, 0, 0, 0.54)", fontWeight: "bold"}}>
            {message}
          </Typography>
        </Grid>
        <Grid item style={styles.image}>
          <img src={mascot} alt="Gordon Mascot" style={styles.mascot}></img>
        </Grid>
      </Grid>
    );
  }

}
