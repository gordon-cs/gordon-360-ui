import http from 'services/http';

type RA = {
  Hall_ID: string;
  Hall_Name: string;
  Room_Number: string;
  RA_Name: string;
  Preferred_Contact: string;
  Check_In_Time: Date;
  RD_Email: string;
  RD_Name: string;
  RA_UserName: string;
  RD_UserName: string;
  RA_Photo: string;
};

const fetchOnDutyData = async () => {
  try {
    return await http.get('Housing/halls/on-calls');
  } catch (error) {
    console.error('Error fetching on-duty data:', error);
    throw error;
  }
};

// Fetches the information of an On Call RA from the API endpoint "Housing/ra/on-call/{hallId}"
const fetchOnDutyRA = (hallId: string): Promise<RA[]> =>
  http.get(`Housing/halls/${hallId}/on-call`);

export { fetchOnDutyData, fetchOnDutyRA };
