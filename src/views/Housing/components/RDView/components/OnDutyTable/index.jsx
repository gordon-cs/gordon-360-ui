import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

function createData(hall, onDuty, photo, preferredContact, checkInTime, hallRD) {
  return { hall, onDuty, photo, preferredContact, checkInTime, hallRD };
}

const OnDutyTable = () => {
  const [rows, setRows] = useState([]);

  // This data will later be fetched from the API instead of being hard coded
  useEffect(() => {
    const mockData = [
      {
        hall: 'Bromley',
        onDuty: 'Ross Clark',
        photo: 'https://placehold.jp/150x150.png',
        preferredContact: '(555)-398-9398',
        checkInTime: '6:05 PM',
        hallRD: 'Porter Sprigg',
      },
      {
        hall: 'Ferrin',
        onDuty: 'Mya Randolph',
        photo: 'https://placehold.jp/150x150.png',
        preferredContact: 'Teams Link',
        checkInTime: '6:10 PM',
        hallRD: 'Melanie Soderlund',
      },
      {
        hall: 'Evans',
        onDuty: 'Danya Li',
        photo: 'https://placehold.jp/150x150.png',
        preferredContact: '(555)-987-6543',
        checkInTime: '6:15 PM',
        hallRD: 'Amber Cook',
      },
      {
        hall: 'Wilson',
        onDuty: 'Jason Asonye',
        photo: 'https://placehold.jp/150x150.png',
        preferredContact: '(555)-222-3333',
        checkInTime: '6:20 PM',
        hallRD: 'Kernna Wade',
      },
      {
        hall: 'Fulton',
        onDuty: 'John Doe',
        photo: 'https://placehold.jp/150x150.png',
        preferredContact: '(555)-444-5555',
        checkInTime: '6:25 PM',
        hallRD: 'Jane Doe',
      },
    ];

    // Simulate setting the data as if it were fetched from an API
    const fetchedRows = mockData.map((item) =>
      createData(
        item.hall,
        item.onDuty,
        item.photo,
        item.preferredContact,
        item.checkInTime,
        item.hallRD,
      ),
    );

    setRows(fetchedRows);
  }, []);

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 300, overflowY: 'auto' }}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Hall</StyledTableCell>
            <StyledTableCell align="center">On-Duty</StyledTableCell>
            <StyledTableCell align="center">Preferred Contact</StyledTableCell>
            <StyledTableCell align="center">Check-In Time</StyledTableCell>
            <StyledTableCell align="center">Hall RD</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center">{row.hall}</StyledTableCell>
              <StyledTableCell align="center">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img
                    src={row.photo}
                    alt="Profile Picture"
                    width="40"
                    height="40"
                    style={{ marginBottom: '5px', borderRadius: '50%' }}
                  />
                  <span>{row.onDuty}</span>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">{row.preferredContact}</StyledTableCell>
              <StyledTableCell align="center">{row.checkInTime}</StyledTableCell>
              <StyledTableCell align="center">{row.hallRD}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OnDutyTable;
