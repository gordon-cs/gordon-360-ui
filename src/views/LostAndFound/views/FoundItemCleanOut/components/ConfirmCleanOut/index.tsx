import lostAndFoundService, { FoundItem } from 'services/lostAndFound';
import styles from './ConfirmCleanOut.module.scss';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import { formatDateString } from 'views/LostAndFound/components/Helpers';
import { differenceInCalendarDays } from 'date-fns';
import { useState } from 'react';
import { useUser } from 'hooks';
import { useNavigate } from 'react-router';
import GordonSnackbar from 'components/Snackbar';
import useMediaQuery from '@mui/material/useMediaQuery';

interface ConfirmCleanOutProps {
  reportsToCleanOut: FoundItem[];
  onCancel: () => void;
}

interface IConfirmationSnackbar {
  message: string;
  severity: 'error' | 'success' | 'info' | 'warning' | undefined;
  open: boolean;
}

const ConfirmCleanOut: React.FC<ConfirmCleanOutProps> = ({ reportsToCleanOut, onCancel }) => {
  const [enableCleanOut, setEnableCleanOut] = useState(false);
  const [reportStatuses, setReportStatuses] = useState(new Map());
  const [snackbar, setSnackbar] = useState<IConfirmationSnackbar>({
    message: '',
    severity: undefined,
    open: false,
  });
  const { profile } = useUser();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:900px)');

  const handleCheckboxClick = () => {
    setEnableCleanOut(!enableCleanOut);
  };

  const handleStatusChange = (recordID: string, value: string) => {
    setReportStatuses((prev) => {
      const newMap = new Map(prev);
      newMap.set(recordID, value);
      return newMap;
    });
  };

  const handleCleanOut = async (reports: FoundItem[]) => {
    try {
      for (const report of reports) {
        lostAndFoundService.updateFoundReportStatus(report.recordID, 'deleted');
        const actionRequestData = {
          foundID: report.recordID,
          actionDate: new Date().toISOString(),
          submitterUsername: profile?.AD_Username || '',
          action: 'Expiring Action',
          actionNote: reportStatuses.get(report.recordID),
        };
        await lostAndFoundService.createFoundAdminAction(report.recordID, actionRequestData);
      }
      navigate('/lostandfound/lostandfoundadmin');
    } catch (error: any) {
      setSnackbar({
        message: 'Unable to process the request. Please check the input and try again.',
        severity: 'error',
        open: true,
      });
    }
  };

  return (
    <>
      <Card className={styles.confirmCard}>
        <CardHeader
          title="Clean Out Selected Items"
          className={styles.header}
          titleTypographyProps={{ align: 'center' }}
        />

        <CardContent>
          <Typography>Input the final status of the following items.</Typography>
          <>
            {reportsToCleanOut.map((report) =>
              isMobile ? (
                <Card key={report.recordID}>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={10.5}>
                        <Typography variant="h6" className={styles.itemName}>
                          Tag #: {report.recordID}
                        </Typography>
                        <Grid container justifyContent="space-between" alignItems="center">
                          <Typography variant="body2">
                            Found: {formatDateString(report.dateFound)}
                          </Typography>
                          <Typography variant="body2">
                            Created: {formatDateString(report.dateCreated)}
                          </Typography>
                        </Grid>
                        <Typography variant="body2">Location: {report.locationFound}</Typography>
                        <Typography variant="body2">Category: {report.category}</Typography>
                        <Grid item xs={12}>
                          {differenceInCalendarDays(new Date(), Date.parse(report.dateCreated)) < 3}
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <FormControl variant="filled" sx={{ width: '100%', minWidth: '200px' }}>
                            <InputLabel id="item-status-label">Item Status</InputLabel>
                            <Select
                              labelId="item-status-label"
                              name="itemStatus"
                              value={reportStatuses.get(report.recordID)}
                              onChange={(e) => handleStatusChange(report.recordID, e.target.value)}
                              fullWidth
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value="disposed">Disposed</MenuItem>
                              <MenuItem value="donated">Donated</MenuItem>
                              <MenuItem value="given">Given to Non-Owner</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ) : (
                <Grid container key={report.recordID} className={styles.reportRow}>
                  <Grid item xs={12} md={1.5}>
                    {report.recordID}
                  </Grid>
                  <Grid item xs={12} md={1}>
                    <div className={styles.dataCell}>{formatDateString(report.dateFound)}</div>
                  </Grid>
                  <Grid item xs={12} md={1.5}>
                    <div className={styles.dataCell}>{report.locationFound}</div>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <div className={styles.dataCell}>{report.category}</div>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <div className={styles.dataCell}>{report.description}</div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl variant="filled" sx={{ width: '100%', minWidth: '200px' }}>
                      <InputLabel id="item-status-label">Item Status</InputLabel>
                      <Select
                        labelId="item-status-label"
                        name="itemStatus"
                        value={reportStatuses.get(report.recordID)}
                        onChange={(e) => handleStatusChange(report.recordID, e.target.value)}
                        fullWidth
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="disposed">Disposed</MenuItem>
                        <MenuItem value="donated">Donated</MenuItem>
                        <MenuItem value="given">Given to Non-Owner</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    {differenceInCalendarDays(new Date(), Date.parse(report.dateCreated)) < 3}
                  </Grid>
                </Grid>
              ),
            )}
          </>
          <Grid container justifyContent="center" marginTop={3}>
            <Grid item xs={8}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={enableCleanOut}
                    onChange={handleCheckboxClick}
                    name="confirm"
                  />
                }
                label="I confirm that these items are no longer in the Gordon Police inventory."
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end" padding={2}>
            <Grid item padding={2}>
              <Button variant="contained" color="primary" onClick={onCancel}>
                Go Back and Edit
              </Button>
            </Grid>
            <Grid item padding={2}>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleCleanOut(reportsToCleanOut)}
                disabled={!enableCleanOut}
              >
                Clean Out Items
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <GordonSnackbar
        open={snackbar.open}
        text={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default ConfirmCleanOut;
