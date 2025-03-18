import http from '../http';

type RA = {
  First_Name: string;
  Last_Name: string;
  Dorm: string;
  BLDG_Code: string;
  Room_Number: string;
  Email: string;
  Phone_Number: string;
  ID: string;
};

type Contact = {
  raId: string;
  preferred_Contact_Method: string;
};

type RD = {
  Hall_Name: string;
  Building_Code: string;
  RD_Email: string;
  RD_Id: string;
  RD_Name: string;
};

type method = {
  Ra_ID: string;
  Preferred_Contact_Method: string;
  Contact: string;
};

// Fetches the information of an RA from the API endpoint "Housing/ras"
const fetchRaInfo = (hallId: string, roomNumber: number): Promise<RA[]> =>
  http.get(`Housing/resident/ra${http.toQueryString({ hallId, roomNumber })}`);

// Fetches the information of an RD from the API endpoint "Housing/rds"
const fetchRdInfo = (hallId: string): Promise<RD[]> => http.get(`Housing/rds?hallId=${hallId}`);

// Adds the information of which method of contact the RA/AC prefers to the database
const preferredContact = (raId: string, preferredContactMethod: string): Promise<Contact> =>
  http.post(`Housing/ras/${raId}/contact?preferredContactMethod=${preferredContactMethod}`);

// gets the contact prefernce for the RA
const PrefContactMethod = (raId: string): Promise<method> => http.get(`Housing/ra/${raId}/contact`);

export { fetchRaInfo, fetchRdInfo, preferredContact, PrefContactMethod };
