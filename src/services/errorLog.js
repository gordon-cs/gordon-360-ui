/**
 * Error Log
 *
 * @module errorLog
 */

import http from './http.ts';

const postErrorLog = (message) => {
  let currentTime = new Date();
  let data = {
    LOG_MESSAGE: message,
    LOG_TIME: currentTime,
  };
  return http.post('log/add', data);
};

const postErrorMessage = (message) => {
  return http.post('log', message);
};

//Code modified from https://medium.com/creative-technology-concepts-code/detect-device-browser-and-version-using-javascript-8b511906745
const matchItem = (string, data) => {
  var i = 0,
    regex,
    match;

  for (i = 0; i < data.length; i += 1) {
    regex = new RegExp(data[i].value, 'i');
    match = regex.test(string);
    if (match) {
      return {
        name: data[i].name,
      };
    }
  }
  return { name: 'unknown' };
};

const parseNavigator = (navigator) => {
  //Code modified from https://medium.com/creative-technology-concepts-code/detect-device-browser-and-version-using-javascript-8b511906745
  var oses = [
    { name: 'Windows Phone', value: 'Windows Phone' },
    { name: 'Windows', value: 'Win' },
    { name: 'iPhone', value: 'iPhone' },
    { name: 'iPad', value: 'iPad' },
    { name: 'Kindle', value: 'Silk' },
    { name: 'Android', value: 'Android' },
    { name: 'PlayBook', value: 'PlayBook' },
    { name: 'BlackBerry', value: 'BlackBerry' },
    { name: 'Macintosh', value: 'Mac' },
    { name: 'Linux', value: 'Linux' },
    { name: 'Palm', value: 'Palm' },
  ];

  var browsers = [
    { name: 'Chrome', value: 'Chrome' },
    { name: 'Firefox', value: 'Firefox' },
    { name: 'Safari', value: 'Safari' },
    { name: 'Internet Explorer', value: 'MSIE' },
    { name: 'Opera', value: 'Opera' },
    { name: 'BlackBerry', value: 'CLDC' },
    { name: 'Mozilla', value: 'Mozilla' },
  ];

  var header = [
    navigator.platform,
    navigator.userAgent,
    navigator.appVersion,
    navigator.vendor,
    window.opera,
  ];

  var agent = header.join(' ');
  var os = matchItem(agent, oses);
  var browser = matchItem(agent, browsers);
  let result = 'OS: ' + os.name + ', Browser: ' + browser.name;
  return result;
};

const errorLogService = {
  postErrorLog,
  postErrorMessage,
  parseNavigator,
};

export default errorLogService;
