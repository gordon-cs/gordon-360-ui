import React from 'react';

import './loader.css';

import { Grid, CircularProgress } from '@material-ui/core';

const GordonLoader = ({ size }) => {
  return (
    <Grid className="gordon-loader" container justify="center" alignItems="center">
      <Grid item>
        <CircularProgress size={size || 100} />
      </Grid>
    </Grid>
  );
};

export default GordonLoader;
