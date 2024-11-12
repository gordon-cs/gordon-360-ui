import { Card, CardContent, CardHeader, Grid, Typography, IconButton, Button } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
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
import { string } from 'prop-types';

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
    navigate('/campussafety/LostAndFound/' + reportId);
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

  const handleExpandClick = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleExpandField = (id: string, field: string) => {
    setExpandedFields((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: !prev[id]?.[field],
      },
    }));
  };

  const renderReportContent = (report: MissingItemReport) => (
    <>
      <Grid item xs={width >= 900 ? 2.5 : 12}>
        <Typography align="center">{formatDate(report.dateLost)}</Typography>
      </Grid>
      <Grid item xs={width >= 900 ? 2.5 : 12}>
        <Typography
          align="center"
          onClick={() => toggleExpandField(report.recordID?.toString() || '', 'location')}
          style={{ cursor: report.locationLost.length > 15 ? 'pointer' : 'default' }}
        >
          {expandedFields[report.recordID?.toString() || '']?.location ||
          report.locationLost.length <= 15
            ? report.locationLost
            : `${report.locationLost.slice(0, 15)}...`}
        </Typography>
      </Grid>
      <Grid item xs={width >= 900 ? 2.5 : 12}>
        <Typography align="center">{report.category}</Typography>
      </Grid>
      {width >= 900 && (
        <Grid item xs={2.5}>
          <Typography
            align="center"
            onClick={() => toggleExpandField(report.recordID?.toString() || '', 'description')}
            style={{ cursor: report.description.length > 20 ? 'pointer' : 'default' }}
          >
            {expandedFields[report.recordID?.toString() || '']?.description ||
            report.description.length <= 20
              ? report.description
              : `${report.description.slice(0, 20)}...`}
          </Typography>
        </Grid>
      )}
    </>
  );
  return (
    <>
      <Header />
      <Grid container justifyContent="center" marginTop={3}>
        <Grid item xs={12} sm={10}>
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
                <Grid item xs={12} sm={0.5}>
                  <InfoOutlinedIcon />
                </Grid>
                <Grid item xs={12} sm={11}>
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
          <Button
            className={styles.reportButton}
            onClick={() => {
              navigate('/campussafety/LostAndFound/missingitemform');
            }}
          >
            Report a Missing Item
          </Button>
        </Grid>
      </Grid>

      {/* Active Missing Item Reports */}
      <Grid container justifyContent="center" spacing={3} marginTop={3}>
        <Grid item xs={12} sm={10}>
          <Card className={styles.card}>
            <CardContent>
              <Typography variant="h5" align="center">
                My Active <span className={styles.missingText}>Missing</span> Item Reports
              </Typography>
              {/* Render header row only on large screens */}
              {width >= 900 && (
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
                    <Typography align="center">Actions</Typography>
                  </Grid>
                </Grid>
              )}
              {/* Active Reports */}
              {activeReports.map((report) => (
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
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeleteClick(report.recordID?.toString() || '')}
                              size="small"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              onClick={() => toggleExpand(report.recordID?.toString() || '')}
                              size="small"
                            >
                              {expanded[report.recordID?.toString() || ''] ? (
                                <ExpandLessIcon />
                              ) : (
                                <ExpandMoreIcon />
                              )}
                            </IconButton>
                          </Grid>
                        </>
                      ) : (
                        // Desktop layout
                        <>
                          {renderReportContent(report)}
                          <Grid item xs={0.5}>
                            <IconButton
                              onClick={() => handleEdit(report.recordID?.toString() || '')}
                              size="small"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Grid>
                          <Grid item xs={0.5}>
                            <IconButton
                              onClick={() => handleDeleteClick(report.recordID?.toString() || '')}
                              size="small"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Grid>
                        </>
                      )}
                    </Grid>
                    {width < 900 && expanded[report.recordID?.toString() || ''] && (
                      <Collapse
                        in={expanded[report.recordID?.toString() || '']}
                        timeout="auto"
                        unmountOnExit
                      >
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
              ))}
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
              {width >= 900 && (
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
              )}
              {/* Past Reports */}
              {pastReports.map((report) => (
                <Card
                  className={`${styles.pastDataRow} ${width < 900 ? styles.mobilePastDataRow : ''}`}
                  key={report.recordID}
                >
                  <CardContent>
                    <Grid container spacing={2} alignItems="center" justifyContent="space-between">
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
                          <Grid item xs={6}>
                            <Typography align="center">{report.status}</Typography>
                          </Grid>
                          <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <IconButton
                              onClick={() => toggleExpand(report.recordID?.toString() || '')}
                              size="small"
                            >
                              {expanded[report.recordID?.toString() || ''] ? (
                                <ExpandLessIcon />
                              ) : (
                                <ExpandMoreIcon />
                              )}
                            </IconButton>
                          </Grid>
                        </>
                      ) : (
                        <>
                          {renderReportContent(report)}
                          <Grid item xs={2}>
                            <Typography align="center">{report.status}</Typography>
                          </Grid>
                        </>
                      )}
                    </Grid>
                    {width < 900 && expanded[report.recordID?.toString() || ''] && (
                      <Collapse
                        in={expanded[report.recordID?.toString() || '']}
                        timeout="auto"
                        unmountOnExit
                      >
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
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default LostAndFound;
