import http from './http';
import sessionService from './session';
import { compareByProperty, filter, sort } from './utils';

export type Membership = {
  // TODO: Currently never set by the API, always null
  AccountPrivate: Privacy | null;
  ActivityCode: string;
  ActivityDescription: string;
  ActivityImage: string;
  ActivityImagePath: string;
  Description: string;
  EndDate: string;
  FirstName: string;
  GroupAdmin: boolean;
  IDNumber: number;
  LastName: string;
  MembershipID: number;
  Participation: Participation;
  ParticipationDescription: ParticipationDesc;
  Privacy: boolean | null;
  SessionCode: string;
  SessionDescription: string;
  StartDate: string;
};

export type MembershipView = {
  AccountPrivate: Privacy | null;
  ActivityCode: string;
  ActivityDescription: string;
  ActivityImage: string;
  ActivityImagePath: string;
  Description: string;
  EndDate: string;
  FirstName: string;
  GroupAdmin: boolean;
  Username: string;
  LastName: string;
  MembershipID: number;
  Participation: Participation;
  ParticipationDescription: ParticipationDesc;
  Privacy: boolean | null;
  SessionCode: string;
  SessionDescription: string;
  StartDate: string;
};

enum Privacy {
  Public,
  Private,
}

export enum Participation {
  Member = 'MEMBR',
  Leader = 'LEAD',
  Advisor = 'ADV',
  Guest = 'GUEST',
}

export type ParticipationDesc = keyof typeof Participation;

export type MEMBERSHIP = {
  ACT_CDE: string;
  SESS_CDE: string;
  ID_NUM: number;
  PART_CDE: string;
  COMMENT_TXT: string;
  GRP_ADMIN?: boolean;
};

export type MembershipUpload = {
  ACTCode: string;
  SessCode: string;
  Username: string;
  PartCode: string;
  CommentText: string;
  GroupAdmin: boolean;
  Privacy: boolean;
};

const addMembership = (data: MembershipUpload): Promise<MembershipView> =>
  http.post('memberships', data);

const checkAdmin = async (
  username: string,
  sessionCode: string,
  activityCode: string,
): Promise<boolean> => {
  const admins = await getGroupAdminsForInvolvement(activityCode);
  return admins.some((a) => a.SessionCode === sessionCode && a.Username === username);
};

const editMembership = (membershipID: string, data: MembershipUpload): Promise<MembershipView> =>
  http.put(`memberships/${membershipID}`, data);

const get = async (activityCode: string, sessionCode: string): Promise<MembershipView[]> =>
  http.get(`memberships/activity/${activityCode}?sessionCode=${sessionCode}`);

const setMembershipPrivacy = (membershipID: number, isPrivate: boolean): Promise<MembershipView> =>
  http.put(`memberships/${membershipID}/privacy/${isPrivate}`);

const setGroupAdmin = async (
  membershipID: number,
  isGroupAdmin: boolean,
): Promise<MembershipView> =>
  await http.put(`memberships/${membershipID}/group-admin/${isGroupAdmin}`);

const getGroupAdminsForInvolvement = (activityCode: string): Promise<MembershipView[]> =>
  http.get(`memberships/activity/${activityCode}/group-admin`);

const getFollowersNum = (activityCode: string, sessionCode: string): Promise<number> =>
  http.get(`memberships/activity/${activityCode}/followers/${sessionCode}`);

const getMembershipsForUser = (username: string): Promise<MembershipView[]> =>
  http.get(`memberships/student/${username}`);

const getMembershipsAlphabetically = (username: string): Promise<MembershipView[]> =>
  getMembershipsForUser(username).then(sort(compareByProperty('ActivityDescription')));

const getMembershipsBySession = (
  username: string,
  sessionCode: string,
): Promise<MembershipView[]> =>
  getMembershipsAlphabetically(username).then(filter((m) => m.SessionCode === sessionCode));

const getEmailAccount = (email: string): Promise<Object> => http.get(`accounts/email/${email}/`);

const getMembersNum = (activityCode: string, sessionCode: string): Promise<number> =>
  http.get(`memberships/activity/${activityCode}/members/${sessionCode}`);

const getCurrentMemberships = async (username: string): Promise<MembershipView[]> =>
  sessionService
    .getCurrent()
    .then(({ SessionCode }) => getMembershipsBySession(username, SessionCode));

const getMembershipsWithoutGuests = (username: string) =>
  getMembershipsForUser(username).then(filter((i) => i.ParticipationDescription !== 'Guest'));

const getSessionMembershipsWithoutGuests = (username: string, sessionCode: string) =>
  getMembershipsBySession(username, sessionCode).then(
    filter((m) => m.ParticipationDescription !== 'Guest'),
  );

const getLeaderPositions = async (username: string): Promise<MembershipView[]> =>
  getCurrentMemberships(username).then(filter((m) => m.GroupAdmin));

const getTranscriptMembershipsInfo = (username: string) =>
  getMembershipsWithoutGuests(username).then(sort(compareByProperty('ActivityCode')));

const getPublicMemberships = (username: string): Promise<MembershipView[]> =>
  getMembershipsForUser(username).then(sort(compareByProperty('ActivityDescription')));

const remove = (membershipID: string): Promise<MembershipView> =>
  http.del(`memberships/${membershipID}`);

const search = async (
  username: string,
  sessionCode: string,
  activityCode: string,
): Promise<
  [isMember: boolean, participation: ParticipationDesc | null, membershipID: number | null]
> => {
  const memberships: MembershipView[] = await getMembershipsForUser(username);
  const membership = memberships.find(
    (m) => m.ActivityCode === activityCode && m.SessionCode === sessionCode,
  );
  return membership
    ? [true, membership.ParticipationDescription, membership.MembershipID]
    : [false, null, null];
};

const membershipService = {
  addMembership,
  checkAdmin,
  editMembership,
  get,
  getAllGroupAdmins: getGroupAdminsForInvolvement,
  getEmailAccount,
  getFollowersNum,
  getMembersNum,
  remove,
  search,
  setGroupAdmin,
  setMembershipPrivacy,
  getTranscriptMembershipsInfo,
  getPublicMemberships,
  getMembershipsAlphabetically,
  getSessionMembershipsWithoutGuests,
  getLeaderPositions,
};

export default membershipService;
