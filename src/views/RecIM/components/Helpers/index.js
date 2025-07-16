import { isValid, format } from 'date-fns';

const getFullDate = (date) => {
  if (!isValid(date)) date = new Date(Date.parse(date)); // try parsing if invalid
  if (!isValid(date)) {
    console.log('invalid date');
  }
  return format(date, 'MMM d yyyy');
};

const standardDate = (date, includeTime, includeDayOfWeek) => {
  if (!isValid(date)) date = new Date(Date.parse(date)); // try parsing if invalid
  if (!isValid(date)) {
    // if still invalid (perhaps null)
    return;
  }

  let formattedDate;
  if (includeTime) formattedDate = format(date, 'MMM d h:mmaaa');
  else if (includeDayOfWeek) formattedDate = format(date, 'EEE MMM d');
  else formattedDate = format(date, 'MMM d');

  return formattedDate;
};

const formatDateTimeRange = (startDateTime, endDateTime) => {
  if (!isValid(startDateTime)) startDateTime = new Date(Date.parse(startDateTime));
  if (!isValid(endDateTime)) endDateTime = new Date(Date.parse(endDateTime));

  // Jan 1 3:00pm - 6:00pm
  let isOneDay = format(startDateTime, 'MM dd yyyy') === format(endDateTime, 'MM dd yyyy');
  if (isOneDay) {
    let endTime = format(endDateTime, 'h:mmaaa').replace(':00', '');
    return `${standardDate(startDateTime, true).replace(':00', '')} - ${endTime}`;
  }
  // Jan 1 3:00pm - Jan 31 3:00pm
  let isOneYear = startDateTime.getFullYear() === endDateTime.getFullYear();
  if (isOneYear) {
    return `${standardDate(startDateTime)} - ${standardDate(endDateTime)}`;
  }
  // Jan 1 2023 3:00pm - Jan 1 2024 3:00pm
  return `${format(startDateTime, 'MMM d yyyy')} - ${format(endDateTime, 'MMM d yyyy')}`;
};

const standardTimeOnly = (date) => {
  if (!isValid(date)) date = new Date(Date.parse(date)); // try parsing if invalid
  if (!isValid(date)) {
    // if still invalid (perhaps null)
    return;
  }
  return format(date, 'h:mmaaa');
};

export { getFullDate, standardDate, formatDateTimeRange, standardTimeOnly };
