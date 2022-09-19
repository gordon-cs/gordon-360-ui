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
        Type: 'Staff' | 'Faculty' | 'Student' | '';
        OnCampusDepartment: string;
        BuildingDescription: string;
        KeepPrivate: string;
        JobTitle: string;
        Mail_Location: string;
      }
    | {
        Type: 'Alumni';
        Major1Description: string;
        Major2Description: string;
        ShareName: string;
        PreferredClassYear: string;
        ShareAddress: string;
      }
  );

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
  classType: string, // The database has class types as integers
  homeCity: string,
  state: string,
  country: string,
  department: string,
  building: string,
): Promise<SearchResult[]> => {
  let params = Object.entries({
    firstName,
    lastName,
    major,
    minor,
    hall,
    classType,
    homeCity,
    state,
    country,
    department,
    building,
  })
    .filter(([_key, value]) => Boolean(value))
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  if (includeStudent) {
    params += '&accountTypes=student';
  }

  if (includeFacStaff) {
    params += '&accountTypes=facstaff';
  }

  if (includeAlumni) {
    params += '&accountTypes=alumni';
  }

  return http.get(`accounts/advanced-people-search?${params}`);
};

const getMajors = (): Promise<string[]> => http.get(`advancedsearch/majors`);

const getMinors = (): Promise<string[]> => http.get(`advancedsearch/minors`);

const getHalls = (): Promise<string[]> => http.get(`advancedsearch/halls`);

const getStates = (): Promise<string[]> => http.get(`advancedsearch/states`);

const getCountries = (): Promise<string[]> => http.get(`advancedsearch/countries`);

const getDepartments = (): Promise<string[]> => http.get(`advancedsearch/departments`);

const getBuildings = (): Promise<string[]> => http.get(`advancedsearch/buildings`);

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
