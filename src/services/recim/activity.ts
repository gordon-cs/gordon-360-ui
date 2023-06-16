import http from '../http';
import { Sport } from './sport';
import { Team } from './team';
import { Series } from './series';
import { Lookup } from './recim';

type BaseActivity = {
  Name: string;
  StartDate?: string;
  EndDate?: string;
  RegistrationStart: string;
  RegistrationEnd: string;
  MinCapacity?: number;
  MaxCapacity?: number;
  SoloRegistration: boolean;
  SeriesScheduleID?: number;
};

export type Activity = BaseActivity & {
  ID: number;
  RegistrationOpen: boolean;
  Status: string;
  Type: string;
  Sport: Sport;
  Logo: string;
  Series: Series[];
  Team: Team[];
};

export type CreatedActivity = BaseActivity & {
  ID: number;
  StatusID: number;
  Completed: boolean;
};

type UploadActivity = BaseActivity & {
  SportID: number;
  TypeID: number;
  Logo: string;
};

type PatchActivity = BaseActivity & {
  SportID: number;
  TypeID: number;
  StatusID: number;
  Logo: string;
  IsLogoUpdate: boolean;
  Completed: boolean;
};

//Activity Routes
const createActivity = (newActivity: UploadActivity): Promise<CreatedActivity> =>
  http.post('recim/activities', newActivity);

const deleteActivity = (ID: number): Promise<CreatedActivity> => http.del(`recim/activities/${ID}`);

const getActivityByID = (ID: number): Promise<Activity> => http.get(`recim/activities/${ID}`);

const getActivities = (active: boolean, time: String): Promise<Activity[]> => {
  if (time) return http.get(`recim/activities?active=${active}&time=${time}`);
  if (typeof active !== 'undefined') return http.get(`recim/activities?active=${active}`);
  return http.get(`recim/activities`);
};

const isActivityRegisterable = (ID: number): Promise<boolean> =>
  http.get(`recim/activities/${ID}/registerable`);

const getActivityStatusTypes = (): Promise<Lookup[]> =>
  http.get(`recim/activities/lookup?type=status`);

const getActivityTypes = (): Promise<Lookup[]> => http.get(`recim/activities/lookup?type=activity`);

const editActivity = (ID: number, updatedActivity: PatchActivity): Promise<CreatedActivity[]> =>
  http.patch(`recim/activities/${ID}`, updatedActivity);

export {
  createActivity,
  deleteActivity,
  getActivityByID,
  getActivityStatusTypes,
  isActivityRegisterable,
  getActivities,
  editActivity,
  getActivityTypes,
};
