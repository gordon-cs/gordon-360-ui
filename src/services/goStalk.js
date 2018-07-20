/**
 * GoStalk (Advanced People Search)
 *
 * @module goStalk
 */

import http from './http';

/**
 * Search for a person's major/minor
 * @param {String} query Query to search
 * @return {Promise.<SearchResult[]>} List of search results
 */
const search = (firstName, lastName) => {
  console.log('GOSTALK SEARCH: firstname: ', firstName, ' lastName: ', lastName);
  if (firstName === '' || firstName === null) {
    firstName = '\u266F';
  }
  if (lastName === '' || lastName === null) {
    lastName = '\u266F';
  }

  console.log("AFTER 'adeavi' CHANGE firstname: ", firstName, ' lastName: ', lastName);
  return http.get(`accounts/advanced-people-search/${firstName}/${lastName}`);
};

export default {
  search,
};
