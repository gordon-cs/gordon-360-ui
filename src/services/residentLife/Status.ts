import http from '../http';

export type Status = {
  Status_Name: string;
  Status_ID: number;
  RA_ID: string;
  Is_Recurring: boolean;
  Days_Of_Week: string;
  Start_Date: Date;
  End_Date: Date;
  Created_Date: Date;
  Available: boolean;
};
type NewStatus = Omit<Status, 'Status_ID' | 'Created_Date'>;

const createStatus = (New_Status: NewStatus): Promise<Status[]> =>
  http.post('Housing/ras/status-event', New_Status);

const updateStatus = (Status_ID: number, Updated_Status: Partial<NewStatus>): Promise<Status[]> =>
  http.patch(`Housing/ras/status-event/${Status_ID}`, Updated_Status);

const removeStatus = (Status_ID: number) => http.del(`Housing/ras/status-event/${Status_ID}`);

const getActiveStatusListForRA = (RA_ID: string): Promise<Status[]> =>
  http.get(`Housing/ras/${RA_ID}/active-status-events`);

const getDailyStatusListForRA = (RA_ID: string): Promise<String[]> =>
  http.get(`Housing/ras/${RA_ID}/daily-status-events`);

export {
  createStatus,
  removeStatus,
  getActiveStatusListForRA,
  getDailyStatusListForRA,
  updateStatus,
};
