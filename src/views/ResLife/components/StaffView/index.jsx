import { Card, CardContent, Box, CardHeader, Grid, useMediaQuery } from '@mui/material';
import CustomizedTable from '../RDView/components/OnDutyTable';
import OnDutyMobile from '../RDView/components/OnDutyMobileView';

const StaffView = () => {
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
                    RA/AC on Duty by Hall
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
                      RA/AC on Duty by Hall
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
    </Grid>
  );
};

export default StaffView;
