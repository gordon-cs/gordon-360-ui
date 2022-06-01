import http from './http';
import { MEMBERSHIP, Participation, ParticipationDesc } from './membership';
import { filter } from './utils';

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

const approveRequest = (requestID: string): Promise<MEMBERSHIP> =>
  http.post(`requests/${requestID}/approve`);

const cancelRequest = (requestID: string): Promise<REQUEST> => http.del(`requests/${requestID}`);

const denyRequest = (requestID: string): Promise<REQUEST> =>
  http.post(`requests/${requestID}/deny`);

const getRequests = (activityCode: string, sessionCode: string) =>
  http
    .get<MembershipRequest[]>(`requests/activity/${activityCode}`)
    .then(
      filter((r) => r.SessionCode === sessionCode && r.RequestApproved === RequestStatus.Pending),
    );

const requestMembership = (data: REQUEST): Promise<REQUEST> => http.post(`requests`, data);

const getSentMembershipRequests = (): Promise<MembershipRequest[]> => http.get('requests/student/');

const requestService = {
  approveRequest,
  cancelRequest,
  denyRequest,
  getRequests,
  requestMembership,
  getSentMembershipRequests,
};

export default requestService;
