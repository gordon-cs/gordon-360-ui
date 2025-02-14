import { useState, useEffect, useCallback, useReducer, useMemo } from 'react';

import {
  Autocomplete,
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
  Typography,
  InputLabel,
  Select,
} from '@mui/material';
import { debounce } from 'lodash';
import quickSearchService, { SearchResult } from 'services/quickSearch';
import { SelectChangeEvent } from '@mui/material/Select';
import Header from 'views/CampusSafety/components/Header';
import styles from './FoundItemFormCreate.module.scss';
import lostAndFoundService from 'services/lostAndFound';
import GordonSnackbar from 'components/Snackbar';
import { useNavigate } from 'react-router';
import { InfoOutlined } from '@mui/icons-material';
import { DatePicker, DateValidationError, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { useUser } from 'hooks';
import { LFCategories, LFColors } from 'views/CampusSafety/components/Constants';

const MIN_QUERY_LENGTH = 2;

// Search Reducer
type State = {
  loading: boolean;
  searchTime: number;
  searchResults: SearchResult[];
};

type Action =
  | { type: 'INPUT' }
  | { type: 'LOAD'; payload: Omit<State, 'loading'> }
  | { type: 'RESET' };

const defaultState: State = {
  loading: false,
  searchTime: 0,
  searchResults: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INPUT':
      return { ...state, searchResults: [], loading: true };
    case 'LOAD':
      return action.payload.searchTime > state.searchTime
        ? { ...state, ...action.payload, loading: false }
        : state;
    case 'RESET':
      return defaultState;
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

const performSearch = debounce(async (query: string, dispatch: React.Dispatch<Action>) => {
  try {
    const [searchTime, searchResults] = await quickSearchService.search(query);
    dispatch({ type: 'LOAD', payload: { searchTime, searchResults } });
  } catch (error) {
    console.error('Error fetching search results:', error);
    dispatch({ type: 'RESET' });
  }
}, 400);

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
  const [state, dispatch] = useReducer(reducer, defaultState);
  const { profile } = useUser();

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
    status: 'found',
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

  const handleInput = (_event: React.SyntheticEvent, value: string) => {
    const query = value.trim();
    if (query.length >= MIN_QUERY_LENGTH) {
      dispatch({ type: 'INPUT' });
      performSearch(query, dispatch);
    } else {
      dispatch({ type: 'RESET' });
    }
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

  const [dateError, setDateError] = useState<DateValidationError | null>(null);

  const errorMessage = useMemo(() => {
    switch (dateError) {
      case 'invalidDate': {
        return 'Invalid Date';
      }
      case 'disableFuture': {
        return 'Cannot lose an item in the future';
      }
      case 'minDate': {
        return 'Date too long ago';
      }
      default: {
        return dateError;
      }
    }
  }, [dateError]);

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
        onError={(newError) => setDateError(newError)}
        disableFuture
        orientation="portrait"
        slotProps={{
          textField: {
            helperText: errorMessage ? errorMessage : 'Change if lost before today',
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

      navigate('/lostandfound/lostandfoundadmin');
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
            <Grid item margin={2}>
              <FormLabel component="legend" required>
                Was the Finder a Gordon Person?
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
              <Grid item margin={2}>
                <Autocomplete
                  loading={state.loading}
                  options={state.searchResults}
                  isOptionEqualToValue={(option, value) => option.UserName === value.UserName}
                  onInputChange={handleInput}
                  onChange={handleFinderSelect}
                  renderOption={(props, person) => (
                    <MenuItem {...props} key={person.UserName} divider>
                      <Typography variant="body2">{`${person.FirstName} ${person.LastName}`}</Typography>
                    </MenuItem>
                  )}
                  getOptionLabel={(option) => `${option.FirstName} ${option.LastName}`}
                  renderInput={(params) => (
                    <TextField {...params} label="Search Gordon Person" fullWidth />
                  )}
                />
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
            <Grid item margin={2}>
              <FormLabel component="legend">Was the Owner a Gordon Person (if known)?</FormLabel>
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
                <Autocomplete
                  loading={state.loading}
                  options={state.searchResults}
                  isOptionEqualToValue={(option, value) => option.UserName === value.UserName}
                  onInputChange={handleInput}
                  onChange={handleOwnerSelect}
                  renderOption={(props, person) => (
                    <MenuItem {...props} key={person.UserName} divider>
                      <Typography variant="body2">{`${person.FirstName} ${person.LastName}`}</Typography>
                    </MenuItem>
                  )}
                  getOptionLabel={(option) => `${option.FirstName} ${option.LastName}`}
                  renderInput={(params) => (
                    <TextField {...params} label="Search Gordon Person" fullWidth />
                  )}
                />
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
