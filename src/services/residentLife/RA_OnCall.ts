import { NotFoundError } from 'services/error';
import http from 'services/http';

type RAOnCall = {
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

const fetchOnDutyData = async (): Promise<RAOnCall[]> => {
  try {
    return await http.get('Housing/halls/on-calls');
  } catch (error) {
    if (error instanceof NotFoundError) {
      return [];
    } else {
      console.error('Error fetching on-duty data:', error);
      throw error;
    }
  }
};

// Fetches the information of an On Call RA from the API endpoint "Housing/ra/on-call/{hallId}"
const fetchOnDutyRA = (hallId: string): Promise<RAOnCall[]> =>
  http.get(`Housing/halls/${hallId}/on-call`);

export { fetchOnDutyData, fetchOnDutyRA };
