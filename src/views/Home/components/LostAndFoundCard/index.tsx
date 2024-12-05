import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import lostAndFoundService from 'services/lostAndFound';
import styles from '../../../../views/CampusSafety/views/LostAndFound/LostAndFound.module.css'; // Import the external CSS
import customStyles from './LostAndFoundCard.module.scss';
import { MissingItemReport } from 'services/lostAndFound'; // Import the type from the service
import { DateTime } from 'luxon';
import { Launch, NotListedLocation, WhereToVote } from '@mui/icons-material';
import GordonLoader from 'components/Loader';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';

const formatDate = (date: string) => {
  return DateTime.fromISO(date).toFormat('MM/dd/yy'); // Adjust format as needed
};

const noReports = (
  <Grid item alignItems="center">
    <br />
    <Typography variant="body1" align="center">
      No active lost item reports.{' '}
      <Link to="/lostandfound/missingitemreport" className="gc360_text_link">
        Report a lost item <Launch />
      </Link>
    </Typography>
    <br />
  </Grid>
);

const LostAndFoundCard = () => {
  const [activeReports, setActiveReports] = useState<MissingItemReport[] | null>(null);
  const [foundReports, setFoundReports] = useState<MissingItemReport[] | null>(null); // Separate state for found items
  const [countNotIncluded, setCountNotIncluded] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:375px)');

  const numReportsToDisplay = 4;

  useEffect(() => {
    const fetchMissingItems = async () => {
      try {
        setLoading(true);
        const reports: MissingItemReport[] = await lostAndFoundService.getMissingItemReportUser();

        // Map the reports into active and past reports
        const active = reports
          .filter((report) => report.status === 'active') // Active
          .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
          .map((report) => ({
            ...report,
            colors: report.colors || [], // Ensure colors is an array
          }));
        // For Found reports
        const found = reports
          .filter((report) => report.status.toLowerCase() === 'found') // Found
          .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
          .map((report) => ({
            ...report,
            colors: report.colors || [],
          }));

        // Trim reports down to 3 reports
        if (active.length > numReportsToDisplay) {
          setCountNotIncluded(active.length - numReportsToDisplay);
          setActiveReports(active.slice(0, numReportsToDisplay));
        } else {
          setCountNotIncluded(0);
          setActiveReports(active);
        }
        setFoundReports(found);
      } catch (error) {
        console.error('Error fetching missing items:', error);
        setActiveReports([]);
        setFoundReports([]);
      } finally {
        setLoading(false);
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
            <div className={styles.dataCell}>{formatDate(report.dateLost)}</div>
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
    <Card>
      <CardHeader
        title={
          <Grid container direction="row">
            <Grid item xs={7}>
              Lost and Found
            </Grid>
            <Grid container direction="row" justifyContent={'flex-end'} item xs={5}>
              <Launch color="secondary" />
            </Grid>
          </Grid>
        }
        onClick={() => {
          navigate('/lostandfound');
        }}
        className={`gc360_header ${customStyles.linkHeader}`}
      />
      <CardContent>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/lostandfound/missingitemform"
            >
              {' '}
              <NotListedLocation />
              Report Lost
            </Button>
          </Grid>
          <Grid container item xs={6} direction="row" justifyContent={'flex-end'}>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/lostandfound/reportfound"
            >
              <WhereToVote />
              Report Found
            </Button>
          </Grid>
        </Grid>
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
        <Card>
          <CardHeader title="My Reports" />
        </Card>
        {loading || activeReports === null ? (
          <GordonLoader />
        ) : (
          <>
            {activeReports?.length < 1 ? noReports : reportHeader()}
            {activeReports.map((report) => reportRow(report))}
            {countNotIncluded > 0 ? (
              <>
                <Card>
                  <CardContent>
                    <Typography>
                      {countNotIncluded} more report{countNotIncluded > 1 ? 's' : null} not shown{' '}
                      <Link to="/lostandfound" className="gc360_text_link">
                        View All <Launch />
                      </Link>
                    </Typography>
                  </CardContent>
                </Card>
              </>
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default LostAndFoundCard;
