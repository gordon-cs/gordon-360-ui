import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addSeconds,
  addWeeks,
  addYears,
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
  en_US_default,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  formatISO,
  getDate,
  getDay,
  getDaysInMonth,
  getHours,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
  isAfter,
  isBefore,
  isEqual,
  isSameDay,
  isSameHour,
  isSameMonth,
  isSameYear,
  isValid,
  isWithinInterval,
  parse,
  setDate,
  setHours,
  setMinutes,
  setMonth,
  setSeconds,
  setYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear
} from "./chunk-BGUWWXYC.js";
import "./chunk-GZHN7YFF.js";
import "./chunk-OUNQININ.js";
import {
  parseISO
} from "./chunk-2X5AFJN5.js";
import "./chunk-CLTD24QJ.js";
import "./chunk-7JSK233G.js";
import "./chunk-LQHJAPLN.js";
import {
  __commonJS,
  __toESM
} from "./chunk-LFBQMW2U.js";

// node_modules/date-fns/_lib/format/longFormatters/index.js
var require_longFormatters = __commonJS({
  "node_modules/date-fns/_lib/format/longFormatters/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var dateLongFormatter = function dateLongFormatter2(pattern, formatLong) {
      switch (pattern) {
        case "P":
          return formatLong.date({
            width: "short"
          });
        case "PP":
          return formatLong.date({
            width: "medium"
          });
        case "PPP":
          return formatLong.date({
            width: "long"
          });
        case "PPPP":
        default:
          return formatLong.date({
            width: "full"
          });
      }
    };
    var timeLongFormatter = function timeLongFormatter2(pattern, formatLong) {
      switch (pattern) {
        case "p":
          return formatLong.time({
            width: "short"
          });
        case "pp":
          return formatLong.time({
            width: "medium"
          });
        case "ppp":
          return formatLong.time({
            width: "long"
          });
        case "pppp":
        default:
          return formatLong.time({
            width: "full"
          });
      }
    };
    var dateTimeLongFormatter = function dateTimeLongFormatter2(pattern, formatLong) {
      var matchResult = pattern.match(/(P+)(p+)?/) || [];
      var datePattern = matchResult[1];
      var timePattern = matchResult[2];
      if (!timePattern) {
        return dateLongFormatter(pattern, formatLong);
      }
      var dateTimeFormat;
      switch (datePattern) {
        case "P":
          dateTimeFormat = formatLong.dateTime({
            width: "short"
          });
          break;
        case "PP":
          dateTimeFormat = formatLong.dateTime({
            width: "medium"
          });
          break;
        case "PPP":
          dateTimeFormat = formatLong.dateTime({
            width: "long"
          });
          break;
        case "PPPP":
        default:
          dateTimeFormat = formatLong.dateTime({
            width: "full"
          });
          break;
      }
      return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong)).replace("{{time}}", timeLongFormatter(timePattern, formatLong));
    };
    var longFormatters3 = {
      p: timeLongFormatter,
      P: dateTimeLongFormatter
    };
    var _default = longFormatters3;
    exports.default = _default;
    module.exports = exports.default;
  }
});

// node_modules/@date-io/date-fns/build/index.esm.js
var import_longFormatters = __toESM(require_longFormatters());
var defaultFormats = {
  dayOfMonth: "d",
  fullDate: "PP",
  fullDateWithWeekday: "PPPP",
  fullDateTime: "PP p",
  fullDateTime12h: "PP hh:mm aaa",
  fullDateTime24h: "PP HH:mm",
  fullTime: "p",
  fullTime12h: "hh:mm aaa",
  fullTime24h: "HH:mm",
  hours12h: "hh",
  hours24h: "HH",
  keyboardDate: "P",
  keyboardDateTime: "P p",
  keyboardDateTime12h: "P hh:mm aaa",
  keyboardDateTime24h: "P HH:mm",
  minutes: "mm",
  month: "LLLL",
  monthAndDate: "MMMM d",
  monthAndYear: "LLLL yyyy",
  monthShort: "MMM",
  weekday: "EEEE",
  weekdayShort: "EEE",
  normalDate: "d MMMM",
  normalDateWithWeekday: "EEE, MMM d",
  seconds: "ss",
  shortDate: "MMM d",
  year: "yyyy"
};
var DateFnsUtils = (
  /** @class */
  function() {
    function DateFnsUtils2(_a) {
      var _this = this;
      var _b = _a === void 0 ? {} : _a, locale = _b.locale, formats = _b.formats;
      this.lib = "date-fns";
      this.is12HourCycleInCurrentLocale = function() {
        if (_this.locale) {
          return /a/.test(_this.locale.formatLong.time());
        }
        return true;
      };
      this.getFormatHelperText = function(format2) {
        var longFormatRegexp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
        var locale2 = _this.locale || en_US_default;
        return format2.match(longFormatRegexp).map(function(token) {
          var firstCharacter = token[0];
          if (firstCharacter === "p" || firstCharacter === "P") {
            var longFormatter = import_longFormatters.default[firstCharacter];
            return longFormatter(token, locale2.formatLong, {});
          }
          return token;
        }).join("").replace(/(aaa|aa|a)/g, "(a|p)m").toLocaleLowerCase();
      };
      this.parseISO = function(isoString) {
        return parseISO(isoString);
      };
      this.toISO = function(value) {
        return formatISO(value, { format: "extended" });
      };
      this.getCurrentLocaleCode = function() {
        var _a2;
        return ((_a2 = _this.locale) === null || _a2 === void 0 ? void 0 : _a2.code) || "en-US";
      };
      this.addSeconds = function(value, count) {
        return addSeconds(value, count);
      };
      this.addMinutes = function(value, count) {
        return addMinutes(value, count);
      };
      this.addHours = function(value, count) {
        return addHours(value, count);
      };
      this.addDays = function(value, count) {
        return addDays(value, count);
      };
      this.addWeeks = function(value, count) {
        return addWeeks(value, count);
      };
      this.addMonths = function(value, count) {
        return addMonths(value, count);
      };
      this.addYears = function(value, count) {
        return addYears(value, count);
      };
      this.isValid = function(value) {
        return isValid(_this.date(value));
      };
      this.getDiff = function(value, comparing, unit) {
        switch (unit) {
          case "years":
            return differenceInYears(value, _this.date(comparing));
          case "quarters":
            return differenceInQuarters(value, _this.date(comparing));
          case "months":
            return differenceInMonths(value, _this.date(comparing));
          case "weeks":
            return differenceInWeeks(value, _this.date(comparing));
          case "days":
            return differenceInDays(value, _this.date(comparing));
          case "hours":
            return differenceInHours(value, _this.date(comparing));
          case "minutes":
            return differenceInMinutes(value, _this.date(comparing));
          case "seconds":
            return differenceInSeconds(value, _this.date(comparing));
          default: {
            return differenceInMilliseconds(value, _this.date(comparing));
          }
        }
      };
      this.isAfter = function(value, comparing) {
        return isAfter(value, comparing);
      };
      this.isBefore = function(value, comparing) {
        return isBefore(value, comparing);
      };
      this.startOfDay = function(value) {
        return startOfDay(value);
      };
      this.endOfDay = function(value) {
        return endOfDay(value);
      };
      this.getHours = function(value) {
        return getHours(value);
      };
      this.setHours = function(value, count) {
        return setHours(value, count);
      };
      this.setMinutes = function(value, count) {
        return setMinutes(value, count);
      };
      this.getSeconds = function(value) {
        return getSeconds(value);
      };
      this.setSeconds = function(value, count) {
        return setSeconds(value, count);
      };
      this.isSameDay = function(value, comparing) {
        return isSameDay(value, comparing);
      };
      this.isSameMonth = function(value, comparing) {
        return isSameMonth(value, comparing);
      };
      this.isSameYear = function(value, comparing) {
        return isSameYear(value, comparing);
      };
      this.isSameHour = function(value, comparing) {
        return isSameHour(value, comparing);
      };
      this.startOfYear = function(value) {
        return startOfYear(value);
      };
      this.endOfYear = function(value) {
        return endOfYear(value);
      };
      this.startOfMonth = function(value) {
        return startOfMonth(value);
      };
      this.endOfMonth = function(value) {
        return endOfMonth(value);
      };
      this.startOfWeek = function(value) {
        return startOfWeek(value, { locale: _this.locale });
      };
      this.endOfWeek = function(value) {
        return endOfWeek(value, { locale: _this.locale });
      };
      this.getYear = function(value) {
        return getYear(value);
      };
      this.setYear = function(value, count) {
        return setYear(value, count);
      };
      this.date = function(value) {
        if (typeof value === "undefined") {
          return /* @__PURE__ */ new Date();
        }
        if (value === null) {
          return null;
        }
        return new Date(value);
      };
      this.toJsDate = function(value) {
        return value;
      };
      this.parse = function(value, formatString) {
        if (value === "") {
          return null;
        }
        return parse(value, formatString, /* @__PURE__ */ new Date(), { locale: _this.locale });
      };
      this.format = function(date, formatKey) {
        return _this.formatByString(date, _this.formats[formatKey]);
      };
      this.formatByString = function(date, formatString) {
        return format(date, formatString, { locale: _this.locale });
      };
      this.isEqual = function(date, comparing) {
        if (date === null && comparing === null) {
          return true;
        }
        return isEqual(date, comparing);
      };
      this.isNull = function(date) {
        return date === null;
      };
      this.isAfterDay = function(date, value) {
        return isAfter(date, endOfDay(value));
      };
      this.isBeforeDay = function(date, value) {
        return isBefore(date, startOfDay(value));
      };
      this.isBeforeYear = function(date, value) {
        return isBefore(date, startOfYear(value));
      };
      this.isAfterYear = function(date, value) {
        return isAfter(date, endOfYear(value));
      };
      this.isWithinRange = function(date, _a2) {
        var start = _a2[0], end = _a2[1];
        return isWithinInterval(date, { start, end });
      };
      this.formatNumber = function(numberToFormat) {
        return numberToFormat;
      };
      this.getMinutes = function(date) {
        return getMinutes(date);
      };
      this.getDate = function(date) {
        return getDate(date);
      };
      this.setDate = function(date, count) {
        return setDate(date, count);
      };
      this.getMonth = function(date) {
        return getMonth(date);
      };
      this.getDaysInMonth = function(date) {
        return getDaysInMonth(date);
      };
      this.setMonth = function(date, count) {
        return setMonth(date, count);
      };
      this.getMeridiemText = function(ampm) {
        return ampm === "am" ? "AM" : "PM";
      };
      this.getNextMonth = function(date) {
        return addMonths(date, 1);
      };
      this.getPreviousMonth = function(date) {
        return addMonths(date, -1);
      };
      this.getMonthArray = function(date) {
        var firstMonth = startOfYear(date);
        var monthArray = [firstMonth];
        while (monthArray.length < 12) {
          var prevMonth = monthArray[monthArray.length - 1];
          monthArray.push(_this.getNextMonth(prevMonth));
        }
        return monthArray;
      };
      this.mergeDateAndTime = function(date, time) {
        return _this.setSeconds(_this.setMinutes(_this.setHours(date, _this.getHours(time)), _this.getMinutes(time)), _this.getSeconds(time));
      };
      this.getWeekdays = function() {
        var now = /* @__PURE__ */ new Date();
        return eachDayOfInterval({
          start: startOfWeek(now, { locale: _this.locale }),
          end: endOfWeek(now, { locale: _this.locale })
        }).map(function(day) {
          return _this.formatByString(day, "EEEEEE");
        });
      };
      this.getWeekArray = function(date) {
        var start = startOfWeek(startOfMonth(date), { locale: _this.locale });
        var end = endOfWeek(endOfMonth(date), { locale: _this.locale });
        var count = 0;
        var current = start;
        var nestedWeeks = [];
        var lastDay = null;
        while (isBefore(current, end)) {
          var weekNumber = Math.floor(count / 7);
          nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
          var day = getDay(current);
          if (lastDay !== day) {
            lastDay = day;
            nestedWeeks[weekNumber].push(current);
            count += 1;
          }
          current = addDays(current, 1);
        }
        return nestedWeeks;
      };
      this.getYearRange = function(start, end) {
        var startDate = startOfYear(start);
        var endDate = endOfYear(end);
        var years = [];
        var current = startDate;
        while (isBefore(current, endDate)) {
          years.push(current);
          current = addYears(current, 1);
        }
        return years;
      };
      this.locale = locale;
      this.formats = Object.assign({}, defaultFormats, formats);
    }
    return DateFnsUtils2;
  }()
);

// node_modules/@mui/x-date-pickers/AdapterDateFns/index.js
var import_longFormatters2 = __toESM(require_longFormatters());
var formatTokenMap = {
  y: "year",
  yy: "year",
  yyy: "year",
  yyyy: "year",
  MMMM: "month",
  MM: "month",
  DD: "day",
  d: "day",
  dd: "day",
  H: "hour",
  HH: "hour",
  h: "hour",
  hh: "hour",
  mm: "minute",
  ss: "second",
  a: "am-pm",
  aa: "am-pm",
  aaa: "am-pm"
};
var AdapterDateFns = class extends DateFnsUtils {
  constructor(...args) {
    super(...args);
    this.formatTokenMap = formatTokenMap;
    this.expandFormat = (format2) => {
      const longFormatRegexp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
      return format2.match(longFormatRegexp).map((token) => {
        const firstCharacter = token[0];
        if (firstCharacter === "p" || firstCharacter === "P") {
          const longFormatter = import_longFormatters2.default[firstCharacter];
          const locale = this.locale || en_US_default;
          return longFormatter(token, locale.formatLong, {});
        }
        return token;
      }).join("");
    };
    this.getFormatHelperText = (format2) => {
      return this.expandFormat(format2).replace(/(aaa|aa|a)/g, "(a|p)m").toLocaleLowerCase();
    };
  }
};
export {
  AdapterDateFns
};
//# sourceMappingURL=@mui_x-date-pickers_AdapterDateFns.js.map
