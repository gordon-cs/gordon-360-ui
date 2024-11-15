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
// import httpUtils from 'services/http';
import http from '../../../../../../services/http';
import { useUser } from 'hooks';

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

const MyRAC = () => {
  const [raInfo, setRaInfo] = useState('');
  const { profile } = useUser();

  // Fetch resident's RA/AC information only if profile, hallID, and roomNumber are available
  useEffect(() => {
    if (profile) {
      const hallID = profile.OnCampusBuilding;
      const roomNumber = profile.OnCampusRoom;

      const fetchRaInfo = () => {
        http
          .get(`Housing/GetResidentRA/${hallID}/${roomNumber}`)
          .then((response) => {
            console.log('response:', response);
            setRaInfo(response);
          })
          .catch((error) => console.error('Error fetching RA/AC info', error));
      };

      fetchRaInfo();
    }
  }, [profile]);

  // Show loading state if profile is not yet loaded
  if (!profile) {
    return <div>Loading...</div>;
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
          <Grid item xs={8}>
            <Typography variant="body1">
              <strong>Name:</strong> {raInfo.FirstName} {raInfo.LastName}
            </Typography>

            <Typography variant="body1">
              <strong>Room #:</strong> {raInfo.RoomNumber}
            </Typography>

            <Typography variant="body1">
              <strong>Current Status:</strong>
            </Typography>

            <Typography variant="body1">
              <strong>Future Status:</strong>
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Avatar
              src={'defaultProfilePicture.png'}
              alt="Profile"
              sx={{ width: 90, height: 90, borderRadius: '50%' }}
            />
          </Grid>
        </Grid>
      </CardContent>

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
                <StyledTableCell align="center">In Class</StyledTableCell>
                <StyledTableCell align="center">9:10am</StyledTableCell>
                <StyledTableCell align="center">10:10am</StyledTableCell>
              </StyledTableRow>

              {/* ROW 2 */}
              <StyledTableRow>
                <StyledTableCell align="center">In Dorm</StyledTableCell>
                <StyledTableCell align="center">10:15am</StyledTableCell>
                <StyledTableCell align="center">12:30pm</StyledTableCell>
              </StyledTableRow>

              {/* ROW 3 */}
              <StyledTableRow>
                <StyledTableCell align="center">Off Campus</StyledTableCell>
                <StyledTableCell align="center">12:45pm</StyledTableCell>
                <StyledTableCell align="center">2:45pm</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
          <p align="right">*Times listed above are approximate and for reference only.</p>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default MyRAC;
