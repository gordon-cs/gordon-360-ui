import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import styles from './MissingItemList.module.css';
import Header from 'views/CampusSafety/components/Header';
import { useEffect, useState } from 'react';
import lostAndFoundService, { MissingItemReport } from 'services/lostAndFound';
import GordonLoader from 'components/Loader';

const MissingItemList = () => {
  const [loading, setLoading] = useState(true);
  const [activeReports, setActiveReports] = useState<MissingItemReport[]>([]);

  useEffect(() => {
    const fetchMissingItems = async () => {
      try {
        setLoading(true);
        const reports: MissingItemReport[] = await lostAndFoundService.getMissingItemReports();

        // Map the reports into active and past reports
        const active = reports
          .filter((report) => report.status === 'active') // Filter for non-found items
          .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
          //Order by date created, descending
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
        setActiveReports(active);
      } catch (error) {
        console.error('Error fetching missing items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMissingItems();
  }, []);

  const GridWidths = [1.5, 2, 2, 1.5, 3, 2];

  return (
    <>
      <Header />
      <Grid container justifyContent={'center'} rowSpacing={3}>
        <Grid item xs={11}>
          <Card>
            <CardHeader
              title="Filters:"
              className={`${styles.cardHeader} ${styles.filterBar}`}
            ></CardHeader>
            <CardContent>
              <Typography>PLACEHOLDER</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={11}>
          <Card>
            <CardHeader
              title={<div className={styles.title}>Missing Item Reports</div>}
              className={styles.cardHeader}
            ></CardHeader>
          </Card>
        </Grid>
        <Grid item xs={11}>
          <Card>
            <CardHeader
              title={
                <div className={styles.columnNames}>
                  <Grid container>
                    <Grid item xs={GridWidths[0]}>
                      Date Lost
                    </Grid>
                    <Grid item xs={GridWidths[1]}>
                      Owner's Name
                    </Grid>
                    <Grid item xs={GridWidths[2]}>
                      Location
                    </Grid>
                    <Grid item xs={GridWidths[3]}>
                      Category
                    </Grid>
                    <Grid item xs={GridWidths[4]}>
                      Description
                    </Grid>
                    <Grid item xs={GridWidths[5]}>
                      Last Checked
                    </Grid>
                  </Grid>
                </div>
              }
              className={styles.cardHeader}
            ></CardHeader>
            <CardContent className={styles.reportList}>
              <Grid container>
                {loading ? (
                  <GordonLoader />
                ) : (
                  activeReports.map((report) => (
                    <Grid container className={styles.reportRows} alignItems={'center'}>
                      <Grid item xs={GridWidths[0]}>
                        {report.dateLost}
                      </Grid>
                      <Grid item xs={GridWidths[1]}>
                        {report.firstName + ' ' + report.lastName}
                      </Grid>
                      <Grid item xs={GridWidths[2]}>
                        {report.locationLost}
                      </Grid>
                      <Grid item xs={GridWidths[3]}>
                        {report.category}
                      </Grid>
                      <Grid item xs={GridWidths[4]}>
                        {report.brand + ' | ' + report.description}
                      </Grid>
                      <Grid item xs={GridWidths[5]}>
                        Placeholder
                      </Grid>
                    </Grid>
                  ))
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default MissingItemList;
