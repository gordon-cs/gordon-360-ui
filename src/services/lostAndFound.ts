import { DateTime, StringUnitLength } from 'luxon';
import http from './http';

type MissingItemReport = {
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

const getMissingItemReports = async (): Promise<MissingItemReport> => {
  return await http.get('/MissingItems');
};

const lostAndFoundService = {
  getMissingItemReports,
};

export default lostAndFoundService;
