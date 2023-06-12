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

export type PeopleSearchQuery = {
  includeStudent: boolean;
  includeFacStaff: boolean;
  includeAlumni: boolean;
  first_name: string;
  last_name: string;
  major: string;
  minor: string;
  residence_hall: string;
  class_standing: keyof typeof Class | '';
  graduation_year: string;
  home_town: string;
  state: string;
  country: string;
  department: string;
  building: string;
  relationship_status?: string;
  graduation_year_range: string;
};

const search = (searchFields: PeopleSearchQuery): Promise<SearchResult[]> => {
  let params = Object.entries({
    firstName: searchFields.first_name,
    lastName: searchFields.last_name,
    major: searchFields.major,
    minor: searchFields.minor,
    hall: searchFields.residence_hall,
    classType: searchFields.class_standing === '' ? '' : Class[searchFields.class_standing],
    preferredClassYear: searchFields.graduation_year,
    preferredClassYearRange: searchFields.graduation_year_range,
    homeCity: searchFields.home_town,
    state: searchFields.state,
    country: searchFields.country,
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

  console.log(params);
  return http.get(`accounts/advanced-people-search?${params}`);
};

const getMajors = (): Promise<string[]> => http.get(`advancedsearch/majors`);

const getMinors = (): Promise<string[]> => http.get(`advancedsearch/minors`);

const getHalls = (): Promise<string[]> => http.get(`advancedsearch/halls`);

const getDepartments = (): Promise<string[]> => http.get(`advancedsearch/departments`);

const getBuildings = (): Promise<string[]> => http.get(`advancedsearch/buildings`);

const peopleSearchService = {
  search,
  getMajors,
  getMinors,
  getHalls,
  getDepartments,
  getBuildings,
};

export default peopleSearchService;
