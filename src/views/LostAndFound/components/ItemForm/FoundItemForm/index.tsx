import { useState, useEffect, useCallback, useMemo } from 'react';
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
  Chip,
} from '@mui/material';
import styles from './FoundItemForm.module.css';
import lostAndFoundService, { FoundItem } from 'services/lostAndFound';
import userService from 'services/user';
import CreateConfirmReport from 'views/LostAndFound/views/MissingReportCreate/components/confirmReport';
import EditConfirmReport from 'views/LostAndFound/views/MissingReportEdit/components/confirmReport';
import GordonSnackbar from 'components/Snackbar';
import { useNavigate, useParams } from 'react-router';
import GordonLoader from 'components/Loader';
import { InfoOutlined } from '@mui/icons-material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { DatePicker, DateValidationError, LocalizationProvider } from '@mui/x-date-pickers';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

interface FoundItemFormData {
  recordID: string;
  category: string;
  colors: string[];
  brand: string;
  description: string;
  locationFound: string;
  dateFound: string;
  dateCreated: string;
  submitterUsername: string;
  storageLocation: string;
  finderWants: boolean;
  finderUsername?: string;
  finderFirstName?: string;
  finderLastName?: string;
  finderPhone?: string;
  finderEmail?: string;
  ownerUsername?: string;
  ownerFirstName?: string;
  ownerLastName?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  status: string;
  isFoundItem?: boolean;
}

const pageHeader = (formType: string) => {
  if (formType === 'create') {
    return (
      <>
        <CardHeader
          title={
            <b>
              Report a <u>Found</u> Item
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
                This page is for creating a Found Item report.
              </Typography>
            </Grid>
          </Grid>
        </div>
      </>
    );
  } else if (formType === 'edit') {
    return <CardHeader title="Edit Found Item" className="gc360_header" />;
  }
};

const FoundItemForm = ({ formType }: { formType: string }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Found item ID from URL
  const [loading, setLoading] = useState<boolean>(true);
  const [snackbar, setSnackbar] = useState({ message: '', severity: undefined, open: false });

  const createSnackbar = useCallback((message: string, severity: any) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    emailAddr: '',
    phoneNumber: '',
    AD_Username: '',
    ID: '',
  });

  const [formData, setFormData] = useState<FoundItemFormData>({
    recordID: '',
    category: '',
    colors: [],
    brand: '',
    description: '',
    locationFound: '',
    dateFound: '',
    dateCreated: '',
    submitterUsername: '',
    storageLocation: '',
    finderWants: false,
    finderUsername: '',
    finderFirstName: '',
    finderLastName: '',
    finderPhone: '',
    finderEmail: '',
    ownerUsername: '',
    ownerFirstName: '',
    ownerLastName: '',
    ownerPhone: '',
    ownerEmail: '',
    status: 'active',
    isFoundItem: false,
  });

  const [originalFormData, setOriginalFormData] = useState<FoundItemFormData>({ ...formData });
  const [isPickedUp, setIsPickedUp] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [dateError, setDateError] = useState<DateValidationError | null>(null);
  const requiredFields = ['category', 'description', 'locationFound', 'dateFound'];
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const isEditable = formData.status.toLowerCase() === 'active' && !formData.isFoundItem;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Conversion function: maps FoundItemFormData and user data into the MissingItemReport shape
  // required by the ConfirmReport components.
  const convertFoundDataForConfirmReport = (
    data: FoundItemFormData,
    userData: { firstName: string; lastName: string; emailAddr: string; phoneNumber: string },
  ): {
    firstName: string;
    lastName: string;
    category: string;
    colors: string[];
    brand: string;
    description: string;
    locationLost: string;
    dateLost: string;
    phoneNumber: string;
    emailAddr: string;
    stolenDescription?: string;
    stolen: boolean;
    forGuest: boolean;
  } => ({
    firstName: userData.firstName,
    lastName: userData.lastName,
    category: data.category,
    colors: data.colors,
    brand: data.brand,
    description: data.description,
    // Map the found item values to the missing item report shape:
    locationLost: data.locationFound,
    dateLost: data.dateFound,
    // Use the user’s contact info:
    phoneNumber: userData.phoneNumber,
    emailAddr: userData.emailAddr,
    // For found items, these values are not applicable:
    stolen: false,
    stolenDescription: '',
    forGuest: false,
  });

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    requiredFields.forEach((field) => {
      if (!formData[field as keyof FoundItemFormData]) {
        errors[field] = 'This field is required';
      }
    });
    if (dateError !== null) {
      errors['dateFound'] = dateError;
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePickup = async () => {
    try {
      await lostAndFoundService.updateFoundReportStatus(formData.recordID, 'PickedUp');
      await lostAndFoundService.updateFoundReportStatus(formData.recordID, 'pickedUp');
      const foundItem = await lostAndFoundService.getFoundItem(formData.recordID);
      if (foundItem.matchingMissingID !== undefined) {
        await lostAndFoundService.updateReportStatus(
          parseInt(foundItem.matchingMissingID || ''),
          'pickedup',
        );
      }
      setIsPickedUp(true);
    } catch (error) {
      console.error('Error updating found item status:', error);
    }
  };

  const errorMessage = useMemo(() => {
    switch (dateError) {
      case 'invalidDate':
        return 'Invalid Date';
      case 'disableFuture':
        return 'Cannot set a date in the future';
      default:
        return null;
    }
  }, [dateError]);

  // DatePicker adjusted for found items (using dateFound)
  const customDatePicker = (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date Found"
        value={formData.dateFound === '' ? null : formData.dateFound}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, dateFound: value?.toString() || '' }))
        }
        onError={(newError) => setDateError(newError)}
        disableFuture
        orientation="portrait"
        name="dateFound"
        slotProps={{
          textField: {
            helperText: errorMessage ? errorMessage : 'Select the date the item was found',
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

  const handleColorChange = (color: string) => {
    if (!isEditable) return;
    setFormData((prevData) => {
      const colors = prevData.colors.includes(color)
        ? prevData.colors.filter((c) => c !== color)
        : [...prevData.colors, color];
      return { ...prevData, colors };
    });
  };

  const handleReportSubmit = async () => {
    if (formType === 'create') {
      if (!disableSubmit) {
        setDisableSubmit(true);
        try {
          const now = new Date();
          const requestData = {
            ...formData,
            dateFound: new Date(formData.dateFound).toISOString() || now.toISOString(),
            dateCreated: now.toISOString(),
            colors: formData.colors || [],
            submitterUsername: user.AD_Username,
          };
          const newReportId = await lostAndFoundService.createFoundItem(requestData);
          navigate('/lostandFound');
        } catch (error) {
          createSnackbar('Failed to create the found item report.', 'error');
          setDisableSubmit(false);
        }
      }
    } else if (formType === 'edit') {
      const requestData = {
        ...formData,
        dateFound: new Date(formData.dateFound).toISOString(),
      };
      await lostAndFoundService.updateFoundItem(requestData, formData.recordID);
      navigate('/lostandFound');
    }
  };

  // Instead of using getMissingItemReport, use getFoundItemsByOwner to fetch this found item.
  // We get the list of found items that belong to the user and then filter by the id from the URL.
  useEffect(() => {
    const fetchItemData = async () => {
      if (id) {
        // Use the current user's ID (owner) for lookup.
        const ownerUsername = user.AD_Username || '';
        const items = await lostAndFoundService.getFoundItemsByOwner(ownerUsername);
        const item = items.find((itm) => itm.recordID === id);
        if (item) {
          setFormData({
            recordID: item.recordID,
            category: item.category,
            colors: item.colors || [],
            brand: item.brand || '',
            description: item.description,
            // For found items, we use locationFound.
            locationFound: item.locationFound,
            dateFound: item.dateFound,
            dateCreated: item.dateCreated,
            submitterUsername: item.submitterUsername,
            storageLocation: item.storageLocation,
            finderWants: item.finderWants,
            finderUsername: item.finderUsername || '',
            finderFirstName: item.finderFirstName || '',
            finderLastName: item.finderLastName || '',
            finderPhone: item.finderPhone || '',
            finderEmail: item.finderEmail || '',
            ownerUsername: item.ownerUsername || '',
            ownerFirstName: item.ownerFirstName || '',
            ownerLastName: item.ownerLastName || '',
            ownerPhone: item.ownerPhone || '',
            ownerEmail: item.ownerEmail || '',
            status: item.status || 'active',
            isFoundItem: true,
          });
          setOriginalFormData({
            recordID: item.recordID,
            category: item.category,
            colors: item.colors || [],
            brand: item.brand || '',
            description: item.description,
            locationFound: item.locationFound,
            dateFound: item.dateFound,
            dateCreated: item.dateCreated,
            submitterUsername: item.submitterUsername,
            storageLocation: item.storageLocation,
            finderWants: item.finderWants,
            finderUsername: item.finderUsername || '',
            finderFirstName: item.finderFirstName || '',
            finderLastName: item.finderLastName || '',
            finderPhone: item.finderPhone || '',
            finderEmail: item.finderEmail || '',
            ownerUsername: item.ownerUsername || '',
            ownerFirstName: item.ownerFirstName || '',
            ownerLastName: item.ownerLastName || '',
            ownerPhone: item.ownerPhone || '',
            ownerEmail: item.ownerEmail || '',
            status: item.status || 'active',
            isFoundItem: true,
          });
        } else {
          console.error('Found item not found for this owner.');
        }
        setLoading(false);
      }
    };
    fetchItemData();
  }, [id, user.AD_Username]);

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
          ID: userInfo?.ID || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload, { capture: true });
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload, { capture: true });
    };
  }, []);

  return (
    <>
      {showConfirm ? (
        <>
          {formType === 'create' ? (
            <>
              <CreateConfirmReport
                formData={{ ...convertFoundDataForConfirmReport(formData, user) }}
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
            <EditConfirmReport
              formData={{ ...convertFoundDataForConfirmReport(formData, user) }}
              onEdit={() => setShowConfirm(false)}
              onSubmit={handleReportSubmit}
            />
          )}
        </>
      ) : (
        <Card className={styles.form_card}>
          {pageHeader(formType)}
          {loading ? (
            <GordonLoader />
          ) : (
            <>
              {/* For Found Items, display "Found" notice */}
              {(formData.status.toLowerCase() === 'found' || formData.isFoundItem === true) && (
                <Grid container xs={9.7} className={styles.foundContainer} rowGap={2}>
                  <Grid container item xs={12} md={6} rowGap={2}>
                    <Grid item xs={12}>
                      <Chip
                        className={styles.largeChip}
                        sx={{
                          height: 'auto',
                          '& .MuiChip-label': { display: 'block', whiteSpace: 'normal' },
                        }}
                        label={
                          <>
                            <Typography>
                              Gordon Police marked this item as{' '}
                              <Typography component="span" className={styles.foundText}>
                                Found
                              </Typography>
                            </Typography>
                          </>
                        }
                        color="success"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container columnGap={1} height="100%" alignItems="center">
                        <Typography>
                          <InfoOutlinedIcon color="inherit" /> Check your email for pickup
                          instructions.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} md={6} className={styles.buttonContainer}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<CheckCircleOutlineIcon />}
                      onClick={handlePickup}
                      className={styles.pickupButton}
                      disabled={isPickedUp}
                    >
                      {isPickedUp ? 'Item Picked Up' : 'Mark as Picked Up'}
                    </Button>
                  </Grid>
                </Grid>
              )}
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
                            control={<Radio disabled={!isEditable} />}
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
                    <Grid item>
                      <TextField
                        variant="standard"
                        error={Boolean(validationErrors.category)}
                        helperText={validationErrors.category || ' '}
                        fullWidth
                        InputProps={{ style: { display: 'none' } }}
                      />
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
                                disabled={!isEditable}
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
                      label="Item Brand or Make"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      disabled={!isEditable}
                      error={Boolean(validationErrors.brand)}
                      helperText={validationErrors.brand}
                      sx={{
                        '& .MuiFormLabel-root.Mui-focused': {
                          color: 'var(--mui-palette-secondary-400)',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item margin={2}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={5}
                      variant="filled"
                      label="Item Description: Be as detailed as possible"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      error={Boolean(validationErrors.description)}
                      helperText={validationErrors.description}
                      disabled={!isEditable}
                      sx={{
                        '& .MuiFormLabel-root.Mui-focused': {
                          color: 'var(--mui-palette-secondary-400)',
                        },
                      }}
                    />
                  </Grid>
                  {/* Location Found and Date Found */}
                  <Grid item margin={2}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      variant="filled"
                      label="Location Found: Be as detailed as possible"
                      name="locationFound"
                      value={formData.locationFound}
                      onChange={handleChange}
                      error={Boolean(validationErrors.locationFound)}
                      helperText={validationErrors.locationFound}
                      disabled={!isEditable}
                      sx={{
                        '& .MuiFormLabel-root.Mui-focused': {
                          color: 'var(--mui-palette-secondary-400)',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item margin={2}>
                    {customDatePicker}
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default FoundItemForm;
