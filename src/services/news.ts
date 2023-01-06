import { DateTime } from 'luxon';
import http from './http';
import { filter, map } from './utils';

type NewsCategory = {
  categoryID: number;
  categoryName: string;
  SortOrder: number;
};

type NewsObject = {
  SNID: number;
  ADUN: string;
  categoryID: number;
  categoryName: string;
  Subject: string;
  Body: string;
  Image?: string;
  Sent: boolean;
  thisPastMailing: boolean;
  Entered: string;
  fname: string;
  lname: string;
  ManualExpirationDate: Date;
};

const getNotExpired = (): Promise<NewsObject[]> => http.get(`news/not-expired`);

// news since 10am (today's news)
const getNewNews = (): Promise<NewsObject[]> => http.get(`news/new`);

const getCategories = (): Promise<NewsCategory[]> => http.get(`news/categories`);

const getPostingByID = (id: number): Promise<NewsObject> => http.get(`news/${id}`);

type FormattedNewsObject = NewsObject & {
  dayPosted: string;
  yearPosted: number;
  datePosted: string;
  author: string;
};

type StudentNewsUpload = {
  subject: string;
  categoryID: number;
  body: string;
  image: string;
};

function formatPosting(posting: NewsObject): FormattedNewsObject {
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

const getNotExpiredFormatted = (): Promise<FormattedNewsObject[]> =>
  getNotExpired().then(map(formatPosting));

const getFilteredNews = (unexpiredNews: NewsObject[], query: string): NewsObject[] => {
  const lowerquery = query.toLowerCase();
  return unexpiredNews.filter(
    (NewsObject newsObject) =>
      newsObject.Body.toLowerCase().includes(lowerquery) ||
      newsObject.ADUN.toLowerCase().includes(lowerquery) ||
      newsObject.categoryName.toLowerCase().includes(lowerquery) ||
      newsObject.Subject.toLowerCase().includes(lowerquery),
  );
};

const getTodaysNews = (): Promise<FormattedNewsObject[]> => getNewNews().then(map(formatPosting));

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

const getPersonalUnapproved = (): Promise<FormattedNewsObject[]> =>
  http.get<FormattedNewsObject[]>('news/personal-unapproved').then(map(formatPosting));

// TODO: Not currently used
const getNewsByCategory = async (category: number): Promise<NewsObject[]> =>
  getNotExpired().then(filter((posting) => posting.categoryID === category));

/******************* POST **********************/

const submitStudentNews = async (
  uploadingNews: StudentNewsUpload,
): Promise<NewsObject | undefined> => {
  try {
    return await http.post(`news`, uploadingNews);
  } catch (reason) {
    console.log('Caught news submission error: ' + reason);
  }
};

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
async function editStudentNews(newsID: number, newData: any): Promise<NewsObject | undefined> {
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
  getPersonalUnapproved,
  getNewNews,
  getNotExpiredFormatted,
  getFilteredNews,
  submitStudentNews,
  deleteStudentNews,
  editStudentNews,
  getPostingByID,
};

export default newsService;
