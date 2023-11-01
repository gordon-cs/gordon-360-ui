import { FormControl, Button, Card, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import housingService from 'services/housing';
import styles from './HousingLottery.module.css';
import SearchField from 'views/PeopleSearch/components/SearchFieldList/components/SearchField';
import PreferredHall from './studentView/PreferredHall';

const HousingLottery = () => {
  return <PreferredHall />;
};

export default HousingLottery;
