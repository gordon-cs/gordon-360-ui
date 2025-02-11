import http from './http';

/**
 * Missing item report object, representing the model of a report for communication with the
 * backend service.
 */
export type MissingItemReport = {
  recordID: number;
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

export type InitMissingItemReport = Omit<MissingItemReport, 'recordID'>;

/**
 * Missing Admin Action object, representing the model of an action taken on a missing item
 * report for communication with the backend.
 */
export type MissingAdminAction = {
  ID: number;
  missingID: number;
  action: string;
  actionDate: string;
  actionNote?: string;
  username: string;
  isPublic?: boolean;
};

export type InitAdminAction = Omit<MissingAdminAction, 'ID'>;

/**
 * Fetch a page of missing item reports.
 * @param reportStatus the status of the report for filtering
 * @param category the category to filter by
 * @param color the color to filter by
 * @param keywords keywords to filter by
 * @param lastId the ID of the last fetched report (for pagination)
 * @param pageSize number of items to fetch (defaults to 25)
 * @returns MissingItemReport[] array of missing item reports.
 */
const getMissingItemReports = (
  reportStatus?: string,
  category?: string,
  color?: string,
  keywords?: string,
  lastId?: number,
  pageSize?: number,
): Promise<MissingItemReport[]> => {
  const query = {
    status: reportStatus,
    category,
    color,
    keywords,
    lastId,
    pageSize,
  };

  return http.get<MissingItemReport[]>(`lostandfound/missingitems${http.toQueryString(query)}`);
};

/**
 * Fetch an array containing the full list of all missing item reports for
 * the currently logged in user.
 * @param username The username to get reports of
 * @returns MissingItemReport[] array of all missing item reports.
 */
const getMissingItemReportUser = (username: string): Promise<MissingItemReport[]> =>
  http.get<MissingItemReport[]>(
    `lostandfound/missingitems${http.toQueryString({ user: username })}`,
  );

/**
 * Fetch a single missing item report given an ID.
 * @param id the ID of the missing item report to fetch.
 * @returns MissingItemReport a single missing item report matching the ID.
 */
const getMissingItemReport = (id: number): Promise<MissingItemReport> =>
  http.get<MissingItemReport>(`lostandfound/missingitems/${id}`);

/**
 * Fetch admin actions for a missing item report given the report's ID.
 * @param id the ID of the missing item report to fetch admin actions for.
 * @returns MissingAdminAction[] the array of admin actions for the selected report.
 */
const getAdminActions = (id: number): Promise<MissingAdminAction[]> =>
  http.get<MissingAdminAction[]>(`lostandfound/missingitems/${id}/actionstaken`);

/**
 * Create a new missing item report, assigning it a unique ID.
 * @param data MissingItemReport object without a recordID, representing the report to be created.
 * @returns the unique ID generated by the backend service for the report.
 */
const createMissingItemReport = (data: InitMissingItemReport): Promise<number> => {
  const now = new Date();
  const formattedData = {
    ...data,
    dateLost: data.dateLost || now.toISOString(), // Ensures dateLost is set
    dateCreated: now.toISOString(),
    colors: data.colors || [], // Ensures colors is an array, even if not defined
  };
  return http.post<number>('lostandfound/missingitems', formattedData);
};

/**
 * Create an admin action for a missing item report given the report's ID.
 * @param id the ID of the missing item report to create an admin action on.
 * @param data MissingAdminAction object representing the new admin action to add to the report.
 * @returns the unique id generated by the backend for the admin action.
 */
const createAdminAction = (id: number, data: InitAdminAction): Promise<number> =>
  http.post<number>(`lostandfound/missingitems/${id}/actionstaken`, data);

/**
 * Update an existing missing item report.
 * @param data MissingItemReport object representing the updated report.
 * @param reportID The ID of the report to update.
 * @returns none
 */
const updateMissingItemReport = (data: MissingItemReport, reportID: number) => {
  const formattedData = {
    ...data,
    colors: data.colors || [], // Ensures colors is an array
  };
  return http.put(`lostandfound/missingitems/${reportID}`, formattedData);
};

/**
 * Update the status of an existing lost item report with the given ID.
 * @param id The ID of the missing item report.
 * @param status The new status for the report.
 * @returns none
 */
const updateReportStatus = (id: number, status: string): Promise<void> =>
  http.put<void>(`lostandfound/missingitems/${id}/${status}`);

/**
 * Found item report object, representing the model of a report for communication with the
 * backend service.
 */
export type FoundItemReport = {
  recordID: string;
  submitterUsername: string;
  matchingMissingID?: string; 
  category: string;
  colors: string[];
  brand?: string;
  description: string;
  locationFound: string;
  dateFound: string;
  dateCreated: string;
  finderWants: boolean;
  status: string;
  storageLocation: string;

  // Finder Information
  finderUsername?: string;
  finderFirstName?: string;
  finderLastName?: string;
  finderPhone?: string;
  finderEmail?: string;

  // Owner Information
  ownerUsername?: string;
  ownerFirstName?: string;
  ownerLastName?: string;
  ownerPhone?: string;
  ownerEmail?: string;

  adminActions?: FoundAdminAction[];
};

export type InitFoundItemReport = Omit<FoundItemReport, 'recordID'>;

/**
 * Found Admin Action object, representing the model of an action taken on a found item
 * report for communication with the backend.
 */
export type FoundAdminAction = {
  ID: number;
  foundID: string;
  action: string;
  actionDate: string;
  actionNote?: string;
  submitterUsername: string;
};

export type InitFoundAdminAction = Omit<FoundAdminAction, 'ID'>;


/**
 * Fetch an array containing the full list of all found item reports.
 * @returns FoundItemReport[] array of all found item reports.
 */

function getFoundItemReports(
  ID?: string,
  status?:string,
  color?: string,
  category?: string,
  keywords?: string,
): Promise<FoundItemReport[]> {
  // Define the query as a key-value object
  const query: Record<string, string> = {};

  if (ID) {
    query.ID = ID;
  }
  if (status) {
    query.status = status;
  }
  if (color) {
    query.color = color;
  }
  if (category) {
    query.category = category;
  }
  if (keywords) {
    query.keywords = keywords;
  }

  // GET /lostandfound/founditems?ID=xxx&color=xxx&category=xxx&keywords=xxx
  return http.get<FoundItemReport[]>(`lostandfound/founditems${http.toQueryString(query)}`);
}

/**
 * Create a new found item report, assigning it a unique ID.
 * @param data FoundItemReport object without a recordID, representing the report to be created.
 * @returns the unique ID generated by the backend service for the report.
 */
const createFoundItemReport = (data: InitFoundItemReport): Promise<string> => {
  const now = new Date().toISOString();

  const formattedData = {
    ...data,
    dateFound: data.dateFound || now,  // Ensure dateFound is always set
    dateCreated: now,
    colors: data.colors.length > 0 ? data.colors : [], // Ensure it's always an array

    // Ensure required finder details are included
    finderUsername: data.finderUsername || undefined,
    finderFirstName: data.finderFirstName || undefined,
    finderLastName: data.finderLastName || undefined,
    finderPhone: data.finderPhone || undefined,
    finderEmail: data.finderEmail || undefined,

    // Ensure required owner details are included
    ownerUsername: data.ownerUsername || undefined,
    ownerFirstName: data.ownerFirstName || undefined,
    ownerLastName: data.ownerLastName || undefined,
    ownerPhone: data.ownerPhone || undefined,
    ownerEmail: data.ownerEmail || undefined,
  };

  return http.post<string>('lostandfound/founditems', formattedData);
};



const getFoundItemReport = (itemID: string): Promise<FoundItemReport> => {
  return http.get<FoundItemReport>(`lostandfound/founditems/${itemID}`);
};


/**
 * Update an existing found item report.
 */
const updateFoundItemReport = (data: FoundItemReport, reportID: string): Promise<void> => {
  const formattedData = {
    ...data,
    colors: data.colors.length > 0 ? data.colors : [],
    matchingMissingID: data.matchingMissingID || null, 
  };

  return http.put<void>(`lostandfound/founditems/${reportID}`, formattedData);
};

/**
 * Update the status of an existing found item report with the given ID.
 * @param id The ID of the found item report.
 * @param status The new status for the report.
 * @returns none
 */
const updateFoundReportStatus = (id: string, status: string): Promise<void> =>
  http.put<void>(`lostandfound/founditems/${id}/${status}`);

/**
 * Create an admin action for a found item.
 */
const createFoundAdminAction = (itemID: string, data: InitFoundAdminAction): Promise<string> =>
  http.post<string>(`/api/lostandfound/founditems/${itemID}/actionstaken`, data);


/**
 * Fetch admin actions for a found item, by Tag ID:
 *   GET /lostandfound/founditems/{itemID}/actionstaken
 */
const getFoundAdminActions = (itemID: string): Promise<FoundAdminAction[]> =>
  http.get<FoundAdminAction[]>(`lostandfound/founditems/${itemID}/actionstaken`);

const lostAndFoundService = {
  getMissingItemReports,
  createMissingItemReport,
  getMissingItemReport,
  getMissingItemReportUser,
  createAdminAction,
  getAdminActions,
  updateMissingItemReport,
  updateReportStatus,

  createFoundItemReport,
  getFoundItemReports,
  getFoundItemReport,
  getFoundAdminActions,
  updateFoundItemReport,
  updateFoundReportStatus,
  createFoundAdminAction,
};

export default lostAndFoundService;
