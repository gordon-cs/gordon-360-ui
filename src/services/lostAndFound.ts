import { DateTime } from 'luxon';
import http from './http';

export type MissingItemReport = {
  recordID?: number;
  firstName: string;
  lastName: string;
  category: string;
  colors: string[]; // Updated to an array of strings
  brand?: string;
  description: string;
  locationLost: string;
  stolen: boolean;
  stolenDescription?: string;
  dateLost: string;
  dateCreated: string;
  phoneNumber: string;
  altPhone?: string;
  emailAddr: string;
  status: string;
  adminUsername?: string;
};

const getMissingItemReports = async (): Promise<MissingItemReport[]> => {
  const response = await http.get<MissingItemReport[]>('lostandfound/missingitems');
  return response;
};

const createMissingItemReport = async (
  data: Omit<MissingItemReport, 'recordID'>,
): Promise<number> => {
  // Convert dates to ISO string format and make sure colors is an array
  const formattedData = {
    ...data,
    dateLost: data.dateLost,
    dateCreated: DateTime.now().toISO(),
    colors: data.colors || [], // Ensure colors is an array
  };
  const response = await http.post<number>('/LostAndFound/missingitem', formattedData);
  return response;
};

const lostAndFoundService = {
  getMissingItemReports,
  createMissingItemReport,
};

export default lostAndFoundService;
