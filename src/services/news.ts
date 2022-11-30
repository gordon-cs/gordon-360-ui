import { DateTime } from 'luxon';
import http from './http';
import { filter, map } from './utils';

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
  Entered: string;
  fname: string;
  lname: string;
  ManualExpirationDate: Date;
};

const getNotExpired = (): Promise<NewsItem[]> => http.get(`news/not-expired`);

// news since 10am (today's news)
const getNewNews = (): Promise<NewsItem[]> => http.get(`news/new`);

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

const getNotExpiredFormatted = (): Promise<FormattedNewsItem[]> =>
  getNotExpired().then(map(formatPosting));

const getFilteredNews = (unexpiredNews: NewsItem[], query: string): NewsItem[] => {
  const lowerquery = query.toLowerCase();
  return unexpiredNews.filter(
    (newsitem) =>
      newsitem.Body.toLowerCase().includes(lowerquery) ||
      newsitem.ADUN.toLowerCase().includes(lowerquery) ||
      newsitem.categoryName.toLowerCase().includes(lowerquery) ||
      newsitem.Subject.toLowerCase().includes(lowerquery),
  );
};

const getTodaysNews = (): Promise<FormattedNewsItem[]> => getNewNews().then(map(formatPosting));

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

const getPersonalUnapproved = (): Promise<FormattedNewsItem[]> =>
  http.get<FormattedNewsItem[]>('news/personal-unapproved').then(map(formatPosting));

// TODO: Not currently used
const getNewsByCategory = async (category: number): Promise<NewsItem[]> =>
  getNotExpired().then(filter((posting) => posting.categoryID === category));

/******************* POST **********************/

const submitStudentNews = async (
  subject: string,
  categoryID: number,
  body: string,
  image?: string,
): Promise<NewsItem | undefined> => {
  try {
    return await http.post(
      `news?subject=${subject}&categoryID=${categoryID}&body=${body}`,
      image ?? '',
    );
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
