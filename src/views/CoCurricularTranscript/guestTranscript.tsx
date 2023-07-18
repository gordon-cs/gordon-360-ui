import { MembershipHistory, MembershipHistorySession } from 'services/user';
import { StudentEmployment } from 'services/transcript';
import { StudentProfileInfo } from 'services/user';
import { Class } from 'services/peopleSearch';
import { Participation } from 'services/membership';
import { TranscriptItems } from 'services/transcript';

const currentYear: number = new Date().getFullYear();

const sessionCurrentSpring: MembershipHistorySession = {
  MembershipID: -1,
  SessionCode: currentYear + '01',
  Participation: Participation.Member,
};
const sessionCurrentFall: MembershipHistorySession = {
  MembershipID: -1,
  SessionCode: currentYear - 1 + '09',
  Participation: Participation.Member,
};
const sessionPastSpring: MembershipHistorySession = {
  MembershipID: -1,
  SessionCode: currentYear - 1 + '01',
  Participation: Participation.Member,
};
const sessionPastFall: MembershipHistorySession = {
  MembershipID: -1,
  SessionCode: currentYear - 2 + '09',
  Participation: Participation.Member,
};

// Below are Honors, Leadership, and Research
const leadershipISO: MembershipHistory = {
  ActivityCode: 'ISO',
  ActivityDescription: 'International Student Organization',
  ActivityImagePath: '',
  Sessions: [sessionCurrentSpring],
  LatestDate: currentYear + '-05-10T00:00:00',
};

const honorDean: MembershipHistory = {
  ActivityCode: 'DEAN',
  ActivityDescription: "Dean's Scholars",
  ActivityImagePath: '',
  Sessions: [sessionCurrentSpring],
  LatestDate: currentYear + '-05-10T00:00:00',
};

// Below are Service Learning
const serviceIJM: MembershipHistory = {
  ActivityCode: 'IJM',
  ActivityDescription: 'International Justice Mission',
  ActivityImagePath: '',
  Sessions: [sessionPastFall],
  LatestDate: currentYear - 1 + '-05-10T00:00:00',
};

const serviceAJMISS: MembershipHistory = {
  ActivityCode: 'AJMISS',
  ActivityDescription: 'A J Gordon Missions Fellows',
  ActivityImagePath: '',
  Sessions: [sessionPastFall],
  LatestDate: currentYear - 1 + '-05-10T00:00:00',
};

const serviceWMIS: MembershipHistory = {
  ActivityCode: 'WMIS',
  ActivityDescription: 'Missions World Missions Fellowship',
  ActivityImagePath: '',
  Sessions: [sessionPastSpring],
  LatestDate: currentYear - 1 + '-05-10T00:00:00',
};

// Below are Activities
const activityISO: MembershipHistory = {
  ActivityCode: 'ISO',
  ActivityDescription: 'International Student Organization',
  ActivityImagePath: '',
  Sessions: [sessionCurrentFall],
  LatestDate: currentYear - 1 + '-12-15T00:00:00',
};
const activity360: MembershipHistory = {
  ActivityCode: '360',
  ActivityDescription: '360.gordon.edu',
  ActivityImagePath: '',
  Sessions: [sessionCurrentSpring],
  LatestDate: currentYear + '-05-10T00:00:00',
};

// Below are Experiences
const experienceSAF: StudentEmployment = {
  Job_Department: 'SAF',
  Job_Department_Name: 'Gordon Police',
  Job_Start_Date: currentYear - 2 + '-05-13T00:00:00',
  Job_End_Date: currentYear + '-05-13T00:00:00',
  Job_Expected_End_Date: currentYear + '-05-13T00:00:00',
  Job_Title: 'Gordon Police: Head Dispatcher',
};

export const exampleTranscriptItems: TranscriptItems = {
  honors: [honorDean, leadershipISO],
  experiences: [experienceSAF],
  service: [serviceIJM, serviceAJMISS, serviceWMIS],
  activities: [activityISO, activity360],
};
export const exampleStudentProfile: StudentProfileInfo = {
  fullName: 'Example Student',
  Majors: ['Undecided'],
  Minors: [],
  ID: '12345678',
  Title: '',
  FirstName: 'Example',
  MiddleName: '',
  LastName: 'Student',
  Suffix: '',
  MaidenName: '',
  NickName: '',
  OnCampusBuilding: 'WIL',
  OnCampusRoom: '000',
  OnCampusPhone: '',
  OnCampusPrivatePhone: '',
  OnCampusFax: '',
  Mail_Location: '000',
  HomeStreet1: '255 Grapevine Rd',
  HomeStreet2: '',
  HomeCity: 'Wenham',
  HomeState: 'MA',
  HomePostalCode: '',
  HomeCountry: 'US',
  HomePhone: '',
  HomeFax: '',
  KeepPrivate: '',
  Barcode: '12312312312312',
  Email: 'example.student@gordon.edu',
  Gender: 'F',
  AD_Username: 'example.student',
  show_pic: 0,
  preferred_photo: 0,
  Country: 'United States of America',
  BuildingDescription: 'Wilson Hall',
  Facebook: '',
  Twitter: '',
  Instagram: '',
  Handshake: '',
  LinkedIn: '',
  Calendar: '',
  PersonType: 'stu',
  CliftonStrengths: null,
  OnOffCampus: 'On Campus',
  OffCampusStreet1: '',
  OffCampusStreet2: '',
  OffCampusCity: '',
  OffCampusState: '',
  OffCampusPostalCode: '',
  OffCampusCountry: '',
  OffCampusPhone: '',
  OffCampusFax: '',
  Cohort: currentYear.toString(),
  Class: Class['Sophomore'],
  Major: 'U',
  AdvisorIDs: '',
  Married: 'N',
  Commuter: 'N',
  Major2: '',
  grad_student: 'N',
  GradDate: '',
  Major3: '',
  Minor1: '',
  Minor2: '',
  Minor3: '',
  MobilePhone: '123-456-7890',
  IsMobilePhonePrivate: 0,
  Major1Description: 'Undecided',
  Major2Description: '',
  Major3Description: '',
  Minor1Description: '',
  Minor2Description: '',
  Minor3Description: '',
  ChapelRequired: 0,
  ChapelAttended: 0,
};
