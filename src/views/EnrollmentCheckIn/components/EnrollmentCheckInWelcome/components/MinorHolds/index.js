import { Grid, Typography } from '@mui/material';

const MinorHolds = ({ holds }) => (
  <Grid item>
    <Typography>
      Even though you can still check in while maintaining the following holds, you should contact
      the following department(s) at your earliest availability:
    </Typography>
    <ul>
      {holds?.LaVidaHold && (
        <li>
          You have a "La Vida Hold". Students are required to complete Discovery or La Vida in their
          first year at Gordon College. Please contact the Registrar's Office at{' '}
          <b>(978) 867-4243</b> or <a href="registrar@gordon.edu">registrar@gordon.edu</a> so that
          we can register you for Discovery or La Vida.
        </li>
      )}
      {holds?.MajorHold && (
        <li>
          You have a "Declaration of Major Hold". Please contact the <b>Registrar's Office</b> at{' '}
          <b>(978)-867-4243</b> or <a href="mailto:registrar@gordon.edu">registrar@gordon.edu</a> to
          discuss declaring a major.
        </li>
      )}
    </ul>
  </Grid>
);

export default MinorHolds;
