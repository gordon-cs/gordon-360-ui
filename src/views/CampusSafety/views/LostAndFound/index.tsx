import { Card, CardContent, CardHeader, Grid, Typography, IconButton, Button } from '@mui/material';
import {
  InfoOutlined,
  Edit,
  Delete,
  ExpandMore,
  ExpandLess,
  NotListedLocation,
  WhereToVote,
} from '@mui/icons-material';
import { Collapse } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Header from '../../components/Header';
import styles from './LostAndFound.module.css'; // Import the external CSS
import lostAndFoundService from 'services/lostAndFound';
import { MissingItemReport } from 'services/lostAndFound'; // Import the type from the service
import DeleteConfirmationModal from './components/DeleteConfirmation';
import { DateTime } from 'luxon';
import { useWindowSize } from 'hooks';

const formatDate = (date: string) => {
  return DateTime.fromISO(date).toFormat('MM-dd-yyyy'); // Adjust format as needed
};

const LostAndFound = () => {
  const [activeReports, setActiveReports] = useState<MissingItemReport[]>([]);
  const [pastReports, setPastReports] = useState<MissingItemReport[]>([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [width] = useWindowSize();
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [expandedFields, setExpandedFields] = useState<{
    [id: string]: { [field: string]: boolean };
  }>({});
  const [pageUpdates, setPageUpdates] = useState(0);
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

        const past = reports
          .filter((report) => report.status !== 'active') // Filter for found items
          .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
          .map((report) => ({
            ...report,
            colors: report.colors || [], // Ensure colors is an array
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
  }, [pageUpdates]);

  const handleChange = () => {
    setDeleteModalOpen(true);
  };

  const handleEdit = (reportId: string) => {
    navigate('/lostandfound/' + reportId);
  };

  const handleDeleteClick = (reportId: string) => {
    setReportToDelete(reportId);
    setDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setDeleteModalOpen(false);
    setReportToDelete(null);
  };

  const handleModalSubmit = async () => {
    try {
      //const reportIdNum = parseInt(handleDeleteClick(reportToDelete));

      await lostAndFoundService.updateReportStatus(parseInt(reportToDelete || ''), 'deleted');
      setPageUpdates(pageUpdates + 1);
      setDeleteModalOpen(false);
      setReportToDelete(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  /*
   *
   * Helper Components
   */

  // The title card at the top of the page
  const titleCard = () => (
    <Grid container justifyContent="center" marginTop={3}>
      <Grid item xs={12} md={10}>
        <Card className={styles.card}>
          <CardHeader
            className={styles.title}
            title={
              <Typography variant="h4" align="center">
                <span className={styles.gordonText}>Gordon</span> Lost and Found
              </Typography>
            }
          />
          <CardContent>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={11}>
                <div className={styles.infoBox}>
                  <InfoOutlined />
                  <Grid container item rowGap={1}>
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        Gordon Police manages campus Lost & Found
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Police staff will view reports, and you will be notified if your item is
                        found.
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
                {/* Button to Report a Missing Item */}
                <Grid
                  container
                  justifyContent="center"
                  marginTop={0.5}
                  columnSpacing={5}
                  rowSpacing={3}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        navigate('/lostandfound/missingitemform');
                      }}
                    >
                      <NotListedLocation />
                      <Typography>
                        Report a{' '}
                        <b>
                          <u>Lost</u>
                        </b>{' '}
                        Item
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        navigate('/lostandfound/reportFound');
                      }}
                    >
                      <WhereToVote />
                      <Typography>
                        Report a{' '}
                        <b>
                          <u>Found</u>
                        </b>{' '}
                        Item
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  // The row labelling the column names for the report grid
  const reportHeader = () => (
    <Card>
      <CardHeader
        className="gc360_header"
        title={
          <Grid container>
            <Grid item xs={2}>
              <Typography>Date Lost</Typography>
            </Grid>
            <Grid item xs={2.5}>
              <Typography>Location</Typography>
            </Grid>
            <Grid item xs={2.5}>
              <Typography>Category</Typography>
            </Grid>
            <Grid item xs={2.5}>
              <Typography>Description</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>Actions</Typography>
            </Grid>
          </Grid>
        }
      />
    </Card>
  );

  // Component defining each row of the report grid
  const reportRow = (report: MissingItemReport) => (
    <Card
      className={`${styles.dataRow} ${width < 900 ? styles.mobileDataRow : ''}`}
      key={report.recordID}
    >
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {width < 900 ? (
            <>
              {/* Display two items per row on mobile */}
              <Grid item xs={6}>
                <Typography align="center">{formatDate(report.dateLost)}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="center">
                  {report.locationLost.length > 15
                    ? report.locationLost.slice(0, 15) + '...'
                    : report.locationLost}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="center">{report.category}</Typography>
              </Grid>
              <Grid item xs={6} className={styles.actionsRow}>
                <IconButton
                  onClick={() => handleEdit(report.recordID?.toString() || '')}
                  size="small"
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteClick(report.recordID?.toString() || '')}
                  size="small"
                >
                  <Delete fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => toggleExpand(report.recordID?.toString() || '')}
                  size="small"
                >
                  {expanded[report.recordID?.toString() || ''] ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Grid>
            </>
          ) : (
            // Desktop layout
            <>
              <Grid item xs={2}>
                <div className={styles.dataCell}>{formatDate(report.dateLost)}</div>
              </Grid>
              <Grid item xs={2.5}>
                <div className={styles.dataCell}>{report.locationLost}</div>
              </Grid>
              <Grid item xs={2.5}>
                <div className={styles.dataCell}>{report.category}</div>
              </Grid>
              <Grid item xs={2.5}>
                <div className={styles.dataCell}>{report.description}</div>
              </Grid>
              <Grid item xs={0.5}>
                <IconButton
                  onClick={() => handleEdit(report.recordID?.toString() || '')}
                  size="small"
                >
                  <Edit fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item xs={0.5}>
                <IconButton
                  onClick={() => handleDeleteClick(report.recordID?.toString() || '')}
                  size="small"
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Grid>
            </>
          )}
        </Grid>
        {width < 900 && expanded[report.recordID?.toString() || ''] && (
          <Collapse in={expanded[report.recordID?.toString() || '']} timeout="auto" unmountOnExit>
            <Grid container spacing={1} marginTop={1}>
              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  <strong>Full Location:</strong> {report.locationLost}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  <strong>Description:</strong> {report.description}
                </Typography>
              </Grid>
            </Grid>
          </Collapse>
        )}
      </CardContent>
    </Card>
  );

  // Main component to render
  return (
    <>
      <Header />

      {titleCard()}

      {/* Active Missing Item Reports */}
      <Grid container justifyContent="center" spacing={3} marginTop={3}>
        <Grid item xs={12} sm={10}>
          <Card>
            <CardContent>
              <Typography variant="h5" align="center">
                My Active <span className={styles.missingText}>Lost</span> Item Reports
              </Typography>
              {/* Render header row only on large screens */}
              {width >= 900 && reportHeader()}
              {/* Active Reports */}
              {activeReports.map((report) => reportRow(report))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />

      {/* Past Missing Item Reports */}
      <Grid container justifyContent="center" spacing={3} marginTop={3}>
        <Grid item xs={12} sm={10}>
          <Card className={styles.card}>
            <CardContent>
              <Typography variant="h5" align="center">
                My <span className={styles.missingText}>Past</span> Reports
              </Typography>
              {/* Render header row only on large screens */}
              {width >= 900 && reportHeader()}
              {/* Past Reports */}
              {pastReports.map((report) => reportRow(report))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default LostAndFound;
