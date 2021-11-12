import http from './http';
import { MEMBERSHIP, Participation, ParticipationDesc } from './membership';

enum RequestStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Denied = 'Denied',
}

export type MembershipRequest = {
  ActivityCode: string;
  ActivityDescription: string;
  /** Comment or text */
  CommentText: string;
  DateSent: string;
  FirstName: string;
  IDNumber: number;
  LastName: string;
  Participation: Participation;
  ParticipationDescription: ParticipationDesc;
  RequestApproved: RequestStatus;
  RequestID: number;
  SessionCode: string;
  SessionDescription: string;
};

type REQUEST = {
  REQUEST_ID: number;
  SESS_CDE: string;
  ACT_CDE: string;
  ID_NUM: number;
  PART_CDE: Participation;
  DATE_SENT: Date;
  COMMENT_TXT: string;
  STATUS: RequestStatus;
};

const approveRequest = (requestID: string): Promise<MEMBERSHIP> => {
  return http.post(`requests/${requestID}/approve`);
};

const cancelRequest = (requestID: string): Promise<REQUEST> => {
  return http.del(`requests/${requestID}`);
};

const denyRequest = (requestID: string): Promise<REQUEST> => {
  return http.post(`requests/${requestID}/deny`);
};

const getRequests = async (
  activityCode: string,
  sessionCode: string,
): Promise<MembershipRequest[]> => {
  let allRequests: MembershipRequest[] = await http.get(`requests/activity/${activityCode}`);
  return filterCurrentRequests(allRequests, sessionCode);
};

/**
 * Filters only penidng requests for an activity
 *
 * @param requests List of all the requests for an activity
 * @param sessionCode Identifier for a session
 * @returns Filtered requests
 */
const filterCurrentRequests = (
  requests: MembershipRequest[],
  sessionCode: string,
): MembershipRequest[] =>
  requests.filter(
    (r) => r.SessionCode === sessionCode && r.RequestApproved === RequestStatus.Approved,
  );

function requestMembership(data: REQUEST): Promise<REQUEST> {
  return http.post(`requests`, data);
}

const requestService = {
  approveRequest,
  cancelRequest,
  denyRequest,
  getRequests,
  requestMembership,
};

export default requestService;
