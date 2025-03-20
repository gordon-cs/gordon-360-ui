import { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Avatar,
  Box,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { fetchOnDutyData } from 'services/residentLife/RA_OnCall';
import ScottieMascot from 'views/ResLife/ScottieMascot.png';

// Hardcoded list of all halls
const ALL_HALLS = [
  { name: 'Bromley', id: 'BRO' },
  { name: 'Chase', id: 'CHA' },
  { name: 'Evans', id: 'EVN' },
  { name: 'Ferrin', id: 'FER' },
  { name: 'Fulton', id: 'FUL' },
  { name: 'Nyland', id: 'NYL' },
  { name: 'Tavilla', id: 'TAV' },
  { name: 'Wilson', id: 'WIL' },
  { name: 'The Village', id: 'village' },
];

// building codes associated with the village
const VILLAGE_IDS = ['GRA', 'RID', 'MCI', 'CON'];

const DEFAULT_PROFILE_URL = '/profile/';

// Styling for links using existing 360 colors
const StyledLink = styled('a')(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.warning.main,
  },
}));

// takes phone number from api return and makes readable version
const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber || phoneNumber.length !== 10) return phoneNumber;
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
};

const OnDutyMobile = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [hallDetails, setHallDetails] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOnDutyData();

        // take any on call data from api response that has a village dorm and consolidate
        const villageData = data.filter((hall) => VILLAGE_IDS.includes(hall.Hall_ID));
        const otherHalls = data.filter((hall) => !VILLAGE_IDS.includes(hall.Hall_ID));
        // village ra will be the same for all entries take data from first
        if (villageData.length > 0) {
          const consolidatedVillage = {
            Hall_ID: 'village',
            Hall_Name: 'The Village',
            RA_Photo: villageData[0].RA_Photo,
            RA_Name: villageData[0].RA_Name,
            RA_UserName: villageData[0].RA_UserName,
            Preferred_Contact: villageData[0].Preferred_Contact,
            Check_In_Time: villageData[0].Check_In_Time,
            RD_Name: villageData[0].RD_Name,
            RD_UserName: villageData[0].RD_UserName,
          };
          setRows([...otherHalls, consolidatedVillage]); // pull info from village and remaining halls
        } else {
          setRows(data);
        }
      } catch {
        setRows([]);
      }
    };

    fetchData();
  }, []);

  // Update hall details when a hall is selected
  useEffect(() => {
    if (!value) return;
    setLoading(true);
    const selectedHall = rows.find((hall) => hall.Hall_ID === value) || null;
    setHallDetails(selectedHall);
    setLoading(false);
  }, [value, rows]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">Select a Hall</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={value}
        label="Select a Hall"
        onChange={handleChange}
      >
        {ALL_HALLS.map(
          (
            hall, //populate list with all halls
          ) => (
            <MenuItem key={hall.id} value={hall.id}>
              {hall.name}
            </MenuItem>
          ),
        )}
      </Select>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      ) : (
        value && (
          <Box
            sx={{
              textAlign: 'center',
              mt: '20px',
              backgroundColor: 'transparent',
              borderColor: 'warning.main',
              borderRadius: 2,
            }}
          >
            {hallDetails?.RA_Name ? (
              <>
                <a
                  href={DEFAULT_PROFILE_URL + hallDetails.RA_UserName || '#'}
                  target="_self"
                  rel=""
                >
                  <Avatar
                    src={hallDetails.RA_Photo || 'https://placehold.jp/150x150.png'}
                    alt={hallDetails.RA_Name || 'No RA'}
                    sx={{
                      width: { xs: 80, sm: 80, md: 90, lg: 90 },
                      height: { xs: 80, sm: 80, md: 90, lg: 90 },
                      margin: '0 auto',
                      marginBottom: 2,
                      transition: 'width 0.3s, height 0.3s',
                    }}
                  />
                </a>
                <Typography variant="h6">
                  <strong>{hallDetails.Hall_Name}</strong>
                </Typography>

                {/* RA Name  */}
                <Typography>
                  <strong>On-Duty: </strong>

                  <StyledLink
                    href={DEFAULT_PROFILE_URL + hallDetails.RA_UserName || '#'}
                    className="gc360_text_link"
                    target="_self"
                    rel=""
                  >
                    {hallDetails.RA_Name}{' '}
                  </StyledLink>
                </Typography>

                <Typography>
                  <strong>Contact:</strong>{' '}
                  {hallDetails.Preferred_Contact?.includes('http') ? (
                    <StyledLink
                      href={hallDetails.Preferred_Contact}
                      underline="hover"
                      className="gc360_text_link"
                      target="_self"
                      rel=""
                    >
                      Teams
                    </StyledLink>
                  ) : hallDetails.Preferred_Contact ? (
                    <StyledLink
                      href={`tel:${hallDetails.Preferred_Contact}`}
                      className="gc360_text_link"
                    >
                      {formatPhoneNumber(hallDetails.Preferred_Contact)}
                    </StyledLink>
                  ) : (
                    <StyledLink className="gc360_text_link">No Contact Info</StyledLink>
                  )}
                </Typography>

                <Typography>
                  <strong>Check-In Time:</strong>{' '}
                  {hallDetails.Check_In_Time
                    ? new Date(hallDetails.Check_In_Time).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'No Check-In Time'}
                </Typography>

                <Typography>
                  <strong>Hall RD:</strong>{' '}
                  <StyledLink
                    href={DEFAULT_PROFILE_URL + hallDetails.RD_UserName}
                    className="gc360_text_link"
                    target="_self"
                    rel=""
                  >
                    {hallDetails.RD_Name || 'No RD Info'}{' '}
                  </StyledLink>
                </Typography>
              </>
            ) : (
              // when there is no on call ra tell user when they select that hall
              <Box
                sx={{
                  textAlign: 'center',
                  mt: '20px',
                  backgroundColor: 'transparent',
                  borderColor: 'warning.main',
                  borderRadius: 2,
                }}
              >
                <Avatar
                  src={ScottieMascot}
                  alt="Scottie"
                  sx={{
                    width: { xs: 80, sm: 80, md: 90, lg: 90 },
                    height: { xs: 80, sm: 80, md: 90, lg: 90 },
                    margin: '0 auto',
                    marginBottom: 2,
                    transition: 'width 0.3s, height 0.3s',
                  }}
                />
                <Typography
                  color="warning.main"
                  sx={{
                    typography: { xs: 'h5', sm: 'h5', md: 'h6', lg: 'h6' },
                  }}
                >
                  No one is on call right now!
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    typography: { xs: 'body1', sm: 'body1', md: 'body1', lg: 'body1' },
                  }}
                >
                  Scottie’s keeping an eye on things. 🐾
                </Typography>
              </Box>
            )}
          </Box>
        )
      )}
    </FormControl>
  );
};

export default OnDutyMobile;
