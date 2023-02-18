import { DateTime } from 'luxon';

const standardDate = (date, includeTime) => {
  if (!DateTime.isDateTime(date)) date = DateTime.fromISO(date);
  let formattedDate = date.monthShort + ' ' + date.day;
  if (includeTime) {
    formattedDate += ' ' + date.toLocaleString(DateTime.TIME_SIMPLE);
  }
  return formattedDate;
};

const standardDateTimeRange = (startDateTime, endDateTime) => {
  if (!DateTime.isDateTime(startDateTime)) startDateTime = DateTime.fromISO(startDateTime);
  if (!DateTime.isDateTime(endDateTime)) endDateTime = DateTime.fromISO(endDateTime);

  // Jan 1 3:00pm - 6:00pm
  let isOneDay =
    startDateTime.toLocaleString(DateTime.DATE_FULL) ===
    endDateTime.toLocaleString(DateTime.DATE_FULL);
  if (isOneDay) {
    let endTime = startDateTime.toLocaleString(DateTime.TIME_SIMPLE);
    return `${standardDate(startDateTime, true)} - ${endTime}`;
  }
  // Jan 1 3:00pm - Jan 31 3:00pm
  let isOneYear = startDateTime.year === endDateTime.year;
  if (isOneYear) {
    return `${standardDate(startDateTime)} - ${standardDate(endDateTime)}`;
  }
  // Jan 1 2023 3:00pm - Jan 1 2024 3:00pm
  return `${startDateTime.toLocaleString(DateTime.DATE_MED)} - ${endDateTime.toLocaleString(
    DateTime.DATE_MED,
  )}`;
};

export { standardDate, standardDateTimeRange };
