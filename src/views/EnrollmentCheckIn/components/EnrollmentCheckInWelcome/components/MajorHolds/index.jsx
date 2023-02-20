import { Grid, Typography } from '@mui/material';
import { gordonColors } from 'theme';

const MajorHolds = ({ holds }) => (
  <Grid item>
    <Typography style={{ color: gordonColors.primary.blue }} align="center" variant="h6">
      <b>Review Your Holds</b>
    </Typography>
    <Typography align="center">
      According to our systems, you should contact the following department(s) in order to clear up
      certain administrative holds before beginning the check-in process.
    </Typography>
    <ul>
      {holds?.RegistrarHold && (
        <li>
          You have a "Registration Hold". Please contact the Registrar's Office at{' '}
          <b>(978)-867-4243</b> or <a href="mailto:registrar@gordon.edu">registrar@gordon.edu</a>
        </li>
      )}
      {holds?.HighSchoolTranscriptHold && (
        <li>
          You have a "High School Transcript Hold". Please contact the Registrar's Office at{' '}
          <b>(978)-867-4243</b> or <a href="mailto:registrar@gordon.edu">registrar@gordon.edu</a>
        </li>
      )}
      {holds?.FinancialHold && (
        <li>
          You have a "Financial Hold". Please contact Student Financial Services at{' '}
          <b>(978) 867-4246</b> or <a href="sfs@gordon.edu">sfs@gordon.edu</a>.
        </li>
      )}
      {holds?.MedicalHold && (
        <li>
          You have a "Medical Hold". Please contact the Health Center at <b>(978)-867-4300</b> or{' '}
          <a href="mailto:healthcenter@gordon.edu">healthcenter@gordon.edu</a>.
        </li>
      )}
    </ul>
  </Grid>
);

export default MajorHolds;
