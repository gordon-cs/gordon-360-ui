/**
 * GoStalk (Advanced People Search)
 *
 * @module goStalk
 */

import http from './http';

/**
 * Search for a person's major/minor
 * @param {String} firstName firstName query
 * @param {String} lastName lastName query
 * @param {String} homeCity homeCity query
 * @param {String} zipCode zipCode query
 * @return {Promise.<SearchResult[]>} List of search results
 */
const search = (
  firstName,
  lastName,
  minor,
  classType,
  homeCity,
  state,
  country,
  building,
  department,
) => {
  console.log('goStalk: first line of search');
  if (firstName === '' || firstName === null) {
    // eslint-disable-next-line
    firstName = 'C' + '\u266F';
  } else {
    firstName = firstName.toLowerCase();
  }
  if (lastName === '' || lastName === null) {
    // eslint-disable-next-line
    lastName = 'C' + '\u266F';
  } else {
    lastName = lastName.toLowerCase();
  }

  /*
  if (major === '' || major === null) {
    // eslint-disable-next-line
    major = 'C' + '\u266F';
  }
  */
  if (minor === '' || minor === null) {
    // eslint-disable-next-line
    minor = 'C' + '\u266F';
  } else {
  }
  if (classType === '' || classType === null) {
    // eslint-disable-next-line
    classType = 'C' + '\u266F';
  }

  if (homeCity === '' || homeCity === null) {
    // eslint-disable-next-line
    homeCity = 'C' + '\u266F';
  } else {
    homeCity = homeCity.toLowerCase();
  }
  if (state === '' || state === null) {
    // eslint-disable-next-line
    state = 'C' + '\u266F';
  }

  if (country === '' || country === null) {
    // eslint-disable-next-line
    country = 'C' + '\u266F';
  }
  if (building === '' || building === null) {
    // eslint-disable-next-line
    building = 'C' + '\u266F';
  } else if (building.includes('.')) {
    // workaround to avoid breaking the backend
    building = building.replace('.', '_');
  }
  if (department === '' || department === null) {
    // eslint-disable-next-line
    department = 'C' + '\u266F';
  } else if (department.includes('&')) {
    // workaround to avoid breaking the backend
    department = department.replace('&', '_');
  }
  console.log(
    'goSTALK Search params: ',
    firstName,
    lastName,
    minor,
    classType,
    homeCity,
    state,
    country,
    building,
    department,
  );
  return http.get(
    `accounts/advanced-people-search/${firstName}/${lastName}/${minor}/${classType}/${homeCity}/${state}/${country}/${building}/${department}`,
  );
};

// /**
//  * Get all majors
//  * @return {Promise.<String[]>} List of majors
//  */
// const getMajors = () => {
//   return http.get(
//     `advanced-search/majors`);
// };

/**
 * Get all minors
 * @return {Promise.<String[]>} List of minors
 */
const getMinors = () => {
  console.log('goSTALK: getMinors called');
  return http.get(`advanced-search/minors`);
};

/**
 * Get all states
 * @return {Promise.<String[]>} List of states
 */
const getStates = () => {
  return http.get(`advanced-search/states`);
};

/**
 * Get all countries
 * @return {Promise.<String[]>} List of countries
 */
const getCountries = () => {
  return http.get(`advanced-search/countries`);
};

/**
 * Get all departments
 * @return {Promise.<String[]>} List of departments
 */
const getDepartments = () => {
  return http.get(`advanced-search/departments`);
};

/**
 * Get all buildings
 * @return {Promise.<String[]>} List of buildings
 */
const getBuildings = () => {
  return http.get(`advanced-search/buildings`);
};

export default {
  search,
  getMinors,
  getStates,
  getCountries,
  getBuildings,
  getDepartments,
};
