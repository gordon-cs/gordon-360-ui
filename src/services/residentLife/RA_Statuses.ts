import http from '../http';

export type Status = {
  StatusID: number;
  RaID: string;
  StatusName: string;
  IsRecurring: boolean;
  Frequency: string;
  Interval: number;
  Start_Time: string;
  End_Time: string;
  StartDate: Date;
  EndDate: Date;
  CreatedDate: Date;
  Available: Boolean;
};

type NewStatus = Omit<Status, 'StatusID' | 'CreatedDate'>;

const fetchRAStatuses = (raID: string): Promise<Status[]> =>
  http.get(`Housing/ras/${raID}/daily-status-events`);

export { fetchRAStatuses };
