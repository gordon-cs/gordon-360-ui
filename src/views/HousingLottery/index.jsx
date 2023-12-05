import React, { useEffect, useState } from 'react';
import {
  Input,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  CardHeader,
  CardContent,
  Grid,
} from '@mui/material';
import PreferredHallsCard from './studentView/PreferredHall';
import PreferredHall from './studentView/PreferredHall';
import StudentApplicants from './studentView/StudentApplicants/index.jsx';
import Preference from './studentView/PreferenceBox';
import Agreements from './studentView/Agreements';
import Instructions from './studentView/Instructions';
import housingService from 'services/housing';
import styles from './HousingLottery.module.css';

const HousingLottery = () => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={10}>
        <Instructions />
      </Grid>
      <Grid item xs={12} lg={5}>
        <StudentApplicants />
      </Grid>
      <Grid item xs={12} lg={5}>
        <PreferredHall />
      </Grid>
      <Grid item xs={12} lg={10}>
        <Preference />
      </Grid>
      <Grid item xs={10}>
        <Agreements />
      </Grid>
    </Grid>
  );
};

export default HousingLottery;
