import { useState } from 'react';
import http from './http';
import { forEach } from 'lodash';
import { string } from 'prop-types';

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
  class_year: keyof typeof Class | '';
  home_town: string;
  state: string;
  country: string;
  department: string;
  building: string;
  relationship_status?: string;
  involvement: string;
};
export interface SelectOption {
  label: string;
  value: string;
}

const getRenamedDepartments = async () => {
  const dep = await getDepartments();
  const mappedResults = <SelectOption[]>[];
  dep.forEach((d) => {
    let departmentName = { value: d, label: d };
    if (/^Office of the /.test(d)) {
      departmentName.label = d.replace(/^Office of the /, '') + ' (Office of the)';
    } else if (/^Office of /.test(d)) {
      departmentName.label = d.replace(/^Office of /, '') + ' (Office of)';
    } else if (/^Center for /.test(d)) {
      departmentName.label = d.replace(/^Center for /, '') + ' (Center for)';
    } else if (/^Department of /.test(d)) {
      departmentName.label = d.replace(/^Department of /, '') + ' (Department of)';
    }
    mappedResults.push(departmentName);
  });
  return mappedResults;
};

const search = (searchFields: PeopleSearchQuery): Promise<SearchResult[]> => {
  let params = Object.entries({
    firstName: searchFields.first_name,
    lastName: searchFields.last_name,
    major: searchFields.major,
    minor: searchFields.minor,
    hall: searchFields.residence_hall,
    classType: searchFields.class_year === '' ? '' : Class[searchFields.class_year],
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
  getRenamedDepartments,
  getMajors,
  getMinors,
  getHalls,
  getBuildings,
  getInvolvements,
};

export default peopleSearchService;
