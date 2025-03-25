import http from '../http';

export type Status = {
  Status_ID: number;
  RA_ID: string;
  Status_Name: string;
  Days_Of_Week: string;
  Interval: number;
  Start_Time: string;
  End_Time: string;
  Start_Date: Date;
  End_Date: Date;
  Created_Date: Date;
  Available: Boolean;
};

type NewStatus = Omit<Status, 'StatusID' | 'CreatedDate'>;

const fetchRAStatuses = (RA_ID: string): Promise<Status[]> =>
  http.get(`Housing/ras/${RA_ID}/daily-status-events`);

const createStatus = (New_Status: NewStatus): Promise<Status[]> =>
  http.post('Housing/ras/status-event', New_Status);

const updateStatus = (Status_ID: number, Updated_Status: Partial<NewStatus>): Promise<Status[]> =>
  http.patch(`Housing/ras/status-event/${Status_ID}`, Updated_Status);

const removeStatus = (Status_ID: number) => http.del(`Housing/ras/status-event/${Status_ID}`);

const getActiveStatusListForRA = (RA_ID: string): Promise<Status[]> =>
  http.get(`Housing/ras/${RA_ID}/active-status-events`);

export { fetchRAStatuses, createStatus, removeStatus, getActiveStatusListForRA, updateStatus };
