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
import Header from 'views/CampusSafety/components/Header';
import styles from './ItemForm.module.css';
import lostAndFoundService, { MissingItemReport } from 'services/lostAndFound';
import userService from 'services/user';
import ReportStolenModal from 'views/CampusSafety/views/LostAndFound/views/MissingItemCreate/components/reportStolen';
import CreateConfirmReport from 'views/CampusSafety/views/LostAndFound/views/MissingItemCreate/components/confirmReport';
import EditConfirmReport from 'views/CampusSafety/views/LostAndFound/views/MissingItemEdit/components/confirmReport';
import GordonSnackbar from 'components/Snackbar';
import { useNavigate, useParams } from 'react-router';
import GordonLoader from 'components/Loader';
import { InfoOutlined } from '@mui/icons-material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { DatePicker, DateValidationError, LocalizationProvider } from '@mui/x-date-pickers';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

const pageHeader = (formType: string) => {
  if (formType == 'create') {
    return (
      <>
        <CardHeader
          title={
            <b>
              Report a <u>Lost</u> Item
            </b>
          }
          titleTypographyProps={{ align: 'center' }}
          className="gc360_header"
        />
      </>
    );
  } else if (formType == 'edit') {
    return (
      <>
        <CardHeader title="Edit Missing Item" className="gc360_header" />
      </>
    );
  }
};

const ItemForm = ({ formType }: { formType: string }) => {
  const navigate = useNavigate();
  const { itemId } = useParams<{ itemId: string }>();
  const [loading, setLoading] = useState<boolean>(true);

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    emailAddr: '',
    phoneNumber: '',
    AD_Username: '', // Include AD_Username for submitterUsername
  });

  const [formData, setFormData] = useState({
    recordID: 0,
    category: '',
    colors: [] as string[],
    brand: '',
    description: '',
    locationLost: '',
    stolen: false,
    stolenDescription: '',
    dateLost: '',
    dateCreated: '',
    submitterUsername: '',
    forGuest: false,
    status: 'active',
  });

  const [originalFormData, setOriginalFormData] = useState({
    recordID: 0,
    category: '',
    colors: [] as string[],
    brand: '',
    description: '',
    locationLost: '',
    stolen: false,
    stolenDescription: '',
    dateLost: '',
    dateCreated: '',
    submitterUsername: '',
    forGuest: false,
    status: 'active',
  });

  const [isStolenModalOpen, setStolenModalOpen] = useState(false);
  const [isPickedUp, setIsPickedUp] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [dateError, setDateError] = useState<DateValidationError | null>(null);
  const requiredFields = ['category', 'description', 'locationLost'];
  const [snackbar, setSnackbar] = useState({ message: '', severity: undefined, open: false });
  const [newActionFormData] = useState({ action: '', actionNote: '' });
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        errors[field] = 'This field is required';
      }
    });
    if (dateError !== null) {
      errors['dateLost'] = dateError;
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const errorMessage = useMemo(() => {
    switch (dateError) {
      case 'invalidDate': {
        return 'Invalid Date';
      }
      case 'disableFuture': {
        return 'Cannot lose an item in the future';
      }
      default: {
        return null;
      }
    }
  }, [dateError]);

  // Using DatePicker component from MUI/x, with custom styling to fix dark mode contrast issues
  const customDatePicker = (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date Lost"
        value={formData.dateLost === '' ? null : formData.dateLost}
        onChange={(value) => setFormData({ ...formData, dateLost: value?.toString() || '' })}
        onError={(newError) => setDateError(newError)}
        disableFuture
        orientation="portrait"
        name="Date Lost"
        // Custom styling for popup box, better dark mode contrast
        // Thanks to help for understanding from
        // https://blog.openreplay.com/styling-and-customizing-material-ui-date-pickers/
        slotProps={{
          textField: {
            helperText: errorMessage ? errorMessage : 'Change if lost before today',
            // Custom styling for the input field, to make it look like filled variant
            sx: {
              backgroundColor: 'var(--mui-palette-FilledInput-bg);',
              paddingTop: '7px;',
              borderRadius: '5px;',
              width: '100%;',
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '& .MuiInputLabel-shrink': {
                transform: 'translate(14px, 4px) scale(0.75);',
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: 'var(--mui-palette-secondary-main);',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '0;',
                borderBottom:
                  '1px solid rgba(var(--mui-palette-common-onBackgroundChannel) / var(--mui-opacity-inputUnderline));',
                borderRadius: '0;',
              },
            },
          },
          layout: {
            sx: {
              '& .MuiPickersLayout-contentWrapper .Mui-selected': {
                backgroundColor: 'var(--mui-palette-secondary-400);',
              },
              '.MuiPickersLayout-contentWrapper .MuiPickersDay-root:focus.Mui-selected': {
                backgroundColor: 'var(--mui-palette-secondary-400);',
              },
              '.MuiPickersLayout-contentWrapper .MuiPickersDay-root.Mui-selected': {
                backgroundColor: 'var(--mui-palette-secondary-400);',
              },
            },
          },
          actionBar: {
            sx: {
              ...{
                '& .MuiButtonBase-root': {
                  color: 'var(--mui-palette-secondary-400);',
                },
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );

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

  const handlePickup = async () => {
    const requestData = {
      ...formData,
      status: 'PickedUp', // Change status to 'pickup'
    };

    try {
      await lostAndFoundService.updateMissingItemReport(requestData, parseInt(itemId || ''));
      setIsPickedUp(true);
      //navigate('/lostandfound');
    } catch (error) {
      console.error('Error updating report status:', error);
    }
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      if (!formData.stolen) {
        setFormData((prevData) => ({
          ...prevData,
          stolenDescription: '',
        }));
      }
      if (!formData.dateLost) {
        const now = new Date();
        setFormData((prevData) => ({
          ...prevData,
          dateLost: now.toISOString(),
        }));
      }
      setShowConfirm(true);
    }
  };

  const handleReportSubmit = async () => {
    if (formType == 'create') {
      if (!disableSubmit) {
        setDisableSubmit(true);
        try {
          const now = new Date();
          const requestData = {
            ...formData,
            ...user,
            dateLost: new Date(formData.dateLost).toISOString() || now.toISOString(),
            dateCreated: now.toISOString(),
            colors: formData.colors || [],
            submitterUsername: user.AD_Username,
            forGuest: false,
          };
          const newReportId = await lostAndFoundService.createMissingItemReport(requestData);
          let actionRequestData = {
            ...newActionFormData,
            missingID: newReportId,
            actionDate: now.toISOString(),
            username: user.AD_Username,
            isPublic: true,
            action: 'Created',
          };
          await lostAndFoundService.createAdminAction(newReportId, actionRequestData);
          navigate('/lostandfound');
        } catch (error) {
          createSnackbar(`Failed to create the missing item report.`, `error`);
          setDisableSubmit(false);
        }
      }
    } else if (formType == 'edit') {
      const requestData: MissingItemReport = {
        ...formData,
        dateLost: new Date(formData.dateLost).toISOString(),
      };
      const formFields = Object.keys(formData);
      let newActionNote = '';
      for (let i = 0; i < formFields.length; i++) {
        if (
          JSON.stringify(originalFormData[formFields[i] as keyof typeof originalFormData]) !==
          JSON.stringify(formData[formFields[i] as keyof typeof formData])
        ) {
          newActionNote +=
            formFields[i] +
            ': OLD: ' +
            originalFormData[formFields[i] as keyof typeof originalFormData] +
            ', NEW: ' +
            formData[formFields[i] as keyof typeof formData] +
            ' ';
        }
      }
      await lostAndFoundService.updateMissingItemReport(requestData, parseInt(itemId || ''));
      const actionRequestData = {
        missingID: parseInt(itemId || ''),
        actionDate: new Date().toISOString(),
        username: user.AD_Username,
        isPublic: true,
        action: 'Edited',
        actionNote: newActionNote,
      };
      await lostAndFoundService.createAdminAction(parseInt(itemId || ''), actionRequestData);
      navigate('/lostandfound');
    }
  };

  useEffect(() => {
    if (formData.recordID > 0) {
      setLoading(false);
    }
  }, [formData.recordID]);

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

  useEffect(() => {
    const fetchItemData = async () => {
      if (itemId) {
        const item = await lostAndFoundService.getMissingItemReport(parseInt(itemId));
        setFormData({
          recordID: item?.recordID || 0,
          category: item.category,
          colors: item.colors || [],
          brand: item.brand || '',
          description: item.description,
          locationLost: item.locationLost,
          stolen: item.stolen,
          stolenDescription: item.stolenDescription || '',
          dateLost: item.dateLost,
          dateCreated: item.dateCreated,
          submitterUsername: item.submitterUsername,
          forGuest: item.forGuest,
          status: item.status || 'active',
        });
        const originalReport = await lostAndFoundService.getMissingItemReport(parseInt(itemId));
        setOriginalFormData({
          recordID: originalReport?.recordID || 0,
          category: originalReport.category,
          colors: originalReport.colors || [],
          brand: originalReport.brand || '',
          description: originalReport.description,
          locationLost: originalReport.locationLost,
          stolen: originalReport.stolen,
          stolenDescription: originalReport.stolenDescription || '',
          dateLost: originalReport.dateLost,
          dateCreated: originalReport.dateCreated,
          submitterUsername: originalReport.submitterUsername,
          forGuest: originalReport.forGuest,
          status: originalReport.status || 'active',
        });
      }
    };
    fetchItemData();
  }, [itemId]);

  return (
    <>
      {showConfirm ? (
        <CreateConfirmReport
          formData={{ ...formData, ...user }}
          onEdit={() => setShowConfirm(false)}
          onSubmit={handleReportSubmit}
          disableSubmit={disableSubmit}
        />
      ) : (
        <Card className={styles.form_card}>
          {pageHeader(formType)}
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
                {/* Error Message */}
                <Grid item>
                  <TextField
                    variant="standard"
                    error={Boolean(validationErrors.category)}
                    helperText={validationErrors.category || ' '} // Show error message or keep space consistent
                    fullWidth
                    InputProps={{ style: { display: 'none' } }} // Hide the actual TextField input
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
                  error={Boolean(validationErrors.brand)}
                  helperText={validationErrors.brand}
                  sx={{
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: 'var(--mui-palette-secondary-400);',
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
                  label={'Item Description: Be as detailed as possible'}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  error={Boolean(validationErrors.description)}
                  helperText={validationErrors.description}
                  sx={{
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: 'var(--mui-palette-secondary-400);',
                    },
                  }}
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
                  sx={{
                    '& .MuiFormLabel-root.Mui-focused': {
                      color: 'var(--mui-palette-secondary-400);',
                    },
                  }}
                />
              </Grid>
              <Grid item margin={2}>
                {customDatePicker}
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
                NEXT
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

export default ItemForm;
