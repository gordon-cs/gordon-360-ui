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
} from '@mui/material';
import styles from './MissingItemReportData.module.scss';
import { useEffect, useState } from 'react';
import lostAndFoundService from 'services/lostAndFound';
import type { MissingItemReport } from 'services/lostAndFound';
import { DateTime } from 'luxon';

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

  return (
    <div className={styles.container}>
      <Button className={styles.backButton} onClick={() => navigate(-1)}>
        Back to All Reports
      </Button>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h4" className={styles.title}>
            Missing <span className={styles.highlight}>Item Report</span>
          </Typography>
          <Grid container spacing={2}>
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
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="error"
                className={styles.stolenButton}
                fullWidth
                disabled
              >
                {item.stolen ? 'This Item was Reported Stolen' : ''}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Stolen Details"
                variant="outlined"
                fullWidth
                multiline
                value={item.stolenDescription || 'N/A'}
                InputProps={{ readOnly: true }}
              />
            </Grid>

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
              <FormLabel className={styles.formLabel}>
                Item Color: Choose <u>ALL</u> that apply
              </FormLabel>
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
                    control={<Checkbox checked={item.colors?.includes(color) || false} disabled />}
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
              <Button variant="contained" color="primary" fullWidth>
                Contact Owner
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default MissingItemReportData;
