import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
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
      <Grid container className={styles.container}>
        <Grid item xs={12} sm={11}>
          <Card className={styles.card}>
            <CardHeader
              title={
                <>
                  <Grid container alignItems="center">
                    <Grid item xs={1}>
                      <Button className={styles.backButton} onClick={() => navigate(-1)}>
                        Back
                      </Button>
                    </Grid>
                    <Grid item sm={11} xs={12}>
                      <div>
                        <b>Missing</b> Item Report Details
                      </div>
                    </Grid>
                  </Grid>
                </>
              }
              className={`gc360_header ${styles.title}`}
            />
            <CardContent>
              <Grid container spacing={2} rowGap={1}>
                {/* Left Column Content */}
                <Grid item xs={12} sm={6}>
                  <Grid container rowGap={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Owner's Name"
                        variant="filled"
                        disabled
                        fullWidth
                        value={`${item.firstName} ${item.lastName}`}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    {/* Owner's contact info */}
                    <Grid item xs={12}>
                      <TextField
                        label="Owner's Contact Info"
                        variant="filled"
                        disabled
                        fullWidth
                        multiline
                        minRows={2}
                        value={`Email: ${item.email}\nPhone: ${item.phone}`}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    {/* Item Category */}
                    <Grid item xs={12} className={styles.boxBackground}>
                      <TextField
                        label="Category"
                        variant="filled"
                        disabled
                        fullWidth
                        value={`${item.category}`}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    {/*Color Category*/}
                    <Grid item xs={12} className={styles.boxBackground}>
                      <TextField
                        label="Colors"
                        variant="filled"
                        disabled
                        fullWidth
                        value={`${item.colors}`}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Brand or Make"
                        variant="filled"
                        disabled
                        fullWidth
                        value={item.brand || 'N/A'}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Description of Item"
                        variant="filled"
                        disabled
                        fullWidth
                        multiline
                        minRows={5}
                        value={item.description}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {/* Right Column */}
                <Grid item xs={12} sm={6}>
                  <Grid container rowGap={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Location Lost"
                        variant="filled"
                        disabled
                        fullWidth
                        value={item.locationLost}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Date Lost"
                        variant="filled"
                        disabled
                        fullWidth
                        value={formattedDateLost}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>

                    {/* Stolen information (if marked stolen) */}
                    {item.stolen ? (
                      <>
                        <Grid item xs={12}>
                          <hr />
                        </Grid>
                        <Grid item xs={12}>
                          <div className={styles.stolenButton}>
                            {item.stolen ? 'This Item was Reported Stolen' : ''}
                          </div>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Stolen - Reason Given"
                            variant="filled"
                            disabled
                            fullWidth
                            multiline
                            minRows={4}
                            value={item.stolenDescription}
                            InputProps={{ readOnly: true }}
                          />
                        </Grid>
                      </>
                    ) : (
                      <Grid item xs={12} /> /*spacer to prevent formatting issues*/
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default MissingItemReportData;
