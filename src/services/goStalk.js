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
 * @return {Promise.<SearchResult[]>} List of search results
 */
const search = (firstName, lastName, homeCity) => {
  console.log('GOSTALK The value of homeCity: ', homeCity);
  if (firstName === '' || firstName === null) {
    firstName = '\u266F';
  }
  if (lastName === '' || lastName === null) {
    lastName = '\u266F';
  }
  if (homeCity === '' || homeCity === null) {
    homeCity = '\u266F';
  }
  console.log('GOSTALK The value of homeCity: ', homeCity);
  return http.get(`accounts/advanced-people-search/${firstName}/${lastName}/${homeCity}`);
};

export default {
  search,
};
