import http from './http';
import { MembershipView, Participation, ParticipationDesc } from './membership';
import { filter } from './utils';

export enum RequestStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Denied = 'Denied',
}

export type RequestUpload = {
  Activity: string;
  Session: string;
  Username: number;
  Participation: Participation;
  DateSent: string;
  CommentText: string;
  Status: RequestStatus;
};

type RequestView = {
  RequestID: number;
  DateSent: string;
  ActivityCode: string;
  ActivityDescription: string;
  ActivityImagePath: string;
  SessionCode: string;
  SessionDescription: string;
  Username: number;
  FirstName: string;
  LastName: string;
  Participation: Participation;
  ParticipationDescription: ParticipationDesc;
  Description: string;
  Status: RequestStatus;
};

const approveRequest = (requestID: string): Promise<MembershipView> =>
  http.post(`requests/${requestID}/approve`, RequestStatus.Approved);

const denyRequest = (requestID: string): Promise<RequestView> =>
  http.post(`requests/${requestID}/deny`, RequestStatus.Denied);

const cancelRequest = (requestID: string): Promise<RequestView> =>
  http.del(`requests/${requestID}`);

const getRequests = (activityCode: string, sessionCode: string) =>
  http
    .get<RequestView[]>(`requests/activity/${activityCode}`)
    .then(filter((r) => r.SessionCode === sessionCode && r.Status === RequestStatus.Pending));

const requestMembership = (data: RequestUpload): Promise<RequestView> =>
  http.post(`requests`, data);

const getSentMembershipRequests = (): Promise<RequestView[]> => http.get('requests/users/current');

const requestService = {
  approveRequest,
  cancelRequest,
  denyRequest,
  getRequests,
  requestMembership,
  getSentMembershipRequests,
};

export default requestService;
