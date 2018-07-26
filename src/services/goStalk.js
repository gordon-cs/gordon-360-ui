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
const search = (firstName, lastName, homeCity) => {
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
  if (homeCity === '' || homeCity === null) {
    // eslint-disable-next-line
    homeCity = 'C' + '\u266F';
  } else {
    homeCity = homeCity.toLowerCase();
  }
  console.log('goSTALK Search params: ', firstName, lastName, homeCity);
  return http.get(`accounts/advanced-people-search/${firstName}/${lastName}/${homeCity}`);
};

export default {
  search,
};
