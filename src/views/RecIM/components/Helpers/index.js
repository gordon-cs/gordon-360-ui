import { DateTime } from 'luxon';

const standardDate = (date, includeTime) => {
  let formattedDate = date.monthShort + ' ' + date.day;
  if (includeTime) {
    formattedDate += ' ' + date.toLocaleString(DateTime.TIME_SIMPLE);
  }
  return formattedDate;
};

export { standardDate }
