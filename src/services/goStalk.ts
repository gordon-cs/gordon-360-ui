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

export type SearchResult = SearchResultBase &
  (
    | {
        Type: 'Student';
        Hall: string;
        Class: keyof typeof Class;
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
        Type: 'Staff' | 'Faculty' | '';
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

export type SearchFields = {
  includeStudent: boolean;
  includeFacStaff: boolean;
  includeAlumni: boolean;
  first_name: string;
  last_name: string;
  major: string;
  minor: string;
  residence_hall: string;
  class_year: keyof typeof Class | '';
  home_town: string;
  state: string;
  country: string;
  department: string;
  building: string;
  relationship_status?: string;
};

// TODO: Document return type
const search = (searchFields: SearchFields): Promise<SearchResult[]> => {
  let params = Object.entries({
    firstName: searchFields.first_name,
    lastName: searchFields.last_name,
    major: searchFields.major,
    minor: searchFields.minor,
    hall: searchFields.residence_hall,
    classType: searchFields.class_year === '' ? '' : Class[searchFields.class_year],

    homeCity: searchFields.home_town,
    state: searchFields.state,
    country: searchFields.country.toUpperCase(),
    department: searchFields.department,
    building: searchFields.building,
  })
    .filter(([_key, value]) => Boolean(value))
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  if (searchFields.includeStudent) {
    params += '&accountTypes=student';
  }

  if (searchFields.includeFacStaff) {
    params += '&accountTypes=facstaff';
  }

  if (searchFields.includeAlumni) {
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
