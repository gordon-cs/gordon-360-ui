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
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select'; // <-- Import for typed Select onChange
import Header from 'views/CampusSafety/components/Header'; // Adjust if needed
import styles from './FoundItemFormCreate.module.scss';
import lostAndFoundService from 'services/lostAndFound'; // Adjust if needed
import userService from 'services/user'; // Adjust if needed
import GordonSnackbar from 'components/Snackbar'; // Adjust if needed
import { useNavigate } from 'react-router';
import { InfoOutlined } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

interface IUser {
  firstName: string;
  lastName: string;
  emailAddr: string;
  phoneNumber: string;
  AD_Username: string;
}

interface IFoundItemFormData {
  category: string;
  colors: string[];
  brand: string;
  description: string;
  locationFound: string;
  dateFound: string; // storing as a string
  foundBy: string;
  finderWantsItem: boolean;
  finderPhoneNumber: string;
  ownersName: string;
  initialAction: string;
  storageLocation: string;
  status: string;
  forGuest: boolean;
}

interface ISnackbarState {
  message: string;
  severity: 'error' | 'success' | 'info' | 'warning' | undefined;
  open: boolean;
}

const FoundItemFormCreate = () => {
  const navigate = useNavigate();

  const createSnackbar = useCallback((message: string, severity: ISnackbarState['severity']) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  const [user, setUser] = useState<IUser>({
    firstName: '',
    lastName: '',
    emailAddr: '',
    phoneNumber: '',
    AD_Username: '',
  });

  const [formData, setFormData] = useState<IFoundItemFormData>({
    category: '',
    colors: [],
    brand: '',
    description: '',
    locationFound: '',
    dateFound: '',
    foundBy: '',
    finderWantsItem: false,
    finderPhoneNumber: '',
    ownersName: '',
    initialAction: '',
    storageLocation: '',
    status: 'found',
    forGuest: false,
  });

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [snackbar, setSnackbar] = useState<ISnackbarState>({
    message: '',
    severity: undefined,
    open: false,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = await userService.getProfileInfo();
        setUser({
          firstName: userInfo?.FirstName || '',
          lastName: userInfo?.LastName || '',
          emailAddr: userInfo?.Email || '',
          phoneNumber: userInfo?.MobilePhone || '',
          AD_Username: userInfo?.AD_Username || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

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

  const requiredFields = ['category', 'description', 'locationFound'];

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        errors[field] = 'This field is required';
      }
    });

    if (formData.finderWantsItem && !formData.finderPhoneNumber) {
      errors.finderPhoneNumber = 'Required if you want to claim the item later';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

 
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      category: e.target.value,
    }));
  };

  const handleColorChange = (color: string) => {
    setFormData((prevData) => {
      const newColors = prevData.colors.includes(color)
        ? prevData.colors.filter((c) => c !== color)
        : [...prevData.colors, color];
      return { ...prevData, colors: newColors };
    });
  };

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({ ...prevData, [name]: checked }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };


  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const customDatePicker = (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date Found"
        value={formData.dateFound ? new Date(formData.dateFound) : null}
        onChange={(value) => {
          setFormData((prevData) => ({
            ...prevData,
            dateFound: value ? value.toString() : '',
          }));
        }}
        disableFuture
        orientation="portrait"
        slotProps={{
          textField: {
            onKeyDown: onKeyDown,
            helperText: 'Default: today (if blank)',
            sx: {
              backgroundColor: 'var(--mui-palette-FilledInput-bg)',
              paddingTop: '7px',
              borderRadius: '5px',
              width: '100%',
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '& .MuiInputLabel-shrink': {
                transform: 'translate(14px, 4px) scale(0.75)',
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: 'var(--mui-palette-secondary-main)',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '0',
                borderBottom:
                  '1px solid rgba(var(--mui-palette-common-onBackgroundChannel) / var(--mui-opacity-inputUnderline))',
                borderRadius: '0',
              },
            },
          },
          layout: {
            sx: {
              '& .MuiPickersLayout-contentWrapper .Mui-selected': {
                backgroundColor: 'var(--mui-palette-secondary-400)',
              },
              '.MuiPickersLayout-contentWrapper .MuiPickersDay-root:focus.Mui-selected': {
                backgroundColor: 'var(--mui-palette-secondary-400)',
              },
              '.MuiPickersLayout-contentWrapper .MuiPickersDay-root.Mui-selected': {
                backgroundColor: 'var(--mui-palette-secondary-400)',
              },
            },
          },
          actionBar: {
            sx: {
              '& .MuiButtonBase-root': {
                color: 'var(--mui-palette-secondary-400)',
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );

  const handleFormSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    if (!formData.dateFound) {
      formData.dateFound = new Date().toISOString();
    }

    try {
      const now = new Date();
      const requestData = {
        ...formData,
        ...user,
        dateFound: new Date(formData.dateFound).toISOString() || now.toISOString(),
        dateCreated: now.toISOString(),
        submitterUsername: user.AD_Username,
      };
      await lostAndFoundService.createFoundItemReport(requestData);

      createSnackbar('Found item has been recorded successfully!', 'success');
      navigate('/lostandfound');
    } catch (error) {
      console.error(error);
      createSnackbar('Failed to record the found item.', 'error');
    }
  };

  const handleCancel = () => {
    navigate('/lostandfound');
  };

  return (
    <>
      <Header />
      <Card className={styles.form_card}>
        <CardHeader
          title={
            <b>
              Found Item <span style={{ textDecoration: 'underline' }}>Entry</span>
            </b>
          }
          titleTypographyProps={{ align: 'center' }}
          className="gc360_header"
        />

        <div className={styles.disclaimer}>
          <InfoOutlined />
          <Grid container item rowGap={1}>
            <Grid item xs={12}>
              <Typography variant="body1">Gordon Police manages campus Lost &amp; Found</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                Police staff will view this Found Item report, and help if the owner is identified.
              </Typography>
            </Grid>
          </Grid>
        </div>

        {/* Two-column layout */}
        <Grid container spacing={2} paddingX={3}>
          {/* LEFT COLUMN */}
          <Grid item xs={12} md={6}>
            {/* Category */}
            <div className={styles.box_background}>
              <FormGroup>
                <FormLabel>Item Category:</FormLabel>
              </FormGroup>
              <div className={styles.category_group}>
                <FormGroup className={styles.radio_group}>
                  {[
                    'Clothing/Shoes',
                    'Electronics',
                    'Jewelry/Watches',
                    'Keys/Keychains',
                    'Glasses/Sunglasses',
                    'Bottles/Mugs',
                    'Books',
                    'Bags/Purses',
                    'Office/School Supplies',
                    'IDs/Wallets',
                    'Currency/Credit Cards',
                    'Other',
                  ].map((label) => {
                    const value = label.toLowerCase().replace(/ /g, '/');
                    return (
                      <FormControlLabel
                        key={label}
                        // Put onChange on the Radio component:
                        control={
                          <Radio
                            value={value}
                            checked={formData.category === value}
                            onChange={handleCategoryChange}
                          />
                        }
                        label={label}
                        className={styles.category_item}
                      />
                    );
                  })}
                </FormGroup>
              </div>
              <TextField
                variant="standard"
                error={!!validationErrors.category}
                helperText={validationErrors.category || ' '}
                fullWidth
                InputProps={{ style: { display: 'none' } }}
              />
            </div>

            {/* Colors */}
            <div className={styles.box_background}>
              <FormGroup>
                <FormLabel>
                  Item Color: Choose <u>ALL</u> that apply
                </FormLabel>
              </FormGroup>
              <div className={styles.checkbox_group}>
                <FormGroup className={styles.color_group}>
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
              </div>
            </div>

            {/* Brand */}
            <TextField
              fullWidth
              variant="filled"
              label="Item Brand or Make"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              sx={{ marginTop: '1rem' }}
              error={!!validationErrors.brand}
              helperText={validationErrors.brand}
            />

            {/* Description */}
            <TextField
              fullWidth
              variant="filled"
              multiline
              minRows={4}
              label="Item Description: Be as detailed as possible"
              name="description"
              value={formData.description}
              onChange={handleChange}
              sx={{ marginTop: '1rem' }}
              error={!!validationErrors.description}
              helperText={validationErrors.description}
            />
          </Grid>

          {/* RIGHT COLUMN */}
          <Grid item xs={12} md={6}>
            {/* Location Found */}
            <TextField
              fullWidth
              variant="filled"
              multiline
              minRows={2}
              label="Location Found: Be as detailed as possible"
              name="locationFound"
              value={formData.locationFound}
              onChange={handleChange}
              sx={{ marginBottom: '1rem' }}
              error={!!validationErrors.locationFound}
              helperText={validationErrors.locationFound}
            />

            {/* Date Found */}
            <div style={{ marginBottom: '1rem' }}>{customDatePicker}</div>

            {/* Found By */}
            <TextField
              fullWidth
              variant="filled"
              label="Found By (optional)"
              name="foundBy"
              value={formData.foundBy}
              onChange={handleChange}
              sx={{ marginBottom: '1rem' }}
            />

            {/* Finder wants item */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.finderWantsItem}
                  onChange={handleChange}
                  name="finderWantsItem"
                />
              }
              label="Finder Wants the Item if it’s not Claimed"
              sx={{ marginBottom: '0.5rem' }}
            />

            {formData.finderWantsItem && (
              <TextField
                fullWidth
                variant="filled"
                label="Finder Phone Number (required if claiming later)"
                name="finderPhoneNumber"
                value={formData.finderPhoneNumber}
                onChange={handleChange}
                error={!!validationErrors.finderPhoneNumber}
                helperText={validationErrors.finderPhoneNumber || ' '}
                sx={{ marginBottom: '1rem' }}
              />
            )}

            {/* Owner's Name */}
            <TextField
              fullWidth
              variant="filled"
              label="Owner's Name (If Known)"
              name="ownersName"
              value={formData.ownersName}
              onChange={handleChange}
              sx={{ marginBottom: '1rem' }}
            />

            {/* Initial Action - use typed SelectChangeEvent */}
            <div style={{ marginBottom: '1rem' }}>
              <InputLabel id="initial-action-label">Initial Action Taken</InputLabel>
              <Select
                labelId="initial-action-label"
                variant="filled"
                name="initialAction"
                value={formData.initialAction}
                onChange={handleSelectChange} // Accepts SelectChangeEvent<string>
                fullWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Tagged">Tagged</MenuItem>
                <MenuItem value="Secured">Secured</MenuItem>
                <MenuItem value="Noted">Noted</MenuItem>
              </Select>
            </div>

            {/* Storage Location - also typed select */}
            <div style={{ marginBottom: '1rem' }}>
              <InputLabel id="storage-location-label">Storage Location</InputLabel>
              <Select
                labelId="storage-location-label"
                variant="filled"
                name="storageLocation"
                value={formData.storageLocation}
                onChange={handleSelectChange} // Also a SelectChangeEvent
                fullWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="On Table"> On Table</MenuItem>
                <MenuItem value="Office Safe">Office Safe</MenuItem>
                <MenuItem value="Closet A">Closet A</MenuItem>
              </Select>
            </div>
          </Grid>
        </Grid>

        {/* Buttons */}
        <Grid container justifyContent="flex-end" spacing={2} padding={2}>
          <Grid item xs={6} sm={3} md={2}>
            <Button
              variant="contained"
              color="error"
              onClick={handleCancel}
              fullWidth
            >
              Cancel Entry
            </Button>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Button
              variant="contained"
              className={styles.submit_button}
              onClick={handleFormSubmit}
              fullWidth
            >
              Save Entry
            </Button>
          </Grid>
        </Grid>
      </Card>

      <GordonSnackbar
        open={snackbar.open}
        text={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default FoundItemFormCreate;
