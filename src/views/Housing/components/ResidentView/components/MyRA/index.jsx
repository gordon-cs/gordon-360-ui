import { useState, useEffect } from 'react';
import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { fetchRaInfo } from 'services/residentLife/ResidentStaff';
import { useUser } from 'hooks';

// Default image
const COLOR_80808026_1X1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNsUAMAASwAqHb28sMAAAAASUVORK5CYII=';

// Takes phone number from api return and makes readable version
const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber || phoneNumber.length !== 10) return phoneNumber;
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
};

// Determine if the user is on a mobile device
const isMobile = () => {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
};

// Styling for links using existing 360 colors
const StyledLink = styled('a')(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.warning.main,
  },
}));

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
  const [raProfileLink, setRaProfileLink] = useState('');
  const { profile } = useUser();
  const mobileDevice = isMobile();

  useEffect(() => {
    if (profile) {
      console.log(mobileDevice ? 'Mobile device detected' : 'Desktop device detected');

      const hallID = profile.OnCampusBuilding;
      const roomNumber = profile.OnCampusRoom;

      fetchRaInfo(hallID, roomNumber).then((response) => {
        setRaInfo(response);
      });
    }
  }, [profile]);

  useEffect(() => {
    if (raInfo) {
      const email = raInfo.Email;
      if (email) {
        const [firstName, lastName] = email.split('@')[0].split('.');
        setRaProfileLink(`https://360.gordon.edu/profile/${firstName}.${lastName}`);
      }
    }
  }, [raInfo]);

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
              My RA/AC
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
              <strong>RA: </strong>
              <StyledLink
                href={raProfileLink}
                className="gc360_text_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {raInfo.FirstName} {raInfo.LastName}
              </StyledLink>
            </Typography>

            <Typography variant="body1">
              <strong>Room #:</strong> {raInfo.RoomNumber}
            </Typography>

            <Typography variant="body1">
              <strong>Contact:</strong>{' '}
              {raInfo.PreferredContact && raInfo.PreferredContact.includes('http') ? (
                <StyledLink
                  href={raInfo.PreferredContact}
                  underline="hover"
                  className="gc360_text_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Teams
                </StyledLink>
              ) : isMobile && raInfo.PreferredContact ? (
                <StyledLink href={`tel:${raInfo.PreferredContact}`} className="gc360_text_link">
                  {formatPhoneNumber(raInfo.PreferredContact)}
                </StyledLink>
              ) : (
                raInfo.PreferredContact && formatPhoneNumber(raInfo.PreferredContact)
              )}
            </Typography>

            <Typography variant="body1">
              <strong>Current Status:</strong> In Class
            </Typography>

            <Typography variant="body1">
              <strong>Future Status:</strong> Busy
            </Typography>
          </Grid>

          {/* Avatar Section */}
          <Grid item xs={4}>
            <StyledLink
              href={raProfileLink}
              className="gc360_text_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar
                src={raInfo.PhotoURL || COLOR_80808026_1X1}
                alt="Profile"
                sx={{
                  width: { xs: 80, sm: 110, md: 80, lg: 120 },
                  height: { xs: 80, sm: 110, md: 80, lg: 120 },
                  borderRadius: '50%',
                }}
              />
            </StyledLink>
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
              <StyledTableRow>
                <StyledTableCell align="center">In Class</StyledTableCell>
                <StyledTableCell align="center">9:10 AM</StyledTableCell>
                <StyledTableCell align="center">10:10 PM</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="center">Busy</StyledTableCell>
                <StyledTableCell align="center">10:10 PM</StyledTableCell>
                <StyledTableCell align="center">2:00 PM</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell align="center">Available</StyledTableCell>
                <StyledTableCell align="center">2:00 PM</StyledTableCell>
                <StyledTableCell align="center">4:00 PM</StyledTableCell>
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
