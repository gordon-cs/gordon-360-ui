import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  FormGroup,
  FormLabel,
  CardHeader,
} from '@mui/material';
import styles from './MissingItemReportData.module.scss';
import { useEffect, useState } from 'react';
import lostAndFoundService from 'services/lostAndFound';
import type { MissingItemReport } from 'services/lostAndFound';
import { DateTime } from 'luxon';
import Header from 'views/CampusSafety/components/Header';

const MissingItemReportData = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<MissingItemReport | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const fetchedItem = await lostAndFoundService.getMissingItemReport(parseInt(itemId || ''));
        setItem(fetchedItem);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };
    fetchItem();
  }, [itemId]);

  if (!item) return null;

  const formattedDateLost = DateTime.fromISO(item.dateLost).toFormat('MM-dd-yy');

  const handleContact = () => {
    console.log('Handling Contact');
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Button className={styles.backButton} onClick={() => navigate(-1)}>
          Back to All Reports
        </Button>
        <Card className={styles.card}>
          <CardHeader
            title={<div>Missing Item Report</div>}
            className={`gc360_header ${styles.title}`}
          ></CardHeader>
          <CardContent>
            <Grid container spacing={2} rowGap={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Owner's Name"
                  variant="outlined"
                  fullWidth
                  value={`${item.firstName} ${item.lastName}`}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Location Lost"
                  variant="outlined"
                  fullWidth
                  value={item.locationLost}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date Lost"
                  variant="outlined"
                  fullWidth
                  value={formattedDateLost}
                  InputProps={{ readOnly: true }}
                />
              </Grid>

              {/* Stolen information (if marked stolen) */}
              {item.stolen ? (
                <>
                  <Grid item xs={12} sm={6}>
                    <div className={styles.stolenButton}>
                      {item.stolen ? 'This Item was Reported Stolen' : ''}
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Stolen - Reason Given"
                      variant="outlined"
                      fullWidth
                      multiline
                      value={item.stolenDescription}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </>
              ) : (
                <Grid item xs={12} /> /*spacer to prevent formatting issues*/
              )}
              {/* Item Category */}
              <Grid item xs={12} sm={6} className={styles.boxBackground}>
                <FormLabel className={styles.formLabel}>Item Category:</FormLabel>
                <Grid container className={styles.categoryGroup}>
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
                  ].map((category) => (
                    <FormControlLabel
                      key={category}
                      control={
                        <Checkbox
                          checked={item.category === category.toLowerCase().replace(/ /g, '/')}
                          disabled
                        />
                      }
                      label={category}
                      className={styles.categoryItem}
                    />
                  ))}
                </Grid>
              </Grid>
              {/*Color Category*/}
              <Grid item xs={12} sm={6} className={styles.boxBackground}>
                <FormLabel className={styles.formLabel}>Item Color:</FormLabel>
                <Grid container className={styles.checkboxGroup}>
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
                      control={<Checkbox checked={item.colors?.includes(color)} disabled />}
                      label={color}
                    />
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Item Brand or Make"
                  variant="outlined"
                  fullWidth
                  value={item.brand || 'N/A'}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Item Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  value={item.description}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth onClick={handleContact}>
                  Contact Owner
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default MissingItemReportData;
