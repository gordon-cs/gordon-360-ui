import { useState, useEffect, useMemo } from 'react';
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
import styles from './MissingItemEdit.module.scss';
import lostAndFoundService, { MissingItemReport } from 'services/lostAndFound';
import userService from 'services/user';
import ConfirmReport from './components/confirmReport';
import { useNavigate, useParams } from 'react-router';
import GordonLoader from 'components/Loader';
import { DatePicker, DateValidationError, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { LFCategories, LFColors } from 'views/CampusSafety/components/Constants';
import { useUser } from 'hooks';

const MissingItemFormEdit = () => {
  const navigate = useNavigate();
  const { itemId } = useParams<{ itemId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isPickedUp, setIsPickedUp] = useState(false); //Added this to manage the button disable
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

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

  const [showConfirm, setShowConfirm] = useState(false);
  const { profile } = useUser();
  const isEditable = formData.status === 'active';

  useEffect(() => {
    const fetchUserData = async () => {
      setUser({
        firstName: profile?.FirstName || '',
        lastName: profile?.LastName || '',
        emailAddr: profile?.Email || '',
        phoneNumber: profile?.MobilePhone || '',
        AD_Username: profile?.AD_Username || '',
      });
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

  useEffect(() => {
    if (formData.recordID > 0) {
      setLoading(false);
    }
  }, [formData.recordID]);

  const handleColorChange = (color: string) => {
    if (!isEditable) return;
    setFormData((prevData) => {
      const colors = prevData.colors.includes(color)
        ? prevData.colors.filter((c) => c !== color)
        : [...prevData.colors, color];
      return { ...prevData, colors };
    });
  };

  const requiredFields = ['category', 'description', 'locationLost'];

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

  const handleFormSubmit = () => {
    if (validateForm()) {
      setShowConfirm(true);
    }
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

  const handleReportSubmit = async () => {
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

  return (
    <>
      <Header />
      {showConfirm ? (
        <ConfirmReport
          formData={{ ...formData, ...user }}
          onEdit={() => setShowConfirm(false)}
          onSubmit={handleReportSubmit}
        />
      ) : (
        <Card className={styles.form_card}>
          <CardHeader title="Edit Missing Item" className="gc360_header" />
          {loading ? (
            <GordonLoader />
          ) : (
            <>
              {/* Display the "Found" notice only if the status is "found" */}
              {formData.status.toLowerCase() === 'found' && (
                <Grid container xs={9.7} className={styles.foundContainer} rowGap={2}>
                  <Grid container item xs={12} md={6} rowGap={2}>
                    <Grid item xs={12}>
                      <Chip
                        className={styles.largeChip}
                        // Wrap chip text if needed
                        sx={{
                          height: 'auto',
                          '& .MuiChip-label': {
                            display: 'block',
                            whiteSpace: 'normal',
                          },
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
                          instructions.{' '}
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
                      disabled={isPickedUp} // Disable the button if the item is picked up
                    >
                      {/* Update text based on if the item is picked up */}
                      {isPickedUp ? 'Item Picked Up' : 'Mark as Picked Up'}{' '}
                    </Button>
                  </Grid>
                </Grid>
              )}
              {/* Display a chip for items with statuses other than "active" */}
              {formData.status.toLowerCase() !== 'active' &&
                formData.status.toLowerCase() !== 'found' && (
                  <Grid container xs={9.7} className={styles.foundContainer} rowGap={2}>
                    <Grid container item xs={12} md={6} rowGap={2}>
                      <Grid item xs={12}>
                        <Chip
                          className={styles.largeChip}
                          sx={{
                            '& .MuiChip-label': {
                              display: 'block',
                              whiteSpace: 'normal',
                            },
                          }}
                          label={
                            <>
                              <Typography>
                                This item was marked as{' '}
                                <Typography component="span" className={styles.foundText}>
                                  {formData.status.charAt(0).toUpperCase() +
                                    formData.status.slice(1)}
                                </Typography>
                              </Typography>
                            </>
                          }
                          color="default"
                        />
                      </Grid>
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
                        {LFCategories.map((label) => (
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
                            checked={
                              formData.category.toLowerCase().replace(/ /g, '/') ===
                              label.toLowerCase().replace(/ /g, '/')
                            }
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
                        {LFColors.map((color) => (
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
                  <Grid item margin={2}>
                    <TextField
                      fullWidth
                      variant="filled"
                      label="Item Brand or Make"
                      name="brand"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      disabled={!isEditable}
                      // Custom styling on focus, better dark mode contrast
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
                      label="Item Description"
                      name="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      error={Boolean(validationErrors.description)}
                      helperText={validationErrors.description}
                      disabled={!isEditable}
                      // Custom styling on focus, better dark mode contrast
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
                      minRows={4}
                      variant="filled"
                      label="Location Lost"
                      name="locationLost"
                      value={formData.locationLost}
                      error={Boolean(validationErrors.locationLost)}
                      helperText={validationErrors.locationLost}
                      onChange={(e) => setFormData({ ...formData, locationLost: e.target.value })}
                      disabled={!isEditable}
                      // Custom styling on focus, better dark mode contrast
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
                  {formData.stolen ? (
                    <>
                      <Typography>This item was marked as stolen</Typography>
                      <Grid item margin={2}>
                        <TextField
                          fullWidth
                          multiline
                          minRows={4}
                          variant="filled"
                          label="Stolen Reasoning"
                          name="stolenDescription"
                          value={formData.stolenDescription}
                          onChange={(e) =>
                            setFormData({ ...formData, stolenDescription: e.target.value })
                          }
                          disabled={!isEditable}
                          // Custom styling on focus, better dark mode contrast
                          sx={{
                            '& .MuiFormLabel-root.Mui-focused': {
                              color: 'var(--mui-palette-secondary-400);',
                            },
                          }}
                        />
                      </Grid>
                    </>
                  ) : null}
                </Grid>
              </Grid>

              {isEditable && (
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  className={styles.submit_container}
                >
                  <Grid item xs={12} sm={5} md={2}>
                    <Button
                      variant="contained"
                      fullWidth
                      className={styles.submit_button}
                      onClick={handleFormSubmit}
                    >
                      Next
                    </Button>
                  </Grid>
                </Grid>
              )}
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default MissingItemFormEdit;
