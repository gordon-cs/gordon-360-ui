import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  IconButton,
  Button,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import {
  InfoOutlined,
  Edit,
  NotListedLocation,
  WhereToVote,
  DeleteForeverOutlined,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Header from '../../components/Header';
import styles from './LostAndFound.module.css'; // Import the external CSS
import lostAndFoundService from 'services/lostAndFound';
import { MissingItemReport } from 'services/lostAndFound'; // Import the type from the service
import DeleteConfirmationModal from './components/DeleteConfirmation';
import { DateTime } from 'luxon';
import { useWindowSize } from 'hooks';
import userService from 'services/user';

const formatDate = (date: string) => {
  return DateTime.fromISO(date).toFormat('MM-dd-yyyy'); // Adjust format as needed
};

const LostAndFound = () => {
  const [activeReports, setActiveReports] = useState<MissingItemReport[]>([]);
  const [pastReports, setPastReports] = useState<MissingItemReport[]>([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageUpdates, setPageUpdates] = useState(0);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:900px)');
  const [newActionFormData] = useState({ action: '', actionNote: '' });
  const [user, setUser] = useState({ AD_Username: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      const userInfo = await userService.getProfileInfo();
      setUser({
        AD_Username: userInfo?.AD_Username || '',
      });
    };
    fetchUserData();
  }, []);

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

  // Move to the edit page
  const handleEdit = (reportId: string) => {
    navigate('/lostandfound/' + reportId);
  };

  // Given the report that was clicked on, open the delete modal for that report.
  const handleDeleteClick = (reportId: string) => {
    setReportToDelete(reportId);
    setDeleteModalOpen(true);
  };

  // Close and cancel the delete modal
  const handleModalClose = () => {
    setDeleteModalOpen(false);
    setReportToDelete(null);
  };

  // Call the API to mark the report as deleted if the user selects it.
  const handleModalSubmit = async () => {
    try {
      await lostAndFoundService.updateReportStatus(parseInt(reportToDelete || ''), 'deleted');
      let actionRequestData = {
        ...newActionFormData,
        missingID: reportToDelete,
        actionDate: DateTime.now().toISO(),
        username: user.AD_Username,
        isPublic: true,
        action: 'Deleted',
      };
      // @ts-ignore
      await lostAndFoundService.createAdminAction(
        parseInt(reportToDelete || ''),
        actionRequestData,
      );
      setPageUpdates(pageUpdates + 1);
      setDeleteModalOpen(false);
      setReportToDelete(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
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
            className="gc360_header"
            title={
              <Typography variant="h4" align="center">
                <span className={styles.yellowText}>Gordon</span> Lost and Found
              </Typography>
            }
          />
          <CardContent>
            <Grid container alignItems="center">
              <div className={styles.disclaimer}>
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
                      navigate('/lostandfound/reportfound');
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
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  // The row labelling the column names for the report grid
  const reportHeader = (actions: boolean = true) => (
    <Card>
      <CardHeader
        className={`gc360_header ${styles.headerPadding}`}
        title={
          <Grid container className={styles.headerText}>
            {isMobile ? (
              <Grid item xs={10.5} />
            ) : (
              <>
                <Grid item xs={2}>
                  <Typography>Date Lost</Typography>
                </Grid>
                <Grid item xs={2.5}>
                  <Typography>Location</Typography>
                </Grid>
                <Grid item xs={2.5}>
                  <Typography>Category</Typography>
                </Grid>
                <Grid item xs={3.5}>
                  <Typography>Description</Typography>
                </Grid>
              </>
            )}
            {actions ? (
              <Grid container item xs={1.5} justifyContent="flex-end">
                <Typography>Actions</Typography>
              </Grid>
            ) : null}
          </Grid>
        }
      />
    </Card>
  );

  // Component defining each row of the report grid
  const reportRow = (report: MissingItemReport) => (
    <Card
      className={`${styles.dataRow} ${
        report.status.toLowerCase() === 'active' ? styles.clickableRow : ''
      }`}
    >
      <Tooltip title="Click to view and edit">
        <CardContent
          className={styles.dataContent}
          sx={{
            '&:last-child': {
              paddingBottom: '0px', // Remove the bottom padding on the row card
            },
          }}
        >
          {isMobile ? (
            <>
              {/* Mobile View */}
              <Grid container>
                <Grid
                  container
                  item
                  xs={11.5}
                  columnGap={1}
                  onClick={
                    report.status.toLowerCase() === 'active'
                      ? () => handleEdit(report.recordID?.toString() || '')
                      : () => {}
                  }
                >
                  <Grid item xs={5.5} sm={5.5} className={styles.alignData}>
                    <b>Date Lost:</b> <div>{formatDate(report.dateLost)}</div>
                  </Grid>
                  <Grid item xs={5.5} sm={5.5} className={styles.alignData}>
                    <b>Category:</b>
                    <div className={styles.wrapText}>{report.category}</div>
                  </Grid>
                  <Grid item xs={12} sm={5.5} className={styles.alignData}>
                    <b>Location:</b>
                    <div className={styles.dataCell}>{report.locationLost}</div>
                  </Grid>

                  <Grid item xs={12} sm={5.5} className={styles.alignData}>
                    <b>Description:</b>
                    <div className={styles.dataCell}>{report.description}</div>
                  </Grid>
                </Grid>
                {report.status.toLowerCase() === 'active' ? (
                  <>
                    <Grid container item xs={0.5} justifyContent="flex-end">
                      <Grid item xs={12} className={styles.alignData}>
                        <IconButton
                          onClick={() => handleEdit(report.recordID?.toString() || '')}
                          size="small"
                        >
                          <Edit />
                        </IconButton>
                      </Grid>
                      <Grid item xs={12} className={styles.alignData}>
                        <IconButton
                          onClick={() => handleDeleteClick(report.recordID?.toString() || '')}
                          size="small"
                        >
                          <DeleteForeverOutlined color="error" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </>
                ) : null}{' '}
              </Grid>
            </>
          ) : (
            /*Desktop View*/
            <Grid container>
              <Grid
                container
                item
                xs={11.5}
                className={styles.rowPadding}
                onClick={
                  report.status.toLowerCase() === 'active'
                    ? () => handleEdit(report.recordID?.toString() || '')
                    : () => {}
                }
              >
                <Grid item xs={2.1} className={styles.alignData}>
                  <div className={styles.dataCell}>{formatDate(report.dateLost)}</div>
                </Grid>
                <Grid item xs={2.6} className={styles.alignData}>
                  <div className={styles.dataCell}>{report.locationLost}</div>
                </Grid>
                <Grid item xs={2.6} className={styles.alignData}>
                  <div className={styles.dataCell}>{report.category}</div>
                </Grid>
                <Grid item xs={4.5} className={styles.alignData}>
                  <div className={styles.dataCell}>{report.description}</div>
                </Grid>
              </Grid>
              {report.status.toLowerCase() === 'active' ? (
                <>
                  <Grid container item xs={0.5} justifyContent="flex-end" columnGap={1}>
                    <Grid item xs={4} className={styles.alignData}>
                      <IconButton
                        onClick={() => handleEdit(report.recordID?.toString() || '')}
                        size="small"
                      >
                        <Edit />
                      </IconButton>
                    </Grid>
                    <Grid item xs={4} className={styles.alignData}>
                      <IconButton
                        onClick={() => handleDeleteClick(report.recordID?.toString() || '')}
                        size="small"
                      >
                        <DeleteForeverOutlined color="error" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </>
              ) : null}
            </Grid>
          )}
        </CardContent>
      </Tooltip>
    </Card>
  );

  // Main component to render
  return (
    <>
      <Header />

      {titleCard()}

      {/* Active Missing Item Reports */}
      <Grid container justifyContent="center" spacing={3} marginTop={3}>
        <Grid item xs={12} md={10}>
          <Card>
            <CardHeader
              className="gc360_header"
              title={
                <Typography variant="h5" align="center">
                  My Active <span className={styles.yellowText}>Lost</span> Item Reports
                </Typography>
              }
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={10}>
          {/* Render header row only on large screens */}
          {reportHeader()}
          {/* Active Reports */}
          {activeReports.map((report) => reportRow(report))}
        </Grid>
      </Grid>
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />

      {/* Past Missing Item Reports */}
      <Grid container justifyContent="center" spacing={3} marginTop={3}>
        <Grid item xs={12} md={10}>
          <Card>
            <CardHeader
              className="gc360_header"
              title={
                <Typography variant="h6" align="left">
                  My Past Reports
                </Typography>
              }
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={10}>
          {/* Render header row only on large screens */}
          {reportHeader(false)}
          {/* Past Reports */}
          {pastReports.map((report) => reportRow(report))}
        </Grid>
      </Grid>
      <br />
      <br />
    </>
  );
};

export default LostAndFound;
