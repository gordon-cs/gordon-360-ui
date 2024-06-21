import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
//import Membership from './components/Membership';
import { AuthGroup } from 'services/auth';
import membershipService, { Participation } from 'services/membership';
import { useEffect, useState } from 'react';
import GordonDialogBox from 'components/GordonDialogBox';

const PosterAdminCard = (
  {
    //createSnackbar, isSiteAdmin, involvementDescription, onAddMember }) => {
  },
) => {
  return (
    <Grid item xs={12} lg={8}>
      <Card>
        <CardHeader
          title={
            <Grid container direction="row" alignItems="center">
              <Grid item xs={7} align="left">
                My Uploads
              </Grid>
              <Grid item xs={5} align="right">
                <Button variant="contained" color="secondary" onClick={null}>
                  Upload Poster
                </Button>
              </Grid>
            </Grid>
          }
          className="gc360_header"
        />
        <CardContent>
          No Uploads to show
          {/*use service to get current unexpired uploads*/}
          {/*On click have it open an edit dialog */}
        </CardContent>
      </Card>
    </Grid>
  );
};
export default PosterAdminCard;
