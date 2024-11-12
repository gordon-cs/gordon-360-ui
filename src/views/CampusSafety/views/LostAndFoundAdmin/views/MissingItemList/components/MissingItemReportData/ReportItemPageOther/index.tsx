import { debounce } from 'lodash';
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
  Autocomplete,
  MenuItem,
  Typography,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DateTime } from 'luxon';
import { useReducer, useEffect, useState, HTMLAttributes } from 'react';
import { useNavigate } from 'react-router';
import Header from 'views/CampusSafety/components/Header';
import styles from './ReportItemPage.module.scss';
import lostAndFoundService from 'services/lostAndFound';
import quickSearchService, { SearchResult } from 'services/quickSearch';
import ConfirmReport from 'views/CampusSafety/views/LostAndFound/views/MissingItemCreate/components/confirmReport';
import ReportStolenModal from 'views/CampusSafety/views/LostAndFound/views/MissingItemCreate/components/reportStolen';

const MIN_QUERY_LENGTH = 2;

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
    case 'LOAD': {
      if (action.payload.searchTime > state.searchTime) {
        return { ...state, ...action.payload, loading: false };
      } else {
        return state;
      }
    }
    case 'RESET':
      return defaultState;
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

const performSearch = debounce(async (query: string, dispatch: React.Dispatch<Action>) => {
  try {
    const [searchTime, searchResults] = await quickSearchService.search(query);

    dispatch({
      type: 'LOAD',
      payload: {
        searchTime,
        searchResults,
      },
    });
  } catch (error) {
    console.error('Error fetching search results:', error);
    dispatch({ type: 'RESET' });
  }
}, 400);

const ReportItemPage = () => {
  const navigate = useNavigate();
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
    dateLost: '',
    phoneNumber: '',
    forGuest: true,
    status: 'active',
  });

  const [isStolenModalOpen, setStolenModalOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [state, dispatch] = useReducer(reducer, defaultState);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const specialCharactersRegex = /[^a-zA-Z0-9'\-.\s]/gm;

  const handleInput = (_event: React.SyntheticEvent, value: string) => {
    const query = value.trim().replace(specialCharactersRegex, '');
    if (query.length >= MIN_QUERY_LENGTH) {
      dispatch({ type: 'INPUT' });
      performSearch(query, dispatch);
    } else {
      dispatch({ type: 'RESET' });
    }
  };

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
      setStolenModalOpen(checked);
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
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
      stolenDescription: '',
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
    [
      'category',
      'description',
      'locationLost',
      'dateLost',
      'firstName',
      'lastName',
      'phoneNumber',
    ].forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        errors[field] = 'This field is required';
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
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
        dateLost: formData.dateLost || DateTime.now().toISO(),
        dateCreated: DateTime.now().toISO(),
        status: 'active',
        phone: formData.phoneNumber, // Include phone number
      };

      let requestData;

      if (formData.forGuest) {
        // For guest user
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

      await lostAndFoundService.createMissingItemReport(requestData);
      // Redirect to the missing item database after successful submission
      navigate('/campussafety/lostandfoundadmin/missingitemdatabase');
    } catch (error) {
      console.error('Error creating report:', error);
    }
  };

  useEffect(() => {
    return () => {
      performSearch.cancel();
    };
  }, []);

  const renderOption = (props: HTMLAttributes<HTMLLIElement>, person: SearchResult) => {
    const fullName = `${person.FirstName} ${person.LastName}`;
    return (
      <MenuItem {...props} key={person.UserName} divider>
        <Typography variant="body2">{fullName}</Typography>
      </MenuItem>
    );
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
  );

  return (
    <>
      <Header />
      {showConfirm ? (
        <ConfirmReport
          formData={formData}
          onEdit={() => setShowConfirm(false)}
          onSubmit={handleReportSubmit}
        />
      ) : (
        <Card className={styles.form_card}>
          <CardHeader
            title={<b>Report an Item</b>}
            titleTypographyProps={{ align: 'center' }}
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
                    <Autocomplete
                      loading={state.loading}
                      options={state.searchResults}
                      isOptionEqualToValue={(option, value) => option.UserName === value.UserName}
                      onInputChange={handleInput}
                      onChange={handleSelect}
                      renderOption={renderOption}
                      getOptionLabel={(option) => `${option.FirstName} ${option.LastName}`}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search Gordon Person"
                          variant="filled"
                          fullWidth
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>
                  {/* Phone Number Field */}
                  <Grid item margin={2}>
                    <TextField
                      fullWidth
                      variant="filled"
                      label="Phone Number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      error={!!validationErrors.phoneNumber}
                      helperText={validationErrors.phoneNumber}
                    />
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
                      error={!!validationErrors.firstName}
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
                      error={!!validationErrors.lastName}
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
                      error={!!validationErrors.phoneNumber}
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
                      error={!!validationErrors.emailAddr}
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
                        value={label}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            category: (e.target as HTMLInputElement).value,
                          }))
                        }
                        checked={formData.category === label}
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
                  error={!!validationErrors.dateLost}
                  helperText={validationErrors.dateLost}
                  inputProps={{
                    max: DateTime.now().toISODate(),
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
          />
        </Card>
      )}
    </>
  );
};

export default ReportItemPage;
