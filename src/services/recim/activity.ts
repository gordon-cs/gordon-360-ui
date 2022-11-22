import http from '../http';
import { Sport } from './sport';
import { Team } from './team';
import { Series } from './series';

export type Activity = {
  ID: number;
  Name: string;
  RegistrationStart: string;
  RegistrationEnd: string;
  RegistrationOpen: boolean;
  SportID: Sport;
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
  RegistrationOpen: boolean;
  SportID: Sport;
  StatusID: number;
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
): Promise<Activity[]> => {
  if (registrationOpen) {
    return http.get(`recim/activities?registrationOpen=${registrationOpen}`);
  } else {
    if (time) {
      return http.get(`recim/activities?active=${active}&time=${time}`);
    } else {
      return http.get(`recim/activities?active=${active}`);
    }
  }
};

const editActivity = (ID: number, updatedActivity: PatchActivity): Promise<CreatedActivity[]> =>
  http.patch(`recim/activities/${ID}`, updatedActivity);

export { createActivity, getActivityByID, getAllActivities, editActivity };
