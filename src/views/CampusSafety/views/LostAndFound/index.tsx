import { Card, CardContent, CardHeader, Grid, Typography, IconButton, Button } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import styles from './LostAndFound.module.css'; // Import the external CSS
import { useTheme } from '@mui/material/styles'; // Access theme if needed
import lostAndFoundService from 'services/lostAndFound';
//import lostAndFoundService from '../../services/lostAndFoundService'; // Assuming this is your service
import { MissingItemReport } from 'services/lostAndFound'; // Import the type from the service
import { DateTime } from 'luxon';

const formatDate = (date: string) => {
  return DateTime.fromISO(date).toFormat('yyyy-MM-dd'); // Adjust format as needed
};
const LostAndFound = () => {
  const [activeReports, setActiveReports] = useState<MissingItemReport[]>([]);
  const [pastReports, setPastReports] = useState<MissingItemReport[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme(); // Access theme if needed

  useEffect(() => {
    const fetchMissingItems = async () => {
      try {
        setLoading(true);
        const reports: MissingItemReport[] = await lostAndFoundService.getMissingItemReports();

        // Map the reports into active and past reports
        const active = reports
          .filter((report) => report.status !== 'found') // Filter for non-found items
          .map((report) => ({
            recordID: report.recordID,
            firstName: report.firstName,
            lastName: report.lastName,
            category: report.category,
            colors: report.colors || [],
            brand: report.brand,
            description: report.description,
            locationLost: report.locationLost,
            stolen: report.stolen,
            stolenDescription: report.stolenDescription,
            dateLost: report.dateLost,
            dateCreated: report.dateCreated,
            phoneNumber: report.phoneNumber,
            altPhone: report.altPhone,
            emailAddr: report.emailAddr,
            status: report.status,
            adminUsername: report.adminUsername,
          }));

        const past = reports
          .filter((report) => report.status === 'found') // Filter for found items
          .map((report) => ({
            recordID: report.recordID,
            firstName: report.firstName,
            lastName: report.lastName,
            category: report.category,
            colors: report.colors || [],
            brand: report.brand,
            description: report.description,
            locationLost: report.locationLost,
            stolen: report.stolen,
            stolenDescription: report.stolenDescription,
            dateLost: report.dateLost, // Assuming dateLost is a DateTime from Luxon
            dateCreated: report.dateCreated,
            phoneNumber: report.phoneNumber,
            altPhone: report.altPhone,
            emailAddr: report.emailAddr,
            status: report.status,
            adminUsername: report.adminUsername,
          }));

        setActiveReports(active);
        setPastReports(past);
      } catch (error) {
        console.error('Error fetching missing items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMissingItems();
  }, []);

  const handleEdit = (reportId: string) => {
    console.log(`Editing report: ${reportId}`);
  };

  const handleDelete = (reportId: string) => {
    console.log(`Deleting report: ${reportId}`);
  };

  return (
    <>
      <Header />

      <Grid container justifyContent="center" marginTop={3}>
        <Grid item sm={10}>
          <Card className={styles.card}>
            <CardHeader
              className={styles.title}
              title={
                <Typography variant="h4" align="center">
                  <span style={{ color: theme.palette.warning.main }}>Gordon</span> Lost and Found
                </Typography>
              }
            />
            <CardContent>
              <Grid container>
                <Grid item sm={0.5}>
                  <InfoOutlinedIcon />
                </Grid>
                <Grid item sm={10}>
                  <Typography variant="h5" align="center">
                    Gordon Police manages campus lost & found
                  </Typography>
                  <br />
                  <Typography variant="body1" align="center">
                    Police staff will view reports, and you will be notified if your item is found.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Button to Report a Missing Item */}
      <Grid container justifyContent="center" marginTop={3}>
        <Grid item>
          <Button className={styles.reportButton} href="/campussafety/missingitemform">
            Report a Missing Item
          </Button>
        </Grid>
      </Grid>

      {/* My Active Missing Item Reports Section */}
      <Grid container justifyContent="center" spacing={3} marginTop={3}>
        <Grid item xs={12} sm={10}>
          <Card className={styles.card}>
            <CardContent>
              <Typography variant="h5" align="center">
                My Active <span style={{ color: theme.palette.warning.main }}>Missing</span> Item
                Reports
              </Typography>

              {/* Table Header */}
              <Grid container spacing={2} className={styles.headerRow}>
                <Grid item xs={2.5}>
                  <Typography align="center">Date Lost</Typography>
                </Grid>
                <Grid item xs={2.5}>
                  <Typography align="center">Location</Typography>
                </Grid>
                <Grid item xs={2.5}>
                  <Typography align="center">Category</Typography>
                </Grid>
                <Grid item xs={2.5}>
                  <Typography align="center">Description</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography align="center">Actions</Typography>
                </Grid>
              </Grid>

              {/* Data Rows */}
              <Grid container spacing={2} marginTop={2}>
                {activeReports.map((report) => (
                  <Grid item xs={12} key={report.recordID}>
                    <Card className={styles.dataRow}>
                      <CardContent>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={2.5}>
                            <Typography align="center">{formatDate(report.dateLost)}</Typography>
                          </Grid>
                          <Grid item xs={2.5}>
                            <Typography align="center">{report.locationLost}</Typography>
                          </Grid>
                          <Grid item xs={2.5}>
                            <Typography align="center">{report.category}</Typography>
                          </Grid>
                          <Grid item xs={2.5}>
                            <Typography align="center">{report.description}</Typography>
                          </Grid>

                          {/* Icons */}
                          <Grid item xs={0.5} className={styles.buttonLeft}>
                            <IconButton
                              onClick={() => handleEdit(report.recordID?.toString() || '')}
                              size="small"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Grid>
                          <Grid item xs={0.5} className={styles.buttonRight}>
                            <IconButton
                              onClick={() => handleDelete(report.recordID?.toString() || '')}
                              size="small"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* My Past Reports Section */}
      <Grid container justifyContent="center" spacing={3} marginTop={3}>
        <Grid item xs={12} sm={10}>
          <Card className={styles.card}>
            <CardContent>
              <Typography variant="h5" align="center">
                My Past Reports
              </Typography>
              <Grid container spacing={2} className={styles.headerRow}>
                <Grid item xs={2.5}>
                  <Typography align="center">Date Lost</Typography>
                </Grid>
                <Grid item xs={2.5}>
                  <Typography align="center">Location</Typography>
                </Grid>
                <Grid item xs={2.5}>
                  <Typography align="center">Category</Typography>
                </Grid>
                <Grid item xs={2.5}>
                  <Typography align="center">Description</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center">Status</Typography>
                </Grid>
              </Grid>

              {/* Data Rows */}
              <Grid container spacing={2} marginTop={2}>
                {pastReports.map((report) => (
                  <Grid item xs={12} key={report.recordID}>
                    <Card className={styles.dataRow}>
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={2.5}>
                            <Typography align="center">{report.dateLost}</Typography>
                          </Grid>
                          <Grid item xs={2.5}>
                            <Typography align="center">{report.locationLost}</Typography>
                          </Grid>
                          <Grid item xs={2.5}>
                            <Typography align="center">{report.category}</Typography>
                          </Grid>
                          <Grid item xs={2.5}>
                            <Typography align="center">{report.description}</Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography align="center">{report.status}</Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default LostAndFound;
