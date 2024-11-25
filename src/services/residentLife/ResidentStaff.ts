import http from '../http';

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

type Contact = {
  raId: string;
  preferredContactMethod: string;
};

type RD = {
  HallName: string;
  BuildingCode: string;
  RD_Email: string;
  RD_Id: string;
  RD_Name: string;
};

// Fetches the information of an RA from the API endpoint "Housing/ra/{hallId}/{roomNumber}"
const fetchRaInfo = (hallId: string, roomNumber: number): Promise<RA[]> =>
  http.get(`Housing/ra/${hallId}/${roomNumber}`);

// Fetches the information of an RD from the API endpoint "Housing/rd/{hallId}"
const fetchRdInfo = (hallId: string): Promise<RD[]> => http.get(`Housing/rd/${hallId}`);

// Adds the information of which method of contact the RA/AC prefers to the database
const preferredContact = (raId: string, preferredContactMethod: string): Promise<Contact> =>
  http.post(`Housing/ra/contact?raId=${raId}&preferredContactMethod=${preferredContactMethod}`);

export { fetchRaInfo, fetchRdInfo, preferredContact };
