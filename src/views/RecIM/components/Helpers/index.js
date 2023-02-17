import { DateTime } from 'luxon';

const standardDate = (date, includeTime) => {
  if (!DateTime.isDateTime(date)) date = DateTime.fromISO(date);
  let formattedDate = date.monthShort + ' ' + date.day;
  if (includeTime) {
    formattedDate += ' ' + date.toLocaleString(DateTime.TIME_SIMPLE);
  }
  return formattedDate;
};

export { standardDate };
