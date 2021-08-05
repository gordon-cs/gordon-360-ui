/**
 * People search
 *
 * @module people-search
 */

import http from './http';

/**
 * @global
 * @typedef SearchResult
 * @property {String} FirstName First name
 * @property {String} Nickname Nickname
 * @property {String} LastName Last name
 * @property {String} MaidenName Maiden name
 * @property {String} UserName Firstname.Lastname format
 * @property {String} ConcatonatedInfo All names combined in a single string
 */

function Results(time, searchResult) {
  this.now = time;
  this.result = searchResult;
}

/**
 * Search for a person
 * @param {String} query Query to search
 * @return {Promise.<SearchResult[]>} List of search results
 */
const search = async (query) => {
  let searchQuery = query;

  // If query has a space in it or is a username, separate it into first and last names
  if (query.trim().includes(' ') || (query.includes('.') && query.indexOf('.') !== 0)) {
    // Replace period or space with a slash: 'first.last' or 'first last' become 'first/last'
    searchQuery = query.trim().replace(/\.|\s/g, '/');
  }

  return http.get(`accounts/search/${searchQuery}`);
};

const renderResults = async (query) => {
  let now = Date.now();
  let searchResult = await search(query).then();
  let results = new Results(now, searchResult);
  return results;
};

const peopleSearchService = {
  renderResults,
  search,
};

export default peopleSearchService;
