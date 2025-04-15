import { Card, CardContent, CardHeader, Grid, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import lostAndFoundService from 'services/lostAndFound';
import styles from '/src/views/LostAndFound/views/Home/LostAndFound.module.scss';
import { MissingItemReport } from 'services/lostAndFound';
import Badge from '@mui/material/Badge';
import GordonSnackbar from 'components/Snackbar';
import { useUser } from 'hooks';
import { formatDateString } from 'views/LostAndFound/components/Helpers';
import { FoundItem } from 'services/lostAndFound';

const FoundReports = () => {
  const [foundReports, setFoundReports] = useState<MissingItemReport[] | null>(null);
  const [snackbar, setSnackbar] = useState({ message: '', severity: undefined, open: false });
  const user = useUser();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:375px)');

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  const mapFoundToMissing = (
    item: FoundItem,
  ): MissingItemReport & { isFoundItem: boolean; originalRecordID: string } => ({
    // Convert recordID from string to number for general sorting but save the original string in originalRecordID
    recordID: parseInt(item.recordID),
    originalRecordID: item.recordID,
    matchingFoundID: item.matchingMissingID,
    firstName: item.ownerFirstName,
    lastName: item.ownerLastName,
    category: item.category,
    colors: item.colors || [],
    brand: item.brand || '',
    description: item.description,
    // Map found location to locationLost in the missing report shape
    locationLost: item.locationFound,
    // For found items, these fields are not applicable so we assign defaults
    stolen: false,
    stolenDescription: '',
    // Use dateFound for dateLost
    dateLost: item.dateFound,
    dateCreated: item.dateCreated,
    // No phone or email available here
    phone: '',
    email: '',
    status: item.status,
    submitterUsername: item.submitterUsername,
    submitterID: null,
    // Since these are Gordon persons, forGuest is false
    forGuest: false,
    // Inline flag to mark that this object came from the new API (found item)
    isFoundItem: true,
  });

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        // First, get missing item reports for the current user.
        const reports: MissingItemReport[] = await lostAndFoundService.getMissingItemReportUser(
          user.profile?.AD_Username || '',
        );

        // Filter for "found" status from the missing report side.
        const foundFromMissing = reports
          .filter((report) => report.status.toLowerCase() === 'found')
          .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
          .map((report) => ({
            ...report,
            colors: report.colors || [],
          }));

        // Now get the API found items using the owner ID.
        // Fetch found items from the API
        const foundByOwnerRaw = await lostAndFoundService.getFoundItemsByOwner(
          user.profile?.ID || '',
        );

        // Map the FoundItem objects into MissingItemReport shape using the mapping function
        const foundByOwner = foundByOwnerRaw.map(mapFoundToMissing);

        // Merge the arrays
        const mergedFound = [...foundFromMissing, ...foundByOwner].sort(
          (a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime(),
        );

        // Filter to show only:
        // - Items where status is "found"
        // - Or items with status "active" that came from the new API (isFoundItem true)
        const filteredFound = mergedFound.filter((report) => {
          const status = report.status.toLowerCase();
          if (status === 'found') return true;
          if (status === 'active' && (report as any).isFoundItem === true) return true;
          return false;
        });

        setFoundReports(filteredFound);
      } catch (error) {
        console.error('Error fetching found reports:', error);
        createSnackbar('Error fetching found reports.', 'error');
        setFoundReports([]);
      }
    };

    fetchFoundItems();
  }, [user.profile?.AD_Username, user.profile?.ID, createSnackbar]);

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
  const reportRow = (
    report: MissingItemReport & { isFoundItem?: boolean; originalRecordID?: string },
    isFoundSection: boolean = false,
  ) => (
    <Card
      className={`${
        isFoundSection && report.status.toLowerCase() === 'found'
          ? styles.dataFoundRow
          : styles.dataRow
      } ${styles.clickableRow}`}
      onClick={() => {
        if ((report as any).isFoundItem === true && report.originalRecordID) {
          navigate('/lostandfound/founditemform/' + report.originalRecordID);
        } else {
          navigate('/lostandfound/' + report.recordID);
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

  const badgeCount = foundReports ? foundReports.length : 0;

  return (
    <>
      {foundReports && badgeCount > 0 && (
        <>
          <Card>
            <CardHeader
              title={
                <Grid container alignItems="center" position="relative">
                  {/* Badge positioned on the top-left corner */}
                  <Badge
                    badgeContent={badgeCount}
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
