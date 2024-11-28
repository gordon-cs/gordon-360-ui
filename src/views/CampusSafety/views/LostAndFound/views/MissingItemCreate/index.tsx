import { useState, useEffect, useCallback } from 'react';
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
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import Header from 'views/CampusSafety/components/Header';
import styles from './MissingItemCreate.module.scss';
import lostAndFoundService from 'services/lostAndFound';
import userService from 'services/user';
import ReportStolenModal from './components/reportStolen';
import ConfirmReport from './components/confirmReport';
import GordonSnackbar from 'components/Snackbar';
import { useNavigate } from 'react-router';
import { InfoOutlined } from '@mui/icons-material';

const MissingItemFormCreate = () => {
  const navigate = useNavigate();

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    emailAddr: '',
    phoneNumber: '',
    AD_Username: '', // Add AD_Username to user state
  });

  const [formData, setFormData] = useState({
    category: '',
    colors: [] as string[],
    brand: '',
    description: '',
    locationLost: '',
    stolen: false,
    stolenDescription: '', // Added stolenDescription field
    dateLost: '',
    status: 'active',
    forGuest: false,
  });

  const [isStolenModalOpen, setStolenModalOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [snackbar, setSnackbar] = useState({ message: '', severity: undefined, open: false });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = await userService.getProfileInfo();
        setUser({
          firstName: userInfo?.FirstName || '',
          lastName: userInfo?.LastName || '',
          emailAddr: userInfo?.Email || '',
          phoneNumber: userInfo?.MobilePhone || '',
          AD_Username: userInfo?.AD_Username || '', // Set AD_Username
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Catch browser reloads, and show warning message about unsaved changes.
  useEffect(() => {
    function handleBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
      return (event.returnValue = '');
    }
    window.addEventListener('beforeunload', handleBeforeUnload, { capture: true });
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload, { capture: true });
    };
  }, []);

  const requiredFields = ['category', 'description', 'locationLost'];

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        errors[field] = 'This field is required';
      }
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
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

  const handleColorChange = (color: string) => {
    setFormData((prevData) => {
      const colors = prevData.colors.includes(color)
        ? prevData.colors.filter((c) => c !== color)
        : [...prevData.colors, color];
      return { ...prevData, colors };
    });
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
      stolenDescription, // Capture stolen description from modal
    }));
    setStolenModalOpen(false);
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

  const handleReportSubmit = async () => {
    try {
      const requestData = {
        ...formData,
        ...user,
        dateLost: formData.dateLost || DateTime.now().toISO(),
        dateCreated: DateTime.now().toISO(),
        colors: formData.colors || [],
        submitterUsername: user.AD_Username,
        forGuest: false,
      };

      const newReportId = await lostAndFoundService.createMissingItemReport(requestData);
      navigate('/lostandfound');
    } catch (error) {
      createSnackbar(`Failed to create the missing item report.`, `error`);
    }
  };

  return (
    <>
      <Header />
      {showConfirm ? (
        <>
          <ConfirmReport
            formData={{ ...formData, ...user }}
            onEdit={() => setShowConfirm(false)}
            onSubmit={handleReportSubmit}
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
            title={
              <b>
                Report a <u>Lost</u> Item
              </b>
            }
            titleTypographyProps={{ align: 'center' }}
            className="gc360_header"
          />
          <div className={styles.disclaimer}>
            <InfoOutlined />
            <Grid container item rowGap={1}>
              <Grid item xs={12}>
                <Typography variant="body1">Gordon Police manages campus Lost & Found</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Police staff will view reports, and you will be notified if your item is found.
                </Typography>
              </Grid>
            </Grid>
          </div>
          <Grid container justifyContent="center">
            <Grid item sm={5} xs={12}>
              {/* Item Category */}
              <Grid item margin={2} className={styles.box_background}>
                <FormGroup>
                  <FormLabel>Item Category:</FormLabel>
                </FormGroup>
                <Grid item className={styles.category_group}>
                  <FormGroup className={styles.radio_group}>
                    {[
                      'Clothing/Shoes',
                      'Electronics',
                      'Jewelry/Watches',
                      'Keys/Keychains',
                      'Glasses',
                      'Bottles/Mugs',
                      'Books',
                      'Bags/Purses',
                      'Office Supplies',
                      'IDs/Wallets',
                      'Cash/Cards',
                      'Other',
                    ].map((label) => (
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

              {/* Item Colors */}
              <Grid item margin={2} className={styles.box_background}>
                <FormGroup>
                  <FormLabel>
                    Item Color: Choose <u>ALL</u> that apply:
                  </FormLabel>
                </FormGroup>
                <Grid item className={styles.checkbox_group}>
                  <FormGroup>
                    {[
                      'Black',
                      'Blue',
                      'Brown',
                      'Gold',
                      'Gray',
                      'Green',
                      'Maroon',
                      'Orange',
                      'Pink',
                      'Purple',
                      'Red',
                      'Silver',
                      'Tan',
                      'White',
                      'Yellow',
                    ].map((color) => (
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
            </Grid>
            <Grid item sm={5} xs={12}>
              {/* Item Brand and Description */}
              <Grid item margin={2}>
                <TextField
                  fullWidth
                  variant="filled"
                  label={'Item Brand or Make'}
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  error={!!validationErrors.brand}
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
                  error={!!validationErrors.description}
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
                  error={!!validationErrors.locationLost}
                  helperText={validationErrors.locationLost}
                />
              </Grid>
              <Grid item margin={2}>
                <TextField
                  fullWidth
                  variant="filled"
                  label={'Date Lost'}
                  InputLabelProps={{ shrink: true }}
                  name="dateLost"
                  type="date"
                  value={formData.dateLost}
                  onChange={handleChange}
                  inputProps={{
                    max: DateTime.now().toISODate(), // Restrict to today or past dates
                  }}
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
            <Grid item xs={2}>
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

export default MissingItemFormCreate;
