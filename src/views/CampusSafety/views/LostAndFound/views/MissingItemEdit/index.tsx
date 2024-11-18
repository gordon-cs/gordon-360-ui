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
} from '@mui/material';
import { DateTime } from 'luxon';
import Header from 'views/CampusSafety/components/Header';
import styles from './MissingItemEdit.module.scss';
import lostAndFoundService from 'services/lostAndFound';
import userService from 'services/user';
import ConfirmReport from './components/confirmReport';
import { useNavigate, useParams } from 'react-router';

const MissingItemFormEdit = () => {
  const navigate = useNavigate();
  const { itemid } = useParams<{ itemid: string }>();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    emailAddr: '',
    phoneNumber: '',
    AD_Username: '', // Include AD_Username for submitterUsername
  });

  const [formData, setFormData] = useState({
    category: '',
    colors: [] as string[],
    brand: '',
    description: '',
    locationLost: '',
    stolen: false,
    stolenDescription: '',
    dateLost: '',
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
          category: item.category,
          colors: item.colors || [],
          brand: item.brand || '',
          description: item.description,
          locationLost: item.locationLost,
          stolen: item.stolen,
          stolenDescription: item.stolenDescription || '',
          dateLost: item.dateLost,
          status: item.status || 'active',
        });
      }
    };
    fetchItemData();
  }, [itemid]);

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
      dateLost: formData.dateLost || DateTime.now().toISO(),
      dateCreated: DateTime.now().toISO(),
      forGuest: false,
    };
    await lostAndFoundService.updateMissingItemReport(requestData, parseInt(itemid || ''));
    navigate('/campussafety/lostandfound');
  };

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
                />
              </Grid>
              <Grid item margin={2}>
                <TextField
                  fullWidth
                  variant="filled"
                  label="Date Lost"
                  InputLabelProps={{ shrink: true }}
                  name="dateLost"
                  type="date"
                  value={formData.dateLost}
                  onChange={(e) => setFormData({ ...formData, dateLost: e.target.value })}
                  inputProps={{ max: DateTime.now().toISODate() }}
                />
              </Grid>
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
        </Card>
      )}
    </>
  );
};

export default MissingItemFormEdit;
