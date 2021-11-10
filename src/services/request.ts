import http from './http';
import { ParticipationLevel } from './membership';

const enum RequestStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Denied = 'Denied',
}

type Request = {
  ActivityCode: string;
  ActivityDescription: string;
  /** Comment or text */
  CommentText: string;
  DateSent: string;
  FirstName: string;
  IDNumber: number;
  LastName: string;
  Participation: ParticipationLevel;
  ParticipationDescription: keyof typeof ParticipationLevel;
  RequestApproved: RequestStatus;
  RequestID: number;
  SessionCode: string;
  SessionDescription: string;
};

/**
 * Approve request
 *
 * @param {string} requestID Request object
 * @returns {Promise<any>} Response
 */
const approveRequest = (requestID: string): Promise<any> => {
  return http.post(`requests/${requestID}/approve`);
};

/**
 * Cancel request with given request id
 *
 * @param {string} requestID request id
 * @returns {Promise.<Object>} deleted object
 */
const cancelRequest = (requestID: string): Promise<object> => {
  return http.del(`requests/${requestID}`);
};

/**
 * Deny request
 *
 * @param {string} requestID Request object
 * @returns {Promise<any>} Response
 */
const denyRequest = (requestID: string): Promise<any> => {
  return http.post(`requests/${requestID}/deny`);
};

const getRequests = async (activityCode: string, sessionCode: string): Promise<Request[]> => {
  let allRequests: Request[] = await http.get(`requests/activity/${activityCode}`);
  return filterCurrentRequests(allRequests, sessionCode);
};

/**
 * Filters only penidng requests for an activity
 *
 * @param {Request[]} requests List of all the requests for an activity
 * @param {string} sessionCode Identifier for a session
 * @returns {Request[]} Filtered requests
 */
const filterCurrentRequests = (requests: Request[], sessionCode: string): Request[] =>
  requests.filter(
    (r) => r.SessionCode === sessionCode && r.RequestApproved === RequestStatus.Approved,
  );

/**
 * Request membership
 *
 * @param {Object} data Data passed in
 * @returns {Promise<Object>} Response body
 */
function requestMembership(data: object): Promise<object> {
  return http.post(`requests`, data);
}

/**
 * Get the difference in days bewteen today and specified date
 *
 * @param date The date to diff against
 * @returns integer and printable string
 */
const getDiffDays = function (date: Date) {
  let currentDate = new Date();
  let requestDate = new Date(date);
  let timeDiff = Math.abs(currentDate.getTime() - requestDate.getTime());
  let diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
  let diffString;
  if (diffDays === 0) {
    diffString = 'Today';
  } else if (diffDays === 1) {
    diffString = 'Yesterday';
  } else {
    diffString = diffDays.toString() + ' days ago';
  }
  return diffString;
};

const requestService = {
  approveRequest,
  cancelRequest,
  denyRequest,
  getDiffDays,
  getRequests,
  requestMembership,
};

export default requestService;
