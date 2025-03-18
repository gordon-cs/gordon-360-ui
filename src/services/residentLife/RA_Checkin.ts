import http from '../http';

const checkIfCheckedIn = async (ra_Id: string): Promise<boolean> => {
  const response = await http.get<{ IsOnCall: boolean }>(`Housing/ras/${ra_Id}/is-on-call/`);
  return response.IsOnCall;
};

const submitCheckIn = async (ra_Id: string, hall_Ids: string[]): Promise<void> => {
  await http.post(`Housing/ras/${ra_Id}/checkin`, hall_Ids);
};

const getRACurrentHalls = (user_Name: string): Promise<String[]> =>
  http.get(`Housing/halls/on-calls/${user_Name}/locations`);

export { checkIfCheckedIn, submitCheckIn, getRACurrentHalls };
