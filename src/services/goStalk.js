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
const search = (firstName, lastName, homeCity, zipCode) => {
  if (firstName === '' || firstName === null) {
    firstName = 'C' + '\u266F';
  }
  if (lastName === '' || lastName === null) {
    lastName = 'C' + '\u266F';
  }
  if (homeCity === '' || homeCity === null) {
    homeCity = 'C' + '\u266F';
  }
  if (zipCode === '' || zipCode === null) {
    zipCode = 'C' + '\u266F';
  }
  return http.get(
    `accounts/advanced-people-search/${firstName}/${lastName}/${homeCity}/${zipCode}`,
  );
};

export default {
  search,
};
