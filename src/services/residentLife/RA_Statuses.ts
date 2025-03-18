import http from '../http';

export type Status = {
  Status_ID: number;
  Ra_ID: string;
  Status_Name: string;
  Is_Recurring: boolean;
  Frequency: string;
  Interval: number;
  Start_Time: string;
  End_Time: string;
  Start_Date: Date;
  End_Date: Date;
  Created_Date: Date;
  Available: Boolean;
};

type NewStatus = Omit<Status, 'StatusID' | 'CreatedDate'>;

const fetchRAStatuses = (ra_ID: string): Promise<Status[]> =>
  http.get(`Housing/ras/${ra_ID}/daily-status-events`);

export { fetchRAStatuses };
