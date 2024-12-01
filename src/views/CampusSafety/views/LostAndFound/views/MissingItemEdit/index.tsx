import { useState, useEffect } from 'react';
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
import styles from './MissingItemEdit.module.scss';
import lostAndFoundService from 'services/lostAndFound';
import userService from 'services/user';
import ConfirmReport from './components/confirmReport';
import { useNavigate, useParams } from 'react-router';
import GordonLoader from 'components/Loader';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

const MissingItemFormEdit = () => {
  const navigate = useNavigate();
  const { itemid } = useParams<{ itemid: string }>();
  const [loading, setLoading] = useState<boolean>(true);

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    emailAddr: '',
    phoneNumber: '',
    AD_Username: '', // Include AD_Username for submitterUsername
  });

  const [formData, setFormData] = useState({
    reportID: 0,
    category: '',
    colors: [] as string[],
    brand: '',
    description: '',
    locationLost: '',
    stolen: false,
    stolenDescription: '',
    dateLost: '',
    dateCreated: '',
    status: 'active',
  });

  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userInfo = await userService.getProfileInfo();
      setUser({
        firstName: userInfo?.FirstName || '',
        lastName: userInfo?.LastName || '',
        emailAddr: userInfo?.Email || '',
        phoneNumber: userInfo?.MobilePhone || '',
        AD_Username: userInfo?.AD_Username || '',
      });
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchItemData = async () => {
      if (itemid) {
        const item = await lostAndFoundService.getMissingItemReport(parseInt(itemid));
        setFormData({
          reportID: item?.recordID || 0,
          category: item.category,
          colors: item.colors || [],
          brand: item.brand || '',
          description: item.description,
          locationLost: item.locationLost,
          stolen: item.stolen,
          stolenDescription: item.stolenDescription || '',
          dateLost: item.dateLost,
          dateCreated: item.dateCreated,
          status: item.status || 'active',
        });
      }
    };
    fetchItemData();
  }, [itemid]);

  useEffect(() => {
    if (formData.reportID > 0) {
      setLoading(false);
    }
  }, [formData.reportID]);

  const handleColorChange = (color: string) => {
    setFormData((prevData) => {
      const colors = prevData.colors.includes(color)
        ? prevData.colors.filter((c) => c !== color)
        : [...prevData.colors, color];
      return { ...prevData, colors };
    });
  };

  const handleFormSubmit = () => {
    setShowConfirm(true);
  };

  const handleReportSubmit = async () => {
    const requestData = {
      ...formData,
      ...user,
      submitterUsername: user.AD_Username,
      dateLost: new Date(formData.dateLost).toISOString() || DateTime.now().toISO(),
      forGuest: false,
    };
    await lostAndFoundService.updateMissingItemReport(requestData, parseInt(itemid || ''));
    navigate('/lostandfound');
  };

  // Using DatePicker component from MUI/x, with custom styling to fix dark mode contrast issues
  const customDatePicker = (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date Lost"
        value={formData.dateLost === '' ? null : formData.dateLost}
        onChange={(value) => setFormData({ ...formData, dateLost: value?.toString() || '' })}
        disableFuture
        orientation="portrait"
        name="Date Lost"
        // Custom styling for the input field, to make it look like filled variant
        sx={{
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
        }}
        // Custom styling for popup box, better dark mode contrast
        // Thanks to help for understanding from
        // https://blog.openreplay.com/styling-and-customizing-material-ui-date-pickers/
        slotProps={{
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
                  <Grid item margin={2}>
                    <TextField
                      fullWidth
                      variant="filled"
                      label="Item Brand or Make"
                      name="brand"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, locationLost: e.target.value })}
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
                          inputProps={{ max: DateTime.now().toISODate() }}
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

              <Grid container justifyContent="flex-end" className={styles.submit_container}>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    className={styles.submit_button}
                    onClick={handleFormSubmit}
                  >
                    Update Report
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default MissingItemFormEdit;
