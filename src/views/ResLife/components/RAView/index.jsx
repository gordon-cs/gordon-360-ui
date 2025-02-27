import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  useMediaQuery,
} from '@mui/material';
import MyHall from '../ResidentView/components/MyHall/index';
import { React, useCallback, useEffect, useState } from 'react';
import { checkIfCheckedIn } from 'services/residentLife/RA_Checkin';
import { preferredContact, PrefContactMethod } from 'services/residentLife/ResidentStaff';
import { useUser } from 'hooks';
import HousingBanner from '../ResidentView/components/HousingWelcome/Banner';
import OnDutyMobile from '../RDView/components/OnDutyMobileView';
import TaskList from './components/TaskList';
import CheckIn from './components/CheckIn';

const RAView = () => {
  const { profile } = useUser();
  const [selectedContact, setSelectedContact] = useState('');
  const [isCheckedIn, setCheckedIn] = useState(false);

  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const fetchIsCheckdIn = async () => {
      if (profile?.ID) {
        try {
          const isChecked = await checkIfCheckedIn(profile.ID);
          setCheckedIn(isChecked);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchIsCheckdIn();
  }, [profile?.ID]);

  //Auto set radio button in pref contact card to current pref method
  useEffect(() => {
    const fetchPreferredContact = async () => {
      if (profile?.ID) {
        try {
          const contactPreference = await PrefContactMethod(profile.ID);
          setSelectedContact(contactPreference?.PreferredContactMethod || '');
        } catch (error) {
          console.error('Error fetching preferred contact method:', error);
        }
      }
    };

    fetchPreferredContact();
  }, [profile?.ID]);

  const handleContactChange = (event) => {
    setSelectedContact(event.target.value);
  };

  const handleContactSubmit = async () => {
    if (!selectedContact) {
      alert('Please select a contact method before submitting.');
      return;
    }

    try {
      await preferredContact(profile.ID, selectedContact);
      alert('Preferred contact method successfully updated.');
    } catch (error) {
      console.error('Error updating preferred contact method:', error);
      alert('Failed to update contact method. Please try again.');
    }
  };

  const contactMethod = () => (
    <Card elevation={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardHeader title={'Preferred Contact Method'} className="gc360_header" />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <FormControl component="fieldset">
          <Typography>Select Contact Method</Typography>
          <RadioGroup
            aria-label="preferred-contact"
            name="preferred-contact"
            value={selectedContact}
            onChange={handleContactChange}
          >
            <FormControlLabel value="teams" control={<Radio />} label="Teams" />
            <FormControlLabel value="phone" control={<Radio />} label="Phone" />
          </RadioGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={handleContactSubmit}
            disabled={!selectedContact}
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </FormControl>
        <Typography sx={{ mt: 2, color: 'text.secondary', fontStyle: 'italic' }}>
          *This is your preferred method to be contacted by your hall's residents.
        </Typography>
      </CardContent>
    </Card>
  );

  const OnCallTable = () => {
    return (
      <Grid item xs={12} md={20} padding={1}>
        <Card sx={{ width: '100%' }}>
          <CardHeader
            title={
              <Grid container direction="row" alignItems="center">
                <Grid item xs={12} align="center">
                  RA/AC on Duty by Hall
                </Grid>
              </Grid>
            }
            className="gc360_header"
          />
          <CardContent>
            <OnDutyMobile />
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <Grid container item spacing={2}>
      {!isMobile && (
        <>
          <HousingBanner />
          <Grid item xs={12} md={4}>
            <OnCallTable />
          </Grid>
          {contactMethod()}
          <Grid item xs={12} md={4}>
            <MyHall />
          </Grid>
          <CheckIn />
          {isCheckedIn ? <TaskList /> : <></>}
        </>
      )}
      {isMobile && (
        <>
          <HousingBanner />
          <Grid item rowSpacing={0} xs={12}>
            <CheckIn />
          </Grid>
          <Grid item xs={12}>
            <MyHall />
          </Grid>
          {contactMethod()}
          <Grid item xs={12}>
            <OnCallTable />
          </Grid>
          {isCheckedIn ? <TaskList /> : <></>}
        </>
      )}
    </Grid>
  );
};

export default RAView;
