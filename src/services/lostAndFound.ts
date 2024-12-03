import { DateTime } from 'luxon';
import http from './http';

/**
 * Missing item report object, representing the model of a report for communication with the
 * backend service.
 */
export type MissingItemReport = {
  recordID?: number;
  firstName?: string;
  lastName?: string;
  category: string;
  colors: string[]; // Ensures colors is always an array
  brand?: string;
  description: string;
  locationLost: string;
  stolen: boolean;
  stolenDescription?: string;
  dateLost: string;
  dateCreated: string;
  phone?: string;
  email?: string;
  status: string;
  submitterUsername: string;
  submitterID?: null;
  forGuest: boolean;
  adminActions?: MissingAdminAction[];
};

/**
 * Missing Admin Action object, representing the model of an action taken on a missing item
 * report for communication with the backend.
 */
export type MissingAdminAction = {
  ID?: number;
  missingID: number;
  action: string;
  actionDate: string;
  actionNote?: string;
  username: string;
  isPublic?: boolean;
};

/**
 * Fetch an array containing the full list of all missing item reports.
 * @returns MissingItemReport[] array of all missing item reports.
 */
const getMissingItemReports = async (): Promise<MissingItemReport[]> => {
  const response = await http.get<MissingItemReport[]>('lostandfound/missingitemsall');
  return response;
};

/**
 * Fetch an array containing the full list of all missing item reports for
 * the currently logged in user.
 * @returns MissingItemReport[] array of all missing item reports.
 */
const getMissingItemReportUser = async (): Promise<MissingItemReport[]> => {
  const response = await http.get<MissingItemReport[]>('lostandfound/missingitems');
  return response;
};

/**
 * Fetch a single missing item report given an ID.
 * @param id the ID of the missing item report to fetch.
 * @returns MissingItemReport a single missing item report matching the ID.
 */
const getMissingItemReport = async (id: number): Promise<MissingItemReport> => {
  const response = await http.get<MissingItemReport>(`lostandfound/missingitemsbyid/${id}`);
  return response;
};

/**
 * Fetch admin actions for a missing item report given the report's ID.
 * @param id the ID of the missing item report to fetch admin actions for.
 * @returns MissingAdminAction[] the array of admin actions for the selected report.
 */
const getAdminActions = async (id: number): Promise<MissingAdminAction[]> => {
  const response = await http.get<MissingAdminAction[]>(
    `lostandfound/missingitem/${id}/actionstakenall`,
  );
  return response;
};

/**
 * Create a new missing item report, assigning it a unique ID.
 * @param data MissingItemReport object without a recordID, representing the report to be created.
 * @returns the unique ID generated by the backend service for the report.
 */
const createMissingItemReport = async (
  data: Omit<MissingItemReport, 'recordID'>,
): Promise<number> => {
  const formattedData = {
    ...data,
    dateLost: data.dateLost || DateTime.now().toISO(), // Ensures dateLost is set
    dateCreated: DateTime.now().toISO(),
    colors: data.colors || [], // Ensures colors is an array, even if not defined
  };
  const response = await http.post<number>('/LostAndFound/missingitem', formattedData);
  return response;
};

/**
 * Create an admin action for a missing item report given the report's ID.
 * @param id the ID of the missing item report to create an admin action on.
 * @param data MissingAdminAction object representing the new admin action to add to the report.
 * @returns the unique id generated by the backend for the admin action.
 */
const createAdminAction = async (
  id: number,
  data: Omit<MissingAdminAction, 'id'>,
): Promise<number> => {
  const response = await http.post<number>(`lostandfound/missingitem/${id}/actiontaken`, data);
  return response;
};

/**
 * Update an existing missing item report.
 * @param data MissingItemReport object representing the updated report.
 * @param reportID The ID of the report to update.
 */
const updateMissingItemReport = async (data: MissingItemReport, reportID: number) => {
  const formattedData = {
    ...data,
    colors: data.colors || [], // Ensures colors is an array
  };
  const response = await http.put(`lostandfound/missingitem/${reportID}`, formattedData);
  return response;
};

/**
 * Update the status of an existing lost item report with the given ID.
 * @param id The ID of the missing item report.
 * @param status The new status for the report.
 */
const updateReportStatus = async (id: number, status: string): Promise<void> => {
  await http.put<void>(`lostandfound/missingitem/${id}/${status}`);
};

const lostAndFoundService = {
  getMissingItemReports,
  createMissingItemReport,
  getMissingItemReport,
  getMissingItemReportUser,
  createAdminAction,
  getAdminActions,
  updateMissingItemReport,
  updateReportStatus,
};

export default lostAndFoundService;
