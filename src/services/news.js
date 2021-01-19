/**
 * Student News
 *
 * @module studentNews
 */
// Written by Jessica Guan
// Modified by Cameron Abbot

import { DateTime } from 'luxon';
import http from './http';

/**
 * @global
 * @typedef NewsCategories
 * @property {Number} categoryID the id number for the news category
 * @property {String} categoryName the name of the news category
 * @property {Number} SortOrder the rank of the news category for sorting
 */

/**
 * @global
 * @typedef NewsItem
 * @property {Number} SNID
 * @property {String} ADUN username of the poster
 * @property {Number} categoryID the id number of the category to which the item belongs
 * @property {String} Subject the subject of the news item
 * @property {String} Body the main body of the news item
 * @property {boolean} Sent whether the item has been sent
 * @property {boolean} thisPastMailing whether it belongs to this past mailing
 * @property {Date} Entered the date the item was entered into the system
 * @property {String} fname first name of poster
 * @property {String} lname last name of poster
 * @property {Date} ManualExpirationDate the expiration Date of the item
 */

const getNotExpired = () => http.get(`news/not-expired`);

// news since 10am (today's news)
const getNewNews = () => http.get(`news/new`);

const getPersonalUnapproved = () => http.get('news/personal-unapproved');

const getCategories = () => http.get(`news/categories`);

const getPostingByID = (id) => http.get(`news/${id}`);

/**
 * Format a news posting by adding fields:
 * - day posted
 * - date posted
 * - year posted
 * - posting author
 * @param {*} posting The news posting to format
 */
function formatPosting(posting) {
  const timestamp = DateTime.fromISO(posting.Entered);
  posting.dayPosted = timestamp.weekdayShort + ', ' + timestamp.monthLong + ' ' + timestamp.day;
  posting.yearPosted = timestamp.year;
  posting.datePosted = timestamp.month + '/' + timestamp.day;

  let author = posting.ADUN;
  let fname, lname;
  if (author.includes('.')) {
    fname = author.substring(0, author.indexOf('.'));
    lname = author.substring(author.indexOf('.') + 1);
  }
  posting.author = fname + ' ' + lname;
}

/******************* GET **********************/

/**
 * Gets all unexpired student news
 * and formats
 * @return {Promise<any>} Student news
 */
const getNotExpiredFormatted = async () => {
  let unexpiredNews = await getNotExpired();
  const news = [];
  for (let i = 0; i < unexpiredNews.length; i += 1) {
    news.push(unexpiredNews[i]);
    formatPosting(unexpiredNews[i]);
  }
  return news;
};

/**
 * Gets today's news
 * for use on the Home Page card
 * and formats
 * @return {Promise<any>} Student news
 */
const getTodaysNews = async () => {
  let news = await getNewNews();
  const todaysNews = [];
  for (let i = 0; i < news.length; i += 1) {
    todaysNews.push(news[i]);
    formatPosting(news[i]);
  }
  return todaysNews;
};

/**
 * NOTE: not currently used, might be used in future filter features
 * Gets today's news for given category
 * for use on the Home Page card
 * @param {Number} category the category of news
 */
// const getTodaysNews = async category => {
//   let news;
//   news = await getNewNews();
//   const categoryNews = [];
//   for (let i = 0; i < news.length; i +=1) {
//     if(news[i].categoryID === category) {
//       categoryNews.push(news[i]);
//     }
//   }
//   return categoryNews;
// }

/**
 * Get today's student news
 * for use on the Home Page card
 * @return {Promise<any>} Student news
 */
const getPersonalUnapprovedFormatted = async () => {
  let news = await getPersonalUnapproved();
  const personalUnapproved = [];
  for (let i = 0; i < news.length; i += 1) {
    personalUnapproved.push(news[i]);
    formatPosting(news[i]);
  }
  return personalUnapproved;
};

/**
 * NOTE: Not currently used
 * Get all unexpired news for given category
 * For use on the News Page
 * @param {Number} category the category that
 * @return {Promise<any>} Student news
 */
const getNewsByCategory = async (category) => {
  let news;
  news = await getNotExpired();
  const categoryNews = [];
  for (let i = 0; i < news.length; i += 1) {
    if (news[i].categoryID === category) {
      categoryNews.push(news[i]);
    }
  }
  return categoryNews;
};

/**
 * Filter the news page
 * (currently only search)
 * @param {any} filters - the state of news that includes filter information
 * @return {Promise<any>} news that has been filtered
 */
async function getFilteredNews(filters) {
  // source news
  let news = filters.news;
  // TODO: apply category filters
  // news = filterbyCategory(filters, allNews);
  let filteredNews = [];

  // TODO: This is incorrect in events.js -> should be length check rather than null check
  // TODO: with category filters, if news becomes 0 then search should reset it here
  // if (news.length === 0) {
  //   news = filters.news;
  // }

  // SEARCH FILTER
  if (filters.search !== '') {
    // Approved News
    for (let i = 0; i < news.length; i++) {
      // subjects
      if (news[i].Subject.toLowerCase().includes(filters.search.toLowerCase())) {
        filteredNews.push(news[i]);
      }
      // categories
      else if (news[i].categoryName.toLowerCase().includes(filters.search.toLowerCase())) {
        filteredNews.push(news[i]);
      }
      // authors
      else if (news[i].author.toLowerCase().includes(filters.search.toLowerCase())) {
        filteredNews.push(news[i]);
      }
      // dates
      else if (news[i].dayPosted.toLowerCase().includes(filters.search.toLowerCase())) {
        filteredNews.push(news[i]);
      }
    }
    news = filteredNews;
  }
  return news;
}

/******************* POST **********************/

/**
 * Submits a student news item
 * @param {any} newsItem The data which makes up the student news item
 * @return {Promise<any>} Response body
 */
async function submitStudentNews(newsItem) {
  try {
    return await http.post('news', newsItem);
  } catch (reason) {
    console.log('Caught news submission error: ' + reason);
  }
}

/******************* DELETE **********************/

/**
 * Deletes a student news item
 * @param {any} newsID The SNID of the news item to delete
 * @return {Promise.<Object>} deleted object
 */
async function deleteStudentNews(newsID) {
  try {
    return await http.del(`news/${newsID}`);
  } catch (reason) {
    console.log('Caught news deletion error: ' + reason);
  }
}

/******************* EDIT (PUT) **********************/

/**
 * Edits a student news item
 * Posting must be authored by user and unapproved to edit
 * Calls delete, then create rather than an actual update request
 * @param {any} newsID The SNID of the news item to delete
 * @param {any} newData The JSON object that contains new data for update
 * @return {Promise.<Object>} deleted object
 */
async function editStudentNews(newsID, newData) {
  try {
    return await http.put(`news/${newsID}`, newData);
  } catch (reason) {
    console.log('Caught news update error: ' + reason);
  }
}

export default {
  getNewsByCategory,
  getCategories,
  getTodaysNews,
  getPersonalUnapprovedFormatted,
  getNewNews,
  getNotExpiredFormatted,
  getFilteredNews,
  submitStudentNews,
  deleteStudentNews,
  editStudentNews,
  getPostingByID,
};
