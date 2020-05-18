/**
 * Student News
 *
 * @module studentNews
 */

 //Written by Jessica Guan

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


/**
 * Get today's student news
 * @return {Promise.<String{}>} Student news
 */


const getNotExpired = () => http.get(`news/not-expired`);

const getNewNews = async () => await http.get(`news/new`);

const getCategories = () => http.get(`news/categories`);

/**
 * Gets today's news for given category
 * for use on the Home Page card
 * @param {Number} category the category of news
 */
const getTodaysNews = async category => {
  let news;
  news = getNewNews();
  const categoryNews = [];
  for (let i = 0; i < news.length; i +=1) {
    if(news[i].categoryID === category) {
      categoryNews.push(news[i]);
    }
  }
  return categoryNews;
}

/**
 * Get all unexpired news for given category
 * For use on the News Page
 * @param {Number} category the category that
 */
const getNewsByCategory = async category => {
  let news;
  news = getNotExpired();
  const categoryNews = [];
  for (let i = 0; i < news.length; i +=1) {
    if(news[i].categoryID === category) {
      categoryNews.push(news[i]);
    }
  }
  return categoryNews;
}

/**
 * Submits a student news
 * @param {any} data The data which makes up the student news item
 * @return {Promise<any>} Response body
 */
const submitStudentNews = async data => {
  return await http.post(`student-news/submit`, data);
};

export default {
  getNewsByCategory,
  submitStudentNews,
  getCategories,
  getTodaysNews
};