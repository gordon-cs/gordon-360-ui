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

const addMembership = (data: MEMBERSHIP): Promise<MEMBERSHIP> => http.post('memberships', data);

const addMemberships = async (dataArr: MEMBERSHIP[]) =>
  await Promise.all(dataArr.map(async (data: MEMBERSHIP) => await http.post('memberships', data)));

const checkAdmin = async (
  userID: string,
  sessionCode: string,
  activityCode: string,
): Promise<boolean> => {
  const admins = await getGroupAdminsForInvolvement(activityCode);
  return admins.some((a) => a.SessionCode === sessionCode && a.IDNumber === parseInt(userID));
};

const editMembership = (membershipID: string, data: MEMBERSHIP): Promise<MEMBERSHIP> =>
  http.put(`memberships/${membershipID}`, data);

const get = async (activityCode: string, sessionCode: string): Promise<Membership[]> =>
  http.get(`memberships/activity/${activityCode}?sessionCode=${sessionCode}`);

//Change the privacy value for a club membership
const toggleMembershipPrivacy = (userMembership: Membership): Promise<void> =>
  http.put(`memberships/${userMembership.MembershipID}/privacy/${!userMembership.Privacy}`);

const getAll = (activityCode: string): Promise<Membership[]> =>
  http.get(`memberships/activity/${activityCode}`);

const getGroupAdminsForInvolvement = (activityCode: string): Promise<Membership[]> =>
  http.get(`memberships/activity/${activityCode}/group-admin`);

const getEmailAccount = (email: string): Promise<Object> => http.get(`accounts/email/${email}/`);

const getFollowersNum = (activityCode: string, sessionCode: string): Promise<number> =>
  http.get(`memberships/activity/${activityCode}/followers/${sessionCode}`);

const getMembersNum = (activityCode: string, sessionCode: string): Promise<number> =>
  http.get(`memberships/activity/${activityCode}/members/${sessionCode}`);

const getMembershipsForUser = (username: string): Promise<Membership[]> =>
  http.get(`memberships/student/${username}`);

const getMembershipsAlphabetically = (username: string) =>
  getMembershipsForUser(username).then(sort(compareByProperty('ActivityDescription')));

const getMembershipsBySession = (username: string, sessionCode: string) =>
  getMembershipsAlphabetically(username).then(filter((m) => m.SessionCode === sessionCode));

const getCurrentMemberships = async (username: string) =>
  sessionService
    .getCurrent()
    .then(({ SessionCode }) => getMembershipsBySession(username, SessionCode));

const getMembershipsWithoutGuests = (username: string) =>
  getMembershipsForUser(username).then(filter((i) => i.ParticipationDescription !== 'Guest'));

const getSessionMembershipsWithoutGuests = (username: string, sessionCode: string) =>
  getMembershipsBySession(username, sessionCode).then(
    filter((m) => m.ParticipationDescription !== 'Guest'),
  );

const getLeaderPositions = async (username: string): Promise<Membership[]> =>
  getCurrentMemberships(username).then(filter((m) => m.GroupAdmin));

const getTranscriptMembershipsInfo = (username: string) =>
  getMembershipsWithoutGuests(username).then(sort(compareByProperty('ActivityCode')));

const getPublicMemberships = (username: string): Promise<Membership[]> =>
  getMembershipsForUser(username).then(sort(compareByProperty('ActivityDescription')));

const remove = (membershipID: string): Promise<MEMBERSHIP> =>
  http.del(`memberships/${membershipID}`);

const search = async (
  username: string,
  sessionCode: string,
  activityCode: string,
): Promise<
  [isMember: boolean, participation: ParticipationDesc | null, membershipID: number | null]
> => {
  const memberships: Membership[] = await getMembershipsForUser(username);
  const membership = memberships.find(
    (m) => m.ActivityCode === activityCode && m.SessionCode === sessionCode,
  );
  return membership
    ? [true, membership.ParticipationDescription, membership.MembershipID]
    : [false, null, null];
};

// TODO: Refactor API to not require unused Membership body
const toggleGroupAdmin = async (membershipID: number, data: MEMBERSHIP): Promise<MEMBERSHIP> => {
  return await http.put(`memberships/${membershipID}/group-admin`, data);
};

const membershipService = {
  addMembership,
  addMemberships,
  checkAdmin,
  editMembership,
  get,
  getAll,
  getAllGroupAdmins: getGroupAdminsForInvolvement,
  getEmailAccount,
  getFollowersNum,
  getMembersNum,
  remove,
  search,
  toggleGroupAdmin,
  toggleMembershipPrivacy,
  getTranscriptMembershipsInfo,
  getPublicMemberships,
  getMembershipsAlphabetically,
  getSessionMembershipsWithoutGuests,
  getLeaderPositions,
};

export default membershipService;
