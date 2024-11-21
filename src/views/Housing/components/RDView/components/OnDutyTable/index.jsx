import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { fetchOnDutyData } from 'services/residentLife/RA_OnCall';

// Styling for table links (RA/RD profile and Teams link) using existing colors
const StyledLink = styled('a')(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.warning.main,
  },
}));

// styling for table components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '0.875rem',
  },
}));

// alternating backgrounds for rows
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

// takes phone number from api return and makes readable version
const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber || phoneNumber.length !== 10) return phoneNumber;
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
};
// format the photo, RA name, and RA profile link into an item for the table
const makeRAPhoto = (item) => (
  <Box textAlign="center">
    <StyledLink href={item.RA_Profile_Link} target="_blank" rel="noopener noreferrer">
      <Avatar
        src={item.RA_Photo || 'https://placehold.jp/150x150.png'}
        alt={`${item.RA_Name}'s profile`}
        sx={{ width: 60, height: 60, margin: '0 auto' }}
      />
      <Box component="span" mt={1} display="block">
        {item.RA_Name}
      </Box>
    </StyledLink>
  </Box>
);

const OnDutyTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOnDutyData = async () => {
      try {
        const response = await fetchOnDutyData();
        // map response data to table row objects
        const fetchedRows = response.map((item) => ({
          hall: item.Hall_Name,
          onDutyPhoto: makeRAPhoto(item),
          preferredContact: item.PreferredContact.includes('http') ? (
            <StyledLink href={item.PreferredContact} target="_blank" rel="noopener noreferrer">
              Teams
            </StyledLink>
          ) : (
            formatPhoneNumber(item.PreferredContact)
          ),
          checkInTime: new Date(item.Check_in_time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          hallRD: (
            <StyledLink href={item.RD_Profile_Link} target="_blank" rel="noopener noreferrer">
              {item.RD_Name}
            </StyledLink>
          ),
        }));

        setRows(fetchedRows);
        setLoading(false);
      } catch (err) {
        console.error('Error loading on-duty data:', err);
        setLoading(false);
      }
    };

    loadOnDutyData();
  }, []);

  if (loading) {
    return <p>Loading on-duty data...</p>;
  }

  return (
    <StyledTableContainer component={Paper} sx={{ maxHeight: 400, overflowY: 'auto' }}>
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
              <StyledTableCell align="center">{row.onDutyPhoto}</StyledTableCell>
              <StyledTableCell align="center">{row.preferredContact}</StyledTableCell>
              <StyledTableCell align="center">{row.checkInTime}</StyledTableCell>
              <StyledTableCell align="center">{row.hallRD}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default OnDutyTable;
