import http from './http';
import { compareByProperty, sort } from './utils';

export type MembershipView = {
  ActivityType: 'LEA' | 'MIN' | 'RES';
  AccountPrivate: Privacy | null;
  ActivityCode: string;
  ActivityDescription: string;
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
  /**
   * Group Admin is not strictly a participation type. It's a separate flag that Leaders and Advisors
   * can have. However, it is convenient to treat it as a type of Participation in many cases.
   */
  GroupAdmin = 'GRP_ADMIN',
}

export const NonGuestParticipations = [
  Participation.Member,
  Participation.Leader,
  Participation.Advisor,
];

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

const get = async (queryParams: {
  involvementCode?: string;
  username?: string;
  sessionCode?: string;
  participationTypes?: Participation[] | Participation;
}): Promise<MembershipView[]> => http.get(`memberships${http.toQueryString(queryParams)}`);

const addMembership = (data: MembershipUpload): Promise<MembershipView> =>
  http.post('memberships', data);

const editMembership = (membershipID: string, data: MembershipUpload): Promise<MembershipView> =>
  http.put(`memberships/${membershipID}`, data);

const setMembershipPrivacy = (membershipID: number, isPrivate: boolean): Promise<MembershipView> =>
  http.patch(`memberships/${membershipID}/privacy`, isPrivate);

const remove = (membershipID: string): Promise<MembershipView> =>
  http.del(`memberships/${membershipID}`);

const checkAdmin = async (
  username: string,
  sessionCode: string,
  involvementCode: string,
): Promise<boolean> => {
  const admins = await get({
    involvementCode,
    username,
    sessionCode,
    participationTypes: Participation.GroupAdmin,
  });
  return admins.length > 0;
};

const setGroupAdmin = async (
  membershipID: number,
  isGroupAdmin: boolean,
): Promise<MembershipView> =>
  await http.put(`memberships/${membershipID}/group-admin`, isGroupAdmin);

const getMembershipCount = (queryParams: {
  activityCode?: string;
  username?: string;
  sessionCode?: string;
  participationTypes?: Participation[] | Participation;
}): Promise<number> => http.get(`memberships/count${http.toQueryString(queryParams)}`);

const getMembersNum = (involvementCode: string, sessionCode: string): Promise<number> =>
  getMembershipCount({
    activityCode: involvementCode,
    sessionCode,
    participationTypes: NonGuestParticipations,
  });

const getFollowersNum = (involvementCode: string, sessionCode: string): Promise<number> =>
  getMembershipCount({
    activityCode: involvementCode,
    sessionCode,
    participationTypes: Participation.Guest,
  });

const getMembershipsForUser = (username: string): Promise<MembershipView[]> =>
  http.get(`memberships/student/${username}`);

const getPublicMemberships = (username: string): Promise<MembershipHistory[]> =>
  groupByActivityCode(username).then(sort(compareByProperty('ActivityDescription')));

interface MembershipHistory {
  ActivityCode: string;
  ActivityDescription: string;
  ActivityImagePath: string;
  Memberships: MembershipView[];
}

const groupByActivityCode = async (username: string) => {
  const memberships = await getMembershipsForUser(username);
  const grouped: MembershipHistory[] = [];
  memberships.forEach((curMembership) => {
    const existingMembership = grouped.find(
      (item) => item.ActivityCode === curMembership.ActivityCode,
    );
    if (existingMembership) {
      existingMembership.Memberships.push(curMembership);
    } else {
      const newMembershipHistory: MembershipHistory = {
        ActivityCode: curMembership.ActivityCode,
        ActivityDescription: curMembership.ActivityDescription,
        //ActivityImage: curMembership.ActivityImage,
        ActivityImagePath: curMembership.ActivityImagePath,
        Memberships: [curMembership],
      };
      grouped.push(newMembershipHistory);
    }
  });
  return grouped;
};

const membershipService = {
  addMembership,
  checkAdmin,
  editMembership,
  get,
  getFollowersNum,
  getMembersNum,
  remove,
  setGroupAdmin,
  setMembershipPrivacy,
  groupByActivityCode,
  getPublicMemberships,
};

export default membershipService;
