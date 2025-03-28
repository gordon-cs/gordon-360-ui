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
  Photo_URL: string;
};

type Contact = {
  RA_ID: string;
  preferred_Contact_Method: string;
};

type RD = {
  Hall_Name: string;
  Building_Code: string;
  RD_Email: string;
  RD_ID: string;
  RD_Name: string;
};

type method = {
  RA_ID: string;
  Preferred_Contact_Method: string;
  Contact: string;
};

// Fetches the information of an RA from the API endpoint "Housing/ras"
const fetchRaInfo = (hallId: string, roomNumber: number): Promise<RA[]> =>
  http.get(`Housing/resident/ra${http.toQueryString({ hallId, roomNumber })}`);

// Fetches the information of an RD from the API endpoint "Housing/rds"
const fetchRdInfo = (Hall_ID: string): Promise<RD[]> => http.get(`Housing/rds?hallId=${Hall_ID}`);

// Adds the information of which method of contact the RA/AC prefers to the database
const preferredContact = (RA_ID: string, PreferredContactMethod: string): Promise<Contact> =>
  http.post(`Housing/ras/${RA_ID}/contact?preferredContactMethod=${PreferredContactMethod}`);

// gets the contact prefernce for the RA
const PrefContactMethod = (RA_ID: string): Promise<method> =>
  http.get(`Housing/ra/${RA_ID}/contact`);

export { fetchRaInfo, fetchRdInfo, preferredContact, PrefContactMethod };
