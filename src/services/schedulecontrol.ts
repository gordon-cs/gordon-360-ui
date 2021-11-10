import http from './http';

type ScheduleControl = {
  IsSchedulePrivate: number;
  ModifiedTimeStamp?: Date;
  Description: string;
};

async function setSchedulePrivacy(makePrivate: boolean): Promise<void> {
  // 'Y' = private, 'N' = public
  await http.put(`schedulecontrol/privacy/ ${makePrivate ? 'Y' : 'N'}`);
}

// TODO: Convert route to send description via request body, so that encoding is unnecessary
async function setScheduleDescription(Description: string): Promise<void> {
  const replaced = Description.replace(/\//g, 'SlSh').replace(/:/g, 'CoLn').replace(/\./g, 'dOT');
  const encoded = encodeURIComponent(replaced);
  await http.put('schedulecontrol/description/' + encoded);
}

const getScheduleControl = async (username: string = ''): Promise<ScheduleControl> => {
  return await http.get(`schedulecontrol/${username}/`);
};

const scheduleControlService = {
  setSchedulePrivacy,
  setScheduleDescription,
  getScheduleControl,
};

export default scheduleControlService;
