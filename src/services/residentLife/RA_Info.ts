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

// Fetches the information of an RA from the API endpoint "Housing/ra/{hallId}/{roomNumber}"
const fetchRaInfo = (hallId: string, roomNumber: number): Promise<RA[]> =>
  http.get(`Housing/ra/${hallId}/${roomNumber}`);

const preferredContact = (raId: string, preferredContactMethod: string): Promise<Contact> =>
  http.post(`Housing/ra/contact?raId=${raId}&preferredContactMethod=${preferredContactMethod}`);

export { fetchRaInfo, preferredContact };
