import { NotFoundError } from 'services/error';
import http from '../http';

const checkIfCheckedIn = async (RA_ID: string): Promise<boolean> => {
  const response = await http.get<{ IsOnCall: boolean }>(`Housing/ras/${RA_ID}/is-on-call/`);
  return response.IsOnCall;
};

const submitCheckIn = async (RA_ID: string, Hall_IDs: string[]): Promise<void> => {
  await http.post(`Housing/ras/${RA_ID}/checkin`, Hall_IDs);
};

const getRACurrentHalls = async (User_Name: string): Promise<String[]> => {
  try {
    return await http.get(`Housing/halls/on-calls/${User_Name}/locations`);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return [];
    } else {
      console.error(error);
      throw error;
    }
  }
};

export { checkIfCheckedIn, submitCheckIn, getRACurrentHalls };
