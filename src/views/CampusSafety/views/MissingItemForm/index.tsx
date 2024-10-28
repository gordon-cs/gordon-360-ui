import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Radio,
  FormGroup,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Checkbox,
  Button,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import styles from './MissingItemForm.module.scss';
import lostAndFoundService from 'services/lostAndFound';
import ReportStolenModal from './components/reportStolen';
import ConfirmReport from './components/confirmReport';

const MissingItemForm = () => {
  const formatDate = (date: string) => {
    return DateTime.fromISO(date).toFormat('yyyy-MM-dd');
  };
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    category: '',
    colors: [], // Ensure colors is an array
    brand: '',
    description: '',
    locationLost: '',
    stolen: false,
    dateLost: '',
    phoneNumber: '',
    altPhone: '',
    emailAddr: '',
    status: 'pending', // Assuming a default status for new reports
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  // Required fields
  const requiredFields = [
    'category',
    'locationLost',
    'phoneNumber',
    'description',
    'brand',
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
      setModalOpen(checked); // Open modal if stolen checkbox is checked
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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  const handleModalClose = () => {
    setModalOpen(false);
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
    setModalOpen(false);
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
        status: 'pending',
      };

      const newReportId = await lostAndFoundService.createMissingItemReport(requestData);
      alert(`Report created successfully with ID: ${newReportId}`);
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
            title="Missing Item Report"
            titleTypographyProps={{ align: 'center' }}
            className="gc360_header"
          />
          <Grid container justifyContent={'center'}>
            <Grid item sm={5}>
              <Grid margin={2}>
                <TextField
                  fullWidth
                  variant="filled"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item margin={2}>
                <TextField
                  fullWidth
                  variant="filled"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item margin={2} className={styles.description_radio_group}>
                <Grid container>
                  <FormControl error={!!validationErrors.category}>
                    <RadioGroup
                      name="category"
                      value={formData.category}
                      onChange={handleCategoryChange}
                    >
                      <Grid item>
                        <FormControlLabel
                          value="clothing/shoes"
                          control={<Radio />}
                          label="Clothing/Shoes"
                        />
                        <FormControlLabel
                          value="electronics"
                          control={<Radio />}
                          label="Electronics"
                        />
                        <FormControlLabel
                          value="jewelry/watches"
                          control={<Radio />}
                          label="Jewelry/Watches"
                        />
                        <FormControlLabel
                          value="keys/keychains"
                          control={<Radio />}
                          label="Keys/Keychains"
                        />
                        <FormControlLabel
                          value="glasses/sunglasses"
                          control={<Radio />}
                          label="Glasses/Sunglasses"
                        />
                        <FormControlLabel
                          value="bottles/mugs"
                          control={<Radio />}
                          label="Bottles/Mugs"
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel value="books" control={<Radio />} label="Books" />
                        <FormControlLabel
                          value="bags/purses/knapsacks"
                          control={<Radio />}
                          label="Bags/Purses"
                        />
                        <FormControlLabel
                          value="office/schoolsupplies"
                          control={<Radio />}
                          label="Office/School Supplies"
                        />
                        <FormControlLabel
                          value="ids/wallets"
                          control={<Radio />}
                          label="IDs/Wallets"
                        />
                        <FormControlLabel
                          value="currency/creditcards"
                          control={<Radio />}
                          label="Currency/Credit Cards"
                        />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                      </Grid>
                    </RadioGroup>
                    <Typography color="error">{validationErrors.category}</Typography>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item margin={2}>
                <TextField
                  fullWidth
                  variant="filled"
                  placeholder="Item Brand or Make"
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
                  minRows={8}
                  variant="filled"
                  placeholder="Item Description: Be as detailed as possible"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  error={!!validationErrors.description}
                  helperText={validationErrors.description}
                />
              </Grid>
            </Grid>
            <Grid item sm={5}>
              <Grid item margin={2} className={styles.description_select_group}>
                <Grid container>
                  <FormGroup>
                    <Grid item>
                      <FormControlLabel control={<Checkbox />} label="Black" />
                      <FormControlLabel control={<Checkbox />} label="Blue" />
                      <FormControlLabel control={<Checkbox />} label="Brown" />
                      <FormControlLabel control={<Checkbox />} label="Gold" />
                      <FormControlLabel control={<Checkbox />} label="Gray" />
                      <FormControlLabel control={<Checkbox />} label="Green" />
                    </Grid>
                    <Grid item>
                      <FormControlLabel control={<Checkbox />} label="Maroon" />
                      <FormControlLabel control={<Checkbox />} label="Orange" />
                      <FormControlLabel control={<Checkbox />} label="Pink" />
                      <FormControlLabel control={<Checkbox />} label="Purple" />
                      <FormControlLabel control={<Checkbox />} label="Red" />
                      <FormControlLabel control={<Checkbox />} label="Silver" />
                    </Grid>
                    <Grid item>
                      <FormControlLabel control={<Checkbox />} label="Tan" />
                      <FormControlLabel control={<Checkbox />} label="White" />
                      <FormControlLabel control={<Checkbox />} label="Yellow" />
                    </Grid>
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid item margin={2}>
                <TextField
                  fullWidth
                  multiline
                  minRows={10}
                  variant="filled"
                  placeholder="Location Lost: Be as detailed as possible"
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
                  placeholder="Date Lost"
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
                  placeholder="Phone Number"
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
                  placeholder="Additional Phone Number"
                  name="altPhone"
                  value={formData.altPhone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item margin={2}>
                <TextField
                  fullWidth
                  variant="filled"
                  placeholder="Email Address"
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
          <Grid container justifyContent="center" className={styles.stolen_container} marginTop={3}>
            <Grid item xs={10}>
              <FormControlLabel
                control={
                  <Checkbox checked={formData.stolen} onChange={handleChange} name="stolen" />
                }
                label="Do you have reason to believe this item was stolen? (This will open a police investigation)"
              />
            </Grid>
          </Grid>
          {/* Submit Button */}
          <Grid
            container
            justifyContent="flex-end"
            marginTop={3}
            className={styles.submit_container}
          >
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
            open={isModalOpen}
            onClose={handleModalClose}
            onSubmit={handleModalSubmit}
          />
        </Card>
      )}
    </>
  );
};

export default MissingItemForm;
