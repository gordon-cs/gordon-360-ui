import http from '../http';
import { Sport } from './sport';
import { Team } from './team';
import { Series } from './series';
import { Lookup } from './recim';

export type Activity = {
  ID: number;
  Name: string;
  RegistrationStart: string;
  RegistrationEnd: string;
  RegistrationOpen: boolean;
  SportID: Sport;
  TypeID: number;
  MinCapacity: number;
  MaxCapacity: number;
  SoloRegistration: boolean;
  Logo: string;
  Series: Series[];
  Team: Team[];
};

type CreatedActivity = {
  ID: number;
  Name: string;
  RegistrationStart: string;
  RegistrationEnd: string;
  SportID: Sport;
  StatusID: number;
  TypeID: number;
  MinCapacity: number;
  MaxCapacity: number;
  SoloRegistration: boolean;
  Completed: boolean;
};

type UploadActivity = {
  Name: string;
  RegistrationStart: string;
  RegistrationEnd: string;
  SportID: number;
  TypeID: number;
  MinCapacity: number;
  MaxCapacity: number;
  SoloRegistration: boolean;
  Logo: string;
};

type PatchActivity = {
  Name: string;
  RegistrationStart: string;
  RegistrationEnd: string;
  SportID: number;
  TypeID: number;
  StatusID: number;
  MinCapacity: number;
  MaxCapacity: number;
  SoloRegistration: boolean;
  Logo: string;
  Completed: boolean;
};

//Activity Routes
const createActivity = (newActivity: UploadActivity): Promise<CreatedActivity> =>
  http.post('recim/activities', newActivity);

const getActivityByID = (ID: number): Promise<Activity> => http.get(`recim/activities/${ID}`);

const getAllActivities = (
  active: boolean,
  time: String,
  registrationOpen: boolean,
): Promise<Activity[]> =>
  http.get(`recim/activities?active=${active}&time=${time}&registrationOpen=${registrationOpen}`);

const getActivityStatusTypes = (): Promise<Lookup[]> =>
  http.get(`recim/activities/lookup?type=status`);

const getActivityTypes = (): Promise<Lookup[]> => http.get(`recim/activities/lookup?type=activity`);

const editActivity = (ID: number, updatedActivity: PatchActivity): Promise<CreatedActivity[]> => {
  console.log(updatedActivity);
  return http.patch(`recim/activities/${ID}`, { name: 'Flag Football' });
};

export {
  createActivity,
  getActivityByID,
  getActivityStatusTypes,
  getAllActivities,
  editActivity,
  getActivityTypes,
};
