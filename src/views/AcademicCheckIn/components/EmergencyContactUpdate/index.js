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

const EmergencyContactUpdate = ({
  emergencyContact1,
  emergencyContact2,
  emergencyContact3,
  handleChangeEmergContact1,
  handleChangeEmergContact2,
  handleChangeEmergContact3,
  handleCheckEmergContact1,
  handleCheckEmergContact2,
  handleCheckEmergContact3,
}) => {
  let cyan = gordonColors.primary.cyan;

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
      {createEmergencyContactFields(
        1,
        emergencyContact1,
        handleChangeEmergContact1,
        handleCheckEmergContact1,
      )}
      {createEmergencyContactFields(
        2,
        emergencyContact2,
        handleChangeEmergContact2,
        handleCheckEmergContact2,
      )}
      {createEmergencyContactFields(
        3,
        emergencyContact3,
        handleChangeEmergContact3,
        handleCheckEmergContact3,
      )}
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
 * @param {Object} emergencyContact the emergency contact to be updated.
 *
 * @param {Function} handleChangeEmergContact a function to handle the updating of the fields
 *
 * @param {Function} handleCheckEmergContact a function to handle the updating of the checkbox fields
 *
 * @returns {JSX.Element} valid JSX for the emergency contact fields
 */
function createEmergencyContactFields(
  emergencyContact,
  handleChangeEmergContact,
  handleCheckEmergContact,
) {
  return (
    <Box padding={2} align="center">
      <Typography variant="body1" gutterBottom>
        {' '}
        <strong>Emergency Contact {emergencyContact.SEQ_NUM}</strong>{' '}
      </Typography>
      <Grid container spacing={2} justify="center">
        <Grid item>
          <FormControl className="emergencyContactForm">
            <InputLabel htmlFor="component-simple"> First Name </InputLabel>
            <Input
              id="component-simple"
              name={'firstname'}
              value={emergencyContact.firstname}
              onChange={handleChangeEmergContact}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className="emergencyContactForm">
            <InputLabel htmlFor="component-simple"> Last Name </InputLabel>
            <Input
              id="component-simple"
              name={'lastname'}
              value={emergencyContact.lastname}
              onChange={handleChangeEmergContact}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className="emergencyContactForm">
            <InputLabel htmlFor="component-simple"> Relationship </InputLabel>
            <Input
              id="component-simple"
              name={'relationship'}
              value={emergencyContact.relationship}
              onChange={handleChangeEmergContact}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className="emergencyContactForm">
            <InputLabel htmlFor="formatted-text-mask-input">Home Phone</InputLabel>
            <Input
              id="formatted-text-mask-input"
              name={'homePhone'}
              value={emergencyContact.HomePhone}
              onChange={handleChangeEmergContact}
              inputComponent={emergencyContact.HomePhoneIN ? phoneMaskINTL : phoneMaskUS}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={emergencyContact.HomePhoneIN}
                  name={'HomePhoneIN'}
                  onChange={handleCheckEmergContact}
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
              name={'mobilePhone'}
              value={emergencyContact.MobilePhone}
              onChange={handleChangeEmergContact}
              inputComponent={emergencyContact.MobilePhoneIN ? phoneMaskINTL : phoneMaskUS}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={emergencyContact.MobilePhoneIN}
                  name={'MobilePhoneIN'}
                  onChange={handleCheckEmergContact}
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
