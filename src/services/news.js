/**
 * Student News
 *
 * @module studentNews
 */
 // Written by Jessica Guan

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

const getNewNews = () => http.get(`news/new`);

const getPersonalUnapproved = () => http.get('news/personal-unexpired');

const getCategories = () => http.get(`news/categories`);

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
  posting.dayPosted = timestamp.weekdayShort + ", "
                     + timestamp.monthLong + " "
                     + timestamp.day;
  posting.yearPosted = timestamp.year;
  posting.datePosted = timestamp.month + "/"
                     + timestamp.day;
  
  let author = posting.ADUN;
  let fname, lname;
  if(author.includes(".")) {
    fname = author.substring(0,author.indexOf("."));
    lname = author.substring(author.indexOf(".") + 1);
  }
  posting.author = fname + " " + lname;
}

/**
 * Gets all unexpired news
 * for use on the News Page
 * @return {Promise<any>} Student news
 */
const getNotExpiredFormatted = async () => {
  let unexpiredNews = await getNotExpired();
  const news = [];
  for (let i = 0; i < unexpiredNews.length; i +=1) {
    news.push(unexpiredNews[i]);
    formatPosting(unexpiredNews[i]);
  }
  return news;
}

/**
 * Gets today's news
 * for use on the Home Page card
 * @return {Promise<any>} Student news
 */
const getTodaysNews = async () => {
  let news = await getNewNews();
  const todaysNews = [];
  for (let i = 0; i < news.length; i +=1) {
    todaysNews.push(news[i]);
    formatPosting(news[i]);
  }
  return todaysNews;
}

/**
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
  for (let i = 0; i < news.length; i +=1) {
    personalUnapproved.push(news[i]);
    formatPosting(news[i]);
  }
  return personalUnapproved;
}

/**
 * Get all unexpired news for given category
 * For use on the News Page
 * @param {Number} category the category that
 * @return {Promise<any>} Student news
 */
const getNewsByCategory = async category => {
  let news;
  news = await getNotExpired();
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
const submitStudentNews = newsItem => {
  return http.post('student-news', newsItem).catch(reason => {
    console.log(reason);
  });
};

export default {
  getNewsByCategory,
  submitStudentNews,
  getCategories,
  getTodaysNews,
  getPersonalUnapprovedFormatted,
  getNewNews,
  getNotExpiredFormatted
};
