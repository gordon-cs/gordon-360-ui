// import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Input, Grid, Typography, Box } from '@material-ui/core';
import { gordonColors } from 'theme';
import './index.css';

const EmergencyContactUpdate = ({ values, handleChange }) => {
  // let cyan = gordonColors.primary.cyan; lmao
  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <Grid item xs={8}>
        <Typography variant="h6" gutterBottom color="textPrimary">
          Step 1: Enter your Emergency Contact Information
        </Typography>
        <Typography variant="h6" gutterBottom>
          Who are your emergency contacts?
        </Typography>
        <Typography variant="body2" gutterBottom>
          HIPAA regulations prohibit sharing of medical information regarding anyone age 18 or over
          without consent.
        </Typography>
        <Typography variant="body2" gutterBottom>
          By listing emergency contacts below, I authorize the Gordon College staff to share medical
          information with my emergency contact(s) during my enrollment at Gordon College. I hereby
          authorize Gordon College to contact the following person(s) listed below in the event of a
          medical emergency.
        </Typography>
      </Grid>
      <br />
      <Grid item xs={5}>
        <Box m={2}>
          <Typography variant="body1">Emergency Contact 1</Typography>
        </Box>
        <FormControl className="checkIn">
          <InputLabel htmlFor="component-simple"> First Name </InputLabel>
          <Input
            id="component-simple"
            name="firstName1"
            value={values.firstName1}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={5}>
        <FormControl className="checkIn">
          <InputLabel htmlFor="component-simple"> Last Name </InputLabel>
          <Input
            id="component-simple"
            name="lastName1"
            value={values.lastName1}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={5}>
        <FormControl className="checkIn">
          <InputLabel htmlFor="component-simple"> Relationship </InputLabel>
          <Input
            id="component-simple"
            name="relationship1"
            value={values.relationship1}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={5}>
        <FormControl className="checkIn">
          <InputLabel htmlFor="component-simple"> Home Phone </InputLabel>
          <Input
            id="component-simple"
            name="homePhone1"
            value={values.homePhone1}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={5}>
        <FormControl className="checkIn">
          <InputLabel htmlFor="component-simple"> Mobile Phone </InputLabel>
          <Input
            id="component-simple"
            name="mobilePhone1"
            value={values.mobilePhone1}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <br />
      <Box m={2}>
        <Typography variant="body1">Emergency Contact 2</Typography>
      </Box>
      <Grid item xs={5}>
        <FormControl className="checkIn">
          <InputLabel htmlFor="component-simple"> First Name </InputLabel>
          <Input
            id="component-simple"
            name="firstName2"
            value={values.firstName2}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={5}>
        <FormControl className="checkIn">
          <InputLabel htmlFor="component-simple"> Last Name </InputLabel>
          <Input
            id="component-simple"
            name="lastName2"
            value={values.lastName2}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={5}>
        <FormControl className="checkIn">
          <InputLabel htmlFor="component-simple"> Relationship </InputLabel>
          <Input
            id="component-simple"
            name="relationship2"
            value={values.relationship2}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={5}>
        <FormControl className="checkIn">
          <InputLabel htmlFor="component-simple"> Home Phone </InputLabel>
          <Input
            id="component-simple"
            name="homePhone2"
            value={values.homePhone2}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={5}>
        <FormControl className="checkIn">
          <InputLabel htmlFor="component-simple"> Mobile Phone </InputLabel>
          <Input
            id="component-simple"
            name="mobilePhone2"
            value={values.mobilePhone2}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <br />
      <Box m={2}>
        <Typography variant="body1">Emergency Contact 3</Typography>
      </Box>
      <Grid item xs={5}>
        <FormControl className="checkIn">
          <InputLabel htmlFor="component-simple"> First Name </InputLabel>
          <Input
            id="component-simple"
            name="firstName3"
            value={values.firstName3}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={5}>
        <FormControl className="checkIn">
          <InputLabel htmlFor="component-simple"> Last Name </InputLabel>
          <Input
            id="component-simple"
            name="lastName3"
            value={values.lastName3}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={5}>
        <FormControl className="checkIn">
          <InputLabel htmlFor="component-simple"> Relationship </InputLabel>
          <Input
            id="component-simple"
            name="relationship3"
            value={values.relationship3}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={5}>
        <FormControl className="checkIn">
          <InputLabel htmlFor="component-simple"> Home Phone </InputLabel>
          <Input
            id="component-simple"
            name="homePhone3"
            value={values.homePhone3}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={5}>
        <FormControl className="checkIn">
          <InputLabel htmlFor="component-simple"> Mobile Phone </InputLabel>
          <Input
            id="component-simple"
            name="mobilePhone3"
            value={values.mobilePhone3}
            onChange={handleChange}
          />
        </FormControl>
      </Grid>

      <Grid item xs={5}>
        <Typography variant="body2" gutterBottom>
          If, during the semester your emergency contact information must be updated, please contact
          Student Life at 978.867.4263.
        </Typography>
        <Typography variant="body2" gutterBottom>
          For international phone numbers, check the
        </Typography>
      </Grid>
    </Grid>
  );
};

export default EmergencyContactUpdate;
