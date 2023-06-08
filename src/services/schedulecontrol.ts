import http from './http';

type ScheduleControl = {
  IsSchedulePrivate: number;
  ModifiedTimeStamp?: Date;
  Description: string;
};

const setSchedulePrivacy = (makePrivate: boolean): Promise<void> =>
  http.put(`schedulecontrol/privacy/ ${makePrivate ? 'Y' : 'N'}`); // 'Y' = private, 'N' = public

async function setScheduleDescription(description: string): Promise<void> {
  await http.put('schedulecontrol/description/', description);
}

const getScheduleControl = (username: string = ''): Promise<ScheduleControl> =>
  http.get(`schedulecontrol/${username}/`);

const scheduleControlService = {
  setSchedulePrivacy,
  setScheduleDescription,
  getScheduleControl,
};

export default scheduleControlService;
