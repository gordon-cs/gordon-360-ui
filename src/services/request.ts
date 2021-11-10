import http from './http';
import { Membership, ParticipationLevel } from './membership';

const enum RequestStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Denied = 'Denied',
}

type MembershipRequest = {
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

type Request = {
  REQUEST_ID: number;
  SESS_CDE: string;
  ACT_CDE: string;
  ID_NUM: number;
  PART_CDE: ParticipationLevel;
  DATE_SENT: Date;
  COMMENT_TXT: string;
  STATUS: RequestStatus;
};

const approveRequest = (requestID: string): Promise<Membership> => {
  return http.post(`requests/${requestID}/approve`);
};

const cancelRequest = (requestID: string): Promise<Request> => {
  return http.del(`requests/${requestID}`);
};

const denyRequest = (requestID: string): Promise<Request> => {
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

function requestMembership(data: object): Promise<Request> {
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
