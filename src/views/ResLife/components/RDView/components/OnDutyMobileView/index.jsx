import { useState, useEffect, useMemo } from 'react';
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
import { getAllHalls } from 'services/residentLife/halls';

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
  const [loading, setLoading] = useState(true);
  const [allHalls, setAllHalls] = useState([]);
  const [selectedHall, setSelectedHall] = useState('');
  const [allHallDuty, setAllHallDuty] = useState([]);
  const selectedHallDuty = useMemo(
    () => allHallDuty?.find((hall) => hall.Hall_ID === selectedHall) || null,
    [selectedHall, allHallDuty],
  );

  useEffect(() => {
    const fetchData = async () => {
      const [halls, onDutyAllHalls] = await Promise.all([getAllHalls(), fetchOnDutyData()]);

      setAllHalls(
        halls
          .filter((hall) => !VILLAGE_IDS.includes(hall.BuildingCode))
          .concat({ Name: 'The Village', BuildingCode: 'village' }),
      );

      const villageOnDuty = onDutyAllHalls.find((hall) => VILLAGE_IDS.includes(hall.Hall_ID));

      if (villageOnDuty) {
        const consolidatedVillage = {
          Hall_ID: 'village',
          Hall_Name: 'The Village',
          RA_Photo: villageOnDuty.RA_Photo,
          RA_Name: villageOnDuty.RA_Name,
          RA_UserName: villageOnDuty.RA_UserName,
          Preferred_Contact: villageOnDuty.Preferred_Contact,
          Check_In_Time: villageOnDuty.Check_In_Time,
          RD_Name: villageOnDuty.RD_Name,
          RD_UserName: villageOnDuty.RD_UserName,
        };

        const notVillageOnDuty = onDutyAllHalls.filter(
          (hall) => !VILLAGE_IDS.includes(hall.Hall_ID),
        );

        setAllHallDuty([...notVillageOnDuty, consolidatedVillage]); // pull info from village and remaining halls
      } else {
        setAllHallDuty(onDutyAllHalls);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">Select a Hall</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={selectedHall}
        label="Select a Hall"
        onChange={(e) => setSelectedHall(e.target.value)}
      >
        {allHalls.map(
          (
            hall, //populate list with all halls
          ) => (
            <MenuItem key={hall.BuildingCode} value={hall.BuildingCode}>
              {hall.Name}
            </MenuItem>
          ),
        )}
      </Select>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      ) : (
        selectedHall && (
          <Box
            sx={{
              textAlign: 'center',
              mt: '20px',
              backgroundColor: 'transparent',
              borderColor: 'warning.main',
              borderRadius: 2,
            }}
          >
            {selectedHallDuty?.RA_Name ? (
              <>
                <a
                  href={DEFAULT_PROFILE_URL + selectedHallDuty.RA_UserName || '#'}
                  target="_self"
                  rel=""
                >
                  <Avatar
                    src={selectedHallDuty.RA_Photo || 'https://placehold.jp/150x150.png'}
                    alt={selectedHallDuty.RA_Name || 'No RA'}
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
                  <strong>{selectedHallDuty.Hall_Name}</strong>
                </Typography>

                {/* RA Name  */}
                <Typography>
                  <strong>On-Duty: </strong>

                  <StyledLink
                    href={DEFAULT_PROFILE_URL + selectedHallDuty.RA_UserName || '#'}
                    className="gc360_text_link"
                    target="_self"
                    rel=""
                  >
                    {selectedHallDuty.RA_Name}{' '}
                  </StyledLink>
                </Typography>

                <Typography>
                  <strong>Contact:</strong>{' '}
                  {selectedHallDuty.Preferred_Contact?.includes('http') ? (
                    <StyledLink
                      href={selectedHallDuty.Preferred_Contact}
                      underline="hover"
                      className="gc360_text_link"
                      target="_self"
                      rel=""
                    >
                      Teams
                    </StyledLink>
                  ) : selectedHallDuty.Preferred_Contact ? (
                    <StyledLink
                      href={`tel:${selectedHallDuty.Preferred_Contact}`}
                      className="gc360_text_link"
                    >
                      {formatPhoneNumber(selectedHallDuty.Preferred_Contact)}
                    </StyledLink>
                  ) : (
                    <StyledLink className="gc360_text_link">No Contact Info</StyledLink>
                  )}
                </Typography>

                <Typography>
                  <strong>Check-In Time:</strong>{' '}
                  {selectedHallDuty.Check_In_Time
                    ? new Date(selectedHallDuty.Check_In_Time).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'No Check-In Time'}
                </Typography>

                <Typography>
                  <strong>Hall RD:</strong>{' '}
                  <StyledLink
                    href={DEFAULT_PROFILE_URL + selectedHallDuty.RD_UserName}
                    className="gc360_text_link"
                    target="_self"
                    rel=""
                  >
                    {selectedHallDuty.RD_Name || 'No RD Info'}{' '}
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
