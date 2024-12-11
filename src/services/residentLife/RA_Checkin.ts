import http from '../http';

const checkIfCheckedIn = async (raId: string): Promise<boolean> => {
  const response = await http.get<{ IsOnCall: boolean }>(`Housing/ras/${raId}/is-on-call/`);
  return response.IsOnCall;
};

const submitCheckIn = async (raId: string, hallIds: string[]): Promise<void> => {
  await http.post(`Housing/ras/${raId}/checkin`, {
    Hall_ID: hallIds,
  });
};

export { checkIfCheckedIn, submitCheckIn };
