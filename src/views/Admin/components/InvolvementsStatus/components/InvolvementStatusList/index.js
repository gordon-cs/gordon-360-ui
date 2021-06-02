import React from 'react';
import { Link } from 'react-router-dom';

import { Typography, Grid } from '@material-ui/core';

const InvolvementStatusList = ({ Activity, session }) => {
  return (
    <Link className="gc360-link" to={`/activity/${session}/${Activity.ActivityCode}`}>
      <Grid container alignItems="center" style={{ margin: '0.5rem' }}>
        <Grid item>
          <img
            src={Activity.ActivityImagePath}
            alt={Activity.ActivityDescription}
            style={{ width: '30%' }}
          />
        </Grid>
        <Grid item>
          <Typography>
            <b>{Activity.ActivityDescription}</b>
          </Typography>
        </Grid>
      </Grid>
    </Link>
  );
};

export default InvolvementStatusList;
