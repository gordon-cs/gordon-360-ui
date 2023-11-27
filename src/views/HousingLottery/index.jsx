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
import housingService from 'services/housing';
import styles from './HousingLottery.module.css';
import PreferredHall from './studentView/PreferredHall';
import Preference from './components/PreferenceBox';

const HousingLottery = () => {
  

  return (
    <Grid>
    <PreferredHall />
    <Preference />
    </Grid>
  );
  };
export default HousingLottery;
