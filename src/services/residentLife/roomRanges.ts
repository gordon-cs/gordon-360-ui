import http from '../http';

type RoomRange = {
  Hall_ID: string;
  Range_ID: number;
  RoomStart: string;
  RoomEnd: string;
};

type NewRoomRange = {
  Hall_ID: string;
  RoomStart: string;
  RoomEnd: string;
};

type AssignedRange = {
  Range_ID: number;
  Ra_ID: string;
};

type Assignment = {
  RA_ID: string;
  Fname: string;
  Lname: string;
  Hall_Name: string;
  Room_Start: string;
  Room_End: string;
  Range_ID: number;
};

type RA = {
  FirstName: string;
  LastName: string;
  Dorm: string;
  BLDG_Code: string;
  RoomNumber: string;
  Email: string;
  PhoneNumber: string;
  ID: string;
};

// Fetches the list of room ranges from the API endpoint "Housing/roomrange/all"
const fetchRoomRanges = (): Promise<RoomRange[]> => http.get('Housing/roomrange/all');

// Fetches the list of all the RAs from the API endpoint "Housing/ra/all"
const raList = (): Promise<RA[]> => http.get('Housing/ra/all');

// Fetches the list of RA room range assignments from the API endpoint "Housing/roomrange/assignment/all"
const fetchAssignmentList = (): Promise<Assignment[]> =>
  http.get('Housing/roomrange/assignment/all');

// Post request to the API endpoint "Housing/roomrange" which adds the user inputed room range
// to our "Hall_Assignment_Ranges" database which the FetchRoomRanges() function pulls from
const addRoomRange = (newRange: NewRoomRange): Promise<RoomRange[]> =>
  http.post('Housing/roomrange', newRange);

// Delete request to the API endpoint "Housing/roomrange/{rangeId}" which
// deletes the user selected room range
const removeRoomRange = (rangeID: number) => http.del(`Housing/roomrange/${rangeID}`);

const removeAssignment = (rangeID: number) => http.del(`Housing/roomrange/assignment/${rangeID}`);

// Post request to API endpoint "Housing/roomrage/assign-ra" which assigns
// the user selected RA to the user selected room range
const assignPersonToRange = (newRange: AssignedRange) =>
  http.post('Housing/roomrange/assign-ra', newRange);

export {
  fetchRoomRanges,
  raList,
  fetchAssignmentList,
  addRoomRange,
  removeRoomRange,
  removeAssignment,
  assignPersonToRange,
};
