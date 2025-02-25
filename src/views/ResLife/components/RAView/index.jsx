import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Links from './components/Links';
import MyHall from '../ResidentView/components/MyHall/index';
import { React, useCallback, useEffect, useState } from 'react';
import SimpleSnackbar from 'components/Snackbar';
import GordonDialogBox from 'components/GordonDialogBox';
import {
  checkIfCheckedIn,
  submitCheckIn,
  getRACurrentHalls,
} from 'services/residentLife/RA_Checkin';
import { preferredContact, PrefContactMethod } from 'services/residentLife/ResidentStaff';
import { useUser } from 'hooks';
import HousingBanner from '../ResidentView/components/HousingWelcome/Banner';
import OnDutyMobile from '../RDView/components/OnDutyMobileView';

const RAView = () => {
  const [isCheckedIn, setCheckedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { profile } = useUser();
  const [selectedContact, setSelectedContact] = useState('');
  const [hallName, setHallName] = useState('');
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [checkedInHalls, setCheckedInHalls] = useState([]);

  const isMobile = useMediaQuery('(max-width:600px)');

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  // Fetch check-in status and initialize hall data
  useEffect(() => {
    const fetchData = async () => {
      if (profile?.ID) {
        try {
          const isChecked = await checkIfCheckedIn(profile.ID);
          setCheckedIn(isChecked);

          if (isChecked) {
            const currentHalls = await getRACurrentHalls(profile.AD_Username);
            setHallState((prevState) => {
              const updatedState = { ...prevState };
              currentHalls.forEach((hall) => {
                updatedState[hall] = true;
              });
              return updatedState;
            });
          } else if (profile.hall) {
            setHallState((prevState) => ({
              ...prevState,
              [profile.hall]: true,
              village: ['CON', 'GRA', 'RID', 'MCI'].includes(profile.hall),
            }));
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, [profile?.ID]);

  useEffect(() => {
    const fetchData = async () => {
      if (profile?.ID) {
        try {
          const halls = await getRACurrentHalls(profile.AD_Username);
          setCheckedInHalls(halls);
        } catch (error) {
          console.error('Error fetching checked-in halls:', error);
        }
      }
    };
    fetchData();
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

  const hallCodeToNameMap = {
    BRO: 'Bromley',
    CHA: 'Chase',
    EVN: 'Evans',
    FER: 'Ferrin',
    FUL: 'Fulton',
    NYL: 'Nyland',
    TAV: 'Tavilla',
    WIL: 'Wilson',
    CON: 'Conrad',
    GRA: 'Grace',
    RID: 'Rider',
    MCI: 'MacInnis',
    village: 'The Village',
  };

  const handleConfirm = () => {
    setConfirmOpen(true);

    let tempName = '';

    for (let hall in hallState) {
      if (hallState[hall] && hall !== 'village' && !checkedInHalls.includes(hall)) {
        // Map hall codes to names using the mapping object
        const hallName = hallCodeToNameMap[hall];
        tempName = tempName ? `${tempName}, ${hallName}` : hallName;
      }
    }

    setHallName(tempName);
  };

  const handleSubmit = async () => {
    const selectedHallCodes = Object.keys(hallState).filter(
      (hall) => hallState[hall] && hall !== 'village' && !checkedInHalls.includes(hall),
    ); //exclude village for checkin

    if (!profile?.ID || selectedHallCodes.length === 0) {
      createSnackbar(
        'Please select a hall and ensure profile information is loaded before checking in.',
        'warning',
      );
      return;
    }

    try {
      await submitCheckIn(profile.ID, selectedHallCodes);
      setCheckedIn(true);
      setConfirmOpen(false);
      setOpen(false);
      createSnackbar(`Successfully checked into ${hallName}`, 'success');
    } catch (error) {
      console.error('Error checking in:', error);
      createSnackbar('Failed to check in. Please try again.', 'error');
    }
  };

  const [hallState, setHallState] = useState({
    BRO: false,
    CHA: false,
    EVN: false,
    FER: false,
    FUL: false,
    NYL: false,
    TAV: false,
    WIL: false,
    village: false,
  });

  useEffect(() => {
    var check = false;
    for (let hall in hallState) {
      if (hallState[hall]) {
        check = true;
        break;
      }
    }
    setIsChecked(check);
  }, [hallState]);

  const { BRO, CHA, EVN, FER, FUL, NYL, TAV, WIL, village } = hallState;

  const handleHallChecked = (event) => {
    const { name, checked } = event.target;

    setHallState((prevState) => {
      const updatedState = { ...prevState, [name]: checked };

      //when village checked mark needed halls
      if (name === 'village' && checked) {
        updatedState.CON = true;
        updatedState.GRA = true;
        updatedState.RID = true;
        updatedState.MCI = true;
      }

      if (name === 'village' && !checked) {
        updatedState.CON = false;
        updatedState.GRA = false;
        updatedState.RID = false;
        updatedState.MCI = false;
      }

      return updatedState;
    });
  };

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

  const checkInButton = () => (
    <Grid container item justifyContent="center" alignItems="center">
      <Grid item xs={12} md={4}>
        <Button variant="contained" fullWidth={true} onClick={() => setOpen(true)}>
          {isCheckedIn ? 'check in to additional Halls?' : 'Check In To Your Shift'}
        </Button>
        <Grid item xs={12} md={4} padding={1}>
          <GordonDialogBox
            open={open}
            onClose={() => setOpen(false)}
            title={'Choose Which Hall to Check Into'}
            buttonName="Check In"
            buttonClicked={handleConfirm}
            cancelButtonName="CANCEL"
            cancelButtonClicked={() => setOpen(false)}
          >
            <Grid item>
              <FormControl required={true}>
                <FormLabel error>Select a Hall</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    key="BRO"
                    checked={BRO}
                    disabled={checkedInHalls?.includes('BRO')}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Bromley"
                    name="BRO"
                  />
                  <FormControlLabel
                    key="CHA"
                    checked={CHA}
                    disabled={checkedInHalls?.includes('CHA')}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Chase"
                    name="CHA"
                  />
                  <FormControlLabel
                    key="EVN"
                    checked={EVN}
                    disabled={checkedInHalls?.includes('EVN')}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Evans"
                    name="EVN"
                  />
                  <FormControlLabel
                    key="FER"
                    checked={FER}
                    disabled={checkedInHalls?.includes('FER')}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Ferrin"
                    name="FER"
                  />
                  <FormControlLabel
                    key="FUL"
                    checked={FUL}
                    disabled={checkedInHalls?.includes('FUL')}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Fulton"
                    name="FUL"
                  />
                  <FormControlLabel
                    key="NYL"
                    checked={NYL}
                    disabled={checkedInHalls?.includes('NYL')}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Nyland"
                    name="NYL"
                  />
                  <FormControlLabel
                    key="TAV"
                    checked={TAV}
                    disabled={checkedInHalls?.includes('TAV')}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Tavilla"
                    name="TAV"
                  />
                  <FormControlLabel
                    key="WIL"
                    checked={WIL}
                    disabled={checkedInHalls?.includes('WIL')}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Wilson"
                    name="WIL"
                  />
                  <FormControlLabel
                    key="village"
                    checked={village}
                    disabled={checkedInHalls?.includes('village')}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="The Village"
                    name="village"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </GordonDialogBox>
        </Grid>
        <Grid item xs={12} md={4} padding={1}>
          <GordonDialogBox
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            title={'Confirmation'}
            buttonName="Yes"
            buttonClicked={handleSubmit}
            cancelButtonName="No"
            cancelButtonClicked={() => setConfirmOpen(false)}
          >
            <Grid item>
              <Typography>
                NOTE: You are checking into {hallName || 'Unknown Hall'} to be on duty. Is this what
                you meant to do?
              </Typography>
            </Grid>
          </GordonDialogBox>
          <SimpleSnackbar
            open={snackbar.open}
            text={snackbar.message}
            severity={snackbar.severity}
            onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          />
        </Grid>
      </Grid>
    </Grid>
  );

  const contactMethod = () => (
    <Grid item xs={12} md={4}>
      <Card>
        <CardHeader title={'Preferred Contact Method'} className="gc360_header" />
        <CardContent>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography>Select Contact Method</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="preferred-contact"
                  name="preferred-contact"
                  value={selectedContact}
                  onChange={handleContactChange}
                >
                  <FormControlLabel value="teams" control={<Radio />} label="Teams" />
                  <FormControlLabel value="phone" control={<Radio />} label="Phone" />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleContactSubmit}
                    disabled={!selectedContact}
                    sx={{ mt: 2 }}
                  >
                    Submit
                  </Button>
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Typography sx={{ mt: 2, color: 'text.secondary', fontStyle: 'italic' }}>
            *This is your preferred method to be contacted by your hall's residents.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  const OnCallTable = ({ isCheckedIn }) => {
    if (!isCheckedIn) return null;

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
            <Links />
          </Grid>
          {contactMethod()}
          <Grid item xs={12} md={4}>
            <MyHall />
          </Grid>
          {checkInButton()}
          <OnCallTable isCheckedIn={isCheckedIn} />
        </>
      )}
      {isMobile && (
        <>
          <HousingBanner />
          <Grid item rowSpacing={0} xs={12}>
            {checkInButton()}
          </Grid>
          <Grid item xs={12}>
            <MyHall />
          </Grid>
          {contactMethod()}
          <Grid item xs={12}>
            <Links />
          </Grid>
          <OnCallTable isCheckedIn={isCheckedIn} />
        </>
      )}
    </Grid>
  );
};

export default RAView;
