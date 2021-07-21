import React from 'react';

import styles from './Loader.module.css';

import { Grid, CircularProgress } from '@material-ui/core';

const GordonLoader = ({ size }) => {
  return (
    <Grid className={styles.gordon-loader} container justifyContent="center" alignItems="center">
      <Grid item>
        <CircularProgress size={size || 100} />
      </Grid>
    </Grid>
  );
};

export default GordonLoader;
