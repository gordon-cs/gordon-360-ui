// import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  Checkbox,
  Input,
  Grid,
  Typography,
  Box,
} from '@material-ui/core';
import { gordonColors } from 'theme';
import { phoneMaskUS, phoneMaskINTL } from 'views/AcademicCheckIn/components/UpdatePhone/';
// import './index.css';

const EmergencyContactUpdate = ({ values, handleChange, handleCheck }) => {
  let cyan = gordonColors.primary.cyan;

  const emergencyContact1 = [
    1,
    values.firstName1,
    values.lastName1,
    values.relationship1,
    values.homePhone1,
    values.homePhone1IN,
    values.mobilePhone1,
    values.mobilePhone1IN,
  ];

  const emergencyContact2 = [
    2,
    values.firstName2,
    values.lastName2,
    values.relationship2,
    values.homePhone2,
    values.homePhone2IN,
    values.mobilePhone2,
    values.mobilePhone2IN,
  ];

  const emergencyContact3 = [
    3,
    values.firstName3,
    values.lastName3,
    values.relationship3,
    values.homePhone3,
    values.homePhone3IN,
    values.mobilePhone3,
    values.mobilePhone3IN,
  ];

  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <Typography align="center" variant="h5" gutterBottom style={{ color: cyan }}>
        Step 1: Enter your Emergency Contact Information
      </Typography>
      <Typography variant="h6" gutterBottom>
        <b>Who are your emergency contacts?</b>
      </Typography>
      <Typography variant="body1" gutterBottom>
        HIPAA regulations prohibit sharing of medical information regarding anyone age 18 or over
        without consent.
      </Typography>
      <Typography variant="body1" gutterBottom>
        By listing emergency contacts below, I authorize the Gordon College staff to share medical
        information with my emergency contact(s) during my enrollment at Gordon College. I hereby
        authorize Gordon College to contact the following person(s) listed below in the event of a
        medical emergency.
      </Typography>
      {createEmergencyContactFields(emergencyContact1, handleChange, handleCheck)}
      {createEmergencyContactFields(emergencyContact2, handleChange, handleCheck)}
      {createEmergencyContactFields(emergencyContact3, handleChange, handleCheck)}
      <Grid item>
        <br />
      </Grid>
      <Typography variant="body2" gutterBottom>
        If, during the semester your emergency contact information must be updated, please contact
        Student Life at 978.867.4263.
      </Typography>
      <Typography variant="body2" gutterBottom>
        For international phone numbers, check the "Non-US Number" checkbox to enter information.
      </Typography>
    </Grid>
  );
};

/**
 * Helper function to return the emergency contact fields.
 *
 *
 * @param {List} valueList a list of the values to be updated by the emergency contact form. These
 * values should be passed in the order [formnumber, firstname, lastname, relationship, homephone,
 * mobilephone]
 * @param {Function} handleChange a function to handle the updating of the fields
 *
 * @param {Function} handleCheck a function to handle the updating of the checkbox fields
 *
 * @returns {JSX.Element} valid JSX for the emergency contact fields
 */
function createEmergencyContactFields(valueList, handleChange, handleCheck) {
  const formNumber = valueList[0];
  return (
    <Box padding={2} align="center">
      <Typography variant="body1" gutterBottom>
        {' '}
        <strong>Emergency Contact {formNumber}</strong>{' '}
      </Typography>
      <Grid container spacing={2} justify="center">
        <Grid item>
          <FormControl className="emergencyContactForm">
            <InputLabel htmlFor="component-simple"> First Name </InputLabel>
            <Input
              id="component-simple"
              name={'firstName' + formNumber}
              value={valueList[1]}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className="emergencyContactForm">
            <InputLabel htmlFor="component-simple"> Last Name </InputLabel>
            <Input
              id="component-simple"
              name={'lastName' + formNumber}
              value={valueList[2]}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className="emergencyContactForm">
            <InputLabel htmlFor="component-simple"> Relationship </InputLabel>
            <Input
              id="component-simple"
              name={'relationship' + formNumber}
              value={valueList[3]}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className="emergencyContactForm">
            <InputLabel htmlFor="formatted-text-mask-input">Home Phone</InputLabel>
            <Input
              id="formatted-text-mask-input"
              name={'homePhone' + formNumber}
              value={valueList[4]}
              onChange={handleChange}
              inputComponent={valueList[5] ? phoneMaskINTL : phoneMaskUS}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={valueList[5]}
                  name={'homePhone' + formNumber + 'IN'}
                  onChange={handleCheck}
                />
              }
              label="International #"
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className="emergencyContactForm">
            <InputLabel htmlFor="formatted-text-mask-input"> Mobile Phone </InputLabel>
            <Input
              id="formatted-text-mask-input"
              name={'mobilePhone' + formNumber}
              value={valueList[6]}
              onChange={handleChange}
              inputComponent={valueList[7] ? phoneMaskINTL : phoneMaskUS}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={valueList[7]}
                  name={'mobilePhone' + formNumber + 'IN'}
                  onChange={handleCheck}
                />
              }
              label="International #"
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EmergencyContactUpdate;
