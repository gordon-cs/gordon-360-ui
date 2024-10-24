import { DateTime } from 'luxon';
import http from './http';

// Export the type to make it available in other files
export type MissingItemReport = {
  recordID: number;
  firstName: string;
  lastName: string;
  category: string;
  brand?: string;
  description: string;
  locationLost: string;
  stolen: boolean;
  stolenDescription?: string;
  dateLost: DateTime;
  dateCreated: DateTime;
  phoneNumber: string;
  altPhone?: string;
  emailAddr: string;
  status: string;
  adminUsername?: string;
};

// Fetch the missing item reports from the database
const getMissingItemReports = async (): Promise<MissingItemReport[]> => {
  const response = await http.get<MissingItemReport[]>('lostandfound/missingitems');
  return response;
};

const lostAndFoundService = {
  getMissingItemReports,
};

export default lostAndFoundService;
