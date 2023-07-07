import http from './http';
import { SelectOption } from 'views/PeopleSearch/components/SearchFieldList/components/SearchField';

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
  initial_year: string;
  final_year: string;
  involvement: string;
};

/**
 * Match any department whose name starts with one of these prefixes:
 *  - "Office of (the) "
 *  - "Department of "
 *  - "Center for "
 */
const DepartmentPrefixRegex = /^(Office of(?: the)?|Department of|Center for) (.*)$/;
const getDepartmentDropdownOptions = async (): Promise<SelectOption[]> => {
  const departmentNames = await getDepartments();
  return departmentNames.map<SelectOption>((departmentName) => ({
    value: departmentName,
    label: departmentName.replace(DepartmentPrefixRegex, '$2 ($1)'),
  }));
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
    initialYear: searchFields.initial_year,
    finalYear: searchFields.final_year,
    homeCity: searchFields.home_town,
    state: searchFields.state,
    country: searchFields.country,
    department: searchFields.department,
    building: searchFields.building,
    involvement: searchFields.involvement,
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

const getDepartments = (): Promise<string[]> => http.get(`advancedsearch/departments`);

const getBuildings = (): Promise<string[]> => http.get(`advancedsearch/buildings`);

const getInvolvements = (): Promise<string[]> => http.get(`advancedsearch/involvements`);

const peopleSearchService = {
  search,
  getDepartmentDropdownOptions,
  getDepartments,
  getMajors,
  getMinors,
  getHalls,
  getBuildings,
  getInvolvements,
};

export default peopleSearchService;
