import http from '../http';

const checkIfCheckedIn = async (RA_ID: string): Promise<boolean> => {
  const response = await http.get<{ IsOnCall: boolean }>(`Housing/ras/${RA_ID}/is-on-call/`);
  return response.IsOnCall;
};

const submitCheckIn = async (RA_ID: string, hall_Ids: string[]): Promise<void> => {
  await http.post(`Housing/ras/${RA_ID}/checkin`, hall_Ids);
};

const getRACurrentHalls = (user_Name: string): Promise<String[]> =>
  http.get(`Housing/halls/on-calls/${user_Name}/locations`);

export { checkIfCheckedIn, submitCheckIn, getRACurrentHalls };
