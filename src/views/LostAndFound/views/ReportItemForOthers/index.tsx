import {
  Card,
  CardHeader,
  Grid,
  TextField,
  Radio,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  FormLabel,
  RadioGroup,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import Header from 'views/LostAndFound/components/Header';
import styles from './ReportItemPage.module.scss';
import lostAndFoundService from 'services/lostAndFound';
import { SearchResult } from 'services/quickSearch';
import ConfirmReport from 'views/LostAndFound/views/MissingReportCreate/components/confirmReport';
import GordonSnackbar from 'components/Snackbar';
import ReportStolenModal from 'views/LostAndFound/views/MissingReportCreate/components/reportStolen';
import { DateValidationError } from '@mui/x-date-pickers';
import { useUser } from 'hooks';
import { LFCategories, LFColors } from 'views/LostAndFound/components/Constants';
import { CustomDatePicker } from 'views/LostAndFound/components/CustomDatePicker';
import { GordonPersonAutocomplete } from 'views/LostAndFound/components/GordonPersonAutocomplete';
import { useAuthGroups } from 'hooks';
import { AuthGroup } from 'services/auth';

const ReportItemPage = () => {
  const navigate = useNavigate();
  const isKiosk = useAuthGroups(AuthGroup.LostAndFoundKiosk);

  const createSnackbar = useCallback((message: string, severity: any) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  const [isGordonPerson, setIsGordonPerson] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddr: '',
    submitterUsername: '',
    category: '',
    colors: [] as string[],
    brand: '',
    description: '',
    locationLost: '',
    stolen: false,
    stolenDescription: '',
    dateLost: new Date().toISOString(),
    phoneNumber: '',
    forGuest: true,
    status: 'active',
  });

  const [isStolenModalOpen, setStolenModalOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [snackbar, setSnackbar] = useState({ message: '', severity: undefined, open: false });
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [newActionFormData] = useState({ action: '', actionNote: '' });
  const [dateError, setDateError] = useState<DateValidationError | null>(null);
  const { profile } = useUser();

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const handleSelect = (_event: any, selectedPerson: SearchResult | null) => {
    if (selectedPerson) {
      setFormData((prevData) => ({
        ...prevData,
        firstName: selectedPerson.FirstName,
        lastName: selectedPerson.LastName,
        emailAddr: selectedPerson.UserName + '@gordon.edu', //Added @gordon.edu because cant access email directly
        submitterUsername: selectedPerson.UserName,
        forGuest: false,
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === 'stolen') {
      if (checked) {
        // If the stolen checkbox is checked, open the modal
        setStolenModalOpen(true);
        setFormData((prevData) => ({
          ...prevData,
          [name]: checked,
        }));
      } else {
        // If the stolen checkbox is unchecked, set stolen to false but do not clear stolenDescription
        setFormData((prevData) => ({
          ...prevData,
          stolen: false,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleModalClose = () => {
    setStolenModalOpen(false);
    setFormData((prevData) => ({
      ...prevData,
      stolen: false,
    }));
  };

  const handleModalSubmit = (stolenDescription: string) => {
    setFormData((prevData) => ({
      ...prevData,
      stolenDescription,
    }));
    setStolenModalOpen(false);
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    // Required fields for all reports
    const requiredFields = ['category', 'description', 'locationLost', 'dateLost'];

    if (isGordonPerson === 'yes') {
      // For Gordon persons, ensure that a person is selected
      if (!formData.submitterUsername) {
        errors['submitterUsername'] = 'Please select a Gordon person';
      }
    } else if (isGordonPerson === 'no') {
      // For guests, require first name, last name, phone number, email
      requiredFields.push('firstName', 'lastName', 'phoneNumber', 'emailAddr');
    } else {
      // If 'isGordonPerson' is not selected
      errors['isGordonPerson'] = 'Please select if this report is for a Gordon person or not';
    }

    if (dateError !== null) {
      errors['dateLost'] = dateError;
    }

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        errors[field] = 'This field is required';
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      if (!formData.stolen) {
        setFormData((prevData) => ({
          ...prevData,
          stolenDescription: '',
        }));
      }
      setShowConfirm(true);
    }
  };

  // Handle color selection
  const handleColorChange = (color: string) => {
    setFormData((prevData) => {
      const colors = prevData.colors.includes(color)
        ? prevData.colors.filter((c) => c !== color)
        : [...prevData.colors, color];
      return { ...prevData, colors };
    });
  };

  const handleReportSubmit = async () => {
    if (!disableSubmit) {
      setDisableSubmit(true);
      try {
        const baseData = {
          category: formData.category,
          colors: formData.colors,
          brand: formData.brand,
          description: formData.description,
          locationLost: formData.locationLost,
          stolen: formData.stolen,
          stolenDescription: formData.stolenDescription,
          submitterUsername: '',
          dateLost: formData.dateLost,
          dateCreated: new Date().toDateString(),
          status: 'active',
          phone: formData.phoneNumber, // Include phone number
        };

        // Include stolenDescription only if stolen is true
        if (formData.stolen) {
          baseData.stolenDescription = formData.stolenDescription;
        } else {
          baseData.stolenDescription = ''; // Clear stolenDescription
        }

        let requestData;

        if (formData.forGuest) {
          // For guest user
          baseData.phone = formData.phoneNumber;
          requestData = {
            ...baseData,
            forGuest: true,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.emailAddr,
          };
        } else {
          // For Gordon person
          requestData = {
            ...baseData,
            forGuest: false,
            submitterUsername: formData.submitterUsername,
          };
        }

        const now = new Date();
        const newReportId = await lostAndFoundService.createMissingItemReport(requestData);
        let actionRequestData = {
          ...newActionFormData,
          missingID: newReportId,
          actionDate: now.toISOString(),
          username: profile?.AD_Username || '',
          isPublic: true,
          action: 'Created',
        };
        await lostAndFoundService.createAdminAction(newReportId, actionRequestData);

        // If the user is a kiosk user, navigate to the kiosk page,
        // otherwise, navigate to the admin missing item database.
        if (isKiosk) {
          navigate('/lostandfound/kiosk');
        } else {
          navigate('/lostandfound/lostandfoundadmin/missingitemdatabase?status=active');
        }
      } catch (error) {
        createSnackbar(`Failed to create the missing item report.`, `error`);
        setDisableSubmit(false);
      }
    }
  };

  // Define the Item Colors section
  const itemColorsSection = (
    <Grid item margin={2} className={styles.box_background}>
      <FormGroup>
        <FormLabel>
          Item Color: Choose <u>ALL</u> that apply:
        </FormLabel>
      </FormGroup>
      <Grid item className={styles.checkbox_group}>
        <FormGroup>
          {LFColors.map((color) => (
            <FormControlLabel
              key={color}
              control={
                <Checkbox
                  checked={formData.colors.includes(color)}
                  onChange={() => handleColorChange(color)}
                />
              }
              label={color}
            />
          ))}
        </FormGroup>
      </Grid>
    </Grid>
  );

  return (
    <>
      <Header />
      {showConfirm ? (
        <>
          <ConfirmReport
            formData={formData}
            onEdit={() => setShowConfirm(false)}
            onSubmit={handleReportSubmit}
            disableSubmit={disableSubmit}
          />
          <GordonSnackbar
            open={snackbar.open}
            text={snackbar.message}
            severity={snackbar.severity}
            onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          />
        </>
      ) : (
        <Card className={styles.form_card}>
          <CardHeader
            title={<b>Missing Item Report</b>}
            subheader="(Students, Faculty, and Staff can access this form themselves on 360)"
            titleTypographyProps={{ align: 'center' }}
            subheaderTypographyProps={{ align: 'center' }}
            className="gc360_header"
          />
          <Grid container justifyContent="center">
            {/* Left Column */}
            <Grid item sm={5} xs={12}>
              {/* Question and Search */}
              <Grid item margin={2}>
                <FormLabel component="legend" required>
                  Is this report for a current Gordon Person?
                </FormLabel>
                <RadioGroup
                  row
                  name="isGordonPerson"
                  value={isGordonPerson}
                  onChange={(e) => setIsGordonPerson(e.target.value)}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>

              {isGordonPerson === 'yes' && (
                <>
                  <Grid item margin={2}>
                    <GordonPersonAutocomplete onChange={handleSelect} />
                  </Grid>
                </>
              )}

              {isGordonPerson === 'no' && (
                <>
                  {/* First Name */}
                  <Grid item margin={2}>
                    <TextField
                      fullWidth
                      variant="filled"
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      error={Boolean(validationErrors.firstName)}
                      helperText={validationErrors.firstName}
                    />
                  </Grid>
                  {/* Last Name */}
                  <Grid item margin={2}>
                    <TextField
                      fullWidth
                      variant="filled"
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      error={Boolean(validationErrors.lastName)}
                      helperText={validationErrors.lastName}
                    />
                  </Grid>
                  {/* Phone Number */}
                  <Grid item margin={2}>
                    <TextField
                      fullWidth
                      variant="filled"
                      label="Phone Number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      error={Boolean(validationErrors.phoneNumber)}
                      helperText={validationErrors.phoneNumber}
                    />
                  </Grid>
                  {/* Email Address */}
                  <Grid item margin={2}>
                    <TextField
                      fullWidth
                      variant="filled"
                      label="Email Address"
                      name="emailAddr"
                      value={formData.emailAddr}
                      onChange={handleChange}
                      error={Boolean(validationErrors.emailAddr)}
                      helperText={validationErrors.emailAddr}
                    />
                  </Grid>
                </>
              )}

              {/* Item Category */}
              <Grid item margin={2} className={styles.box_background}>
                <FormGroup>
                  <FormLabel>Item Category:</FormLabel>
                </FormGroup>
                <Grid item className={styles.category_group}>
                  <FormGroup className={styles.radio_group}>
                    {LFCategories.map((label) => (
                      <FormControlLabel
                        key={label}
                        control={<Radio />}
                        label={label}
                        value={label.toLowerCase().replace(/ /g, '/')}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            category: (e.target as HTMLInputElement).value,
                          }))
                        }
                        checked={formData.category === label.toLowerCase().replace(/ /g, '/')}
                        className={styles.category_item}
                      />
                    ))}
                  </FormGroup>
                </Grid>
              </Grid>

              {/* Conditionally render Item Colors in Left Column */}
              {(!isLargeScreen || isGordonPerson !== 'no') && itemColorsSection}
            </Grid>

            {/* Right Column */}
            <Grid item sm={5} xs={12}>
              {/* Conditionally render Item Colors in Right Column at Top */}
              {isLargeScreen && isGordonPerson === 'no' && itemColorsSection}

              {/* Item Brand and Description */}
              <Grid item margin={2}>
                <TextField
                  fullWidth
                  variant="filled"
                  label={'Item Brand or Make'}
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  error={Boolean(validationErrors.brand)}
                  helperText={validationErrors.brand}
                />
              </Grid>
              <Grid item margin={2}>
                <TextField
                  fullWidth
                  multiline
                  minRows={5}
                  variant="filled"
                  label={'Item Description: Be as detailed as possible'}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  error={Boolean(validationErrors.description)}
                  helperText={validationErrors.description}
                />
              </Grid>

              {/* Location Lost and Date Lost */}
              <Grid item margin={2}>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  variant="filled"
                  label={'Location Lost: Be as detailed as possible'}
                  name="locationLost"
                  value={formData.locationLost}
                  onChange={handleChange}
                  error={Boolean(validationErrors.locationLost)}
                  helperText={validationErrors.locationLost}
                />
              </Grid>
              <Grid item margin={2}>
                <CustomDatePicker
                  value={formData.dateLost ? new Date(formData.dateLost) : null}
                  onChange={(newDate) =>
                    setFormData((d) => ({
                      ...d,
                      dateLost: newDate ? newDate.toISOString() : '',
                    }))
                  }
                  onError={(err) => setDateError(err)}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Stolen Checkbox */}
          <Grid container justifyContent="center" marginTop={3}>
            <Grid item xs={9.5}>
              <FormControlLabel
                className={styles.stolen_container}
                control={
                  <Checkbox checked={formData.stolen} onChange={handleChange} name="stolen" />
                }
                label="Was this item stolen? (Police staff will follow up)"
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Grid container justifyContent="flex-end" className={styles.submit_container}>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                fullWidth
                className={styles.submit_button}
                onClick={handleFormSubmit}
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>
          <ReportStolenModal
            open={isStolenModalOpen}
            onClose={handleModalClose}
            onSubmit={handleModalSubmit}
            stolenDescription={formData.stolenDescription}
          />
        </Card>
      )}
    </>
  );
};

export default ReportItemPage;
