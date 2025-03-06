import { FoundItem } from 'services/lostAndFound';
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
import { useNavigate } from 'react-router';

interface ConfirmCleanOutProps {
  reportsToCleanOut: FoundItem[];
  onCancel: () => void;
}

const ConfirmCleanOut: React.FC<ConfirmCleanOutProps> = ({ reportsToCleanOut, onCancel }) => {
  const [enableCleanOut, setEnableCleanOut] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxClick = () => {
    setEnableCleanOut(!enableCleanOut);
  };

  const handleCleanOut = () => {};

  return (
    <Card className={styles.confirmCard}>
      <CardHeader
        title="Clean Out Selected Items"
        className={styles.header}
        titleTypographyProps={{ align: 'center' }}
      />

      <CardContent>
        <Typography>Input the final status of the following items.</Typography>
        <>
          {reportsToCleanOut.map((report) => (
            <Grid container key={report.recordID} className={styles.reportRow}>
              <Grid item xs={1.5}>
                {report.recordID}
              </Grid>
              <Grid item xs={1}>
                <div className={styles.dataCell}>{formatDateString(report.dateFound)}</div>
              </Grid>
              <Grid item xs={1.5}>
                <div className={styles.dataCell}>{report.locationFound}</div>
              </Grid>
              <Grid item xs={2}>
                <div className={styles.dataCell}>{report.category}</div>
              </Grid>
              <Grid item xs={2}>
                <div className={styles.dataCell}>{report.description}</div>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant="filled" sx={{ width: 1 }}>
                  <InputLabel id="item-status-label">Item Status</InputLabel>
                  <Select
                    labelId="item-status-label"
                    name="itemStatus"
                    // value={formData.initialAction}
                    // onChange={handleSelectChange} // Accepts SelectChangeEvent<string>
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Disposed">Disposed</MenuItem>
                    <MenuItem value="Donated">Donated</MenuItem>
                    <MenuItem value="Given">Given to Non-Owner</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {differenceInCalendarDays(new Date(), Date.parse(report.dateCreated)) < 3}
              </Grid>
            </Grid>
          ))}
        </>
        <Grid container justifyContent="center" marginTop={3}>
          <Grid item xs={8}>
            <FormControlLabel
              control={
                <Checkbox checked={enableCleanOut} onChange={handleCheckboxClick} name="confirm" />
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
              onClick={handleCleanOut}
              disabled={!enableCleanOut}
            >
              Clean Out Items
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ConfirmCleanOut;
