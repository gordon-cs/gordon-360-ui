import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { preferredContact, PrefContactMethod } from 'services/residentLife/ResidentStaff';
import { useUser } from 'hooks';
import SimpleSnackbar from 'components/Snackbar';

const ContactMethod = () => {
  const { profile } = useUser();
  const [selectedContact, setSelectedContact] = useState('');
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const fetchPreferredContact = async () => {
      if (profile?.ID) {
        try {
          const contactPreference = await PrefContactMethod(profile.ID);
          setSelectedContact(contactPreference?.Preferred_Contact_Method || '');
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
      setSnackbar({
        message: 'Please select a contact method before submitting.',
        severity: 'warning',
        open: true,
      });
      return;
    }

    try {
      await preferredContact(profile.ID, selectedContact);
      setSnackbar({
        message: 'Preferred contact method successfully updated.',
        severity: 'success',
        open: true,
      });
    } catch (error) {
      console.error('Error updating preferred contact method:', error);
      setSnackbar({
        message: 'Failed to update contact method. Please try again.',
        severity: 'error',
        open: true,
      });
    }
  };

  return (
    <Accordion elevation={3}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {isMobile ? (
          <Typography variant="subtitle2">Preferred Contact Method</Typography>
        ) : (
          <Typography variant="body1">Preferred Contact Method</Typography>
        )}
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
      </AccordionDetails>
      <SimpleSnackbar
        open={snackbar.open}
        text={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </Accordion>
  );
};

export default ContactMethod;
