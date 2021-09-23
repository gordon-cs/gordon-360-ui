import { DateTime } from 'luxon';
import http from './http';

type NewsCategory = {
  categoryID: number;
  categoryName: string;
  SortOrder: number;
};

type NewsItem = {
  SNID: number;
  ADUN: string;
  categoryID: number;
  categoryName: string;
  Subject: string;
  Body: string;
  Image?: string;
  Sent: boolean;
  thisPastMailing: boolean;
  Entered: Date;
  fname: string;
  lname: string;
  ManualExpirationDate: Date;
};

const getNotExpired = (): Promise<NewsItem[]> => http.get(`news/not-expired`);

// news since 10am (today's news)
const getNewNews = (): Promise<NewsItem[]> => http.get(`news/new`);

const getPersonalUnapproved = (): Promise<NewsItem[]> => http.get('news/personal-unapproved');

const getCategories = (): Promise<NewsCategory[]> => http.get(`news/categories`);

const getPostingByID = (id: number): Promise<NewsItem> => http.get(`news/${id}`);

type FormattedNewsItem = NewsItem & {
  dayPosted: string;
  yearPosted: number;
  datePosted: string;
  author: string;
};

function formatPosting(posting: NewsItem): FormattedNewsItem {
  const timestamp = DateTime.fromISO(posting.Entered);
  const dayPosted = timestamp.weekdayShort + ', ' + timestamp.monthLong + ' ' + timestamp.day;
  const yearPosted = timestamp.year;
  const datePosted = timestamp.month + '/' + timestamp.day;

  return {
    ...posting,
    dayPosted,
    yearPosted,
    datePosted,
    author: posting.ADUN.replace('.', ' '),
  };
}

/******************* GET **********************/

const getNotExpiredFormatted = async (): Promise<FormattedNewsItem[]> => {
  const unexpiredNews = await getNotExpired();
  return unexpiredNews.map((newsItem) => formatPosting(newsItem));
};

const getFilteredNews = (unexpiredNews: NewsItem[], query: string): NewsItem[] => {
  return unexpiredNews.filter((newsitem) => {
    return (
      newsitem.Body.toLowerCase().includes(lowerquery) ||
      newsitem.ADUN.toLowerCase().includes(lowerquery) ||
      newsitem.categoryName.toLowerCase().includes(lowerquery) ||
      newsitem.Subject.toLowerCase().includes(lowerquery)
    );
  });
};

const getTodaysNews = async (): Promise<FormattedNewsItem[]> => {
  const todaysNews = await getNewNews();
  return todaysNews.map((posting) => formatPosting(posting));
};

/*
 * NOTE: not currently used, might be used in future filter features
 * Gets today's news for given category
 * for use on the Home Page card
 *
 * @param {number} category the category of news
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

const getPersonalUnapprovedFormatted = async (): Promise<FormattedNewsItem[]> => {
  const news = await getPersonalUnapproved();
  return news.map((posting) => formatPosting(posting));
};

/**
 * NOTE: Not currently used
 * Get all unexpired news for given category
 * For use on the News Page
 *
 * @param category The category to get news for
 * @returns All unexpired news for the given category
 */
const getNewsByCategory = async (category: number): Promise<NewsItem[]> => {
  const news = await getNotExpired();
  return news.filter((posting) => posting.categoryID === category);
};

/******************* POST **********************/

async function submitStudentNews(newsItem: NewsItem): Promise<any> {
  try {
    return await http.post('news', newsItem);
  } catch (reason) {
    console.log('Caught news submission error: ' + reason);
  }
}

/******************* DELETE **********************/

async function deleteStudentNews(newsID: number): Promise<any> {
  try {
    return await http.del(`news/${newsID}`);
  } catch (reason) {
    console.log('Caught news deletion error: ' + reason);
  }
}

/******************* EDIT (PUT) **********************/

/**
 * Edits a student news item
 *
 * @param newsID The id number of the news item to edit
 * @param newData The data to replace
 * @description
 * Posting must be authored by user and unapproved to edit
 * @returns The edited news item
 */
async function editStudentNews(newsID: number, newData: any): Promise<NewsItem | undefined> {
  try {
    return await http.put(`news/${newsID}`, newData);
  } catch (reason) {
    console.log('Caught news update error: ' + reason);
  }
}

const newsService = {
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

export default newsService;
