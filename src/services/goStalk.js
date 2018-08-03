/**
 * GoStalk (Advanced People Search)
 *
 * @module goStalk
 */

import http from './http';

/**
 * Search for (AKA GoStalk) a person/people based on the following queried parameters
 * @param {Boolean} includeAlumni For non-Students to decide if they want alumni in their search results or not
 * @param {String} firstName First name queried
 * @param {String} lastName Last name queried
 * @param {String} major Major (matches up against 3 majors listed for people)
 * @param {String} minor Minor (matches up against 3 minors listed for people)
 * @param {String} classType 0-7: Unassigned, Freshman, Sophomore, Junior, Senior, Graduate Student,
 * Undegraduate Conferred, Graduate Conferred
 * @param {String} homeCity Hometown/Home city queried
 * @param {String} state A US state or a Canadian Province
 * @param {String} country Country queried
 * @param {String} department Department where faculty/staff work
 * @param {String} building Building where faculty/staff work
 * @return {Promise.<SearchResult[]>} List of search results that match these queried parameters
 */
const search = (
  includeAlumni,
  firstName,
  lastName,
  major,
  minor,
  classType,
  homeCity,
  state,
  country,
  department,
  building,
) => {
  // Sanitize the params sent to the backend -- it can't handle &, /, -, or null/empty strings
  // Therefore we convert all of these things and in the backend we convert them back again

  firstName = firstName
    .trim()
    .replace(/[^a-zA-Z\s,.'-]/g, '')
    .toLowerCase();
  if (firstName === '' || firstName === null) {
    // eslint-disable-next-line
    firstName = 'C' + '\u266F';
  }
  lastName = lastName
    .trim()
    .replace(/[^a-zA-Z\s,.'-]/g, '')
    .toLowerCase();
  if (lastName === '' || lastName === null) {
    // eslint-disable-next-line
    lastName = 'C' + '\u266F';
  } else {
    lastName = lastName.toLowerCase();
  }
  if (major === '' || major === null) {
    // eslint-disable-next-line
    major = 'C' + '\u266F';
  } else if (major.includes('&') || major.includes('-')) {
    // workaround to avoid breaking the backend
    major = major.replace('&', '_');
    major = major.replace('-', 'dash');
  }
  if (minor === '' || minor === null) {
    // eslint-disable-next-line
    minor = 'C' + '\u266F';
  } else if (minor.includes('&')) {
    // workaround to avoid breaking the backend
    minor = minor.replace('&', '_');
  }
  if (classType === '' || classType === null) {
    // eslint-disable-next-line
    classType = 'C' + '\u266F';
  }
  homeCity = homeCity
    .trim()
    .replace(/[^a-zA-Z\s,.'-]/g, '')
    .toLowerCase();
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
  if (department === '' || department === null) {
    // eslint-disable-next-line
    department = 'C' + '\u266F';
  } else if (department.includes('&')) {
    // workaround to avoid breaking the backend
    department = department.replace('&', '_');
  }
  if (building === '' || building === null) {
    // eslint-disable-next-line
    building = 'C' + '\u266F';
  } else if (building.includes('.')) {
    // workaround to avoid breaking the backend
    building = building.replace('.', '_');
  }
  console.log(
    'goSTALK Search params: includeAlumni: ',
    includeAlumni,
    firstName,
    lastName,
    major,
    minor,
    classType,
    homeCity,
    state,
    country,
    department,
    building,
  );
  return http.get(
    `accounts/advanced-people-search/${includeAlumni}/${firstName}/${lastName}/${major}/${minor}/${classType}/${homeCity}/${state}/${country}/${department}/${building}`,
  );
};

/**
 * Get all majors
 * @return {Promise.<String[]>} List of majors
 */
const getMajors = () => {
  return http.get(`advanced-search/majors`);
};

/**
 * Get all minors
 * @return {Promise.<String[]>} List of minors
 */
const getMinors = () => {
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
  getMajors,
  getMinors,
  getStates,
  getCountries,
  getDepartments,
  getBuildings,
};
