import http from '../http';
import { Sport } from './sport';
import { Team } from './team';
import { Series } from './series';
import { Lookup } from './recim';

type BaseActivity = {
  Name: string;
  StartDate: string;
  EndDate: string;
  RegistrationStart: string;
  RegistrationEnd: string;
  SportID: Sport;
  TypeID: number;
  MinCapacity: number;
  MaxCapacity: number;
  SoloRegistration: boolean;
};

export type Activity = BaseActivity & {
  ID: number;
  RegistrationOpen: boolean;
  Logo: string;
  Series: Series[];
  Team: Team[];
};

type CreatedActivity = BaseActivity & {
  ID: number;
  StatusID: number;
  Completed: boolean;
};

type UploadActivity = BaseActivity & {
  Logo: string;
};

type PatchActivity = BaseActivity & {
  StatusID: number;
  Logo: string;
  Completed: boolean;
};

//Activity Routes
const createActivity = (newActivity: UploadActivity): Promise<CreatedActivity> =>
  http.post('recim/activities', newActivity);

const getActivityByID = (ID: number): Promise<Activity> => http.get(`recim/activities/${ID}`);

const getActivities = (active: boolean, time: String): Promise<Activity[]> => {
  if (time) return http.get(`recim/activities?active=${active}&time=${time}`);
  if (active) return http.get(`recim/activities?active=${active}`);
  return http.get(`recim/activities`);
};

const getActivityStatusTypes = (): Promise<Lookup[]> =>
  http.get(`recim/activities/lookup?type=status`);

const getActivityTypes = (): Promise<Lookup[]> => http.get(`recim/activities/lookup?type=activity`);

const editActivity = (ID: number, updatedActivity: PatchActivity): Promise<CreatedActivity[]> => {
  return http.patch(`recim/activities/${ID}`, updatedActivity);
};

export {
  createActivity,
  getActivityByID,
  getActivityStatusTypes,
  getActivities,
  editActivity,
  getActivityTypes,
};
