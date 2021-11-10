import http from './http';

/**
 * these holds prevent a student from checking in
 */
type MajorHolds = {
  RegistrarHold: boolean;
  HighSchoolTranscriptHold: boolean;
  FinancialHold: boolean;
  MedicalHold: boolean;
  MustRegisterForClasses: boolean;
};

/**
 * these holds do not prevent a student from checking in, but they prompt a warning
 */
type MinorHolds = {
  LaVidaHold: boolean;
  MajorHold: boolean;
};

type EmergencyContact = {
  /** the sequence number of the contact, (1, 2, or 3) */
  SEQ_NUM: number;
  firstName: string;
  lastName: string;
  relationship: string;
  HomePhone: number;
  /** whether the home phone number is international */
  HomePhoneIN: boolean;
  MobilePhone: number;
  /** whether the mobile phone number is international */
  MobilePhoneIN: boolean;
};

type PersonalPhone = {
  PersonalPhone: number;
  MakePrivate: boolean;
  NoPhone: boolean;
};

type Demographic = {
  /** whether or not a student is Hispanic/Latino or prefers not to say */
  Ethnicity: number;
  Race: Race;
};

export const enum Race {
  NativeAmerican = 'Native American or Alaskan Native',
  Asian = 'Asian',
  Black = 'Black or African American',
  Hawaiian = 'Native Hawaiian or Other Pacific Islander',
  White = 'White',
}

type AcademicCheckin = {
  Holds: string;
  NewStudent: number;
} & PersonalPhone &
  MajorHolds &
  MinorHolds &
  Demographic;

const getStatus = async (): Promise<boolean> => await http.get(`checkIn/status`);

const markCompleted = async (): Promise<void> => await http.put(`checkIn/status`);

const getHolds = async (): Promise<AcademicCheckin> => await http.get(`checkIn/holds`);

const getEmergencyContacts = async (username: string): Promise<EmergencyContact[] | void> =>
  await http.get(`profiles/emergency-contact/${username}/`);

const submitPhone = async (data: AcademicCheckin): Promise<AcademicCheckin> =>
  await http.put(`checkIn/cellphone`, data);

const submitContact = async (data: EmergencyContact): Promise<EmergencyContact> =>
  await http.post(`checkIn/emergencycontact`, data);

const submitDemographic = async (data: AcademicCheckin): Promise<AcademicCheckin> =>
  await http.put(`checkIn/demographic`, data);

const checkInService = {
  getStatus,
  markCompleted,
  getHolds,
  getEmergencyContacts,
  submitPhone,
  submitContact,
  submitDemographic,
};

export default checkInService;
