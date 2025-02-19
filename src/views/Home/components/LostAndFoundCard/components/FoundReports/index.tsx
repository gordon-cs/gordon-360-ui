import { Card, CardContent, CardHeader, Grid, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import lostAndFoundService from 'services/lostAndFound';
import styles from '../../../../../../views/CampusSafety/views/LostAndFound/LostAndFound.module.css';
import { MissingItemReport } from 'services/lostAndFound';
import Badge from '@mui/material/Badge';
import GordonSnackbar from 'components/Snackbar';
import { useUser } from 'hooks';
import { formatDateString } from 'views/CampusSafety/components/Helpers';

const FoundReports = () => {
  const [foundReports, setFoundReports] = useState<MissingItemReport[] | null>(null);
  const [snackbar, setSnackbar] = useState({ message: '', severity: undefined, open: false });
  const user = useUser();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:375px)');

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  useEffect(() => {
    const fetchMissingItems = async () => {
      try {
        const reports: MissingItemReport[] = await lostAndFoundService.getMissingItemReportUser(
          user.profile?.AD_Username || '',
        );

        // For Found reports
        const found = reports
          .filter((report) => report.status.toLowerCase() === 'found') // Found
          .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
          .map((report) => ({
            ...report,
            colors: report.colors || [],
          }));

        setFoundReports(found);
      } catch (error) {
        console.error('Error fetching missing items:', error);
        createSnackbar(`Error fetching missing items.`, `error`);
        setFoundReports([]);
      }
    };
    fetchMissingItems();
  }, []);

  // The row labelling the column names for the report grid
  const reportHeader = () => (
    <Card>
      <CardHeader
        className={`gc360_header ${styles.headerPadding}`}
        title={
          <Grid container className={styles.headerText}>
            <Grid item xs={5} sm={4}>
              <Typography>Date Lost</Typography>
            </Grid>
            {!isMobile ? (
              <Grid item xs={4}>
                <Typography>Location</Typography>
              </Grid>
            ) : null}
            <Grid item xs={3} sm={4}>
              <Typography>Category</Typography>
            </Grid>
          </Grid>
        }
      />
    </Card>
  );

  // Component defining each row of the report grid
  const reportRow = (report: MissingItemReport, isFoundSection: boolean = false) => (
    <Card
      className={`${isFoundSection && report.status.toLowerCase() === 'found' ? styles.dataFoundRow : styles.dataRow} ${
        styles.clickableRow
      }`}
      onClick={() => {
        // Navigate to the edit page for found items
        if (isFoundSection && report.status.toLowerCase() === 'found') {
          navigate(`/lostandfound/${report.recordID}`);
        }
      }}
    >
      <CardContent
        className={styles.dataContent}
        sx={{
          '&:last-child': {
            paddingBottom: '0px', // Remove the bottom padding on the row card
          },
        }}
        onClick={() => {
          navigate('/lostandfound');
        }}
      >
        <Grid container>
          <Grid item xs={5} sm={4} className={styles.alignData}>
            <div className={styles.dataCell}>{formatDateString(report.dateLost)}</div>
          </Grid>
          {!isMobile ? (
            <Grid item xs={4} className={styles.alignData}>
              <div className={styles.dataCell}>{report.locationLost}</div>
            </Grid>
          ) : null}
          <Grid item xs={3} sm={4} className={styles.alignData}>
            <div>{report.category}</div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <>
      {foundReports && foundReports.length > 0 && (
        <>
          <Card>
            <CardHeader
              title={
                <Grid container alignItems="center" position="relative">
                  {/* Badge positioned on the top-left corner */}
                  <Badge
                    badgeContent={foundReports.length}
                    color="error"
                    overlap="circular"
                    showZero={false}
                    sx={{
                      position: 'absolute',
                      top: '15px',
                      left: '160px',
                    }}
                  />
                  <Grid item xs={12}>
                    <Typography variant="h6">Recently Found</Typography>
                  </Grid>
                </Grid>
              }
            />
          </Card>
          {reportHeader()}
          {foundReports.map((report) => reportRow(report, true))}
          {/* Conditional message under the "Found" items */}
          <Grid item xs={12} style={{ marginTop: '0.3rem' }}>
            <Typography variant="inherit" align="center" color="var(--mui-palette-success-main)">
              Check your email for an update on your item(s).
            </Typography>
          </Grid>
        </>
      )}
      <GordonSnackbar
        open={snackbar.open}
        text={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </>
  );
};

export default FoundReports;
