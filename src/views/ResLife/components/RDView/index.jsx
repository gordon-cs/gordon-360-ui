import { Card, CardContent, Box, CardHeader, Grid, useMediaQuery } from '@mui/material';
import CustomizedTable from './components/OnDutyTable';
import OnDutyMobile from './components/OnDutyMobileView';
import EditDocs from './components/EditDocs';
import OnDutyRD from '../RAView/components/RD-OnCall';

const RDView = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <Grid container justifyContent={'Center'}>
      <Box mt={5} />
      {!isMobile && (
        <Grid item xs={12} md={20} padding={1}>
          <Card xs={{ width: '100%' }}>
            <CardHeader
              title={
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={12} align="center">
                    RA On-Duty by Hall
                  </Grid>
                </Grid>
              }
              className="gc360_header"
            />
            <CardContent>
              <CustomizedTable />
            </CardContent>
          </Card>
        </Grid>
      )}
      {isMobile && (
        <>
          <Box mt={5} />
          <Grid item xs={12} md={20} padding={1}>
            <Card sx={{ width: '100%' }}>
              <CardHeader
                title={
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={12} align="center">
                      RA On-Duty by Hall
                    </Grid>
                  </Grid>
                }
                className="gc360_header"
              />
              <CardContent>
                <OnDutyMobile />
              </CardContent>
            </Card>
          </Grid>
        </>
      )}
      <Box mt={5} />
      <Grid item xs={12} md={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card sx={{ width: '100%' }}>
              <CardHeader
                title={
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={12} align="center">
                      Editable Documents
                    </Grid>
                  </Grid>
                }
                className="gc360_header"
              />
              <CardContent>
                <EditDocs />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ width: '100%' }}>
              <OnDutyRD />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RDView;
