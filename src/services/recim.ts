import http from './http';

// all Gordon Rec-IM http requests
type uploadActivity = {
  Name: string;
  RegistrationStart: Date;
  RegistrationEnd: Date;
  SportID: number;
  MinCapacity: number;
  MaxCapacity: number;
  SoloRegistration: boolean;
  Logo: string;
};

type uploadSeries = {
  Name: string;
  StartDate: Date;
  EndDate: Date;
  ActivityID: number;
  TypeID: number;
  NumberOfTeamsAdmitted: number; //used for subsequent series creation post initial setup
};

type uploadTeam = {
  Name: string;
  StatusID: number;
  ActivityID: number;
  PRivate: boolean;
  Logo: string;
};

type uploadSport = {
  Name: string;
  Description: string;
  Rules: string;
  Logo: string;
};

type uploadMatch = {
  StartTime: Date;
  SeriesID: number;
  SurfaceID: number;
  TeamIDs: Array<number>;
};

type uploadParticipantNotification = {
  Message: string;
  EndDate: Date;
};

const createNewActivity = async (newActivity: uploadActivity) => {
  await http.post('recim/activities', newActivity);
};

const getActivityByID = async (ID: number): Promise<Object[]> => {
  return await http.get(`recim/activities/${ID}`);
};

const getAllActivities = async (active: boolean, time: String): Promise<Object[]> => {
  if (time) {
    return await http.get(`recim/activities?${active}&${time}`);
  } else {
    return await http.get(`recim/activities?${active}`);
  }
};

const getAllSports = async (): Promise<Object[]> => {
  return await http.get(`recim/sports`);
};

export { getAllActivities, createNewActivity, getActivityByID, getAllSports };
