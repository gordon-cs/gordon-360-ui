import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography, Avatar } from '@mui/material';
import { fetchOnDutyData } from 'services/residentLife/RA_OnCall';
import ScottieMascot from 'views/Housing/ScottieMascot.png';
import { isMobile } from 'react-device-detect';

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
    <StyledLink
      href={item.RA_Profile_Link}
      underline="hover"
      className="gc360_text_link"
      target="_blank"
      rel="noopener noreferrer"
    >
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

        // Consolidate Village dorms into a single row to display
        const villageHalls = ['CON', 'RID', 'GRA', 'MCI'];
        const villageData = response.filter((item) => villageHalls.includes(item.Hall_ID));
        const otherHalls = response.filter((item) => !villageHalls.includes(item.Hall_ID));

        const consolidatedData = [];

        if (villageData.length > 0) {
          const consolidatedVillage = {
            Hall_Name: 'The Village',
            RA_Photo: villageData[0].RA_Photo,
            RA_Name: villageData[0].RA_Name,
            RA_Profile_Link: villageData[0].RA_Profile_Link,
            PreferredContact: villageData[0].PreferredContact,
            Check_in_time: villageData[0].Check_in_time,
            RD_Name: villageData[0].RD_Name,
            RD_Profile_Link: villageData[0].RD_Profile_Link,
          };
          consolidatedData.push(consolidatedVillage);
        }

        const fetchedRows = [...otherHalls, ...consolidatedData].map((item) => ({
          hall: item.Hall_Name,
          onDutyPhoto: makeRAPhoto(item),
          preferredContact: item.PreferredContact.includes('http') ? (
            <StyledLink
              href={item.PreferredContact}
              underline="hover"
              className="gc360_text_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Teams
            </StyledLink>
          ) : isMobile ? (
            <StyledLink
              href={`tel:${item.PreferredContact}`}
              underline="hover"
              className="gc360_text_link"
            >
              {formatPhoneNumber(item.PreferredContact)}
            </StyledLink>
          ) : (
            <Typography variant="body2" color="textPrimary">
              {formatPhoneNumber(item.PreferredContact)}
            </Typography>
          ),

          checkInTime: new Date(item.Check_in_time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          hallRD: (
            <StyledLink
              href={item.RD_Profile_Link}
              underline="hover"
              className="gc360_text_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.RD_Name}
            </StyledLink>
          ),
        }));

        setRows(fetchedRows.length > 0 ? fetchedRows : null);
        setLoading(false);
      } catch (err) {
        console.error('Error loading on-duty data:', err);
        setLoading(false);
        setRows(null);
      }
    };

    loadOnDutyData();
  }, []);

  if (loading) {
    return <p>Loading on-duty data...</p>;
  }

  if (rows === null) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          padding: 3,
          backgroundColor: 'background.paper',
          border: '2px dashed',
          borderColor: 'warning.main',
          borderRadius: 2,
        }}
      >
        <Avatar
          src={ScottieMascot}
          alt="Scottie"
          sx={{ width: 100, height: 100, margin: '0 auto', marginBottom: 2 }}
        />
        <Typography variant="h5" color="warning.main">
          No one is on call right now!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Scottie’s keeping an eye on things. 🐾
        </Typography>
      </Box>
    );
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
