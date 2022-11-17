import http from './http';
import sessionService from './session';
import { compareByProperty, filter, sort } from './utils';

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
  IsAlumni: boolean;
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

export type MembershipUpload = {
  Activity: string;
  Session: string;
  Username: string;
  Participation: string;
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
  const admins = await getGroupAdmins(activityCode, sessionCode);
  return admins.some((a) => a.Username === username);
};

const editMembership = (membershipID: string, data: MembershipUpload): Promise<MembershipView> =>
  http.put(`memberships/${membershipID}`, data);

const get = async (activityCode: string, sessionCode: string): Promise<MembershipView[]> =>
  http.get(`memberships/activities/${activityCode}/sessions/${sessionCode}`);

const setMembershipPrivacy = (membershipID: number, isPrivate: boolean): Promise<MembershipView> =>
  http.put(`memberships/${membershipID}/privacy`, isPrivate);

const setGroupAdmin = async (
  membershipID: number,
  isGroupAdmin: boolean,
): Promise<MembershipView> =>
  await http.put(`memberships/${membershipID}/group-admin`, isGroupAdmin);

const getGroupAdmins = (activityCode: string, sessionCode: string): Promise<MembershipView[]> =>
  http.get(`memberships/activities/${activityCode}/sessions/${sessionCode}/admins`);

const getFollowersNum = (activityCode: string, sessionCode: string): Promise<number> =>
  http.get(`memberships/activities/${activityCode}/sessions/${sessionCode}/subscriber-count`);

const getMembershipsForUser = (username: string): Promise<MembershipView[]> =>
  http.get(`profiles/${username}/memberships`);

const getMembershipsAlphabetically = (username: string): Promise<MembershipView[]> =>
  getMembershipsForUser(username).then(sort(compareByProperty('ActivityDescription')));

const getMembershipsBySession = (
  username: string,
  sessionCode: string,
): Promise<MembershipView[]> =>
  getMembershipsAlphabetically(username).then(filter((m) => m.SessionCode === sessionCode));

const getMembersNum = (activityCode: string, sessionCode: string): Promise<number> =>
  http.get(`memberships/activities/${activityCode}/sessions/${sessionCode}/member-count`);

const getCurrentMemberships = async (username: string): Promise<MembershipView[]> =>
  sessionService
    .getCurrent()
    .then(({ SessionCode }) => getMembershipsBySession(username, SessionCode));

const getMembershipsWithoutGuests = (username: string) =>
  getMembershipsForUser(username).then(filter((i) => i.ParticipationDescription !== 'Guest'));

const getSessionMembershipsWithoutGuests = (
  username: string,
  sessionCode: string,
): Promise<MembershipView[]> =>
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
  getGroupAdmins,
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
