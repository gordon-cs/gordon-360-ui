import http from './http';

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

const get = async (activityCode: string, sessionCode: string): Promise<Membership[]> => {
  const activityMembers = await getAll(activityCode);
  return activityMembers.filter((m) => m.SessionCode === sessionCode);
};

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

const getMembershipsForUser = (userID: string): Promise<Membership[]> =>
  http.get(`memberships/student/${userID}`);

const remove = (membershipID: string): Promise<MEMBERSHIP> =>
  http.del(`memberships/${membershipID}`);

const search = async (
  userID: string,
  sessionCode: string,
  activityCode: string,
): Promise<
  [isMember: boolean, participation: ParticipationDesc | null, membershipID: number | null]
> => {
  const memberships: Membership[] = await http.get(`memberships/student/${userID}`);
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
  checkAdmin,
  editMembership,
  get,
  getAll,
  getAllGroupAdmins: getGroupAdminsForInvolvement,
  getEmailAccount,
  getFollowersNum,
  getMembersNum,
  getIndividualMembership: getMembershipsForUser,
  remove,
  search,
  toggleGroupAdmin,
  toggleMembershipPrivacy,
};

export default membershipService;
