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
  Paper,
} from '@mui/material';
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

const DEFAULT_PROFILE_URL = 'https://360sp.gordon.edu/profile/';

// takes phone number from api return and makes readable version
const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber || phoneNumber.length !== 10) return phoneNumber;
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
};

const BasicSelect = () => {
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
            PreferredContact: villageData[0].PreferredContact,
            Check_in_time: villageData[0].Check_in_time,
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
          <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              {hallDetails?.RA_Name ? (
                <>
                  <a
                    href={DEFAULT_PROFILE_URL + hallDetails.RA_UserName || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Avatar
                      src={hallDetails.RA_Photo || 'https://placehold.jp/150x150.png'}
                      alt={hallDetails.RA_Name || 'No RA'}
                      sx={{ width: 120, height: 120, marginBottom: 2 }}
                    />
                  </a>
                  <Typography variant="h6">
                    <strong>{hallDetails.Hall_Name}</strong>
                  </Typography>
                  <Typography>
                    <strong>On-Duty:</strong> {hallDetails.RA_Name}
                  </Typography>
                  <Typography>
                    <strong>Contact:</strong>{' '}
                    {hallDetails.PreferredContact?.includes('http') ? (
                      <a
                        href={hallDetails.PreferredContact}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Teams
                      </a>
                    ) : hallDetails.PreferredContact ? (
                      <a
                        href={`tel:${hallDetails.PreferredContact}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {formatPhoneNumber(hallDetails.PreferredContact)}
                      </a>
                    ) : (
                      'No Contact Info'
                    )}
                  </Typography>
                  <Typography>
                    <strong>Check-In Time:</strong>{' '}
                    {hallDetails.Check_in_time
                      ? new Date(hallDetails.Check_in_time).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'No Check-In Time'}
                  </Typography>
                  <Typography>
                    <strong>Hall RD:</strong>{' '}
                    <a
                      href={DEFAULT_PROFILE_URL + hallDetails.RD_UserName}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {hallDetails.RD_Name || 'No RD Info'}
                    </a>
                  </Typography>
                </>
              ) : (
                // when there is no on call ra tell user when they select that hall
                <Box
                  sx={{
                    textAlign: 'center',
                    padding: 3,
                    backgroundColor: 'background.paper',
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
              )}
            </Box>
          </Paper>
        )
      )}
    </FormControl>
  );
};

export default BasicSelect;
