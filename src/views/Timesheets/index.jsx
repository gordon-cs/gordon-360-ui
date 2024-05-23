import { Card, CardContent, CardHeader, Container, Typography } from '@mui/material';

const Notice = () => (
  <Container>
    <Card>
      <CardHeader title="Timesheets have moved" />
      <CardContent>
        <Typography>
          Student Timesheets are now located on{' '}
          <a
            class="gc360_text_link"
            href="https://gordon.criterionhcm.com/ui/#"
            target="_blank"
            rel="noreferrer noopener"
          >
            Criterion
          </a>
          . If you are attempting to enter time for a job worked prior to 8/20/23 please email{' '}
          <a
            class="gc360_text_link"
            href="mailto:payroll@gordon.edu"
            target="_blank"
            rel="noreferrer noopener"
          >
            Payroll@Gordon.edu
          </a>
          .
        </Typography>
      </CardContent>
    </Card>
  </Container>
);

export default Notice;
