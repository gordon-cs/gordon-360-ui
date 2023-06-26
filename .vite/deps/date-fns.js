import {
  addDays,
  addHours,
  addLeadingZeros,
  addMilliseconds,
  addMinutes,
  addMonths,
  addSeconds,
  addWeeks,
  addYears,
  assign,
  compareAsc,
  defaultLocale_default,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
  differenceInDays,
  differenceInHours,
  differenceInMilliseconds,
  differenceInMinutes,
  differenceInMonths,
  differenceInQuarters,
  differenceInSeconds,
  differenceInWeeks,
  differenceInYears,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  formatISO,
  getDate,
  getDay,
  getDaysInMonth,
  getDefaultOptions,
  getHours,
  getMinutes,
  getMonth,
  getRoundingMethod,
  getSeconds,
  getTimezoneOffsetInMilliseconds,
  getYear,
  isAfter,
  isBefore,
  isDate,
  isEqual,
  isLastDayOfMonth,
  isSameDay,
  isSameHour,
  isSameMonth,
  isSameYear,
  isValid,
  isWithinInterval,
  lightFormatters_default,
  parse,
  setDate,
  setDefaultOptions,
  setHours,
  setMinutes,
  setMonth,
  setSeconds,
  setYear,
  startOfDay,
  startOfHour,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subMilliseconds,
  toDate
} from "./chunk-BGUWWXYC.js";
import "./chunk-GZHN7YFF.js";
import "./chunk-OUNQININ.js";
import {
  daysInWeek,
  daysInYear,
  maxTime,
  millisecondsInHour,
  millisecondsInMinute,
  millisecondsInSecond,
  minTime,
  minutesInHour,
  monthsInQuarter,
  monthsInYear,
  parseISO,
  quartersInYear,
  requiredArgs,
  secondsInDay,
  secondsInHour,
  secondsInMinute,
  secondsInMonth,
  secondsInQuarter,
  secondsInWeek,
  secondsInYear,
  toInteger
} from "./chunk-2X5AFJN5.js";
import "./chunk-CLTD24QJ.js";
import {
  _typeof
} from "./chunk-7JSK233G.js";
import "./chunk-LQHJAPLN.js";
import "./chunk-LFBQMW2U.js";

// node_modules/date-fns/esm/add/index.js
function add(dirtyDate, duration) {
  requiredArgs(2, arguments);
  if (!duration || _typeof(duration) !== "object")
    return /* @__PURE__ */ new Date(NaN);
  var years = duration.years ? toInteger(duration.years) : 0;
  var months2 = duration.months ? toInteger(duration.months) : 0;
  var weeks = duration.weeks ? toInteger(duration.weeks) : 0;
  var days2 = duration.days ? toInteger(duration.days) : 0;
  var hours = duration.hours ? toInteger(duration.hours) : 0;
  var minutes = duration.minutes ? toInteger(duration.minutes) : 0;
  var seconds = duration.seconds ? toInteger(duration.seconds) : 0;
  var date = toDate(dirtyDate);
  var dateWithMonths = months2 || years ? addMonths(date, months2 + years * 12) : date;
  var dateWithDays = days2 || weeks ? addDays(dateWithMonths, days2 + weeks * 7) : dateWithMonths;
  var minutesToAdd = minutes + hours * 60;
  var secondsToAdd = seconds + minutesToAdd * 60;
  var msToAdd = secondsToAdd * 1e3;
  var finalDate = new Date(dateWithDays.getTime() + msToAdd);
  return finalDate;
}

// node_modules/date-fns/esm/isWeekend/index.js
function isWeekend(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var day = date.getDay();
  return day === 0 || day === 6;
}

// node_modules/date-fns/esm/isSunday/index.js
function isSunday(dirtyDate) {
  requiredArgs(1, arguments);
  return toDate(dirtyDate).getDay() === 0;
}

// node_modules/date-fns/esm/isSaturday/index.js
function isSaturday(dirtyDate) {
  requiredArgs(1, arguments);
  return toDate(dirtyDate).getDay() === 6;
}

// node_modules/date-fns/esm/addBusinessDays/index.js
function addBusinessDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var startedOnWeekend = isWeekend(date);
  var amount = toInteger(dirtyAmount);
  if (isNaN(amount))
    return /* @__PURE__ */ new Date(NaN);
  var hours = date.getHours();
  var sign = amount < 0 ? -1 : 1;
  var fullWeeks = toInteger(amount / 5);
  date.setDate(date.getDate() + fullWeeks * 7);
  var restDays = Math.abs(amount % 5);
  while (restDays > 0) {
    date.setDate(date.getDate() + sign);
    if (!isWeekend(date))
      restDays -= 1;
  }
  if (startedOnWeekend && isWeekend(date) && amount !== 0) {
    if (isSaturday(date))
      date.setDate(date.getDate() + (sign < 0 ? 2 : -1));
    if (isSunday(date))
      date.setDate(date.getDate() + (sign < 0 ? 1 : -2));
  }
  date.setHours(hours);
  return date;
}

// node_modules/date-fns/esm/startOfISOWeek/index.js
function startOfISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  return startOfWeek(dirtyDate, {
    weekStartsOn: 1
  });
}

// node_modules/date-fns/esm/getISOWeekYear/index.js
function getISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var fourthOfJanuaryOfNextYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/date-fns/esm/startOfISOWeekYear/index.js
function startOfISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getISOWeekYear(dirtyDate);
  var fourthOfJanuary = /* @__PURE__ */ new Date(0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  var date = startOfISOWeek(fourthOfJanuary);
  return date;
}

// node_modules/date-fns/esm/setISOWeekYear/index.js
function setISOWeekYear(dirtyDate, dirtyISOWeekYear) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var isoWeekYear = toInteger(dirtyISOWeekYear);
  var diff = differenceInCalendarDays(date, startOfISOWeekYear(date));
  var fourthOfJanuary = /* @__PURE__ */ new Date(0);
  fourthOfJanuary.setFullYear(isoWeekYear, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  date = startOfISOWeekYear(fourthOfJanuary);
  date.setDate(date.getDate() + diff);
  return date;
}

// node_modules/date-fns/esm/addISOWeekYears/index.js
function addISOWeekYears(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return setISOWeekYear(dirtyDate, getISOWeekYear(dirtyDate) + amount);
}

// node_modules/date-fns/esm/addQuarters/index.js
function addQuarters(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  var months2 = amount * 3;
  return addMonths(dirtyDate, months2);
}

// node_modules/date-fns/esm/areIntervalsOverlapping/index.js
function areIntervalsOverlapping(intervalLeft, intervalRight, options) {
  requiredArgs(2, arguments);
  var leftStartTime = toDate(intervalLeft === null || intervalLeft === void 0 ? void 0 : intervalLeft.start).getTime();
  var leftEndTime = toDate(intervalLeft === null || intervalLeft === void 0 ? void 0 : intervalLeft.end).getTime();
  var rightStartTime = toDate(intervalRight === null || intervalRight === void 0 ? void 0 : intervalRight.start).getTime();
  var rightEndTime = toDate(intervalRight === null || intervalRight === void 0 ? void 0 : intervalRight.end).getTime();
  if (!(leftStartTime <= leftEndTime && rightStartTime <= rightEndTime)) {
    throw new RangeError("Invalid interval");
  }
  if (options !== null && options !== void 0 && options.inclusive) {
    return leftStartTime <= rightEndTime && rightStartTime <= leftEndTime;
  }
  return leftStartTime < rightEndTime && rightStartTime < leftEndTime;
}

// node_modules/date-fns/esm/max/index.js
function max(dirtyDatesArray) {
  requiredArgs(1, arguments);
  var datesArray;
  if (dirtyDatesArray && typeof dirtyDatesArray.forEach === "function") {
    datesArray = dirtyDatesArray;
  } else if (_typeof(dirtyDatesArray) === "object" && dirtyDatesArray !== null) {
    datesArray = Array.prototype.slice.call(dirtyDatesArray);
  } else {
    return /* @__PURE__ */ new Date(NaN);
  }
  var result;
  datesArray.forEach(function(dirtyDate) {
    var currentDate = toDate(dirtyDate);
    if (result === void 0 || result < currentDate || isNaN(Number(currentDate))) {
      result = currentDate;
    }
  });
  return result || /* @__PURE__ */ new Date(NaN);
}

// node_modules/date-fns/esm/min/index.js
function min(dirtyDatesArray) {
  requiredArgs(1, arguments);
  var datesArray;
  if (dirtyDatesArray && typeof dirtyDatesArray.forEach === "function") {
    datesArray = dirtyDatesArray;
  } else if (_typeof(dirtyDatesArray) === "object" && dirtyDatesArray !== null) {
    datesArray = Array.prototype.slice.call(dirtyDatesArray);
  } else {
    return /* @__PURE__ */ new Date(NaN);
  }
  var result;
  datesArray.forEach(function(dirtyDate) {
    var currentDate = toDate(dirtyDate);
    if (result === void 0 || result > currentDate || isNaN(currentDate.getDate())) {
      result = currentDate;
    }
  });
  return result || /* @__PURE__ */ new Date(NaN);
}

// node_modules/date-fns/esm/clamp/index.js
function clamp(date, _ref) {
  var start = _ref.start, end = _ref.end;
  requiredArgs(2, arguments);
  return min([max([date, start]), end]);
}

// node_modules/date-fns/esm/closestIndexTo/index.js
function closestIndexTo(dirtyDateToCompare, dirtyDatesArray) {
  requiredArgs(2, arguments);
  var dateToCompare = toDate(dirtyDateToCompare);
  if (isNaN(Number(dateToCompare)))
    return NaN;
  var timeToCompare = dateToCompare.getTime();
  var datesArray;
  if (dirtyDatesArray == null) {
    datesArray = [];
  } else if (typeof dirtyDatesArray.forEach === "function") {
    datesArray = dirtyDatesArray;
  } else {
    datesArray = Array.prototype.slice.call(dirtyDatesArray);
  }
  var result;
  var minDistance;
  datesArray.forEach(function(dirtyDate, index) {
    var currentDate = toDate(dirtyDate);
    if (isNaN(Number(currentDate))) {
      result = NaN;
      minDistance = NaN;
      return;
    }
    var distance = Math.abs(timeToCompare - currentDate.getTime());
    if (result == null || distance < Number(minDistance)) {
      result = index;
      minDistance = distance;
    }
  });
  return result;
}

// node_modules/date-fns/esm/closestTo/index.js
function closestTo(dirtyDateToCompare, dirtyDatesArray) {
  requiredArgs(2, arguments);
  var dateToCompare = toDate(dirtyDateToCompare);
  if (isNaN(Number(dateToCompare)))
    return /* @__PURE__ */ new Date(NaN);
  var timeToCompare = dateToCompare.getTime();
  var datesArray;
  if (dirtyDatesArray == null) {
    datesArray = [];
  } else if (typeof dirtyDatesArray.forEach === "function") {
    datesArray = dirtyDatesArray;
  } else {
    datesArray = Array.prototype.slice.call(dirtyDatesArray);
  }
  var result;
  var minDistance;
  datesArray.forEach(function(dirtyDate) {
    var currentDate = toDate(dirtyDate);
    if (isNaN(Number(currentDate))) {
      result = /* @__PURE__ */ new Date(NaN);
      minDistance = NaN;
      return;
    }
    var distance = Math.abs(timeToCompare - currentDate.getTime());
    if (result == null || distance < Number(minDistance)) {
      result = currentDate;
      minDistance = distance;
    }
  });
  return result;
}

// node_modules/date-fns/esm/compareDesc/index.js
function compareDesc(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var diff = dateLeft.getTime() - dateRight.getTime();
  if (diff > 0) {
    return -1;
  } else if (diff < 0) {
    return 1;
  } else {
    return diff;
  }
}

// node_modules/date-fns/esm/daysToWeeks/index.js
function daysToWeeks(days2) {
  requiredArgs(1, arguments);
  var weeks = days2 / daysInWeek;
  return Math.floor(weeks);
}

// node_modules/date-fns/esm/differenceInBusinessDays/index.js
function differenceInBusinessDays(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  if (!isValid(dateLeft) || !isValid(dateRight))
    return NaN;
  var calendarDifference = differenceInCalendarDays(dateLeft, dateRight);
  var sign = calendarDifference < 0 ? -1 : 1;
  var weeks = toInteger(calendarDifference / 7);
  var result = weeks * 5;
  dateRight = addDays(dateRight, weeks * 7);
  while (!isSameDay(dateLeft, dateRight)) {
    result += isWeekend(dateRight) ? 0 : sign;
    dateRight = addDays(dateRight, sign);
  }
  return result === 0 ? 0 : result;
}

// node_modules/date-fns/esm/differenceInCalendarISOWeekYears/index.js
function differenceInCalendarISOWeekYears(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  return getISOWeekYear(dirtyDateLeft) - getISOWeekYear(dirtyDateRight);
}

// node_modules/date-fns/esm/differenceInCalendarISOWeeks/index.js
var MILLISECONDS_IN_WEEK = 6048e5;
function differenceInCalendarISOWeeks(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var startOfISOWeekLeft = startOfISOWeek(dirtyDateLeft);
  var startOfISOWeekRight = startOfISOWeek(dirtyDateRight);
  var timestampLeft = startOfISOWeekLeft.getTime() - getTimezoneOffsetInMilliseconds(startOfISOWeekLeft);
  var timestampRight = startOfISOWeekRight.getTime() - getTimezoneOffsetInMilliseconds(startOfISOWeekRight);
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_WEEK);
}

// node_modules/date-fns/esm/getQuarter/index.js
function getQuarter(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var quarter = Math.floor(date.getMonth() / 3) + 1;
  return quarter;
}

// node_modules/date-fns/esm/differenceInCalendarQuarters/index.js
function differenceInCalendarQuarters(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var quarterDiff = getQuarter(dateLeft) - getQuarter(dateRight);
  return yearDiff * 4 + quarterDiff;
}

// node_modules/date-fns/esm/differenceInCalendarWeeks/index.js
var MILLISECONDS_IN_WEEK2 = 6048e5;
function differenceInCalendarWeeks(dirtyDateLeft, dirtyDateRight, options) {
  requiredArgs(2, arguments);
  var startOfWeekLeft = startOfWeek(dirtyDateLeft, options);
  var startOfWeekRight = startOfWeek(dirtyDateRight, options);
  var timestampLeft = startOfWeekLeft.getTime() - getTimezoneOffsetInMilliseconds(startOfWeekLeft);
  var timestampRight = startOfWeekRight.getTime() - getTimezoneOffsetInMilliseconds(startOfWeekRight);
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_WEEK2);
}

// node_modules/date-fns/esm/subISOWeekYears/index.js
function subISOWeekYears(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addISOWeekYears(dirtyDate, -amount);
}

// node_modules/date-fns/esm/differenceInISOWeekYears/index.js
function differenceInISOWeekYears(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var sign = compareAsc(dateLeft, dateRight);
  var difference = Math.abs(differenceInCalendarISOWeekYears(dateLeft, dateRight));
  dateLeft = subISOWeekYears(dateLeft, sign * difference);
  var isLastISOWeekYearNotFull = Number(compareAsc(dateLeft, dateRight) === -sign);
  var result = sign * (difference - isLastISOWeekYearNotFull);
  return result === 0 ? 0 : result;
}

// node_modules/date-fns/esm/eachHourOfInterval/index.js
function eachHourOfInterval(dirtyInterval, options) {
  var _options$step;
  requiredArgs(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = toDate(interval.start);
  var endDate = toDate(interval.end);
  var startTime = startDate.getTime();
  var endTime = endDate.getTime();
  if (!(startTime <= endTime)) {
    throw new RangeError("Invalid interval");
  }
  var dates = [];
  var currentDate = startDate;
  currentDate.setMinutes(0, 0, 0);
  var step = Number((_options$step = options === null || options === void 0 ? void 0 : options.step) !== null && _options$step !== void 0 ? _options$step : 1);
  if (step < 1 || isNaN(step))
    throw new RangeError("`options.step` must be a number greater than 1");
  while (currentDate.getTime() <= endTime) {
    dates.push(toDate(currentDate));
    currentDate = addHours(currentDate, step);
  }
  return dates;
}

// node_modules/date-fns/esm/startOfMinute/index.js
function startOfMinute(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setSeconds(0, 0);
  return date;
}

// node_modules/date-fns/esm/eachMinuteOfInterval/index.js
function eachMinuteOfInterval(interval, options) {
  var _options$step;
  requiredArgs(1, arguments);
  var startDate = startOfMinute(toDate(interval.start));
  var endDate = toDate(interval.end);
  var startTime = startDate.getTime();
  var endTime = endDate.getTime();
  if (startTime >= endTime) {
    throw new RangeError("Invalid interval");
  }
  var dates = [];
  var currentDate = startDate;
  var step = Number((_options$step = options === null || options === void 0 ? void 0 : options.step) !== null && _options$step !== void 0 ? _options$step : 1);
  if (step < 1 || isNaN(step))
    throw new RangeError("`options.step` must be a number equal to or greater than 1");
  while (currentDate.getTime() <= endTime) {
    dates.push(toDate(currentDate));
    currentDate = addMinutes(currentDate, step);
  }
  return dates;
}

// node_modules/date-fns/esm/eachMonthOfInterval/index.js
function eachMonthOfInterval(dirtyInterval) {
  requiredArgs(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = toDate(interval.start);
  var endDate = toDate(interval.end);
  var endTime = endDate.getTime();
  var dates = [];
  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError("Invalid interval");
  }
  var currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);
  currentDate.setDate(1);
  while (currentDate.getTime() <= endTime) {
    dates.push(toDate(currentDate));
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  return dates;
}

// node_modules/date-fns/esm/startOfQuarter/index.js
function startOfQuarter(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3;
  date.setMonth(month, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

// node_modules/date-fns/esm/eachQuarterOfInterval/index.js
function eachQuarterOfInterval(dirtyInterval) {
  requiredArgs(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = toDate(interval.start);
  var endDate = toDate(interval.end);
  var endTime = endDate.getTime();
  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError("Invalid interval");
  }
  var startDateQuarter = startOfQuarter(startDate);
  var endDateQuarter = startOfQuarter(endDate);
  endTime = endDateQuarter.getTime();
  var quarters = [];
  var currentQuarter = startDateQuarter;
  while (currentQuarter.getTime() <= endTime) {
    quarters.push(toDate(currentQuarter));
    currentQuarter = addQuarters(currentQuarter, 1);
  }
  return quarters;
}

// node_modules/date-fns/esm/eachWeekOfInterval/index.js
function eachWeekOfInterval(dirtyInterval, options) {
  requiredArgs(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = toDate(interval.start);
  var endDate = toDate(interval.end);
  var endTime = endDate.getTime();
  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError("Invalid interval");
  }
  var startDateWeek = startOfWeek(startDate, options);
  var endDateWeek = startOfWeek(endDate, options);
  startDateWeek.setHours(15);
  endDateWeek.setHours(15);
  endTime = endDateWeek.getTime();
  var weeks = [];
  var currentWeek = startDateWeek;
  while (currentWeek.getTime() <= endTime) {
    currentWeek.setHours(0);
    weeks.push(toDate(currentWeek));
    currentWeek = addWeeks(currentWeek, 1);
    currentWeek.setHours(15);
  }
  return weeks;
}

// node_modules/date-fns/esm/eachWeekendOfInterval/index.js
function eachWeekendOfInterval(interval) {
  requiredArgs(1, arguments);
  var dateInterval = eachDayOfInterval(interval);
  var weekends = [];
  var index = 0;
  while (index < dateInterval.length) {
    var date = dateInterval[index++];
    if (isWeekend(date)) {
      weekends.push(date);
      if (isSunday(date))
        index = index + 5;
    }
  }
  return weekends;
}

// node_modules/date-fns/esm/eachWeekendOfMonth/index.js
function eachWeekendOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var startDate = startOfMonth(dirtyDate);
  if (isNaN(startDate.getTime()))
    throw new RangeError("The passed date is invalid");
  var endDate = endOfMonth(dirtyDate);
  return eachWeekendOfInterval({
    start: startDate,
    end: endDate
  });
}

// node_modules/date-fns/esm/eachWeekendOfYear/index.js
function eachWeekendOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var startDate = startOfYear(dirtyDate);
  var endDate = endOfYear(dirtyDate);
  return eachWeekendOfInterval({
    start: startDate,
    end: endDate
  });
}

// node_modules/date-fns/esm/eachYearOfInterval/index.js
function eachYearOfInterval(dirtyInterval) {
  requiredArgs(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = toDate(interval.start);
  var endDate = toDate(interval.end);
  var endTime = endDate.getTime();
  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError("Invalid interval");
  }
  var dates = [];
  var currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);
  currentDate.setMonth(0, 1);
  while (currentDate.getTime() <= endTime) {
    dates.push(toDate(currentDate));
    currentDate.setFullYear(currentDate.getFullYear() + 1);
  }
  return dates;
}

// node_modules/date-fns/esm/endOfDecade/index.js
function endOfDecade(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var decade = 9 + Math.floor(year / 10) * 10;
  date.setFullYear(decade, 11, 31);
  date.setHours(23, 59, 59, 999);
  return date;
}

// node_modules/date-fns/esm/endOfHour/index.js
function endOfHour(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setMinutes(59, 59, 999);
  return date;
}

// node_modules/date-fns/esm/endOfISOWeek/index.js
function endOfISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  return endOfWeek(dirtyDate, {
    weekStartsOn: 1
  });
}

// node_modules/date-fns/esm/endOfISOWeekYear/index.js
function endOfISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getISOWeekYear(dirtyDate);
  var fourthOfJanuaryOfNextYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  var date = startOfISOWeek(fourthOfJanuaryOfNextYear);
  date.setMilliseconds(date.getMilliseconds() - 1);
  return date;
}

// node_modules/date-fns/esm/endOfMinute/index.js
function endOfMinute(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setSeconds(59, 999);
  return date;
}

// node_modules/date-fns/esm/endOfQuarter/index.js
function endOfQuarter(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3 + 3;
  date.setMonth(month, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}

// node_modules/date-fns/esm/endOfSecond/index.js
function endOfSecond(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setMilliseconds(999);
  return date;
}

// node_modules/date-fns/esm/endOfToday/index.js
function endOfToday() {
  return endOfDay(Date.now());
}

// node_modules/date-fns/esm/endOfTomorrow/index.js
function endOfTomorrow() {
  var now = /* @__PURE__ */ new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();
  var date = /* @__PURE__ */ new Date(0);
  date.setFullYear(year, month, day + 1);
  date.setHours(23, 59, 59, 999);
  return date;
}

// node_modules/date-fns/esm/endOfYesterday/index.js
function endOfYesterday() {
  var now = /* @__PURE__ */ new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();
  var date = /* @__PURE__ */ new Date(0);
  date.setFullYear(year, month, day - 1);
  date.setHours(23, 59, 59, 999);
  return date;
}

// node_modules/date-fns/esm/_lib/cloneObject/index.js
function cloneObject(object) {
  return assign({}, object);
}

// node_modules/date-fns/esm/formatDistance/index.js
var MINUTES_IN_DAY = 1440;
var MINUTES_IN_ALMOST_TWO_DAYS = 2520;
var MINUTES_IN_MONTH = 43200;
var MINUTES_IN_TWO_MONTHS = 86400;
function formatDistance(dirtyDate, dirtyBaseDate, options) {
  var _ref, _options$locale;
  requiredArgs(2, arguments);
  var defaultOptions = getDefaultOptions();
  var locale = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : defaultLocale_default;
  if (!locale.formatDistance) {
    throw new RangeError("locale must contain formatDistance property");
  }
  var comparison = compareAsc(dirtyDate, dirtyBaseDate);
  if (isNaN(comparison)) {
    throw new RangeError("Invalid time value");
  }
  var localizeOptions = assign(cloneObject(options), {
    addSuffix: Boolean(options === null || options === void 0 ? void 0 : options.addSuffix),
    comparison
  });
  var dateLeft;
  var dateRight;
  if (comparison > 0) {
    dateLeft = toDate(dirtyBaseDate);
    dateRight = toDate(dirtyDate);
  } else {
    dateLeft = toDate(dirtyDate);
    dateRight = toDate(dirtyBaseDate);
  }
  var seconds = differenceInSeconds(dateRight, dateLeft);
  var offsetInSeconds = (getTimezoneOffsetInMilliseconds(dateRight) - getTimezoneOffsetInMilliseconds(dateLeft)) / 1e3;
  var minutes = Math.round((seconds - offsetInSeconds) / 60);
  var months2;
  if (minutes < 2) {
    if (options !== null && options !== void 0 && options.includeSeconds) {
      if (seconds < 5) {
        return locale.formatDistance("lessThanXSeconds", 5, localizeOptions);
      } else if (seconds < 10) {
        return locale.formatDistance("lessThanXSeconds", 10, localizeOptions);
      } else if (seconds < 20) {
        return locale.formatDistance("lessThanXSeconds", 20, localizeOptions);
      } else if (seconds < 40) {
        return locale.formatDistance("halfAMinute", 0, localizeOptions);
      } else if (seconds < 60) {
        return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
      } else {
        return locale.formatDistance("xMinutes", 1, localizeOptions);
      }
    } else {
      if (minutes === 0) {
        return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
      } else {
        return locale.formatDistance("xMinutes", minutes, localizeOptions);
      }
    }
  } else if (minutes < 45) {
    return locale.formatDistance("xMinutes", minutes, localizeOptions);
  } else if (minutes < 90) {
    return locale.formatDistance("aboutXHours", 1, localizeOptions);
  } else if (minutes < MINUTES_IN_DAY) {
    var hours = Math.round(minutes / 60);
    return locale.formatDistance("aboutXHours", hours, localizeOptions);
  } else if (minutes < MINUTES_IN_ALMOST_TWO_DAYS) {
    return locale.formatDistance("xDays", 1, localizeOptions);
  } else if (minutes < MINUTES_IN_MONTH) {
    var days2 = Math.round(minutes / MINUTES_IN_DAY);
    return locale.formatDistance("xDays", days2, localizeOptions);
  } else if (minutes < MINUTES_IN_TWO_MONTHS) {
    months2 = Math.round(minutes / MINUTES_IN_MONTH);
    return locale.formatDistance("aboutXMonths", months2, localizeOptions);
  }
  months2 = differenceInMonths(dateRight, dateLeft);
  if (months2 < 12) {
    var nearestMonth = Math.round(minutes / MINUTES_IN_MONTH);
    return locale.formatDistance("xMonths", nearestMonth, localizeOptions);
  } else {
    var monthsSinceStartOfYear = months2 % 12;
    var years = Math.floor(months2 / 12);
    if (monthsSinceStartOfYear < 3) {
      return locale.formatDistance("aboutXYears", years, localizeOptions);
    } else if (monthsSinceStartOfYear < 9) {
      return locale.formatDistance("overXYears", years, localizeOptions);
    } else {
      return locale.formatDistance("almostXYears", years + 1, localizeOptions);
    }
  }
}

// node_modules/date-fns/esm/formatDistanceStrict/index.js
var MILLISECONDS_IN_MINUTE = 1e3 * 60;
var MINUTES_IN_DAY2 = 60 * 24;
var MINUTES_IN_MONTH2 = MINUTES_IN_DAY2 * 30;
var MINUTES_IN_YEAR = MINUTES_IN_DAY2 * 365;
function formatDistanceStrict(dirtyDate, dirtyBaseDate, options) {
  var _ref, _options$locale, _options$roundingMeth;
  requiredArgs(2, arguments);
  var defaultOptions = getDefaultOptions();
  var locale = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : defaultLocale_default;
  if (!locale.formatDistance) {
    throw new RangeError("locale must contain localize.formatDistance property");
  }
  var comparison = compareAsc(dirtyDate, dirtyBaseDate);
  if (isNaN(comparison)) {
    throw new RangeError("Invalid time value");
  }
  var localizeOptions = assign(cloneObject(options), {
    addSuffix: Boolean(options === null || options === void 0 ? void 0 : options.addSuffix),
    comparison
  });
  var dateLeft;
  var dateRight;
  if (comparison > 0) {
    dateLeft = toDate(dirtyBaseDate);
    dateRight = toDate(dirtyDate);
  } else {
    dateLeft = toDate(dirtyDate);
    dateRight = toDate(dirtyBaseDate);
  }
  var roundingMethod = String((_options$roundingMeth = options === null || options === void 0 ? void 0 : options.roundingMethod) !== null && _options$roundingMeth !== void 0 ? _options$roundingMeth : "round");
  var roundingMethodFn;
  if (roundingMethod === "floor") {
    roundingMethodFn = Math.floor;
  } else if (roundingMethod === "ceil") {
    roundingMethodFn = Math.ceil;
  } else if (roundingMethod === "round") {
    roundingMethodFn = Math.round;
  } else {
    throw new RangeError("roundingMethod must be 'floor', 'ceil' or 'round'");
  }
  var milliseconds2 = dateRight.getTime() - dateLeft.getTime();
  var minutes = milliseconds2 / MILLISECONDS_IN_MINUTE;
  var timezoneOffset = getTimezoneOffsetInMilliseconds(dateRight) - getTimezoneOffsetInMilliseconds(dateLeft);
  var dstNormalizedMinutes = (milliseconds2 - timezoneOffset) / MILLISECONDS_IN_MINUTE;
  var defaultUnit = options === null || options === void 0 ? void 0 : options.unit;
  var unit;
  if (!defaultUnit) {
    if (minutes < 1) {
      unit = "second";
    } else if (minutes < 60) {
      unit = "minute";
    } else if (minutes < MINUTES_IN_DAY2) {
      unit = "hour";
    } else if (dstNormalizedMinutes < MINUTES_IN_MONTH2) {
      unit = "day";
    } else if (dstNormalizedMinutes < MINUTES_IN_YEAR) {
      unit = "month";
    } else {
      unit = "year";
    }
  } else {
    unit = String(defaultUnit);
  }
  if (unit === "second") {
    var seconds = roundingMethodFn(milliseconds2 / 1e3);
    return locale.formatDistance("xSeconds", seconds, localizeOptions);
  } else if (unit === "minute") {
    var roundedMinutes = roundingMethodFn(minutes);
    return locale.formatDistance("xMinutes", roundedMinutes, localizeOptions);
  } else if (unit === "hour") {
    var hours = roundingMethodFn(minutes / 60);
    return locale.formatDistance("xHours", hours, localizeOptions);
  } else if (unit === "day") {
    var days2 = roundingMethodFn(dstNormalizedMinutes / MINUTES_IN_DAY2);
    return locale.formatDistance("xDays", days2, localizeOptions);
  } else if (unit === "month") {
    var months2 = roundingMethodFn(dstNormalizedMinutes / MINUTES_IN_MONTH2);
    return months2 === 12 && defaultUnit !== "month" ? locale.formatDistance("xYears", 1, localizeOptions) : locale.formatDistance("xMonths", months2, localizeOptions);
  } else if (unit === "year") {
    var years = roundingMethodFn(dstNormalizedMinutes / MINUTES_IN_YEAR);
    return locale.formatDistance("xYears", years, localizeOptions);
  }
  throw new RangeError("unit must be 'second', 'minute', 'hour', 'day', 'month' or 'year'");
}

// node_modules/date-fns/esm/formatDistanceToNow/index.js
function formatDistanceToNow(dirtyDate, options) {
  requiredArgs(1, arguments);
  return formatDistance(dirtyDate, Date.now(), options);
}

// node_modules/date-fns/esm/formatDistanceToNowStrict/index.js
function formatDistanceToNowStrict(dirtyDate, options) {
  requiredArgs(1, arguments);
  return formatDistanceStrict(dirtyDate, Date.now(), options);
}

// node_modules/date-fns/esm/formatDuration/index.js
var defaultFormat = ["years", "months", "weeks", "days", "hours", "minutes", "seconds"];
function formatDuration(duration, options) {
  var _ref, _options$locale, _options$format, _options$zero, _options$delimiter;
  if (arguments.length < 1) {
    throw new TypeError("1 argument required, but only ".concat(arguments.length, " present"));
  }
  var defaultOptions = getDefaultOptions();
  var locale = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : defaultLocale_default;
  var format2 = (_options$format = options === null || options === void 0 ? void 0 : options.format) !== null && _options$format !== void 0 ? _options$format : defaultFormat;
  var zero = (_options$zero = options === null || options === void 0 ? void 0 : options.zero) !== null && _options$zero !== void 0 ? _options$zero : false;
  var delimiter = (_options$delimiter = options === null || options === void 0 ? void 0 : options.delimiter) !== null && _options$delimiter !== void 0 ? _options$delimiter : " ";
  if (!locale.formatDistance) {
    return "";
  }
  var result = format2.reduce(function(acc, unit) {
    var token = "x".concat(unit.replace(/(^.)/, function(m) {
      return m.toUpperCase();
    }));
    var value = duration[unit];
    if (typeof value === "number" && (zero || duration[unit])) {
      return acc.concat(locale.formatDistance(token, value));
    }
    return acc;
  }, []).join(delimiter);
  return result;
}

// node_modules/date-fns/esm/formatISO9075/index.js
function formatISO9075(dirtyDate, options) {
  var _options$format, _options$representati;
  if (arguments.length < 1) {
    throw new TypeError("1 argument required, but only ".concat(arguments.length, " present"));
  }
  var originalDate = toDate(dirtyDate);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  var format2 = String((_options$format = options === null || options === void 0 ? void 0 : options.format) !== null && _options$format !== void 0 ? _options$format : "extended");
  var representation = String((_options$representati = options === null || options === void 0 ? void 0 : options.representation) !== null && _options$representati !== void 0 ? _options$representati : "complete");
  if (format2 !== "extended" && format2 !== "basic") {
    throw new RangeError("format must be 'extended' or 'basic'");
  }
  if (representation !== "date" && representation !== "time" && representation !== "complete") {
    throw new RangeError("representation must be 'date', 'time', or 'complete'");
  }
  var result = "";
  var dateDelimiter = format2 === "extended" ? "-" : "";
  var timeDelimiter = format2 === "extended" ? ":" : "";
  if (representation !== "time") {
    var day = addLeadingZeros(originalDate.getDate(), 2);
    var month = addLeadingZeros(originalDate.getMonth() + 1, 2);
    var year = addLeadingZeros(originalDate.getFullYear(), 4);
    result = "".concat(year).concat(dateDelimiter).concat(month).concat(dateDelimiter).concat(day);
  }
  if (representation !== "date") {
    var hour = addLeadingZeros(originalDate.getHours(), 2);
    var minute = addLeadingZeros(originalDate.getMinutes(), 2);
    var second = addLeadingZeros(originalDate.getSeconds(), 2);
    var separator = result === "" ? "" : " ";
    result = "".concat(result).concat(separator).concat(hour).concat(timeDelimiter).concat(minute).concat(timeDelimiter).concat(second);
  }
  return result;
}

// node_modules/date-fns/esm/formatISODuration/index.js
function formatISODuration(duration) {
  requiredArgs(1, arguments);
  if (_typeof(duration) !== "object")
    throw new Error("Duration must be an object");
  var _duration$years = duration.years, years = _duration$years === void 0 ? 0 : _duration$years, _duration$months = duration.months, months2 = _duration$months === void 0 ? 0 : _duration$months, _duration$days = duration.days, days2 = _duration$days === void 0 ? 0 : _duration$days, _duration$hours = duration.hours, hours = _duration$hours === void 0 ? 0 : _duration$hours, _duration$minutes = duration.minutes, minutes = _duration$minutes === void 0 ? 0 : _duration$minutes, _duration$seconds = duration.seconds, seconds = _duration$seconds === void 0 ? 0 : _duration$seconds;
  return "P".concat(years, "Y").concat(months2, "M").concat(days2, "DT").concat(hours, "H").concat(minutes, "M").concat(seconds, "S");
}

// node_modules/date-fns/esm/formatRFC3339/index.js
function formatRFC3339(dirtyDate, options) {
  var _options$fractionDigi;
  if (arguments.length < 1) {
    throw new TypeError("1 arguments required, but only ".concat(arguments.length, " present"));
  }
  var originalDate = toDate(dirtyDate);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  var fractionDigits = Number((_options$fractionDigi = options === null || options === void 0 ? void 0 : options.fractionDigits) !== null && _options$fractionDigi !== void 0 ? _options$fractionDigi : 0);
  if (!(fractionDigits >= 0 && fractionDigits <= 3)) {
    throw new RangeError("fractionDigits must be between 0 and 3 inclusively");
  }
  var day = addLeadingZeros(originalDate.getDate(), 2);
  var month = addLeadingZeros(originalDate.getMonth() + 1, 2);
  var year = originalDate.getFullYear();
  var hour = addLeadingZeros(originalDate.getHours(), 2);
  var minute = addLeadingZeros(originalDate.getMinutes(), 2);
  var second = addLeadingZeros(originalDate.getSeconds(), 2);
  var fractionalSecond = "";
  if (fractionDigits > 0) {
    var milliseconds2 = originalDate.getMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds2 * Math.pow(10, fractionDigits - 3));
    fractionalSecond = "." + addLeadingZeros(fractionalSeconds, fractionDigits);
  }
  var offset = "";
  var tzOffset = originalDate.getTimezoneOffset();
  if (tzOffset !== 0) {
    var absoluteOffset = Math.abs(tzOffset);
    var hourOffset = addLeadingZeros(toInteger(absoluteOffset / 60), 2);
    var minuteOffset = addLeadingZeros(absoluteOffset % 60, 2);
    var sign = tzOffset < 0 ? "+" : "-";
    offset = "".concat(sign).concat(hourOffset, ":").concat(minuteOffset);
  } else {
    offset = "Z";
  }
  return "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hour, ":").concat(minute, ":").concat(second).concat(fractionalSecond).concat(offset);
}

// node_modules/date-fns/esm/formatRFC7231/index.js
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatRFC7231(dirtyDate) {
  if (arguments.length < 1) {
    throw new TypeError("1 arguments required, but only ".concat(arguments.length, " present"));
  }
  var originalDate = toDate(dirtyDate);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  var dayName = days[originalDate.getUTCDay()];
  var dayOfMonth = addLeadingZeros(originalDate.getUTCDate(), 2);
  var monthName = months[originalDate.getUTCMonth()];
  var year = originalDate.getUTCFullYear();
  var hour = addLeadingZeros(originalDate.getUTCHours(), 2);
  var minute = addLeadingZeros(originalDate.getUTCMinutes(), 2);
  var second = addLeadingZeros(originalDate.getUTCSeconds(), 2);
  return "".concat(dayName, ", ").concat(dayOfMonth, " ").concat(monthName, " ").concat(year, " ").concat(hour, ":").concat(minute, ":").concat(second, " GMT");
}

// node_modules/date-fns/esm/formatRelative/index.js
function formatRelative(dirtyDate, dirtyBaseDate, options) {
  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$weekStartsOn, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var baseDate = toDate(dirtyBaseDate);
  var defaultOptions = getDefaultOptions();
  var locale = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : defaultLocale_default;
  var weekStartsOn = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.weekStartsOn) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : 0);
  if (!locale.localize) {
    throw new RangeError("locale must contain localize property");
  }
  if (!locale.formatLong) {
    throw new RangeError("locale must contain formatLong property");
  }
  if (!locale.formatRelative) {
    throw new RangeError("locale must contain formatRelative property");
  }
  var diff = differenceInCalendarDays(date, baseDate);
  if (isNaN(diff)) {
    throw new RangeError("Invalid time value");
  }
  var token;
  if (diff < -6) {
    token = "other";
  } else if (diff < -1) {
    token = "lastWeek";
  } else if (diff < 0) {
    token = "yesterday";
  } else if (diff < 1) {
    token = "today";
  } else if (diff < 2) {
    token = "tomorrow";
  } else if (diff < 7) {
    token = "nextWeek";
  } else {
    token = "other";
  }
  var utcDate = subMilliseconds(date, getTimezoneOffsetInMilliseconds(date));
  var utcBaseDate = subMilliseconds(baseDate, getTimezoneOffsetInMilliseconds(baseDate));
  var formatStr = locale.formatRelative(token, utcDate, utcBaseDate, {
    locale,
    weekStartsOn
  });
  return format(date, formatStr, {
    locale,
    weekStartsOn
  });
}

// node_modules/date-fns/esm/fromUnixTime/index.js
function fromUnixTime(dirtyUnixTime) {
  requiredArgs(1, arguments);
  var unixTime = toInteger(dirtyUnixTime);
  return toDate(unixTime * 1e3);
}

// node_modules/date-fns/esm/getDayOfYear/index.js
function getDayOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = differenceInCalendarDays(date, startOfYear(date));
  var dayOfYear = diff + 1;
  return dayOfYear;
}

// node_modules/date-fns/esm/isLeapYear/index.js
function isLeapYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}

// node_modules/date-fns/esm/getDaysInYear/index.js
function getDaysInYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  if (String(new Date(date)) === "Invalid Date") {
    return NaN;
  }
  return isLeapYear(date) ? 366 : 365;
}

// node_modules/date-fns/esm/getDecade/index.js
function getDecade(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var decade = Math.floor(year / 10) * 10;
  return decade;
}

// node_modules/date-fns/esm/getDefaultOptions/index.js
function getDefaultOptions2() {
  return assign({}, getDefaultOptions());
}

// node_modules/date-fns/esm/getISODay/index.js
function getISODay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var day = date.getDay();
  if (day === 0) {
    day = 7;
  }
  return day;
}

// node_modules/date-fns/esm/getISOWeek/index.js
var MILLISECONDS_IN_WEEK3 = 6048e5;
function getISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfISOWeek(date).getTime() - startOfISOWeekYear(date).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK3) + 1;
}

// node_modules/date-fns/esm/getISOWeeksInYear/index.js
var MILLISECONDS_IN_WEEK4 = 6048e5;
function getISOWeeksInYear(dirtyDate) {
  requiredArgs(1, arguments);
  var thisYear = startOfISOWeekYear(dirtyDate);
  var nextYear = startOfISOWeekYear(addWeeks(thisYear, 60));
  var diff = nextYear.valueOf() - thisYear.valueOf();
  return Math.round(diff / MILLISECONDS_IN_WEEK4);
}

// node_modules/date-fns/esm/getMilliseconds/index.js
function getMilliseconds(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var milliseconds2 = date.getMilliseconds();
  return milliseconds2;
}

// node_modules/date-fns/esm/getOverlappingDaysInIntervals/index.js
var MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1e3;
function getOverlappingDaysInIntervals(dirtyIntervalLeft, dirtyIntervalRight) {
  requiredArgs(2, arguments);
  var intervalLeft = dirtyIntervalLeft || {};
  var intervalRight = dirtyIntervalRight || {};
  var leftStartTime = toDate(intervalLeft.start).getTime();
  var leftEndTime = toDate(intervalLeft.end).getTime();
  var rightStartTime = toDate(intervalRight.start).getTime();
  var rightEndTime = toDate(intervalRight.end).getTime();
  if (!(leftStartTime <= leftEndTime && rightStartTime <= rightEndTime)) {
    throw new RangeError("Invalid interval");
  }
  var isOverlapping = leftStartTime < rightEndTime && rightStartTime < leftEndTime;
  if (!isOverlapping) {
    return 0;
  }
  var overlapStartDate = rightStartTime < leftStartTime ? leftStartTime : rightStartTime;
  var overlapEndDate = rightEndTime > leftEndTime ? leftEndTime : rightEndTime;
  var differenceInMs = overlapEndDate - overlapStartDate;
  return Math.ceil(differenceInMs / MILLISECONDS_IN_DAY);
}

// node_modules/date-fns/esm/getTime/index.js
function getTime(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var timestamp = date.getTime();
  return timestamp;
}

// node_modules/date-fns/esm/getUnixTime/index.js
function getUnixTime(dirtyDate) {
  requiredArgs(1, arguments);
  return Math.floor(getTime(dirtyDate) / 1e3);
}

// node_modules/date-fns/esm/getWeekYear/index.js
function getWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var defaultOptions = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var firstWeekOfNextYear = /* @__PURE__ */ new Date(0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = /* @__PURE__ */ new Date(0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/date-fns/esm/startOfWeekYear/index.js
function startOfWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  var year = getWeekYear(dirtyDate, options);
  var firstWeek = /* @__PURE__ */ new Date(0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  var date = startOfWeek(firstWeek, options);
  return date;
}

// node_modules/date-fns/esm/getWeek/index.js
var MILLISECONDS_IN_WEEK5 = 6048e5;
function getWeek(dirtyDate, options) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfWeek(date, options).getTime() - startOfWeekYear(date, options).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK5) + 1;
}

// node_modules/date-fns/esm/getWeekOfMonth/index.js
function getWeekOfMonth(date, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var currentDayOfMonth = getDate(date);
  if (isNaN(currentDayOfMonth))
    return NaN;
  var startWeekDay = getDay(startOfMonth(date));
  var lastDayOfFirstWeek = weekStartsOn - startWeekDay;
  if (lastDayOfFirstWeek <= 0)
    lastDayOfFirstWeek += 7;
  var remainingDaysAfterFirstWeek = currentDayOfMonth - lastDayOfFirstWeek;
  return Math.ceil(remainingDaysAfterFirstWeek / 7) + 1;
}

// node_modules/date-fns/esm/lastDayOfMonth/index.js
function lastDayOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(0, 0, 0, 0);
  return date;
}

// node_modules/date-fns/esm/getWeeksInMonth/index.js
function getWeeksInMonth(date, options) {
  requiredArgs(1, arguments);
  return differenceInCalendarWeeks(lastDayOfMonth(date), startOfMonth(date), options) + 1;
}

// node_modules/date-fns/esm/hoursToMilliseconds/index.js
function hoursToMilliseconds(hours) {
  requiredArgs(1, arguments);
  return Math.floor(hours * millisecondsInHour);
}

// node_modules/date-fns/esm/hoursToMinutes/index.js
function hoursToMinutes(hours) {
  requiredArgs(1, arguments);
  return Math.floor(hours * minutesInHour);
}

// node_modules/date-fns/esm/hoursToSeconds/index.js
function hoursToSeconds(hours) {
  requiredArgs(1, arguments);
  return Math.floor(hours * secondsInHour);
}

// node_modules/date-fns/esm/intervalToDuration/index.js
function intervalToDuration(interval) {
  requiredArgs(1, arguments);
  var start = toDate(interval.start);
  var end = toDate(interval.end);
  if (isNaN(start.getTime()))
    throw new RangeError("Start Date is invalid");
  if (isNaN(end.getTime()))
    throw new RangeError("End Date is invalid");
  var duration = {};
  duration.years = Math.abs(differenceInYears(end, start));
  var sign = compareAsc(end, start);
  var remainingMonths = add(start, {
    years: sign * duration.years
  });
  duration.months = Math.abs(differenceInMonths(end, remainingMonths));
  var remainingDays = add(remainingMonths, {
    months: sign * duration.months
  });
  duration.days = Math.abs(differenceInDays(end, remainingDays));
  var remainingHours = add(remainingDays, {
    days: sign * duration.days
  });
  duration.hours = Math.abs(differenceInHours(end, remainingHours));
  var remainingMinutes = add(remainingHours, {
    hours: sign * duration.hours
  });
  duration.minutes = Math.abs(differenceInMinutes(end, remainingMinutes));
  var remainingSeconds = add(remainingMinutes, {
    minutes: sign * duration.minutes
  });
  duration.seconds = Math.abs(differenceInSeconds(end, remainingSeconds));
  return duration;
}

// node_modules/date-fns/esm/intlFormat/index.js
function intlFormat(date, formatOrLocale, localeOptions) {
  var _localeOptions;
  requiredArgs(1, arguments);
  var formatOptions;
  if (isFormatOptions(formatOrLocale)) {
    formatOptions = formatOrLocale;
  } else {
    localeOptions = formatOrLocale;
  }
  return new Intl.DateTimeFormat((_localeOptions = localeOptions) === null || _localeOptions === void 0 ? void 0 : _localeOptions.locale, formatOptions).format(date);
}
function isFormatOptions(opts) {
  return opts !== void 0 && !("locale" in opts);
}

// node_modules/date-fns/esm/intlFormatDistance/index.js
function intlFormatDistance(date, baseDate, options) {
  requiredArgs(2, arguments);
  var value = 0;
  var unit;
  var dateLeft = toDate(date);
  var dateRight = toDate(baseDate);
  if (!(options !== null && options !== void 0 && options.unit)) {
    var diffInSeconds = differenceInSeconds(dateLeft, dateRight);
    if (Math.abs(diffInSeconds) < secondsInMinute) {
      value = differenceInSeconds(dateLeft, dateRight);
      unit = "second";
    } else if (Math.abs(diffInSeconds) < secondsInHour) {
      value = differenceInMinutes(dateLeft, dateRight);
      unit = "minute";
    } else if (Math.abs(diffInSeconds) < secondsInDay && Math.abs(differenceInCalendarDays(dateLeft, dateRight)) < 1) {
      value = differenceInHours(dateLeft, dateRight);
      unit = "hour";
    } else if (Math.abs(diffInSeconds) < secondsInWeek && (value = differenceInCalendarDays(dateLeft, dateRight)) && Math.abs(value) < 7) {
      unit = "day";
    } else if (Math.abs(diffInSeconds) < secondsInMonth) {
      value = differenceInCalendarWeeks(dateLeft, dateRight);
      unit = "week";
    } else if (Math.abs(diffInSeconds) < secondsInQuarter) {
      value = differenceInCalendarMonths(dateLeft, dateRight);
      unit = "month";
    } else if (Math.abs(diffInSeconds) < secondsInYear) {
      if (differenceInCalendarQuarters(dateLeft, dateRight) < 4) {
        value = differenceInCalendarQuarters(dateLeft, dateRight);
        unit = "quarter";
      } else {
        value = differenceInCalendarYears(dateLeft, dateRight);
        unit = "year";
      }
    } else {
      value = differenceInCalendarYears(dateLeft, dateRight);
      unit = "year";
    }
  } else {
    unit = options === null || options === void 0 ? void 0 : options.unit;
    if (unit === "second") {
      value = differenceInSeconds(dateLeft, dateRight);
    } else if (unit === "minute") {
      value = differenceInMinutes(dateLeft, dateRight);
    } else if (unit === "hour") {
      value = differenceInHours(dateLeft, dateRight);
    } else if (unit === "day") {
      value = differenceInCalendarDays(dateLeft, dateRight);
    } else if (unit === "week") {
      value = differenceInCalendarWeeks(dateLeft, dateRight);
    } else if (unit === "month") {
      value = differenceInCalendarMonths(dateLeft, dateRight);
    } else if (unit === "quarter") {
      value = differenceInCalendarQuarters(dateLeft, dateRight);
    } else if (unit === "year") {
      value = differenceInCalendarYears(dateLeft, dateRight);
    }
  }
  var rtf = new Intl.RelativeTimeFormat(options === null || options === void 0 ? void 0 : options.locale, {
    localeMatcher: options === null || options === void 0 ? void 0 : options.localeMatcher,
    numeric: (options === null || options === void 0 ? void 0 : options.numeric) || "auto",
    style: options === null || options === void 0 ? void 0 : options.style
  });
  return rtf.format(value, unit);
}

// node_modules/date-fns/esm/isExists/index.js
function isExists(year, month, day) {
  if (arguments.length < 3) {
    throw new TypeError("3 argument required, but only " + arguments.length + " present");
  }
  var date = new Date(year, month, day);
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
}

// node_modules/date-fns/esm/isFirstDayOfMonth/index.js
function isFirstDayOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  return toDate(dirtyDate).getDate() === 1;
}

// node_modules/date-fns/esm/isFriday/index.js
function isFriday(dirtyDate) {
  requiredArgs(1, arguments);
  return toDate(dirtyDate).getDay() === 5;
}

// node_modules/date-fns/esm/isFuture/index.js
function isFuture(dirtyDate) {
  requiredArgs(1, arguments);
  return toDate(dirtyDate).getTime() > Date.now();
}

// node_modules/date-fns/esm/isMatch/index.js
function isMatch(dateString, formatString, options) {
  requiredArgs(2, arguments);
  return isValid(parse(dateString, formatString, /* @__PURE__ */ new Date(), options));
}

// node_modules/date-fns/esm/isMonday/index.js
function isMonday(date) {
  requiredArgs(1, arguments);
  return toDate(date).getDay() === 1;
}

// node_modules/date-fns/esm/isPast/index.js
function isPast(dirtyDate) {
  requiredArgs(1, arguments);
  return toDate(dirtyDate).getTime() < Date.now();
}

// node_modules/date-fns/esm/isSameWeek/index.js
function isSameWeek(dirtyDateLeft, dirtyDateRight, options) {
  requiredArgs(2, arguments);
  var dateLeftStartOfWeek = startOfWeek(dirtyDateLeft, options);
  var dateRightStartOfWeek = startOfWeek(dirtyDateRight, options);
  return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime();
}

// node_modules/date-fns/esm/isSameISOWeek/index.js
function isSameISOWeek(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  return isSameWeek(dirtyDateLeft, dirtyDateRight, {
    weekStartsOn: 1
  });
}

// node_modules/date-fns/esm/isSameISOWeekYear/index.js
function isSameISOWeekYear(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeftStartOfYear = startOfISOWeekYear(dirtyDateLeft);
  var dateRightStartOfYear = startOfISOWeekYear(dirtyDateRight);
  return dateLeftStartOfYear.getTime() === dateRightStartOfYear.getTime();
}

// node_modules/date-fns/esm/isSameMinute/index.js
function isSameMinute(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeftStartOfMinute = startOfMinute(dirtyDateLeft);
  var dateRightStartOfMinute = startOfMinute(dirtyDateRight);
  return dateLeftStartOfMinute.getTime() === dateRightStartOfMinute.getTime();
}

// node_modules/date-fns/esm/isSameQuarter/index.js
function isSameQuarter(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeftStartOfQuarter = startOfQuarter(dirtyDateLeft);
  var dateRightStartOfQuarter = startOfQuarter(dirtyDateRight);
  return dateLeftStartOfQuarter.getTime() === dateRightStartOfQuarter.getTime();
}

// node_modules/date-fns/esm/startOfSecond/index.js
function startOfSecond(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setMilliseconds(0);
  return date;
}

// node_modules/date-fns/esm/isSameSecond/index.js
function isSameSecond(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeftStartOfSecond = startOfSecond(dirtyDateLeft);
  var dateRightStartOfSecond = startOfSecond(dirtyDateRight);
  return dateLeftStartOfSecond.getTime() === dateRightStartOfSecond.getTime();
}

// node_modules/date-fns/esm/isThisHour/index.js
function isThisHour(dirtyDate) {
  requiredArgs(1, arguments);
  return isSameHour(Date.now(), dirtyDate);
}

// node_modules/date-fns/esm/isThisISOWeek/index.js
function isThisISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  return isSameISOWeek(dirtyDate, Date.now());
}

// node_modules/date-fns/esm/isThisMinute/index.js
function isThisMinute(dirtyDate) {
  requiredArgs(1, arguments);
  return isSameMinute(Date.now(), dirtyDate);
}

// node_modules/date-fns/esm/isThisMonth/index.js
function isThisMonth(dirtyDate) {
  requiredArgs(1, arguments);
  return isSameMonth(Date.now(), dirtyDate);
}

// node_modules/date-fns/esm/isThisQuarter/index.js
function isThisQuarter(dirtyDate) {
  requiredArgs(1, arguments);
  return isSameQuarter(Date.now(), dirtyDate);
}

// node_modules/date-fns/esm/isThisSecond/index.js
function isThisSecond(dirtyDate) {
  requiredArgs(1, arguments);
  return isSameSecond(Date.now(), dirtyDate);
}

// node_modules/date-fns/esm/isThisWeek/index.js
function isThisWeek(dirtyDate, options) {
  requiredArgs(1, arguments);
  return isSameWeek(dirtyDate, Date.now(), options);
}

// node_modules/date-fns/esm/isThisYear/index.js
function isThisYear(dirtyDate) {
  requiredArgs(1, arguments);
  return isSameYear(dirtyDate, Date.now());
}

// node_modules/date-fns/esm/isThursday/index.js
function isThursday(dirtyDate) {
  requiredArgs(1, arguments);
  return toDate(dirtyDate).getDay() === 4;
}

// node_modules/date-fns/esm/isToday/index.js
function isToday(dirtyDate) {
  requiredArgs(1, arguments);
  return isSameDay(dirtyDate, Date.now());
}

// node_modules/date-fns/esm/isTomorrow/index.js
function isTomorrow(dirtyDate) {
  requiredArgs(1, arguments);
  return isSameDay(dirtyDate, addDays(Date.now(), 1));
}

// node_modules/date-fns/esm/isTuesday/index.js
function isTuesday(dirtyDate) {
  requiredArgs(1, arguments);
  return toDate(dirtyDate).getDay() === 2;
}

// node_modules/date-fns/esm/isWednesday/index.js
function isWednesday(dirtyDate) {
  requiredArgs(1, arguments);
  return toDate(dirtyDate).getDay() === 3;
}

// node_modules/date-fns/esm/subDays/index.js
function subDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addDays(dirtyDate, -amount);
}

// node_modules/date-fns/esm/isYesterday/index.js
function isYesterday(dirtyDate) {
  requiredArgs(1, arguments);
  return isSameDay(dirtyDate, subDays(Date.now(), 1));
}

// node_modules/date-fns/esm/lastDayOfDecade/index.js
function lastDayOfDecade(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var decade = 9 + Math.floor(year / 10) * 10;
  date.setFullYear(decade + 1, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date;
}

// node_modules/date-fns/esm/lastDayOfWeek/index.js
function lastDayOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6");
  }
  var date = toDate(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + diff);
  return date;
}

// node_modules/date-fns/esm/lastDayOfISOWeek/index.js
function lastDayOfISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  return lastDayOfWeek(dirtyDate, {
    weekStartsOn: 1
  });
}

// node_modules/date-fns/esm/lastDayOfISOWeekYear/index.js
function lastDayOfISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getISOWeekYear(dirtyDate);
  var fourthOfJanuary = /* @__PURE__ */ new Date(0);
  fourthOfJanuary.setFullYear(year + 1, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  var date = startOfISOWeek(fourthOfJanuary);
  date.setDate(date.getDate() - 1);
  return date;
}

// node_modules/date-fns/esm/lastDayOfQuarter/index.js
function lastDayOfQuarter(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3 + 3;
  date.setMonth(month, 0);
  date.setHours(0, 0, 0, 0);
  return date;
}

// node_modules/date-fns/esm/lastDayOfYear/index.js
function lastDayOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  date.setFullYear(year + 1, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date;
}

// node_modules/date-fns/esm/lightFormat/index.js
var formattingTokensRegExp = /(\w)\1*|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function lightFormat(dirtyDate, formatStr) {
  requiredArgs(2, arguments);
  var originalDate = toDate(dirtyDate);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
  var utcDate = subMilliseconds(originalDate, timezoneOffset);
  var tokens = formatStr.match(formattingTokensRegExp);
  if (!tokens)
    return "";
  var result = tokens.map(function(substring) {
    if (substring === "''") {
      return "'";
    }
    var firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return cleanEscapedString(substring);
    }
    var formatter = lightFormatters_default[firstCharacter];
    if (formatter) {
      return formatter(utcDate, substring);
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
    }
    return substring;
  }).join("");
  return result;
}
function cleanEscapedString(input) {
  var matches = input.match(escapedStringRegExp);
  if (!matches) {
    return input;
  }
  return matches[1].replace(doubleQuoteRegExp, "'");
}

// node_modules/date-fns/esm/milliseconds/index.js
var daysInYear2 = 365.2425;
function milliseconds(_ref) {
  var years = _ref.years, months2 = _ref.months, weeks = _ref.weeks, days2 = _ref.days, hours = _ref.hours, minutes = _ref.minutes, seconds = _ref.seconds;
  requiredArgs(1, arguments);
  var totalDays = 0;
  if (years)
    totalDays += years * daysInYear2;
  if (months2)
    totalDays += months2 * (daysInYear2 / 12);
  if (weeks)
    totalDays += weeks * 7;
  if (days2)
    totalDays += days2;
  var totalSeconds = totalDays * 24 * 60 * 60;
  if (hours)
    totalSeconds += hours * 60 * 60;
  if (minutes)
    totalSeconds += minutes * 60;
  if (seconds)
    totalSeconds += seconds;
  return Math.round(totalSeconds * 1e3);
}

// node_modules/date-fns/esm/millisecondsToHours/index.js
function millisecondsToHours(milliseconds2) {
  requiredArgs(1, arguments);
  var hours = milliseconds2 / millisecondsInHour;
  return Math.floor(hours);
}

// node_modules/date-fns/esm/millisecondsToMinutes/index.js
function millisecondsToMinutes(milliseconds2) {
  requiredArgs(1, arguments);
  var minutes = milliseconds2 / millisecondsInMinute;
  return Math.floor(minutes);
}

// node_modules/date-fns/esm/millisecondsToSeconds/index.js
function millisecondsToSeconds(milliseconds2) {
  requiredArgs(1, arguments);
  var seconds = milliseconds2 / millisecondsInSecond;
  return Math.floor(seconds);
}

// node_modules/date-fns/esm/minutesToHours/index.js
function minutesToHours(minutes) {
  requiredArgs(1, arguments);
  var hours = minutes / minutesInHour;
  return Math.floor(hours);
}

// node_modules/date-fns/esm/minutesToMilliseconds/index.js
function minutesToMilliseconds(minutes) {
  requiredArgs(1, arguments);
  return Math.floor(minutes * millisecondsInMinute);
}

// node_modules/date-fns/esm/minutesToSeconds/index.js
function minutesToSeconds(minutes) {
  requiredArgs(1, arguments);
  return Math.floor(minutes * secondsInMinute);
}

// node_modules/date-fns/esm/monthsToQuarters/index.js
function monthsToQuarters(months2) {
  requiredArgs(1, arguments);
  var quarters = months2 / monthsInQuarter;
  return Math.floor(quarters);
}

// node_modules/date-fns/esm/monthsToYears/index.js
function monthsToYears(months2) {
  requiredArgs(1, arguments);
  var years = months2 / monthsInYear;
  return Math.floor(years);
}

// node_modules/date-fns/esm/nextDay/index.js
function nextDay(date, day) {
  requiredArgs(2, arguments);
  var delta = day - getDay(date);
  if (delta <= 0)
    delta += 7;
  return addDays(date, delta);
}

// node_modules/date-fns/esm/nextFriday/index.js
function nextFriday(date) {
  requiredArgs(1, arguments);
  return nextDay(date, 5);
}

// node_modules/date-fns/esm/nextMonday/index.js
function nextMonday(date) {
  requiredArgs(1, arguments);
  return nextDay(date, 1);
}

// node_modules/date-fns/esm/nextSaturday/index.js
function nextSaturday(date) {
  requiredArgs(1, arguments);
  return nextDay(date, 6);
}

// node_modules/date-fns/esm/nextSunday/index.js
function nextSunday(date) {
  requiredArgs(1, arguments);
  return nextDay(date, 0);
}

// node_modules/date-fns/esm/nextThursday/index.js
function nextThursday(date) {
  requiredArgs(1, arguments);
  return nextDay(date, 4);
}

// node_modules/date-fns/esm/nextTuesday/index.js
function nextTuesday(date) {
  requiredArgs(1, arguments);
  return nextDay(date, 2);
}

// node_modules/date-fns/esm/nextWednesday/index.js
function nextWednesday(date) {
  requiredArgs(1, arguments);
  return nextDay(date, 3);
}

// node_modules/date-fns/esm/parseJSON/index.js
function parseJSON(argument) {
  requiredArgs(1, arguments);
  if (typeof argument === "string") {
    var parts = argument.match(/(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d{0,7}))?(?:Z|(.)(\d{2}):?(\d{2})?)?/);
    if (parts) {
      return new Date(Date.UTC(+parts[1], +parts[2] - 1, +parts[3], +parts[4] - (+parts[9] || 0) * (parts[8] == "-" ? -1 : 1), +parts[5] - (+parts[10] || 0) * (parts[8] == "-" ? -1 : 1), +parts[6], +((parts[7] || "0") + "00").substring(0, 3)));
    }
    return /* @__PURE__ */ new Date(NaN);
  }
  return toDate(argument);
}

// node_modules/date-fns/esm/previousDay/index.js
function previousDay(date, day) {
  requiredArgs(2, arguments);
  var delta = getDay(date) - day;
  if (delta <= 0)
    delta += 7;
  return subDays(date, delta);
}

// node_modules/date-fns/esm/previousFriday/index.js
function previousFriday(date) {
  requiredArgs(1, arguments);
  return previousDay(date, 5);
}

// node_modules/date-fns/esm/previousMonday/index.js
function previousMonday(date) {
  requiredArgs(1, arguments);
  return previousDay(date, 1);
}

// node_modules/date-fns/esm/previousSaturday/index.js
function previousSaturday(date) {
  requiredArgs(1, arguments);
  return previousDay(date, 6);
}

// node_modules/date-fns/esm/previousSunday/index.js
function previousSunday(date) {
  requiredArgs(1, arguments);
  return previousDay(date, 0);
}

// node_modules/date-fns/esm/previousThursday/index.js
function previousThursday(date) {
  requiredArgs(1, arguments);
  return previousDay(date, 4);
}

// node_modules/date-fns/esm/previousTuesday/index.js
function previousTuesday(date) {
  requiredArgs(1, arguments);
  return previousDay(date, 2);
}

// node_modules/date-fns/esm/previousWednesday/index.js
function previousWednesday(date) {
  requiredArgs(1, arguments);
  return previousDay(date, 3);
}

// node_modules/date-fns/esm/quartersToMonths/index.js
function quartersToMonths(quarters) {
  requiredArgs(1, arguments);
  return Math.floor(quarters * monthsInQuarter);
}

// node_modules/date-fns/esm/quartersToYears/index.js
function quartersToYears(quarters) {
  requiredArgs(1, arguments);
  var years = quarters / quartersInYear;
  return Math.floor(years);
}

// node_modules/date-fns/esm/roundToNearestMinutes/index.js
function roundToNearestMinutes(dirtyDate, options) {
  var _options$nearestTo;
  if (arguments.length < 1) {
    throw new TypeError("1 argument required, but only none provided present");
  }
  var nearestTo = toInteger((_options$nearestTo = options === null || options === void 0 ? void 0 : options.nearestTo) !== null && _options$nearestTo !== void 0 ? _options$nearestTo : 1);
  if (nearestTo < 1 || nearestTo > 30) {
    throw new RangeError("`options.nearestTo` must be between 1 and 30");
  }
  var date = toDate(dirtyDate);
  var seconds = date.getSeconds();
  var minutes = date.getMinutes() + seconds / 60;
  var roundingMethod = getRoundingMethod(options === null || options === void 0 ? void 0 : options.roundingMethod);
  var roundedMinutes = roundingMethod(minutes / nearestTo) * nearestTo;
  var remainderMinutes = minutes % nearestTo;
  var addedMinutes = Math.round(remainderMinutes / nearestTo) * nearestTo;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), roundedMinutes + addedMinutes);
}

// node_modules/date-fns/esm/secondsToHours/index.js
function secondsToHours(seconds) {
  requiredArgs(1, arguments);
  var hours = seconds / secondsInHour;
  return Math.floor(hours);
}

// node_modules/date-fns/esm/secondsToMilliseconds/index.js
function secondsToMilliseconds(seconds) {
  requiredArgs(1, arguments);
  return seconds * millisecondsInSecond;
}

// node_modules/date-fns/esm/secondsToMinutes/index.js
function secondsToMinutes(seconds) {
  requiredArgs(1, arguments);
  var minutes = seconds / secondsInMinute;
  return Math.floor(minutes);
}

// node_modules/date-fns/esm/set/index.js
function set(dirtyDate, values) {
  requiredArgs(2, arguments);
  if (_typeof(values) !== "object" || values === null) {
    throw new RangeError("values parameter must be an object");
  }
  var date = toDate(dirtyDate);
  if (isNaN(date.getTime())) {
    return /* @__PURE__ */ new Date(NaN);
  }
  if (values.year != null) {
    date.setFullYear(values.year);
  }
  if (values.month != null) {
    date = setMonth(date, values.month);
  }
  if (values.date != null) {
    date.setDate(toInteger(values.date));
  }
  if (values.hours != null) {
    date.setHours(toInteger(values.hours));
  }
  if (values.minutes != null) {
    date.setMinutes(toInteger(values.minutes));
  }
  if (values.seconds != null) {
    date.setSeconds(toInteger(values.seconds));
  }
  if (values.milliseconds != null) {
    date.setMilliseconds(toInteger(values.milliseconds));
  }
  return date;
}

// node_modules/date-fns/esm/setDay/index.js
function setDay(dirtyDate, dirtyDay, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(2, arguments);
  var defaultOptions = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = toInteger(dirtyDay);
  var currentDay = date.getDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var delta = 7 - weekStartsOn;
  var diff = day < 0 || day > 6 ? day - (currentDay + delta) % 7 : (dayIndex + delta) % 7 - (currentDay + delta) % 7;
  return addDays(date, diff);
}

// node_modules/date-fns/esm/setDayOfYear/index.js
function setDayOfYear(dirtyDate, dirtyDayOfYear) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var dayOfYear = toInteger(dirtyDayOfYear);
  date.setMonth(0);
  date.setDate(dayOfYear);
  return date;
}

// node_modules/date-fns/esm/setDefaultOptions/index.js
function setDefaultOptions2(newOptions) {
  requiredArgs(1, arguments);
  var result = {};
  var defaultOptions = getDefaultOptions();
  for (var property in defaultOptions) {
    if (Object.prototype.hasOwnProperty.call(defaultOptions, property)) {
      ;
      result[property] = defaultOptions[property];
    }
  }
  for (var _property in newOptions) {
    if (Object.prototype.hasOwnProperty.call(newOptions, _property)) {
      if (newOptions[_property] === void 0) {
        delete result[_property];
      } else {
        ;
        result[_property] = newOptions[_property];
      }
    }
  }
  setDefaultOptions(result);
}

// node_modules/date-fns/esm/setISODay/index.js
function setISODay(dirtyDate, dirtyDay) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var day = toInteger(dirtyDay);
  var currentDay = getISODay(date);
  var diff = day - currentDay;
  return addDays(date, diff);
}

// node_modules/date-fns/esm/setISOWeek/index.js
function setISOWeek(dirtyDate, dirtyISOWeek) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var isoWeek = toInteger(dirtyISOWeek);
  var diff = getISOWeek(date) - isoWeek;
  date.setDate(date.getDate() - diff * 7);
  return date;
}

// node_modules/date-fns/esm/setMilliseconds/index.js
function setMilliseconds(dirtyDate, dirtyMilliseconds) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var milliseconds2 = toInteger(dirtyMilliseconds);
  date.setMilliseconds(milliseconds2);
  return date;
}

// node_modules/date-fns/esm/setQuarter/index.js
function setQuarter(dirtyDate, dirtyQuarter) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var quarter = toInteger(dirtyQuarter);
  var oldQuarter = Math.floor(date.getMonth() / 3) + 1;
  var diff = quarter - oldQuarter;
  return setMonth(date, date.getMonth() + diff * 3);
}

// node_modules/date-fns/esm/setWeek/index.js
function setWeek(dirtyDate, dirtyWeek, options) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var week = toInteger(dirtyWeek);
  var diff = getWeek(date, options) - week;
  date.setDate(date.getDate() - diff * 7);
  return date;
}

// node_modules/date-fns/esm/setWeekYear/index.js
function setWeekYear(dirtyDate, dirtyWeekYear, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(2, arguments);
  var defaultOptions = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  var date = toDate(dirtyDate);
  var weekYear = toInteger(dirtyWeekYear);
  var diff = differenceInCalendarDays(date, startOfWeekYear(date, options));
  var firstWeek = /* @__PURE__ */ new Date(0);
  firstWeek.setFullYear(weekYear, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  date = startOfWeekYear(firstWeek, options);
  date.setDate(date.getDate() + diff);
  return date;
}

// node_modules/date-fns/esm/startOfDecade/index.js
function startOfDecade(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var decade = Math.floor(year / 10) * 10;
  date.setFullYear(decade, 0, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

// node_modules/date-fns/esm/startOfToday/index.js
function startOfToday() {
  return startOfDay(Date.now());
}

// node_modules/date-fns/esm/startOfTomorrow/index.js
function startOfTomorrow() {
  var now = /* @__PURE__ */ new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();
  var date = /* @__PURE__ */ new Date(0);
  date.setFullYear(year, month, day + 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

// node_modules/date-fns/esm/startOfYesterday/index.js
function startOfYesterday() {
  var now = /* @__PURE__ */ new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();
  var date = /* @__PURE__ */ new Date(0);
  date.setFullYear(year, month, day - 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

// node_modules/date-fns/esm/subMonths/index.js
function subMonths(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMonths(dirtyDate, -amount);
}

// node_modules/date-fns/esm/sub/index.js
function sub(date, duration) {
  requiredArgs(2, arguments);
  if (!duration || _typeof(duration) !== "object")
    return /* @__PURE__ */ new Date(NaN);
  var years = duration.years ? toInteger(duration.years) : 0;
  var months2 = duration.months ? toInteger(duration.months) : 0;
  var weeks = duration.weeks ? toInteger(duration.weeks) : 0;
  var days2 = duration.days ? toInteger(duration.days) : 0;
  var hours = duration.hours ? toInteger(duration.hours) : 0;
  var minutes = duration.minutes ? toInteger(duration.minutes) : 0;
  var seconds = duration.seconds ? toInteger(duration.seconds) : 0;
  var dateWithoutMonths = subMonths(date, months2 + years * 12);
  var dateWithoutDays = subDays(dateWithoutMonths, days2 + weeks * 7);
  var minutestoSub = minutes + hours * 60;
  var secondstoSub = seconds + minutestoSub * 60;
  var mstoSub = secondstoSub * 1e3;
  var finalDate = new Date(dateWithoutDays.getTime() - mstoSub);
  return finalDate;
}

// node_modules/date-fns/esm/subBusinessDays/index.js
function subBusinessDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addBusinessDays(dirtyDate, -amount);
}

// node_modules/date-fns/esm/subHours/index.js
function subHours(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addHours(dirtyDate, -amount);
}

// node_modules/date-fns/esm/subMinutes/index.js
function subMinutes(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMinutes(dirtyDate, -amount);
}

// node_modules/date-fns/esm/subQuarters/index.js
function subQuarters(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addQuarters(dirtyDate, -amount);
}

// node_modules/date-fns/esm/subSeconds/index.js
function subSeconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addSeconds(dirtyDate, -amount);
}

// node_modules/date-fns/esm/subWeeks/index.js
function subWeeks(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addWeeks(dirtyDate, -amount);
}

// node_modules/date-fns/esm/subYears/index.js
function subYears(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addYears(dirtyDate, -amount);
}

// node_modules/date-fns/esm/weeksToDays/index.js
function weeksToDays(weeks) {
  requiredArgs(1, arguments);
  return Math.floor(weeks * daysInWeek);
}

// node_modules/date-fns/esm/yearsToMonths/index.js
function yearsToMonths(years) {
  requiredArgs(1, arguments);
  return Math.floor(years * monthsInYear);
}

// node_modules/date-fns/esm/yearsToQuarters/index.js
function yearsToQuarters(years) {
  requiredArgs(1, arguments);
  return Math.floor(years * quartersInYear);
}
export {
  add,
  addBusinessDays,
  addDays,
  addHours,
  addISOWeekYears,
  addMilliseconds,
  addMinutes,
  addMonths,
  addQuarters,
  addSeconds,
  addWeeks,
  addYears,
  areIntervalsOverlapping,
  clamp,
  closestIndexTo,
  closestTo,
  compareAsc,
  compareDesc,
  daysInWeek,
  daysInYear,
  daysToWeeks,
  differenceInBusinessDays,
  differenceInCalendarDays,
  differenceInCalendarISOWeekYears,
  differenceInCalendarISOWeeks,
  differenceInCalendarMonths,
  differenceInCalendarQuarters,
  differenceInCalendarWeeks,
  differenceInCalendarYears,
  differenceInDays,
  differenceInHours,
  differenceInISOWeekYears,
  differenceInMilliseconds,
  differenceInMinutes,
  differenceInMonths,
  differenceInQuarters,
  differenceInSeconds,
  differenceInWeeks,
  differenceInYears,
  eachDayOfInterval,
  eachHourOfInterval,
  eachMinuteOfInterval,
  eachMonthOfInterval,
  eachQuarterOfInterval,
  eachWeekOfInterval,
  eachWeekendOfInterval,
  eachWeekendOfMonth,
  eachWeekendOfYear,
  eachYearOfInterval,
  endOfDay,
  endOfDecade,
  endOfHour,
  endOfISOWeek,
  endOfISOWeekYear,
  endOfMinute,
  endOfMonth,
  endOfQuarter,
  endOfSecond,
  endOfToday,
  endOfTomorrow,
  endOfWeek,
  endOfYear,
  endOfYesterday,
  format,
  formatDistance,
  formatDistanceStrict,
  formatDistanceToNow,
  formatDistanceToNowStrict,
  formatDuration,
  formatISO,
  formatISO9075,
  formatISODuration,
  formatRFC3339,
  formatRFC7231,
  formatRelative,
  fromUnixTime,
  getDate,
  getDay,
  getDayOfYear,
  getDaysInMonth,
  getDaysInYear,
  getDecade,
  getDefaultOptions2 as getDefaultOptions,
  getHours,
  getISODay,
  getISOWeek,
  getISOWeekYear,
  getISOWeeksInYear,
  getMilliseconds,
  getMinutes,
  getMonth,
  getOverlappingDaysInIntervals,
  getQuarter,
  getSeconds,
  getTime,
  getUnixTime,
  getWeek,
  getWeekOfMonth,
  getWeekYear,
  getWeeksInMonth,
  getYear,
  hoursToMilliseconds,
  hoursToMinutes,
  hoursToSeconds,
  intervalToDuration,
  intlFormat,
  intlFormatDistance,
  isAfter,
  isBefore,
  isDate,
  isEqual,
  isExists,
  isFirstDayOfMonth,
  isFriday,
  isFuture,
  isLastDayOfMonth,
  isLeapYear,
  isMatch,
  isMonday,
  isPast,
  isSameDay,
  isSameHour,
  isSameISOWeek,
  isSameISOWeekYear,
  isSameMinute,
  isSameMonth,
  isSameQuarter,
  isSameSecond,
  isSameWeek,
  isSameYear,
  isSaturday,
  isSunday,
  isThisHour,
  isThisISOWeek,
  isThisMinute,
  isThisMonth,
  isThisQuarter,
  isThisSecond,
  isThisWeek,
  isThisYear,
  isThursday,
  isToday,
  isTomorrow,
  isTuesday,
  isValid,
  isWednesday,
  isWeekend,
  isWithinInterval,
  isYesterday,
  lastDayOfDecade,
  lastDayOfISOWeek,
  lastDayOfISOWeekYear,
  lastDayOfMonth,
  lastDayOfQuarter,
  lastDayOfWeek,
  lastDayOfYear,
  lightFormat,
  max,
  maxTime,
  milliseconds,
  millisecondsInHour,
  millisecondsInMinute,
  millisecondsInSecond,
  millisecondsToHours,
  millisecondsToMinutes,
  millisecondsToSeconds,
  min,
  minTime,
  minutesInHour,
  minutesToHours,
  minutesToMilliseconds,
  minutesToSeconds,
  monthsInQuarter,
  monthsInYear,
  monthsToQuarters,
  monthsToYears,
  nextDay,
  nextFriday,
  nextMonday,
  nextSaturday,
  nextSunday,
  nextThursday,
  nextTuesday,
  nextWednesday,
  parse,
  parseISO,
  parseJSON,
  previousDay,
  previousFriday,
  previousMonday,
  previousSaturday,
  previousSunday,
  previousThursday,
  previousTuesday,
  previousWednesday,
  quartersInYear,
  quartersToMonths,
  quartersToYears,
  roundToNearestMinutes,
  secondsInDay,
  secondsInHour,
  secondsInMinute,
  secondsInMonth,
  secondsInQuarter,
  secondsInWeek,
  secondsInYear,
  secondsToHours,
  secondsToMilliseconds,
  secondsToMinutes,
  set,
  setDate,
  setDay,
  setDayOfYear,
  setDefaultOptions2 as setDefaultOptions,
  setHours,
  setISODay,
  setISOWeek,
  setISOWeekYear,
  setMilliseconds,
  setMinutes,
  setMonth,
  setQuarter,
  setSeconds,
  setWeek,
  setWeekYear,
  setYear,
  startOfDay,
  startOfDecade,
  startOfHour,
  startOfISOWeek,
  startOfISOWeekYear,
  startOfMinute,
  startOfMonth,
  startOfQuarter,
  startOfSecond,
  startOfToday,
  startOfTomorrow,
  startOfWeek,
  startOfWeekYear,
  startOfYear,
  startOfYesterday,
  sub,
  subBusinessDays,
  subDays,
  subHours,
  subISOWeekYears,
  subMilliseconds,
  subMinutes,
  subMonths,
  subQuarters,
  subSeconds,
  subWeeks,
  subYears,
  toDate,
  weeksToDays,
  yearsToMonths,
  yearsToQuarters
};
//# sourceMappingURL=date-fns.js.map
