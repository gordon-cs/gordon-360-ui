/**
 * GoStalk (Advanced People Search)
 *
 * @module goStalk
 */

import http from './http';

/**
 * @global
 * @typedef SearchResult
 * @property {String} FirstName First name
 * @property {String} LastName Last name
 * @property {String} UserName Firstname.Lastname format
 * @property {String} ConcatonatedInfo All names combined in a single string
 */

/**
 * Search for a person's major/minor
 * @param {String} query Query to search
 * @return {Promise.<SearchResult[]>} List of search results
 */
const searchMajor = query => {
  let majorSearchQuery = query;

  // If query has a space in it or is a username, separate it into first and last names
  if (query.trim().includes(' ') || (query.includes('.') && query.indexOf('.') !== 0)) {
    // Replace period or space with a slash: 'first.last' or 'first last' become 'first/last'
    majorSearchQuery = query.trim().replace(/\.|\s/g, '/');
  }
  console.log('goSTALK: searchMajor function:', query);
  return http.get(`accounts/search-major/${majorSearchQuery}`);
};

export default {
  searchMajor,
};
