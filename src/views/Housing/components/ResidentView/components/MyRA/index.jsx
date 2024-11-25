import { useState, useEffect } from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Link,
  setRef,
  Typography,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchRaInfo } from 'services/residentLife/ResidentStaff';
import { useUser } from 'hooks';

// Default image
const COLOR_80808026_1X1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNsUAMAASwAqHb28sMAAAAASUVORK5CYII=';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const MyRA = () => {
  const [raInfo, setRaInfo] = useState({});
  const { profile } = useUser();

  useEffect(() => {
    if (profile) {
      const hallID = profile.OnCampusBuilding;
      const roomNumber = profile.OnCampusRoom;
      console.log('hallID', hallID);
      console.log('roomNumber', roomNumber);

      fetchRaInfo(hallID, roomNumber).then((response) => {
        setRaInfo(response);
        console.log('RA Info:', response);
      });
    }
  }, [profile]);

  // Show loading state if profile is not yet loaded
  if (!profile) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card>
      <CardHeader
        title={
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} align="center">
              Where's My RA/AC?
            </Grid>
          </Grid>
        }
        className="gc360_header"
      />

      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Text Section */}
          <Grid item xs={8}>
            <Typography variant="body1">
              <strong>Name:</strong> {raInfo.FirstName} {raInfo.LastName}
            </Typography>

            <Typography variant="body1">
              <strong>Room #:</strong> {raInfo.RoomNumber}
            </Typography>

            <Typography variant="body1">
              <strong>Current Status:</strong> TBD
            </Typography>

            <Typography variant="body1">
              <strong>Future Status:</strong> TBD
            </Typography>
          </Grid>

          {/* Avatar Section */}
          <Grid item xs={4}>
            <Avatar
              src={raInfo.PhotoURL || COLOR_80808026_1X1}
              alt="Profile"
              sx={{
                width: { xs: 80, sm: 110, md: 80, lg: 120 },
                height: { xs: 80, sm: 110, md: 80, lg: 120 },
                borderRadius: '50%',
              }}
            />
          </Grid>
        </Grid>
      </CardContent>

      {/* RA Schedule */}
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Starts at</StyledTableCell>
                <StyledTableCell align="center">Ends at</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* ROW 1 */}
              <StyledTableRow>
                <StyledTableCell align="center">TBD</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </StyledTableRow>

              {/* ROW 2 */}
              <StyledTableRow>
                <StyledTableCell align="center">TBD</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </StyledTableRow>

              {/* ROW 3 */}
              <StyledTableRow>
                <StyledTableCell align="center">TBD</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>

          <Typography variant="caption" align="right" display="block" mt={1}>
            *Times listed above are approximate and for reference only.
          </Typography>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default MyRA;
