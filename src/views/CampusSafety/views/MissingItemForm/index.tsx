import { useState } from 'react';
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
} from '@mui/material';
import { DateTime } from 'luxon';
import styles from './MissingItemForm.module.scss';
import lostAndFoundService from 'services/lostAndFound';
import ReportStolenModal from './components/reportStolen';
import ConfirmReport from './components/confirmReport';
import { useNavigate } from 'react-router';

const MissingItemForm = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    firstName: '', //TODO add code to autofill this
    lastName: '', //TODO add code to autofill this
    category: '',
    colors: [] as string[], // Ensure colors is an array
    brand: '',
    description: '',
    locationLost: '',
    stolen: false,
    dateLost: '',
    phoneNumber: '', //TODO add code to autofill this
    altPhone: '',
    emailAddr: '', //TODO add code to autofill this
    status: 'active', // Assuming a default status for new reports
  });

  const [isStolenModalOpen, setStolenModalOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  // Required fields
  const requiredFields = [
    'firstName',
    'lastName',
    'locationLost',
    'phoneNumber',
    'description',
    'emailAddr',
  ];

  // Validation function
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

  // Handle form data changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === 'stolen') {
      setStolenModalOpen(checked); // Open modal if stolen checkbox is checked
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (name === 'dateLost') {
      setFormData((prevData) => ({
        ...prevData,
        dateLost: value, // Format date for display
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
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

  const handleModalClose = () => {
    setStolenModalOpen(false);
    setFormData((prevData) => ({
      ...prevData,
      stolen: false, // Uncheck "stolen" if modal is canceled
    }));
  };

  const handleModalSubmit = (stolenDescription: string) => {
    setFormData((prevData) => ({
      ...prevData,
      stolenDescription,
    }));
    setStolenModalOpen(false);
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      setShowConfirm(true);
    }
  };

  const handleReportSubmit = async () => {
    try {
      const requestData = {
        ...formData,
        dateLost: formData.dateLost || DateTime.now().toISO(),
        dateCreated: DateTime.now().toISO(),
        status: 'active',
      };

      const newReportId = await lostAndFoundService.createMissingItemReport(requestData);
      alert(`Report created successfully with ID: ${newReportId}`);
      navigate('/campussafety/lostandfound');
    } catch (error) {
      console.error('Error creating missing item report:', error);
      alert('Failed to create the missing item report.');
    }
  };

  return (
    <>
      {showConfirm ? (
        <ConfirmReport
          formData={formData}
          onEdit={() => setShowConfirm(false)}
          onSubmit={handleReportSubmit}
        />
      ) : (
        <Card className={styles.form_card}>
          <CardHeader
            title={<b>Report a Missing Item</b>}
            titleTypographyProps={{ align: 'center' }}
            className="gc360_header"
          />
          <Grid container justifyContent={'center'}>
            <Grid item sm={5} xs={12}>
              {/* First Name */}
              <Grid item margin={2}>
                <TextField
                  fullWidth
                  variant="filled"
                  label={'First Name'}
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              {/* Last Name */}
              <Grid item margin={2}>
                <TextField
                  fullWidth
                  variant="filled"
                  label={'Last Name'}
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
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
            </Grid>
            <Grid item sm={5} xs={12}>
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
              <Grid item margin={2}>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  variant="filled"
                  label={'Location Lost: Be as detailed as possible (or "unknown")'}
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
                  InputLabelProps={{ shrink: true }} //Shrink label to fit above date placeholder
                  name="dateLost"
                  type="date"
                  value={formData.dateLost}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item margin={2}>
                <TextField
                  fullWidth
                  variant="filled"
                  label={'Phone Number'}
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  error={!!validationErrors.phoneNumber}
                  helperText={validationErrors.phoneNumber}
                />
              </Grid>
              <Grid item margin={2}>
                <TextField
                  fullWidth
                  variant="filled"
                  label={'Additional Phone Number'}
                  name="altPhone"
                  value={formData.altPhone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item margin={2}>
                <TextField
                  fullWidth
                  variant="filled"
                  label={'Email Address'}
                  name="emailAddr"
                  value={formData.emailAddr}
                  onChange={handleChange}
                  error={!!validationErrors.emailAddr}
                  helperText={validationErrors.emailAddr}
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
          />
        </Card>
      )}
    </>
  );
};

export default MissingItemForm;
