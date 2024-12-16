import {
  Card,
  CardContent,
  Box,
  CardHeader,
  Grid,
  useMediaQuery,
  ListItemText,
  List,
  ListItem,
  Link,
  Typography,
} from '@mui/material';
import CustomizedTable from './components/OnDutyTable';
import { Link as RouterLink } from 'react-router-dom';
import BasicSelect from './components/MobileView';
import EditDocs from './components/EditDocs';

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
                <BasicSelect />
              </CardContent>
            </Card>
          </Grid>
        </>
      )}
      <Box mt={5} />
      <Grid item xs={12} md={20} padding={1}>
        <Card xs={{ width: '100%' }}>
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
    </Grid>
  );
};

export default RDView;
