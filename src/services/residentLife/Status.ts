import http from '../http';

export type Status = {
  StatusName: string;
  StatusID: number;
  RaID: string;
  IsRecurring: boolean;
  Frequency: string;
  Interval: number;
  Start_Date: Date;
  End_Date: Date;
  Created_Date: Date;
  Available: boolean;
};
type NewStatus = Omit<Status, 'StatusID' | 'Created_Date'>;

const createStatus = (newStatus: NewStatus): Promise<Status[]> =>
  http.post('Housing/ras/status-event', newStatus);

//Update Status??
// const updateStatus = (StatusID: number, newStatus: Status) =>
//   http.patch(`Housing/ras/status-event/${StatusID}`, newStatus);

const updateStatus = (StatusID: number, updatedStatus: Partial<NewStatus>): Promise<Status[]> =>
  http.patch(`Housing/ras/status-event/${StatusID}`, updatedStatus);

const removeStatus = (StatusID: number) => http.del(`Housing/ras/status-event/${StatusID}`);

const getActiveStatusListForRA = (RaID: string): Promise<Status[]> =>
  http.get(`Housing/ras/${RaID}/active-status-events`);
// http.get(`Housing/ras/50223925/active-status-events`);

const getDailyStatusListForRA = (RaID: string): Promise<String[]> =>
  http.get(`Housing/ras/${RaID}/daily-status-events`);
//   http.get(`Housing/ras/50223925/daily-status-events`);

export {
  createStatus,
  removeStatus,
  getActiveStatusListForRA,
  getDailyStatusListForRA,
  updateStatus,
};
