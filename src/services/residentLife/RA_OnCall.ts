import http from 'services/http';

type RA = {
  Hall_ID: string;
  Hall_Name: string;
  RoomNumber: string;
  RA_Name: string;
  PreferredContact: string;
  Check_in_time: Date;
  RD_Email: string;
  RA_Profile_Link: string;
  RD_Profile_Link: string;
};

const fetchOnDutyData = async () => {
  try {
    return await http.get('Housing/ra/on-call/all');
  } catch (error) {
    console.error('Error fetching on-duty data:', error);
    throw error;
  }
};

// Fetches the information of an On Call RA from the API endpoint "Housing/ra/on-call/{hallId}"
const fetchOnDutyRA = (hallId: string): Promise<RA[]> => http.get(`ra/on-call/${hallId}`);

export { fetchOnDutyData, fetchOnDutyRA };
