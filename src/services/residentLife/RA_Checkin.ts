import http from '../http';

const checkIfCheckedIn = async (raId: string): Promise<boolean> => {
  const response = await http.get<{ IsOnCall: boolean }>(`Housing/is-on-call/${raId}`);
  return response.IsOnCall;
};

const submitCheckIn = async (raId: string, hallIds: string[]): Promise<void> => {
  await http.post('Housing/ra/checkin', {
    RA_ID: raId,
    Hall_ID: hallIds,
  });
};

export { checkIfCheckedIn, submitCheckIn };
