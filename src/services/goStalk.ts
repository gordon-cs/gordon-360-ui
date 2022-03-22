import http from './http';

export enum Class {
  'Unassigned',
  'First Year',
  'Sophomore',
  'Junior',
  'Senior',
  'Graduate Student',
  'Undegraduate Conferred',
  'Graduate Conferred',
}

type SearchResultBase = {
  FirstName: string;
  LastName: string;
  NickName: string;
  MaidenName: string;
  HomeCity: string;
  HomeState: string;
  Country: string;
  Email: string;
  AD_Username: string;
};

type SearchResult = SearchResultBase &
  (
    | {
        Type: 'Student';
        Hall: string;
        Class: string; // TODO
        Major1Description: string;
        Major2Description: string;
        Major3Description: string;
        Minor1Description: string;
        Minor2Description: string;
        Minor3Description: string;
        KeepPrivate: string; //TODO
        Mail_Location: string;
      }
    | {
        OnCampusDepartment: string;
        BuildingDescription: string;
        KeepPrivate: string;
        JobTitle: string;
        Type: string; //TODO
        Mail_Location: string;
      }
    | {
        Type: 'Alum';
        Major1Description: string;
        Major2Description: string;
        ShareName: string;
        PreferredClassYear: string;
        ShareAddress: string;
      }
  );

const CSharp = 'C\u266F';

// TODO: Document return type
const search = (
  includeStudent: boolean,
  includeFacStaff: boolean,
  includeAlumni: boolean,
  firstName: string,
  lastName: string,
  major: string,
  minor: string,
  hall: string,
  classType: Class | '',
  homeCity: string,
  state: string,
  country: string,
  department: string,
  building: string,
): Promise<SearchResult[]> => {
  // Sanitize the params sent to the backend -- it can't handle &, /, -, or null/empty strings
  // Therefore we convert all of these things and in the backend we convert them back again

  firstName = firstName
    .trim()
    .replace(/[^a-zA-Z0-9\s,.'-]/g, '')
    .toLowerCase();
  if (firstName === '' || firstName === null) {
    firstName = CSharp;
  }
  lastName = lastName
    .trim()
    .replace(/[^a-zA-Z0-9\s,.'-]/g, '')
    .toLowerCase();
  if (lastName === '' || lastName === null) {
    lastName = CSharp;
  }
  if (major === '' || major === null) {
    major = CSharp;
  } else if (
    major.includes('&') ||
    major.includes('-') ||
    major.includes(':') ||
    major.includes('/')
  ) {
    // workaround to avoid breaking the backend
    major = major.replace('&', '_');
    major = major.replace('-', 'dash');
    major = major.replace(':', 'colon');
    major = major.replace('/', 'slash');
  }
  if (minor === '' || minor === null) {
    minor = CSharp;
  } else if (minor.includes('&')) {
    // workaround to avoid breaking the backend
    minor = minor.replace('&', '_');
  }
  hall = hall.trim();
  if (hall === '' || hall === null) {
    hall = CSharp;
  }
  if (classType === '') {
    // @ts-ignore
    classType = CSharp;
  }
  homeCity = homeCity
    .trim()
    .replace(/[^a-zA-Z0-9\s,.'-]/g, '')
    .toLowerCase();
  if (homeCity === '' || homeCity === null) {
    homeCity = CSharp;
  } else {
    homeCity = homeCity.toLowerCase();
  }
  if (state === '' || state === null) {
    state = CSharp;
  }
  if (country === '' || country === null) {
    country = CSharp;
  }
  if (department === '' || department === null) {
    department = CSharp;
  } else if (department.includes('&')) {
    // workaround to avoid breaking the backend
    department = department.replace('&', '_');
  }
  if (building === '' || building === null) {
    building = CSharp;
  } else if (building.includes('.')) {
    // workaround to avoid breaking the backend
    building = building.replace('.', '_');
  }

  return http.get(
    `accounts/advanced-people-search/${includeStudent}/${includeFacStaff}/${includeAlumni}/${firstName}/${lastName}/${major}/${minor}/${hall}/${classType}/${homeCity}/${state}/${country}/${department}/${building}`,
  );
};

const getMajors = (): Promise<string[]> => http.get(`advanced-search/majors`);

const getMinors = (): Promise<string[]> => http.get(`advanced-search/minors`);

const getHalls = (): Promise<string[]> => http.get(`advanced-search/halls`);

const getStates = (): Promise<string[]> => http.get(`advanced-search/states`);

const getCountries = (): Promise<string[]> => http.get(`advanced-search/countries`);

const getDepartments = (): Promise<string[]> => http.get(`advanced-search/departments`);

const getBuildings = (): Promise<string[]> => http.get(`advanced-search/buildings`);

const advancedSearchService = {
  search,
  getMajors,
  getMinors,
  getHalls,
  getStates,
  getCountries,
  getDepartments,
  getBuildings,
};

export default advancedSearchService;
