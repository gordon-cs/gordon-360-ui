import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import lostAndFoundService from 'services/lostAndFound';
import styles from '../../../../views/CampusSafety/views/LostAndFound/LostAndFound.module.css'; // Import the external CSS
import { MissingItemReport } from 'services/lostAndFound'; // Import the type from the service
import { DateTime } from 'luxon';
import { useWindowSize } from 'hooks';

const formatDate = (date: string) => {
  return DateTime.fromISO(date).toFormat('MM-dd-yyyy'); // Adjust format as needed
};

const LostAndFoundCard = () => {
  const [activeReports, setActiveReports] = useState<MissingItemReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [width] = useWindowSize();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMissingItems = async () => {
      try {
        setLoading(true);
        const reports: MissingItemReport[] = await lostAndFoundService.getMissingItemReportUser();

        // Map the reports into active and past reports
        const active = reports
          .filter((report) => report.status === 'active') // Filter for non-found items
          .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
          .map((report) => ({
            ...report,
            colors: report.colors || [], // Ensure colors is an array
          }));

        setActiveReports(active);
      } catch (error) {
        console.error('Error fetching missing items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMissingItems();
  });

  const renderReportContent = (report: MissingItemReport) => (
    <>
      <Grid item xs={width >= 900 ? 4 : 12}>
        <Typography align="center">{formatDate(report.dateLost)}</Typography>
      </Grid>
      <Grid item xs={width >= 900 ? 4 : 12}>
        <Typography
          align="center"
          style={{ cursor: report.locationLost.length > 15 ? 'pointer' : 'default' }}
        >
          {report.locationLost.length <= 15
            ? report.locationLost
            : `${report.locationLost.slice(0, 15)}...`}
        </Typography>
      </Grid>
      <Grid item xs={width >= 900 ? 4 : 12}>
        <Typography align="center">{report.category}</Typography>
      </Grid>
    </>
  );

  return (
    <Card>
      <CardHeader
        title={
          <Grid container direction="row">
            <Grid item xs={7}>
              Lost and Found
            </Grid>
            <Grid item xs={5}>
              <Button variant="contained" color="secondary" component={Link} to="/LostAndFound">
                Lost and Found Page
              </Button>
            </Grid>
          </Grid>
        }
        className="gc360_header"
      />
      <CardContent>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs={5}>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/LostAndFound/missingitemform"
            >
              Report Lost Item
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button variant="contained" color="secondary" component={Link} to="/LostAndFound">
              Report Found Item
            </Button>
          </Grid>
        </Grid>
        {width >= 900 && (
          <Grid container spacing={2} className={styles.headerRow}>
            <Grid item xs={4}>
              <Typography align="center">Date Lost</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography align="center">Location Lost</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography align="center">Description</Typography>
            </Grid>
          </Grid>
        )}
        {activeReports.map((report) => (
          <Link to="/lostandfound">
            <Card
              className={`${styles.dataRow} ${width < 900 ? styles.mobileDataRow : ''}`}
              key={report.recordID}
            >
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  {width < 900 ? (
                    <>
                      {/* Display two items per row on mobile */}
                      <Grid item xs={3}>
                        <Typography align="center">{formatDate(report.dateLost)}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography align="center">
                          {report.locationLost.length > 15
                            ? report.locationLost.slice(0, 15) + '...'
                            : report.locationLost}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography align="center">{report.category}</Typography>
                      </Grid>
                    </>
                  ) : (
                    // Desktop layout
                    <>{renderReportContent(report)}</>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};
export default LostAndFoundCard;
