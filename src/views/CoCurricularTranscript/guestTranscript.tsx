import { MembershipHistory, MembershipHistorySession } from 'services/user';
import { StudentEmployment } from 'services/transcript';
import { StudentProfileInfo } from 'services/user';
import { Class } from 'services/peopleSearch';
import { Participation } from 'services/membership';
import { TranscriptItems } from 'services/transcript';

const currentYear: number = new Date().getFullYear();
const sessionFall: MembershipHistorySession = {
  MembershipID: -1,
  SessionCode: currentYear - 1 + '09',
  Participation: Participation.Member,
};
const activityISO: MembershipHistory = {
  ActivityCode: 'ISO',
  ActivityDescription: 'International Student Organization',
  ActivityImagePath: '',
  Sessions: [sessionFall],
  LatestDate: currentYear - 1 + '-12-15T00:00:00',
};
const sessionSpring: MembershipHistorySession = {
  MembershipID: -1,
  SessionCode: currentYear + '01',
  Participation: Participation.Member,
};
const activity360: MembershipHistory = {
  ActivityCode: '360',
  ActivityDescription: '360.gordon.edu',
  ActivityImagePath: '',
  Sessions: [sessionSpring],
  LatestDate: currentYear + '-05-10T00:00:00',
};
const sessionSpringAdmin: MembershipHistorySession = {
  MembershipID: -1,
  SessionCode: currentYear + '01',
  Participation: Participation.GroupAdmin,
};
const activityISOAdmin: MembershipHistory = {
  ActivityCode: 'ISO',
  ActivityDescription: 'International Student Organization',
  ActivityImagePath: '',
  Sessions: [sessionSpringAdmin],
  LatestDate: currentYear + '-05-10T00:00:00',
};
const experienceSAF: StudentEmployment = {
  Job_Department: 'SAF',
  Job_Department_Name: 'Gordon Police',
  Job_Start_Date: currentYear - 2 + '-05-13T00:00:00',
  Job_End_Date: currentYear + '-05-13T00:00:00',
  Job_Expected_End_Date: currentYear + '-05-13T00:00:00',
  Job_Title: 'Gordon Police: Head Dispatcher',
};
const experienceCTS: StudentEmployment = {
  Job_Department: 'CTS',
  Job_Department_Name: 'Center for Technology Services',
  Job_Start_Date: currentYear - 1 + '-08-22T00:00:00',
  Job_End_Date: currentYear + '-05-13T00:00:00',
  Job_Expected_End_Date: currentYear + '-05-13T00:00:00',
  Job_Title: 'Access Control Assistant - CTS',
};
export const exampleTranscriptItems: TranscriptItems = {
  honors: [activityISOAdmin],
  experiences: [experienceSAF, experienceCTS],
  service: [],
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
