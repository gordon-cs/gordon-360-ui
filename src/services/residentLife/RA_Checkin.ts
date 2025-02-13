import http from '../http';

const checkIfCheckedIn = async (raId: string): Promise<boolean> => {
  //const response = await http.get<{ IsOnCall: boolean }>(`Housing/ras/${raId}/is-on-call/`);
  const response = await http.get<{ IsOnCall: boolean }>(`Housing/ras/${'50223925'}/is-on-call/`);
  return response.IsOnCall;
};

const submitCheckIn = async (raId: string, hallIds: string[]): Promise<void> => {
  await http.post(`Housing/ras/${raId}/checkin`, hallIds);
};

const getRACurrentHalls = (userName: string): Promise<String[]> =>
  //http.get(`Housing/halls/on-calls/${userName}/locations`);
  http.get(`Housing/halls/on-calls/${'Daniel.Fagerland'}/locations`);

export { checkIfCheckedIn, submitCheckIn, getRACurrentHalls };
