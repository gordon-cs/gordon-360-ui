import React from 'react';
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
    stolenDescription?: string; // Add stolenDescription field
  };
  onEdit: () => void;
  onSubmit: () => void;
}

const ConfirmReport: React.FC<ConfirmReportProps> = ({ formData, onEdit, onSubmit }) => {
  return (
    <Card className={styles.confirmCard}>
      <CardHeader
        title="Edit Missing Item"
        className={styles.header}
        titleTypographyProps={{ align: 'center' }}
      />
      <CardContent>
        <Typography variant="h6" align="center" gutterBottom>
          Confirm the details of your report
        </Typography>
        <Grid container spacing={2} className={styles.reportDetails}>
          <Grid item xs={6}>
            <Typography>
              <strong>Name:</strong> {formData.firstName} {formData.lastName}
            </Typography>
            <Typography>
              <strong>Item Category:</strong> {formData.category}
            </Typography>
            <Typography>
              <strong>Item Color:</strong> {formData.colors.join(', ')}
            </Typography>
            <Typography>
              <strong>Item Brand/Make:</strong> {formData.brand}
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
            <Typography className={styles.breakWord}>
              <strong>Email Address:</strong> {formData.emailAddr}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Description:</strong> {formData.description}
            </Typography>
          </Grid>
          {/* Conditionally render the stolen description if it exists */}
          {formData.stolenDescription && (
            <Grid item xs={12}>
              <Typography>
                <strong>Stolen Description:</strong> {formData.stolenDescription}
              </Typography>
            </Grid>
          )}
        </Grid>
        <Grid container justifyContent={{ sm: 'space-between', xs: 'center' }}>
          <Grid item>
            <Button
              className={styles.buttonMargin}
              variant="outlined"
              color="primary"
              onClick={onEdit}
            >
              Go Back and Edit
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={styles.buttonMargin}
              variant="contained"
              color="primary"
              onClick={onSubmit}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" marginTop={2}>
          This report will automatically expire 6 months after it was created
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ConfirmReport;
