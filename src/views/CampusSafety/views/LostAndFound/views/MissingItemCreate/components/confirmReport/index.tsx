import { Card, CardContent, CardHeader, Typography, Button, Grid } from '@mui/material';
import styles from './ConfirmReport.module.scss';

interface ConfirmReportProps {
  formData: {
    firstName: string;
    lastName: string;
    category: string;
    colors: string[];
    brand: string;
    description: string;
    locationLost: string;
    dateLost: string;
    phoneNumber: string;
    emailAddr: string;
    stolenDescription?: string;
    stolen: boolean;
    forGuest: boolean;
  };
  onEdit: () => void;
  onSubmit: () => void;
}

const ConfirmReport: React.FC<ConfirmReportProps> = ({ formData, onEdit, onSubmit }) => {
  return (
    <Card className={styles.confirmCard}>
      <CardHeader
        title="Confirm the Details of your Report"
        className={styles.header}
        titleTypographyProps={{ align: 'center' }}
      />
      <CardContent>
        <Grid container spacing={2} className={styles.reportDetails}>
          <Grid item xs={6}>
            <Typography>
              <strong>Name:</strong> {formData.firstName} {formData.lastName}
            </Typography>
            <Typography>
              <strong>Item Category:</strong> {formData.category}
            </Typography>
            <Typography>
              <strong>Item Color:</strong> {formData.colors.join(', ') || 'N/A'}
            </Typography>
            <Typography>
              <strong>Item Brand/Make:</strong> {formData.brand || 'N/A'}
            </Typography>
            <Typography>
              <strong>Date Lost:</strong> {new Date(formData.dateLost).toDateString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Location Lost:</strong> {formData.locationLost}
            </Typography>
            <Typography>
              <strong>Phone Number:</strong> {formData.phoneNumber}
            </Typography>
            <Typography>
              <strong>Email Address:</strong> {formData.emailAddr}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Description:</strong> {formData.description}
            </Typography>
          </Grid>
          {/* Conditionally render the stolen description if it exists */}
          {formData.stolen && formData.stolenDescription && (
            <Grid item xs={12}>
              <Typography>
                <strong>Stolen Description:</strong> {formData.stolenDescription}
              </Typography>
            </Grid>
          )}
        </Grid>
        {/* Conditional text when the item is reported stolen */}
        {formData.stolen && formData.stolenDescription && (
          <Typography variant="body1" align="center" color="error" marginTop={2}>
            Please note: Reporting an item as stolen will initiate a police investigation. Gordon
            Police will contact you soon to follow up.
          </Typography>
        )}
        <Grid container justifyContent="space-between" marginTop={2}>
          <Button variant="outlined" color="primary" onClick={onEdit}>
            Edit My Report
          </Button>
          <Button variant="contained" color="secondary" onClick={onSubmit}>
            File Report
          </Button>
        </Grid>
        <Typography variant="body2" align="center" marginTop={2}>
          This report will automatically expire in 6 months if your item is not found
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ConfirmReport;
