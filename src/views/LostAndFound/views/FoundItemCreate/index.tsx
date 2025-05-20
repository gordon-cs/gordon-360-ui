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
  RadioGroup,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { SearchResult } from 'services/quickSearch';
import { SelectChangeEvent } from '@mui/material/Select';
import Header from 'views/LostAndFound/components/Header';
import styles from './FoundItemFormCreate.module.scss';
import lostAndFoundService from 'services/lostAndFound';
import GordonSnackbar from 'components/Snackbar';
import { useNavigate } from 'react-router';
import { useUser } from 'hooks';
import {
  LFCategories,
  LFColors,
  LFStorageLocations,
} from 'views/LostAndFound/components/Constants';
import { CustomDatePicker } from 'views/LostAndFound/components/CustomDatePicker';
import { DateValidationError } from '@mui/x-date-pickers';
import { GordonPersonAutocomplete } from 'views/LostAndFound/components/GordonPersonAutocomplete';

interface IUser {
  firstName: string;
  lastName: string;
  emailAddr: string;
  phoneNumber: string;
  AD_Username: string;
}

interface ISnackbarState {
  message: string;
  severity: 'error' | 'success' | 'info' | 'warning' | undefined;
  open: boolean;
}

const FoundItemFormCreate = () => {
  const navigate = useNavigate();
  const [dateError, setDateError] = useState<DateValidationError | null>(null);
  const { profile } = useUser();
  const [hasFinder, setHasFinder] = useState<boolean>(false);
  const [hasOwner, setHasOwner] = useState<boolean>(false);

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

  const [formData, setFormData] = useState<{
    isGordonFinder: string;
    finderFirstName: string;
    finderLastName: string;
    finderUsername: string;
    finderPhoneNumber: string;
    finderEmail: string;
    isGordonOwner: string;
    ownerFirstName: string;
    ownerLastName: string;
    ownerUsername: string;
    ownerPhoneNumber: string;
    ownerEmail: string;
    forFinderGuest: boolean;
    forOwnerGuest: boolean;
    category: string;
    colors: string[];
    brand: string;
    description: string;
    locationFound: string;
    dateFound: string;
    finderWantsItem: boolean;
    initialAction: string;
    storageLocation: string;
    status: string;
  }>({
    isGordonFinder: '',
    finderFirstName: '',
    finderLastName: '',
    finderUsername: '',
    finderPhoneNumber: '',
    finderEmail: '',
    isGordonOwner: '',
    ownerFirstName: '',
    ownerLastName: '',
    ownerUsername: '',
    ownerPhoneNumber: '',
    ownerEmail: '',
    forFinderGuest: false,
    forOwnerGuest: false,
    category: '',
    colors: [],
    brand: '',
    description: '',
    locationFound: '',
    dateFound: '',
    finderWantsItem: false,
    initialAction: '',
    storageLocation: '',
    status: 'active',
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
        setUser({
          firstName: profile?.FirstName || '',
          lastName: profile?.LastName || '',
          emailAddr: profile?.Email || '',
          phoneNumber: profile?.MobilePhone || '',
          AD_Username: profile?.AD_Username || '',
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

  useEffect(() => {
    const clearFinderTextFields = () => {
      formData.finderFirstName = '';
      formData.finderLastName = '';
      formData.finderPhoneNumber = '';
      formData.finderEmail = '';
      formData.finderUsername = '';
    };
    clearFinderTextFields();
  }, [formData.isGordonFinder]);

  useEffect(() => {
    const clearOwnerTextFields = () => {
      formData.ownerFirstName = '';
      formData.ownerLastName = '';
      formData.ownerPhoneNumber = '';
      formData.ownerEmail = '';
      formData.ownerUsername = '';
    };
    clearOwnerTextFields();
  }, [formData.isGordonOwner]);

  const requiredFields = ['category', 'description', 'locationFound', 'storageLocation'];

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        errors[field] = 'This field is required';
      }
    });

    if (formData.colors.length === 0) {
      errors['color'] = 'This field is required';
    }

    if (formData.finderWantsItem && !formData.finderPhoneNumber) {
      errors.finderPhoneNumber = 'Required if you want to claim the item later';
    }

    if (dateError !== null) {
      errors['dateLost'] = dateError;
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
      const newColors: string[] = prevData.colors.includes(color)
        ? prevData.colors.filter((c) => c !== color)
        : [...prevData.colors, color];

      return { ...prevData, colors: newColors };
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFinderSelect = (_event: any, selectedPerson: SearchResult | null) => {
    if (selectedPerson) {
      setFormData((prevData) => ({
        ...prevData,
        finderFirstName: selectedPerson.FirstName,
        finderLastName: selectedPerson.LastName,
        finderUsername: selectedPerson.UserName,
        finderPhoneNumber: '',
        finderEmail: '',
        forFinderGuest: false,
      }));
    }
  };

  const handleOwnerSelect = (_event: any, selectedPerson: SearchResult | null) => {
    if (selectedPerson) {
      setFormData((prevData) => ({
        ...prevData,
        ownerFirstName: selectedPerson.FirstName,
        ownerLastName: selectedPerson.LastName,
        ownerUsername: selectedPerson.UserName,
        ownerPhoneNumber: '',
        ownerEmail: '',
        forOwnerGuest: false,
      }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) {
      createSnackbar('Please fill in all required fields', 'error');
      return;
    }

    try {
      const now = new Date().toISOString();

      const requestData = {
        submitterUsername: user.AD_Username,
        category: formData.category,
        colors: formData.colors.length > 0 ? formData.colors : [],
        brand: formData.brand || '',
        description: formData.description,
        locationFound: formData.locationFound,
        dateFound: formData.dateFound ? new Date(formData.dateFound).toISOString() : now,
        dateCreated: now,
        finderWants: formData.finderWantsItem,
        status: formData.status,
        storageLocation: formData.storageLocation || '',

        // Finder Information
        finderUsername: formData.isGordonFinder === 'yes' ? formData.finderUsername : undefined,
        finderFirstName: formData.isGordonFinder === 'no' ? formData.finderFirstName : undefined,
        finderLastName:
          formData.isGordonFinder === 'no' ? formData.finderLastName || '' : undefined,
        finderPhone: formData.isGordonFinder === 'no' ? formData.finderPhoneNumber : undefined,
        finderEmail: formData.isGordonFinder === 'no' ? formData.finderEmail : undefined,

        // Owner Information
        ownerUsername: formData.isGordonOwner === 'yes' ? formData.ownerUsername : undefined,
        ownerFirstName: formData.isGordonOwner === 'no' ? formData.ownerFirstName : undefined,
        ownerLastName: formData.isGordonOwner === 'no' ? formData.ownerLastName || '' : undefined,
        ownerPhone: formData.isGordonOwner === 'no' ? formData.ownerPhoneNumber : undefined,
        ownerEmail: formData.isGordonOwner === 'no' ? formData.ownerEmail : undefined,
      };

      const response = await lostAndFoundService.createFoundItem(requestData);
      console.log('this is the response' + response);

      const actionRequestData = {
        foundID: response,
        action: 'Created',
        actionDate: new Date().toISOString(),
        actionNote: '',
        submitterUsername: user.AD_Username,
      };
      await lostAndFoundService.createFoundAdminAction(response, actionRequestData);

      navigate(`/lostandfound/lostandfoundadmin/founditemform/${response}`);
    } catch (error) {
      console.error('Failed to create found item report:', error);
      createSnackbar('Error submitting the form. Please try again.', 'error');
    }
  };

  const handleCancel = () => {
    navigate('/lostandfound/lostandfoundadmin');
  };

  return (
    <>
      <Header />
      <Card className={styles.form_card}>
        <CardHeader
          title={
            <>
              <Grid container rowGap={1}>
                <Grid container item xs={12} md={1}>
                  <Button className={styles.backButton} onClick={() => navigate(-1)}>
                    Back
                  </Button>
                </Grid>
                <Grid
                  container
                  item
                  columnGap={2}
                  rowGap={1}
                  xs={12}
                  md={9}
                  justifyContent="center"
                >
                  <b>
                    Found Item <span style={{ textDecoration: 'underline' }}>Entry</span>
                  </b>
                </Grid>
              </Grid>
            </>
          }
          titleTypographyProps={{ align: 'center' }}
          className="gc360_header"
        />

        <br />

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
                  {LFCategories.map((label) => {
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
              </div>
              <TextField
                variant="standard"
                error={!!validationErrors.color}
                helperText={validationErrors.color || ' '}
                fullWidth
                InputProps={{ style: { display: 'none' } }}
              />
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
            <div style={{ marginBottom: '1rem' }}>
              <CustomDatePicker
                value={formData.dateFound ? new Date(formData.dateFound) : null}
                onChange={(newDate) =>
                  setFormData((d) => ({
                    ...d,
                    dateLost: newDate ? newDate.toISOString() : '',
                  }))
                }
                onError={(err) => setDateError(err)}
              />
            </div>

            {/* Finder wants item */}
            <Grid item margin={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hasFinder}
                    onChange={(e) => {
                      setHasFinder(!hasFinder);
                      setFormData({ ...formData, isGordonFinder: '', finderWantsItem: false });
                    }}
                    name="hasFinder"
                  />
                }
                label="Do you know the name of the person who found the item?"
                sx={{ marginBottom: '0.5rem' }}
              />
              {/* Found By */}
              {hasFinder && (
                <>
                  <Grid item margin={1}>
                    <FormLabel component="legend" required>
                      Is the Finder a Gordon Person?
                    </FormLabel>
                    <RadioGroup
                      row
                      name="isGordonFinder"
                      value={formData.isGordonFinder}
                      onChange={(e) => {
                        setFormData({ ...formData, isGordonFinder: e.target.value });
                      }}
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </Grid>

                  {formData.isGordonFinder === 'yes' && (
                    <Grid item margin={1}>
                      <GordonPersonAutocomplete onChange={handleFinderSelect} />
                    </Grid>
                  )}

                  {formData.isGordonFinder === 'no' && (
                    <>
                      <Grid container direction="column" rowSpacing={1}>
                        <Grid item>
                          <div className={styles.name_field}>
                            <TextField
                              label="Finder First Name"
                              sx={{ width: '49%' }}
                              name="finderFirstName"
                              value={formData.finderFirstName}
                              onChange={handleChange}
                            />
                            <TextField
                              label="Finder Last Name"
                              sx={{ width: '49%' }}
                              name="finderLastName"
                              value={formData.finderLastName}
                              onChange={handleChange}
                            />
                          </div>
                        </Grid>
                        <Grid item>
                          <TextField
                            label="Finder Phone"
                            fullWidth
                            name="finderPhoneNumber"
                            value={formData.finderPhoneNumber}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            label="Finder Email"
                            fullWidth
                            name="finderEmail"
                            value={formData.finderEmail}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    </>
                  )}

                  {/* Finder wants item */}
                  <Grid item margin={1}>
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
                  </Grid>
                </>
              )}
            </Grid>

            {/* Owner's Name */}
            <Grid item margin={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hasOwner}
                    onChange={(e) => {
                      setHasOwner(!hasOwner);
                      setFormData({ ...formData, isGordonOwner: '' });
                    }}
                    name="hasFinder"
                  />
                }
                label="Do you know the name of the item's owner?"
                sx={{ marginBottom: '0.5rem' }}
              />
              {hasOwner && (
                <>
                  <Grid item margin={2}>
                    <FormLabel component="legend">Is the Owner a Gordon Person?*</FormLabel>
                    <RadioGroup
                      row
                      name="isGordonOwner"
                      value={formData.isGordonOwner}
                      onChange={(e) => {
                        setFormData({ ...formData, isGordonOwner: e.target.value });
                      }}
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </Grid>

                  {formData.isGordonOwner === 'yes' && (
                    <Grid item margin={2}>
                      <GordonPersonAutocomplete onChange={handleOwnerSelect} />
                    </Grid>
                  )}

                  {formData.isGordonOwner === 'no' && (
                    <>
                      <Grid container direction="column" rowSpacing={1}>
                        <Grid item>
                          <div className={styles.name_field}>
                            <TextField
                              label="Owner First Name"
                              sx={{ width: '49%' }}
                              name="ownerFirstName"
                              value={formData.ownerFirstName}
                              onChange={handleChange}
                            />
                            <TextField
                              label="Owner Last Name"
                              sx={{ width: '49%' }}
                              name="ownerLastName"
                              value={formData.ownerLastName}
                              onChange={handleChange}
                            />
                          </div>
                        </Grid>
                        <Grid item>
                          <TextField
                            label="Owner Phone"
                            fullWidth
                            name="ownerPhoneNumber"
                            value={formData.ownerPhoneNumber}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            label="Owner Email"
                            fullWidth
                            name="ownerEmail"
                            value={formData.ownerEmail}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    </>
                  )}
                </>
              )}
            </Grid>

            {/* Initial Action - use typed SelectChangeEvent */}
            {/* <div style={{ marginBottom: '1rem', marginTop: '1rem' }}>
              <FormControl variant="filled" sx={{ width: 1 }}>
                <InputLabel id="initial-action-label">Initial Action Taken</InputLabel>
                <Select
                  labelId="initial-action-label"
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
              </FormControl>
            </div> */}

            {/* Storage Location - also typed select */}
            <div style={{ marginBottom: '1rem' }}>
              <FormControl
                variant="filled"
                sx={{
                  width: 1,
                  backgroundColor: 'var(--mui-palette-FilledInput-bg)',
                  borderRadius: 1,
                }}
              >
                <InputLabel id="storage-location-label">Storage Location</InputLabel>
                <Select
                  labelId="storage-location-label"
                  name="storageLocation"
                  value={formData.storageLocation}
                  error={!!validationErrors.storageLocation}
                  onChange={handleSelectChange} // Also a SelectChangeEvent
                  fullWidth
                  sx={{ backgroundColor: 'transparent' }}
                >
                  {LFStorageLocations.map((loc) => (
                    <MenuItem value={loc}>{loc}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {!!validationErrors.storageLocation && validationErrors.storageLocation + ' '}
                  Valuable items should go in the safe
                </FormHelperText>
              </FormControl>
            </div>
          </Grid>
        </Grid>

        {/* Buttons */}
        <Grid container justifyContent="flex-end" spacing={2} padding={2}>
          <Grid item xs={6} sm={3} md={2}>
            <Button variant="contained" color="error" onClick={handleCancel} fullWidth>
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
