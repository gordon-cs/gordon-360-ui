import http from '../http';

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

type RoomRange = {
  Hall_ID: string;
  Range_ID: number;
  RoomStart: string;
  RoomEnd: string;
};

type MissingRoom = {
  Room_Name: string;
  Building_Code: string;
  Room_Number: string;
};

type NewRoomRange = Omit<RoomRange, 'Range_ID'>;

// Post request to the API endpoint "Housing/roomrange" which adds the user inputed room range
// to our "Hall_Assignment_Ranges" database which the FetchRoomRanges() function pulls from
const addRoomRange = (newRange: NewRoomRange): Promise<RoomRange[]> =>
  http.post('Housing/roomrange', newRange);

// Post request to API endpoint "Housing/roomrageassignments" which assigns
// the user selected RA to the user selected room range
const assignPersonToRange = (newRange: AssignedRange) =>
  http.post('Housing/roomrangeassignments', newRange);

// Fetches the list of RA room range assignments from the API endpoint "Housing/roomrangeassignments"
const fetchAssignmentList = (): Promise<Assignment[]> => http.get('Housing/roomrangeassignments');

// Fetch assignments for a specific RA_ID from the API endpoint "Housing/roomrangeassignments/${raId}"
const fetchAssignmentsByRAId = (raId: string): Promise<Assignment[]> =>
  http.get(`Housing/roomrangeassignments/${raId}`);

// Fetches the list of room ranges from the API endpoint "Housing/roomranges"
const fetchRoomRanges = (): Promise<RoomRange[]> => http.get('Housing/roomranges');

// Fetches the list of rooms missing an assigned range using the API endpoint "Housing/roomranges/missedrooms"
const fetchMissingRooms = (): Promise<MissingRoom[]> => http.get('Housing/roomranges/missedrooms');

// Fetches the list of all the RAs from the API endpoint "Housing/ras"
const raList = (): Promise<RA[]> => http.get('Housing/ras');

// Delete request to the API endpoint "Housing/roomranges/assignment/${rangeID}" which
// deletes the user selected assignment
const removeAssignment = (rangeID: number) => http.del(`Housing/roomranges/assignment/${rangeID}`);

// Delete request to the API endpoint "Housing/roomranges/{rangeId}" which
// deletes the user selected room range
const removeRoomRange = (rangeID: number) => http.del(`Housing/roomranges/${rangeID}`);

export {
  addRoomRange,
  assignPersonToRange,
  fetchAssignmentList,
  fetchAssignmentsByRAId,
  fetchRoomRanges,
  raList,
  removeAssignment,
  removeRoomRange,
  fetchMissingRooms,
};
